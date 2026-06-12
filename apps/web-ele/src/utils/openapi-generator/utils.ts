import process from 'node:process';

import { TYPE_MAPPING } from './type-mapping';

/**
 * 转换为驼峰命名
 */
export function toCamelCase(str: string): string {
  return str
    .replaceAll(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}

/**
 * 转换为帕斯卡命名
 */
export function toPascalCase(str: string): string {
  const camelCase = toCamelCase(str);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

export function isValidIdentifier(name: string): boolean {
  return /^[A-Za-z_$][\w$]*$/.test(name);
}

export function formatPropertyKey(name: string): string {
  return isValidIdentifier(name) ? name : JSON.stringify(name);
}

/**
 * 映射 OpenAPI 类型到 TypeScript 类型
 */
export function mapOpenAPIType(
  type: string | string[],
  format?: string,
): string {
  // 处理数组类型
  if (Array.isArray(type)) {
    return type.map((t) => mapOpenAPIType(t, format)).join(' | ');
  }

  // 如果有格式，尝试使用格式化的类型映射
  if (format) {
    const formatKey = `${type}:${format}` as keyof typeof TYPE_MAPPING;
    if (TYPE_MAPPING[formatKey]) {
      return TYPE_MAPPING[formatKey];
    }
  }

  // 使用基础类型映射
  return (
    TYPE_MAPPING[type as keyof typeof TYPE_MAPPING] || TYPE_MAPPING.default
  );
}

export function wrapArrayItemType(type: string): string {
  return /\s[&|]\s/.test(type) ? `(${type})` : type;
}

export function isNullableSchema(schema: any): boolean {
  if (!schema) return false;

  return Boolean(
    schema.nullable ||
    (Array.isArray(schema.type) && schema.type.includes('null')) ||
    (Array.isArray(schema.enum) && schema.enum.includes(null)) ||
    schema.oneOf?.some((item: any) => isNullSchema(item)) ||
    schema.anyOf?.some((item: any) => isNullSchema(item)),
  );
}

function isNullSchema(schema: any): boolean {
  return Boolean(
    schema?.type === 'null' ||
    (Array.isArray(schema?.type) &&
      schema.type.length === 1 &&
      schema.type.includes('null')) ||
    (Array.isArray(schema?.enum) &&
      schema.enum.length === 1 &&
      schema.enum[0] === null),
  );
}

function stripNullType(schema: any): any {
  if (!schema || !Array.isArray(schema.type)) return schema;

  const type = schema.type.filter((item: string) => item !== 'null');
  let normalizedType: string | string[];
  if (type.length === 0) {
    normalizedType = 'null';
  } else if (type.length === 1) {
    normalizedType = type[0];
  } else {
    normalizedType = type;
  }

  return {
    ...schema,
    nullable: false,
    type: normalizedType,
  };
}

/**
 * 映射 schema 到 TypeScript 类型
 */
export function mapSchemaToType(schema: any, depth: number = 0): string {
  if (!schema) return 'any';

  const allowsNull = isNullableSchema(schema);
  const applyNullable = (type: string) =>
    allowsNull && type && !type.split(/\s*\|\s*/).includes('null')
      ? `${type} | null`
      : type || (allowsNull ? 'null' : 'any');

  const joinTypes = (types: string[], separator: ' & ' | ' | ') =>
    [...new Set(types)].join(separator);
  const isStringEnumSchema = (target: any) =>
    target?.type === 'string' && Array.isArray(target.enum);
  const isPlainStringSchema = (target: any) =>
    target?.type === 'string' && !target.enum && !target.const;
  const mapUnionSchemas = (schemas: any[]) => {
    const effectiveSchemas = schemas.filter((item: any) => !isNullSchema(item));
    if (effectiveSchemas.length === 0) {
      return 'null';
    }

    const hasStringEnum = effectiveSchemas.some((item: any) =>
      isStringEnumSchema(item),
    );
    const hasPlainString = effectiveSchemas.some((item: any) =>
      isPlainStringSchema(item),
    );
    const types = effectiveSchemas.map((s: any) =>
      hasStringEnum && hasPlainString && isPlainStringSchema(s)
        ? '(string & {})'
        : mapSchemaToType(s, depth + 1),
    );
    return applyNullable(joinTypes(types, ' | '));
  };

  // 处理 $ref 引用
  if (schema.$ref) {
    return applyNullable(resolveRef(schema.$ref) as string);
  }

  // 处理 allOf, oneOf, anyOf
  if (schema.allOf) {
    const types = schema.allOf.map((s: any) => mapSchemaToType(s, depth + 1));
    return applyNullable(joinTypes(types, ' & '));
  }

  if (schema.oneOf || schema.anyOf) {
    const schemas = schema.oneOf || schema.anyOf;
    return mapUnionSchemas(schemas);
  }

  if (Array.isArray(schema.type)) {
    const effectiveSchema = stripNullType(schema);
    const types = (
      Array.isArray(effectiveSchema.type)
        ? effectiveSchema.type
        : [effectiveSchema.type]
    ).map((type: string) =>
      mapSchemaToType({ ...effectiveSchema, nullable: false, type }, depth),
    );
    return applyNullable(joinTypes(types, ' | '));
  }

  switch (schema.type) {
    case 'array': {
      if (!schema.items) return 'any[]';
      const itemType = mapSchemaToType(schema.items, depth + 1);
      return applyNullable(`${wrapArrayItemType(itemType)}[]`);
    }
    case 'boolean': {
      return applyNullable('boolean');
    }
    case 'integer':
    case 'number': {
      // 处理枚举值
      if (schema.enum && Array.isArray(schema.enum)) {
        const enumValues = schema.enum.filter((item: any) => item !== null);
        return enumValues.length === 0 ? 'null' : applyNullable('number');
      }
      return applyNullable('number');
    }
    case 'object': {
      if (schema.properties) {
        // 避免过深的嵌套，超过8层使用通用类型
        if (depth > 8) {
          return applyNullable('Record<string, any>');
        }

        // 生成内联对象类型
        const props = Object.entries(schema.properties).map(
          ([key, prop]: [string, any]) => {
            const required = schema.required?.includes(key) ? '' : '?';
            const propType = mapSchemaToType(prop, depth + 1);
            return `  ${formatPropertyKey(key)}${required}: ${propType}`;
          },
        );

        if (props.length === 0) {
          if (
            schema.additionalProperties &&
            typeof schema.additionalProperties === 'object'
          ) {
            const valueType = mapSchemaToType(
              schema.additionalProperties,
              depth + 1,
            );
            return applyNullable(`Record<string, ${valueType}>`);
          }
          if (schema.additionalProperties === true) {
            return applyNullable('Record<string, any>');
          }
          return applyNullable('Record<string, any>');
        }

        let extraProperty = '';
        if (
          schema.additionalProperties &&
          typeof schema.additionalProperties === 'object'
        ) {
          extraProperty = `;\n  /** 任意合法数值 */\n  [property: string]: ${mapSchemaToType(schema.additionalProperties, depth + 1)}`;
        } else if (schema.additionalProperties === true) {
          extraProperty = ';\n  /** 任意合法数值 */\n  [property: string]: any';
        }

        return applyNullable(`{\n${props.join(';\n')}${extraProperty};\n}`);
      }

      // 处理 additionalProperties
      if (schema.additionalProperties) {
        if (typeof schema.additionalProperties === 'object') {
          const valueType = mapSchemaToType(
            schema.additionalProperties,
            depth + 1,
          );
          return applyNullable(`Record<string, ${valueType}>`);
        }
        return applyNullable('Record<string, any>');
      }

      return applyNullable('Record<string, any>');
    }
    case 'string': {
      // 处理字符串枚举
      if (schema.enum && Array.isArray(schema.enum)) {
        const enumValues = schema.enum.filter((item: any) => item !== null);
        if (enumValues.length === 0) {
          return 'null';
        }

        return applyNullable(
          enumValues.map((val: any) => `'${val}'`).join(' | '),
        );
      }

      // 处理格式化字符串
      switch (schema.format) {
        case 'binary': {
          return applyNullable('File | Blob');
        }
        case 'date':
        case 'date-time': {
          return applyNullable('string');
        } // 可以考虑使用 Date 类型
        case 'email':
        case 'uri':
        case 'uuid': {
          return applyNullable('string');
        }
        default: {
          return applyNullable('string');
        }
      }
    }
    case 'null': {
      return 'null';
    }
    default: {
      // 处理没有明确类型但有属性的情况
      if (schema.properties) {
        return mapSchemaToType({ ...schema, type: 'object' }, depth);
      }

      // 处理枚举但没有类型的情况
      if (schema.enum && Array.isArray(schema.enum)) {
        const enumValues = schema.enum.filter((item: any) => item !== null);
        if (enumValues.length === 0) {
          return 'null';
        }

        const firstType = typeof enumValues[0];
        if (firstType === 'string') {
          return applyNullable(
            enumValues.map((val: string) => `'${val}'`).join(' | '),
          );
        } else if (firstType === 'number') {
          return applyNullable('number');
        }
      }

      return applyNullable('any');
    }
  }
}

/**
 * 解析 $ref 引用
 */
export function resolveRef(ref: string) {
  // 从 $ref 中提取类型名称
  // 例如: "#/components/schemas/AuthorDetailResponse" -> "AuthorDetailResponse"
  const parts = ref.split('/');
  return parts[parts.length - 1];
}

/**
 * 格式化当前时间
 */
export function formatCurrentTime(options: Intl.DateTimeFormatOptions): string {
  if (process.env.OPENAPI_GENERATED_AT) {
    return process.env.OPENAPI_GENERATED_AT;
  }

  return new Date().toLocaleString('zh-CN', options).replaceAll('/', '-');
}

/**
 * 收集引用的类型
 */
export function collectReferencedTypes(
  schema: any,
  referencedTypes: Set<string>,
): void {
  if (!schema) return;

  if (schema.$ref) {
    const typeName = resolveRef(schema.$ref);
    referencedTypes.add(typeName as string);
  }

  // 处理 allOf, oneOf, anyOf
  if (schema.allOf) {
    for (const subSchema of schema.allOf) {
      collectReferencedTypes(subSchema, referencedTypes);
    }
  }

  if (schema.oneOf) {
    for (const subSchema of schema.oneOf) {
      collectReferencedTypes(subSchema, referencedTypes);
    }
  }

  if (schema.anyOf) {
    for (const subSchema of schema.anyOf) {
      collectReferencedTypes(subSchema, referencedTypes);
    }
  }

  // 处理数组类型
  if (
    (schema.type === 'array' ||
      (Array.isArray(schema.type) && schema.type.includes('array'))) &&
    schema.items
  ) {
    collectReferencedTypes(schema.items, referencedTypes);
  }

  // 处理对象类型
  if (
    (schema.type === 'object' ||
      (Array.isArray(schema.type) && schema.type.includes('object'))) &&
    schema.properties
  ) {
    for (const prop of Object.values(schema.properties)) {
      collectReferencedTypes(prop, referencedTypes);
    }
  }

  // 处理 additionalProperties
  if (
    schema.additionalProperties &&
    typeof schema.additionalProperties === 'object'
  ) {
    collectReferencedTypes(schema.additionalProperties, referencedTypes);
    return;
  }

  // 处理没有明确类型但有属性的情况
  if (schema.properties) {
    for (const prop of Object.values(schema.properties)) {
      collectReferencedTypes(prop, referencedTypes);
    }
  }
}
