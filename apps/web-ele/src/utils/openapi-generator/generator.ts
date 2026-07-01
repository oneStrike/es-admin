import type { OpenAPIGeneratorConfig } from './config';
import type {
  GeneratedFile,
  GroupedPaths,
  MethodInfo,
  ModuleCodeResult,
  OpenAPISpec,
  OperationContext,
} from './types';

import { mergeOpenAPIGeneratorConfig, TEMPLATES } from './config';
import {
  collectReferencedTypes,
  formatCurrentTime,
  formatPropertyKey,
  isNullableSchema,
  isValidIdentifier,
  mapSchemaToType,
  resolveRef,
  toCamelCase,
  toPascalCase,
} from './utils';

const RESERVED_BINDING_NAMES = new Set([
  'arguments',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'eval',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'interface',
  'let',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
]);

const PAGE_ENVELOPE_REQUIRED_PROPERTY_NAMES = new Set([
  'list',
  'pageIndex',
  'pageSize',
  'total',
]);

// Remove with COMPATIBILITY_TRACKER.md once ApiPageDoc emits parent required[].
interface PropertyGenerationContext {
  usage?: 'response-page-envelope';
}

/**
 * OpenAPI 代码生成器核心类
 */
export class OpenAPIGenerator {
  private config: OpenAPIGeneratorConfig;
  private spec: null | OpenAPISpec = null;

  constructor(config: Partial<OpenAPIGeneratorConfig> = {}) {
    this.config = mergeOpenAPIGeneratorConfig(config);
  }

  /**
   * 获取 OpenAPI 文档
   */
  async fetchOpenAPISpec(url?: string): Promise<null | OpenAPISpec> {
    const apiUrl = url || this.config.openApiUrl;

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (this.config.openApiMethod === 'POST') {
        Object.assign(headers, this.config.proxyConfig.headers);
      }

      const response = await fetch(apiUrl, {
        method: this.config.openApiMethod,
        headers,
        body:
          this.config.openApiMethod === 'POST'
            ? JSON.stringify(this.config.proxyConfig.data)
            : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('服务器响应错误内容:', errorText);
        throw new Error(
          `Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`,
        );
      }

      // 检查响应的 Content-Type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn(`警告: 响应的 Content-Type 不是 JSON: ${contentType}`);
      }

      // 先获取响应文本，然后尝试解析
      const responseText = await response.text();

      if (!responseText.trim()) {
        throw new Error('服务器返回了空响应');
      }

      // 显示响应内容的前100个字符用于调试

      try {
        this.spec = JSON.parse(responseText);
        return this.spec;
      } catch (parseError) {
        throw new Error(
          `JSON 解析失败: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
          { cause: parseError },
        );
      }
    } catch (error) {
      console.error('❌ 获取 OpenAPI 文档失败:', error);
      throw error;
    }
  }

  /**
   * 生成 API 代码
   */
  generateAPICode(): GeneratedFile[] {
    if (!this.spec) {
      throw new Error('OpenAPI spec not loaded');
    }

    const files: GeneratedFile[] = [];
    const groupedPaths = this.groupPathsByModule();

    for (const group of Object.values(groupedPaths)) {
      const { apiContent, typesContent } = this.generateModuleCode(
        group.fileName,
        group.operations,
        undefined,
        group.directory,
      );

      files.push({
        fileName: `${group.fileName}.ts`,
        content: apiContent,
        types: typesContent,
      });
    }

    return files;
  }

  /**
   * 生成模块代码
   */
  generateModuleCode(
    moduleName: string,
    paths: OperationContext[],
    finalFileName?: string,
    directory?: string,
  ): ModuleCodeResult {
    const imports = new Set<string>();
    const apiMethods: string[] = [];
    const typeDefinitions: string[] = [];
    const referencedTypes = new Set<string>();
    const emittedTypes = new Set<string>();

    for (const { path, method, operation, methodInfo } of paths) {
      const resolvedMethodInfo =
        methodInfo || this.resolveMethodInfo(path, method);
      const { requestType, responseType } = resolvedMethodInfo;

      // 检查是否需要参数
      const hasParams = this.hasRequestParams(operation);
      let finalRequestType = 'void';
      let finalResponseType = 'undefined';

      // 生成请求类型定义（仅当有参数时）
      if (hasParams) {
        const requestTypeDef = this.generateRequestType(requestType, operation);
        if (requestTypeDef) {
          typeDefinitions.push(requestTypeDef);
          emittedTypes.add(requestType);
          imports.add(requestType);
          finalRequestType = requestType;
          this.getRequestParameters(operation).forEach((param: any) => {
            collectReferencedTypes(param.schema, referencedTypes);
          });
          collectReferencedTypes(
            this.getRequestBodySchema(operation),
            referencedTypes,
          );
        } else {
          finalRequestType = 'any';
        }
      }

      // 生成响应类型定义
      const successResponse = this.getSuccessResponse(operation.responses);
      if (successResponse) {
        const responseTypeDef = this.generateResponseType(
          responseType,
          successResponse,
        );
        if (responseTypeDef) {
          typeDefinitions.push(responseTypeDef);
          emittedTypes.add(responseType);
          imports.add(responseType);
          finalResponseType = responseType;
          collectReferencedTypes(
            this.getResponseSchema(successResponse),
            referencedTypes,
          );
        }
      }

      // 生成API方法
      const apiMethod = this.generateAPIMethod(
        path,
        method,
        operation,
        resolvedMethodInfo,
        finalRequestType,
        finalResponseType,
      );
      apiMethods.push(apiMethod);
    }

    // 递归收集所有依赖的类型
    const allReferencedTypes = this.collectAllDependencies(referencedTypes);

    // 生成引用的类型定义
    for (const typeName of allReferencedTypes) {
      const schemaTypeDef = this.generateSchemaType(typeName);
      if (schemaTypeDef) {
        typeDefinitions.push(schemaTypeDef);
        emittedTypes.add(typeName);
      }
    }

    typeDefinitions.push(...this.generateLegacyTypeAliases(emittedTypes));

    // 使用最终文件名（去掉.ts扩展名）来生成正确的类型导入路径
    const typeFileName = finalFileName
      ? finalFileName.replace('.ts', '')
      : moduleName;

    // 生成导入语句
    // 如果 API 文件在子文件夹中，需要使用 ../ 回到父目录，然后再进入 types 目录
    // 例如：src/apis/user/user.ts -> src/apis/types/user/user.d.ts
    // 导入路径应该是：../types/user/user.d
    const typeImportPath = directory
      ? `../../${this.config.typesDirName}/${directory}/${typeFileName}.d`
      : `../${this.config.typesDirName}/${typeFileName}.d`;

    const importStatements =
      imports.size > 0
        ? `import type {
  ${[...imports].join(',\n  ')}
} from '${typeImportPath}'\n\n`
        : '';

    const apiContent = `import { ${this.config.httpHandler} } from '${this.config.httpHandlerImport}'\n${importStatements}${apiMethods.join('\n\n')}\n`;

    const typesContent = typeDefinitions.join('\n\n');

    return { apiContent, typesContent };
  }

  /**
   * 按模块分组路径
   */
  groupPathsByModule(): GroupedPaths {
    const grouped: GroupedPaths = {};
    const operationContexts = this.resolveUniqueNames(
      this.buildOperationContexts(),
    );

    for (const context of operationContexts) {
      if (!grouped[context.moduleKey]) {
        grouped[context.moduleKey] = {
          directory: context.directory,
          fileName: context.fileName,
          operations: [],
        };
      }

      const moduleGroup = grouped[context.moduleKey];
      if (moduleGroup) {
        moduleGroup.operations.push(context);
      }
    }

    return grouped;
  }

  private applySchemaNullable(schema: any, type: string): string {
    return this.isNullableSchema(schema) &&
      !type.split(/\s*\|\s*/).includes('null')
      ? `${type} | null`
      : type;
  }

  private applySchemaPropertyOverride(
    ownerTypeName: string | undefined,
    propName: string,
    prop: any,
  ): any {
    const override = ownerTypeName
      ? this.config.schemaPropertyOverrides?.[ownerTypeName]?.[propName]
      : undefined;

    if (!override) {
      return prop;
    }

    const { openEnumString, ...schemaOverride } = override;
    const nextProp = { ...prop, ...schemaOverride };

    if (openEnumString && Array.isArray(prop.enum)) {
      const enumSchema = { ...prop, ...schemaOverride, nullable: false };
      nextProp.anyOf = [enumSchema, { type: 'string' }];
      delete nextProp.enum;
    }

    return nextProp;
  }

  private buildBindingName(
    name: string,
    index: number,
    usedNames?: Set<string>,
  ): string {
    const baseName = this.isBindingIdentifier(name)
      ? name
      : `requestParam${index}`;

    if (!usedNames?.has(baseName)) {
      return baseName;
    }

    return `requestParam${index}`;
  }

  private buildDestructuredParamExpression(
    localName: string,
    requestParamName: string,
  ): string {
    if (
      this.isBindingIdentifier(requestParamName) &&
      localName === requestParamName
    ) {
      return requestParamName;
    }

    return `${formatPropertyKey(requestParamName)}: ${localName}`;
  }

  private buildIndexSignature(additionalProperties: any, exact = false) {
    if (exact) {
      return '';
    }
    if (additionalProperties && typeof additionalProperties === 'object') {
      return `  /** 任意合法数值 */\n  [property: string]: ${mapSchemaToType(additionalProperties)}`;
    }
    if (additionalProperties === true) {
      return '  /** 任意合法数值 */\n  [property: string]: any';
    }
    return '';
  }

  private buildLocalParamNames(
    params: any[],
    requestParamNames: Map<string, string>,
  ): Map<string, string> {
    const localNames = new Map<string, string>();
    const usedNames = new Set<string>();

    params.forEach((param, index) => {
      const key = this.buildRequestParamKey(param);
      const requestParamName = requestParamNames.get(key) || param.name;
      let localName = this.buildBindingName(requestParamName, index, usedNames);

      if (usedNames.has(localName)) {
        localName = `requestParam${index}`;
      }

      usedNames.add(localName);
      localNames.set(key, localName);
    });

    return localNames;
  }

  private buildObjectType(
    schema: any,
    properties: string[],
    options: { exact?: boolean; separator?: string } = {},
  ) {
    const separator = options.separator ?? '\n';
    const additionalProperties = schema.additionalProperties;
    const extraProperty = this.buildIndexSignature(
      additionalProperties,
      options.exact,
    );
    return `{
${[properties.join(separator), extraProperty].filter(Boolean).join('\n\n')}
}`;
  }

  private buildOperationContexts(): OperationContext[] {
    const contexts: OperationContext[] = [];

    if (!this.spec) {
      return contexts;
    }

    for (const [path, methods] of Object.entries(this.spec.paths)) {
      for (const [method, operation] of Object.entries(methods)) {
        if (!operation || typeof operation !== 'object') continue;

        const namingSegments = this.getNamingSegments(path);
        if (namingSegments.length === 0) continue;

        const fileName = this.getModuleFileName(namingSegments);
        const directory = this.getModuleDirectory(
          path,
          fileName,
          namingSegments,
        );
        const moduleKey = directory ? `${directory}::${fileName}` : fileName;

        contexts.push({
          path,
          method: method.toUpperCase(),
          operation,
          directory,
          fileName,
          moduleKey,
          namingSegments,
        });
      }
    }

    return contexts;
  }

  private buildParamAccessExpression(source: string, name: string): string {
    return this.isIdentifier(name)
      ? `${source}.${name}`
      : `${source}[${JSON.stringify(name)}]`;
  }

  private buildQueryConfigExpression(
    queryParams: any[],
    source?: string,
    shorthand = false,
    localNames?: Map<string, string>,
    requestParamNames?: Map<string, string>,
  ): string {
    const paramsExpression = this.buildQueryParamsExpression(
      queryParams,
      source,
      shorthand,
      localNames,
      requestParamNames,
    );
    return paramsExpression === 'params'
      ? '{ params }'
      : `{ params: ${paramsExpression} }`;
  }

  private buildQueryParamsExpression(
    queryParams: any[],
    source?: string,
    shorthand = false,
    localNames?: Map<string, string>,
    requestParamNames?: Map<string, string>,
  ): string {
    if (queryParams.length === 0) {
      return 'params';
    }

    if (!source && !shorthand) {
      return 'params';
    }

    const valueSource = source || 'params';
    const queryProperties = queryParams
      .map((param) => {
        const requestParamName =
          requestParamNames?.get(this.buildRequestParamKey(param)) ||
          param.name;
        const localName = localNames?.get(this.buildRequestParamKey(param));
        const valueExpression =
          localName ||
          this.buildParamAccessExpression(valueSource, requestParamName);

        if (
          shorthand &&
          localName === param.name &&
          this.isBindingIdentifier(param.name)
        ) {
          return param.name;
        }
        if (this.isIdentifier(param.name)) {
          return `${param.name}: ${valueExpression}`;
        }
        return `${JSON.stringify(param.name)}: ${valueExpression}`;
      })
      .join(', ');

    return `{ ${queryProperties} }`;
  }

  private buildRequestConfigExpression(
    method: string,
    options: {
      data?: string;
      localNames?: Map<string, string>;
      queryParams?: any[];
      querySource?: string;
      requestParamNames?: Map<string, string>;
      shorthand?: boolean;
    } = {},
  ): string {
    const entries = [`method: '${method}'`];

    if (options.data) {
      entries.push(`data: ${options.data}`);
    }

    if (options.queryParams?.length) {
      entries.push(
        `params: ${this.buildQueryParamsExpression(
          options.queryParams,
          options.querySource,
          options.shorthand,
          options.localNames,
          options.requestParamNames,
        )}`,
      );
    }

    return `{ ${entries.join(', ')} }`;
  }

  private buildRequestParamKey(param: any): string {
    return `${param.in || 'param'}:${param.name}`;
  }

  private buildRequestParamNames(operation: any): Map<string, string> {
    const params = this.getRequestParameters(operation);
    const nameCounts = new Map<string, number>();
    const paramNames = new Map<string, string>();
    const usedNames = new Set<string>();

    for (const param of params) {
      nameCounts.set(param.name, (nameCounts.get(param.name) || 0) + 1);
    }

    params.forEach((param, index) => {
      const hasDuplicateName = (nameCounts.get(param.name) || 0) > 1;
      const preferredName = hasDuplicateName
        ? toCamelCase(`${param.in || 'param'}-${param.name}`)
        : param.name;
      let finalName = preferredName;

      if (usedNames.has(finalName)) {
        finalName = toCamelCase(
          `${param.in || 'param'}-${index}-${param.name}`,
        );
      }

      usedNames.add(finalName);
      paramNames.set(this.buildRequestParamKey(param), finalName);
    });

    return paramNames;
  }

  private buildTypeProperty(name: string, required: string, type: string) {
    return `${formatPropertyKey(name)}${required}: ${type}`;
  }

  private buildUrlExpression(
    path: string,
    pathParams: any[],
    localNames?: Map<string, string>,
    requestParamNames?: Map<string, string>,
  ): string {
    if (pathParams.length === 0) {
      return `'${path}'`;
    }

    const templatedPath = path.replaceAll(
      /\{([^}]+)\}/g,
      (_placeholder, paramName) => {
        const pathParam = pathParams.find((param) => param.name === paramName);
        const key = pathParam
          ? this.buildRequestParamKey(pathParam)
          : `path:${paramName}`;
        const requestParamName = pathParam
          ? requestParamNames?.get(key) || pathParam.name
          : paramName;
        return `\${encodeURIComponent(String(${
          localNames?.get(key) ||
          this.buildParamAccessExpression('params', requestParamName)
        }))}`;
      },
    );
    return `\`${templatedPath}\``;
  }

  /**
   * 递归收集所有依赖的类型
   */
  private collectAllDependencies(initialTypes: Set<string>): Set<string> {
    const allTypes = new Set<string>();
    const visited = new Set<string>();

    const collectDependencies = (typeName: string) => {
      if (visited.has(typeName)) return;
      visited.add(typeName);
      allTypes.add(typeName);

      // 获取该类型的 schema
      const schema = this.spec?.components?.schemas?.[typeName];
      if (!schema) return;

      // 收集该类型的所有依赖
      const dependencies = new Set<string>();
      collectReferencedTypes(schema, dependencies);

      // 递归收集依赖的依赖
      for (const dep of dependencies) {
        collectDependencies(dep);
      }
    };

    // 从初始类型开始收集
    for (const typeName of initialTypes) {
      collectDependencies(typeName);
    }

    return allTypes;
  }

  /**
   * 生成方法信息
   */
  private createMethodInfo(segments: string[]): MethodInfo {
    const { naming } = this.config;
    const methodNameBase = segments.join('-');
    const methodName = naming.useCamelCase
      ? toCamelCase(methodNameBase)
      : methodNameBase;

    const typeNameBase = naming.usePascalCase
      ? toPascalCase(methodNameBase)
      : methodNameBase;

    const requestType = `${typeNameBase}${naming.requestTypeSuffix}`;
    const responseType = `${typeNameBase}${naming.responseTypeSuffix}`;

    return { methodName, requestType, responseType };
  }

  /**
   * 生成 API 方法
   */
  private generateAPIMethod(
    path: string,
    method: string,
    operation: any,
    methodInfo?: MethodInfo,
    resolvedRequestType = 'void',
    resolvedResponseType = 'undefined',
  ): string {
    const { methodName } = methodInfo || this.resolveMethodInfo(path, method);
    const finalMethodName = `${methodName}${this.config.naming.methodNameSuffix}`;

    const paramType = resolvedRequestType;
    const responseType = resolvedResponseType;
    const paramsOptional =
      paramType !== 'void' && this.isAllRequestFieldsOptional(operation);

    // 根据 HTTP 方法生成不同的调用方式
    let httpCall: string;
    const upperMethod = method.toUpperCase();
    const lowerMethod = method.toLowerCase();
    const bodySchema = this.getRequestBodySchema(operation);
    const pathParams = this.getRequestParametersByLocation(operation, 'path');
    const queryParams = this.getRequestParametersByLocation(operation, 'query');
    const requestParamNames = this.buildRequestParamNames(operation);
    const urlExpression = this.buildUrlExpression(
      path,
      pathParams,
      undefined,
      requestParamNames,
    );
    const hasBody = Boolean(bodySchema);
    const hasPathParams = pathParams.length > 0;
    const hasQueryParams = queryParams.length > 0;
    const queryConfig = this.buildQueryConfigExpression(
      queryParams,
      hasPathParams ? 'params' : undefined,
      false,
      undefined,
      requestParamNames,
    );

    if (upperMethod === 'GET' || upperMethod === 'DELETE') {
      // GET 和 DELETE 请求，参数通过 params 传递
      httpCall =
        paramType === 'void' || !hasQueryParams
          ? `return ${this.config.httpHandler}.${lowerMethod}<${responseType}>(${urlExpression});`
          : `return ${this.config.httpHandler}.${lowerMethod}<${responseType}>(${urlExpression}, ${queryConfig});`;
    } else if (upperMethod === 'POST' || upperMethod === 'PUT') {
      if (paramType === 'void') {
        httpCall = `return ${this.config.httpHandler}.${lowerMethod}<${responseType}>(${urlExpression});`;
      } else if (!hasBody) {
        httpCall = hasQueryParams
          ? `return ${this.config.httpHandler}.${lowerMethod}<${responseType}>(${urlExpression}, undefined, ${queryConfig});`
          : `return ${this.config.httpHandler}.${lowerMethod}<${responseType}>(${urlExpression});`;
      } else if (!hasPathParams && !hasQueryParams) {
        httpCall = `return ${this.config.httpHandler}.${lowerMethod}<${responseType}>(${urlExpression}, params);`;
      } else {
        const bodyParamsExpression = paramsOptional ? 'params ?? {}' : 'params';
        const requestParams = [...pathParams, ...queryParams];
        const localNames = this.buildLocalParamNames(
          requestParams,
          requestParamNames,
        );
        const destructuredNames = requestParams
          .map((param) =>
            this.buildDestructuredParamExpression(
              localNames.get(this.buildRequestParamKey(param)) || param.name,
              requestParamNames.get(this.buildRequestParamKey(param)) ||
                param.name,
            ),
          )
          .join(', ');
        const bodyUrlExpression = this.buildUrlExpression(
          path,
          pathParams,
          localNames,
          requestParamNames,
        );
        const requestConfig = hasQueryParams
          ? `, ${this.buildQueryConfigExpression(
              queryParams,
              undefined,
              true,
              localNames,
              requestParamNames,
            )}`
          : '';
        httpCall = `const { ${destructuredNames}, ...bodyParams } = ${bodyParamsExpression};
    return ${this.config.httpHandler}.${lowerMethod}<${responseType}>(${bodyUrlExpression}, bodyParams${requestConfig});`;
      }
    } else {
      // 其他 HTTP 方法使用通用的 request 方法
      if (paramType === 'void') {
        httpCall = `return ${this.config.httpHandler}.request<${responseType}>(${urlExpression}, { method: '${upperMethod}' });`;
      } else if (!hasBody) {
        const requestConfig = this.buildRequestConfigExpression(upperMethod, {
          queryParams,
          requestParamNames,
          querySource: hasPathParams ? 'params' : undefined,
        });
        httpCall = `return ${this.config.httpHandler}.request<${responseType}>(${urlExpression}, ${requestConfig});`;
      } else if (!hasPathParams && !hasQueryParams) {
        httpCall = `return ${this.config.httpHandler}.request<${responseType}>(${urlExpression}, { method: '${upperMethod}', data: params });`;
      } else {
        const bodyParamsExpression = paramsOptional ? 'params ?? {}' : 'params';
        const requestParams = [...pathParams, ...queryParams];
        const localNames = this.buildLocalParamNames(
          requestParams,
          requestParamNames,
        );
        const destructuredNames = requestParams
          .map((param) =>
            this.buildDestructuredParamExpression(
              localNames.get(this.buildRequestParamKey(param)) || param.name,
              requestParamNames.get(this.buildRequestParamKey(param)) ||
                param.name,
            ),
          )
          .join(', ');
        const bodyUrlExpression = this.buildUrlExpression(
          path,
          pathParams,
          localNames,
          requestParamNames,
        );
        const requestConfig = this.buildRequestConfigExpression(upperMethod, {
          data: 'bodyParams',
          localNames,
          queryParams,
          requestParamNames,
          shorthand: true,
        });
        httpCall = `const { ${destructuredNames}, ...bodyParams } = ${bodyParamsExpression};
    return ${this.config.httpHandler}.request<${responseType}>(${bodyUrlExpression}, ${requestConfig});`;
      }
    }

    // 生成方法签名
    const paramSignature =
      paramType === 'void'
        ? ''
        : `params${paramsOptional ? '?' : ''}: ${paramType}`;

    return `
  /**
   * ${operation.summary || operation.description || `${upperMethod} ${path}`}
   */
  export async function ${finalMethodName}(${paramSignature}): Promise<${responseType}> {
    ${httpCall}
  }`;
  }

  private generateLegacyTypeAliases(emittedTypes: Set<string>): string[] {
    const aliasEntries = Object.entries(this.config.legacyTypeAliases || {});
    if (aliasEntries.length === 0) {
      return [];
    }

    const schemaNames = new Set(
      Object.keys(this.spec?.components?.schemas || {}),
    );
    const updateTime = formatCurrentTime(this.config.dateTimeOptions);
    const aliases: string[] = [];

    for (const [aliasName, targetName] of aliasEntries) {
      if (
        aliasName === targetName ||
        schemaNames.has(aliasName) ||
        emittedTypes.has(aliasName) ||
        !emittedTypes.has(targetName)
      ) {
        continue;
      }

      const comment = TEMPLATES.typeComment(
        aliasName,
        'legacy compatibility alias',
        updateTime,
      );
      aliases.push(`${comment}
export type ${aliasName} = ${targetName}`);
      emittedTypes.add(aliasName);
    }

    return aliases;
  }

  /**
   * 从 schema 生成属性
   */
  private generatePropertiesFromSchema(
    schema: any,
    ownerTypeName?: string,
    context: PropertyGenerationContext = {},
  ): string[] {
    const properties: string[] = [];

    // 处理 $ref 引用 - 这种情况应该在上层处理，这里不应该出现
    if (schema.$ref) {
      // 如果是引用类型，应该在调用方直接使用引用类型
      console.warn('引用类型应该在上层处理，不应该在这里出现');
      return [];
    }

    // 处理 allOf, oneOf, anyOf
    if (schema.allOf) {
      return [`  /* 组合类型 */\n  data: ${mapSchemaToType(schema)}`];
    }

    if (schema.oneOf || schema.anyOf) {
      return [`  /* 联合类型 */\n  data: ${mapSchemaToType(schema)}`];
    }

    if (this.hasSchemaType(schema, 'object') && schema.properties) {
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        const prop = this.applySchemaPropertyOverride(
          ownerTypeName,
          propName,
          propSchema as any,
        );
        const required = this.isPropertyRequired(schema, propName, context)
          ? ''
          : '?';

        // 使用改进的类型映射
        const type = mapSchemaToType(prop);

        const description = prop.description
          ? `  /* ${prop.description} */`
          : '';
        properties.push(
          [description, `  ${this.buildTypeProperty(propName, required, type)}`]
            .filter(Boolean)
            .join('\n'),
        );
      }
    } else if (this.hasSchemaType(schema, 'array')) {
      // 处理数组类型
      return [`  /* 数组数据 */\n  items: ${mapSchemaToType(schema)}`];
    } else if (schema.enum) {
      // 处理枚举类型
      const enumType = mapSchemaToType(schema);
      return [`  /* 枚举值 */\n  value: ${enumType}`];
    }

    return properties;
  }

  /**
   * 生成请求类型
   */
  private generateRequestType(typeName: string, operation: any): null | string {
    const properties: string[] = [];
    let bodyRefType: null | string = null;
    const requestParamNames = this.buildRequestParamNames(operation);

    // 处理查询参数
    for (const param of this.getRequestParameters(operation)) {
      const required = param.required ? '' : '?';
      const type = this.mapRequestParameterSchemaToType(
        param.schema || { type: 'string' },
      );
      const requestParamName =
        requestParamNames.get(this.buildRequestParamKey(param)) || param.name;
      const description = param.description
        ? `  /* ${param.description} */`
        : '';
      properties.push(
        [
          description,
          `  ${this.buildTypeProperty(requestParamName, required, type)}`,
        ]
          .filter(Boolean)
          .join('\n'),
      );
    }

    const schema = this.getRequestBodySchema(operation);
    if (schema) {
      if (schema.$ref) {
        bodyRefType = resolveRef(schema.$ref) as string;
        if (properties.length === 0) {
          const updateTime = formatCurrentTime(this.config.dateTimeOptions);
          const comment = TEMPLATES.typeComment(
            typeName,
            operation.tags?.[0] || '',
            updateTime,
          );
          return `${comment}
export type ${typeName} = ${bodyRefType}`;
        }
      } else {
        const bodyProps = this.generatePropertiesFromSchema(schema);
        if (bodyProps.length > 0) {
          properties.push(...bodyProps);
        } else if (properties.length === 0) {
          const updateTime = formatCurrentTime(this.config.dateTimeOptions);
          const comment = TEMPLATES.typeComment(
            typeName,
            operation.tags?.[0] || '',
            updateTime,
          );
          return `${comment}
export type ${typeName} = Record<string, any>`;
        }
      }
    }

    if (properties.length === 0) return null;

    const updateTime = formatCurrentTime(this.config.dateTimeOptions);
    const comment = TEMPLATES.typeComment(
      typeName,
      operation.tags?.[0] || '',
      updateTime,
    );

    return `${comment}
export type ${typeName} = {
${properties.join('\n\n')}
}${bodyRefType ? ` & ${bodyRefType}` : ''}`;
  }

  /**
   * 生成响应类型
   */
  private generateResponseType(typeName: string, response: any): null | string {
    const dataSchema = this.getResponseSchema(response);
    if (!dataSchema) {
      return `export type ${typeName} = undefined`;
    }

    if (this.hasSchemaType(dataSchema, 'array')) {
      return `export type ${typeName} = ${mapSchemaToType(dataSchema)}`;
    }

    if (
      dataSchema.type &&
      ['boolean', 'integer', 'null', 'number', 'string'].some((type) =>
        this.hasSchemaType(dataSchema, type),
      )
    ) {
      const baseType = mapSchemaToType(dataSchema);
      return `export type ${typeName} = ${baseType}`;
    }

    if (dataSchema.$ref) {
      return `export type ${typeName} = ${mapSchemaToType(dataSchema)}`;
    }

    if (!this.hasSchemaType(dataSchema, 'object') || !dataSchema.properties) {
      const mappedType = mapSchemaToType(dataSchema);
      return `export type ${typeName} = ${mappedType || 'undefined'}`;
    }

    const propertyContext = this.isResponsePageEnvelopeSchema(
      response,
      dataSchema,
    )
      ? ({
          usage: 'response-page-envelope',
        } satisfies PropertyGenerationContext)
      : undefined;
    const properties = this.generatePropertiesFromSchema(
      dataSchema,
      undefined,
      propertyContext,
    );

    if (properties.length === 0) {
      return `export type ${typeName} = undefined`;
    }

    const objectType = this.buildObjectType(dataSchema, properties, {
      separator: '\n\n',
    });
    return `export type ${typeName} = ${this.applySchemaNullable(
      dataSchema,
      objectType,
    )}`;
  }

  /**
   * 生成 schema 类型定义
   */
  private generateSchemaType(typeName: string): null | string {
    if (!this.spec?.components?.schemas?.[typeName]) return null;

    const schema = this.spec.components.schemas[typeName];
    const updateTime = formatCurrentTime(this.config.dateTimeOptions);

    // 处理 allOf 组合类型
    if (schema.allOf) {
      const types = schema.allOf.map((s: any) => {
        if (s.properties) {
          const props = this.generatePropertiesFromSchema(s, typeName);
          return this.buildObjectType(s, props);
        }
        return mapSchemaToType(s);
      });

      const comment = TEMPLATES.typeComment(
        typeName,
        'components.schemas',
        updateTime,
      );
      return `${comment}
export type ${typeName} = ${this.applySchemaNullable(schema, types.join(' & '))}`;
    }

    // 处理 oneOf/anyOf 联合类型
    if (schema.oneOf || schema.anyOf) {
      const schemas = schema.oneOf || schema.anyOf;
      const types = schemas.map((s: any) => {
        if (s.properties) {
          const props = this.generatePropertiesFromSchema(s, typeName);
          return this.buildObjectType(s, props);
        }
        return mapSchemaToType(s);
      });

      const comment = TEMPLATES.typeComment(
        typeName,
        'components.schemas',
        updateTime,
      );
      return `${comment}
export type ${typeName} = ${this.applySchemaNullable(schema, types.join(' | '))}`;
    }

    // 检查是否是基础类型数组
    if (this.hasSchemaType(schema, 'array')) {
      const comment = TEMPLATES.typeComment(
        typeName,
        'components.schemas',
        updateTime,
      );
      return `${comment}
export type ${typeName} = ${mapSchemaToType(schema)}`;
    }

    // 检查是否是枚举类型
    if (schema.enum) {
      const enumType = mapSchemaToType(schema);
      const comment = TEMPLATES.typeComment(
        typeName,
        'components.schemas',
        updateTime,
      );
      return `${comment}
export type ${typeName} = ${enumType}`;
    }

    // 检查是否是基础类型
    if (
      schema.type &&
      ['boolean', 'integer', 'null', 'number', 'string'].some((type) =>
        this.hasSchemaType(schema, type),
      )
    ) {
      const baseType = mapSchemaToType(schema);
      const comment = TEMPLATES.typeComment(
        typeName,
        'components.schemas',
        updateTime,
      );
      return `${comment}
export type ${typeName} = ${baseType}`;
    }

    // 处理对象类型
    const properties = this.generatePropertiesFromSchema(schema, typeName);

    if (properties.length === 0) {
      // 如果没有属性但有 additionalProperties，生成 Record 类型
      if (schema.additionalProperties) {
        const valueType =
          typeof schema.additionalProperties === 'object'
            ? mapSchemaToType(schema.additionalProperties)
            : 'any';

        const comment = TEMPLATES.typeComment(
          typeName,
          'components.schemas',
          updateTime,
        );
        return `${comment}
export type ${typeName} = ${this.applySchemaNullable(
          schema,
          `Record<string, ${valueType}>`,
        )}`;
      }
      return null;
    }

    const comment = TEMPLATES.typeComment(
      typeName,
      'components.schemas',
      updateTime,
    );

    const exactSchemaTypes = new Set([
      'AdminAdRewardRecordDetailDto',
      'UpdateWorkChapterDto',
      'UpdateWorkDto',
    ]);
    const objectType = this.buildObjectType(schema, properties, {
      exact: exactSchemaTypes.has(typeName),
    });
    return `${comment}
export type ${typeName} = ${this.applySchemaNullable(schema, objectType)}`;
  }

  private getModuleDirectory(
    path: string,
    fileName: string,
    namingSegments = this.getNamingSegments(path),
  ): string {
    const rawDirectory = this.config.directoryResolver(path);
    const normalizedDirectory = toCamelCase(
      this.normalizePathSegments(rawDirectory).join('-'),
    );
    const normalizedFileName = toCamelCase(fileName);
    const primarySegment = toCamelCase(namingSegments[0] || '');

    if (
      !normalizedDirectory ||
      normalizedDirectory === normalizedFileName ||
      normalizedDirectory === primarySegment
    ) {
      return '';
    }

    return rawDirectory;
  }

  private getModuleFileName(namingSegments: string[]): string {
    return toCamelCase(namingSegments[0] || '') || 'default';
  }

  private getNamingSegments(path: string): string[] {
    const strippedSegments = this.stripExcludedNamingContext(path);
    return strippedSegments.length > 0
      ? strippedSegments
      : this.normalizePathSegments(path);
  }

  /**
   * 获取优先使用的内容 schema
   */
  private getPreferredContentSchema(content?: Record<string, any>): any {
    if (!content) {
      return null;
    }

    if (content['application/json']?.schema) {
      return content['application/json'].schema;
    }

    const firstContent = Object.values(content)[0] as
      | undefined
      | { schema?: any };
    return firstContent?.schema || null;
  }

  /**
   * 获取请求体 schema
   */
  private getRequestBodySchema(operation: any): any {
    return this.getPreferredContentSchema(operation.requestBody?.content);
  }

  /**
   * 获取请求参数
   */
  private getRequestParameters(operation: any): any[] {
    if (!Array.isArray(operation.parameters)) {
      return [];
    }

    return operation.parameters.filter(
      (param: any) => param.in === 'query' || param.in === 'path',
    );
  }

  private getRequestParametersByLocation(
    operation: any,
    location: 'path' | 'query',
  ): any[] {
    if (!Array.isArray(operation.parameters)) {
      return [];
    }

    return operation.parameters.filter((param: any) => param.in === location);
  }

  /**
   * 获取响应 schema
   */
  private getResponseSchema(response: any): any {
    const schema = this.getPreferredContentSchema(response?.content);
    if (!schema) {
      return null;
    }

    return schema.properties?.data || schema;
  }

  /**
   * 获取成功响应定义
   */
  private getSuccessResponse(responses: any): any {
    if (!responses || typeof responses !== 'object') {
      return null;
    }

    for (const [statusCode, response] of Object.entries(responses)) {
      if (/^2\d\d$/.test(statusCode)) {
        return response;
      }
    }

    return responses.default || null;
  }

  /**
   * 检查接口是否需要参数
   */
  private hasRequestParams(operation: any): boolean {
    if (this.getRequestBodySchema(operation)) {
      return true;
    }

    return this.getRequestParameters(operation).length > 0;
  }

  private hasSchemaType(schema: any, type: string): boolean {
    return Array.isArray(schema?.type)
      ? schema.type.includes(type)
      : schema?.type === type;
  }

  /**
   * 判断请求所有字段是否为可选
   * - 若存在任一必填的 query/path 参数，返回 false
   * - 若存在 requestBody：
   *   - 若为 $ref，解析到 components.schemas 判断是否有必填
   *   - 若为对象且无 required，视为全可选
   *   - 若为数组/基础类型/oneOf/anyOf/allOf，视为有必填单字段
   * - 若存在字段且未发现必填，返回 true
   */
  private isAllRequestFieldsOptional(operation: any): boolean {
    let hasAny = false;

    // 检查查询/路径参数
    for (const param of this.getRequestParameters(operation)) {
      hasAny = true;
      if (param.required) {
        return false;
      }
    }

    const bodySchema = this.getRequestBodySchema(operation);
    if (bodySchema) {
      hasAny = true;
      if (!this.isSchemaAllOptional(bodySchema)) {
        return false;
      }
    }

    return hasAny;
  }

  private isBindingIdentifier(name: string): boolean {
    return this.isIdentifier(name) && !RESERVED_BINDING_NAMES.has(name);
  }

  private isIdentifier(name: string): boolean {
    return isValidIdentifier(name);
  }

  private isNullableSchema(schema: any): boolean {
    return isNullableSchema(schema);
  }

  private isPropertyRequired(
    schema: any,
    propName: string,
    context: PropertyGenerationContext,
  ): boolean {
    if (Array.isArray(schema.required) && schema.required.includes(propName)) {
      return true;
    }

    return Boolean(
      context.usage === 'response-page-envelope' &&
      PAGE_ENVELOPE_REQUIRED_PROPERTY_NAMES.has(propName),
    );
  }

  private isResponsePageEnvelopeSchema(
    response: any,
    dataSchema: any,
  ): boolean {
    const responseSchema = this.getPreferredContentSchema(response?.content);
    const envelopeDataSchema = responseSchema?.properties?.data;

    if (!envelopeDataSchema || envelopeDataSchema !== dataSchema) {
      return false;
    }

    if (!this.hasSchemaType(dataSchema, 'object') || !dataSchema.properties) {
      return false;
    }

    return [...PAGE_ENVELOPE_REQUIRED_PROPERTY_NAMES].every((propName) =>
      Object.prototype.hasOwnProperty.call(dataSchema.properties, propName),
    );
  }

  /**
   * 判断一个 schema 在我们生成规则下是否“全可选”
   */
  private isSchemaAllOptional(schema: any): boolean {
    // $ref：解析引用继续判断
    if (schema.$ref) {
      const typeName = resolveRef(schema.$ref) as string;
      const refSchema = this.spec?.components?.schemas?.[typeName];
      if (!refSchema) return false;
      return this.isSchemaAllOptional(refSchema);
    }

    // 组合/联合类型：在 generatePropertiesFromSchema 中会作为单字段 data 输出，属必填
    if (schema.allOf || schema.oneOf || schema.anyOf) {
      return false;
    }

    // 对象：若无 required 列表或为空，则顶层属性均可选
    if (this.hasSchemaType(schema, 'object')) {
      if (!schema.properties) {
        // 无属性即无必填，视为可选
        return true;
      }
      return !(Array.isArray(schema.required) && schema.required.length > 0);
    }

    // 数组/基础类型等：在生成中会作为必填单字段(items/value)输出
    return false;
  }

  private isStringEnumSchema(schema: any): boolean {
    return Boolean(
      schema &&
      (!schema.type || this.hasSchemaType(schema, 'string')) &&
      Array.isArray(schema.enum) &&
      schema.enum.some((item: any) => typeof item === 'string'),
    );
  }

  private mapRequestParameterSchemaToType(schema: any): string {
    if (this.isStringEnumSchema(schema)) {
      return this.applySchemaNullable(schema, 'string');
    }

    return mapSchemaToType(schema);
  }

  private normalizePathSegments(value: string): string[] {
    return value
      .split('/')
      .filter(Boolean)
      .map((segment) => segment.replace(/^\{(.+)\}$/, '$1').replace(/^:/, ''));
  }

  private resolveMethodInfo(
    path: string,
    method: string,
    namingSegments = this.getNamingSegments(path),
    usedMethodNames = new Set<string>(),
    usedTypeNames = new Set<string>(),
  ): MethodInfo {
    const baseSegments =
      namingSegments.length > 0
        ? namingSegments
        : this.normalizePathSegments(path);
    const candidateGroups = [
      baseSegments,
      [...baseSegments, method.toLowerCase()],
    ];

    for (const candidate of candidateGroups) {
      const methodInfo = this.createMethodInfo(candidate);
      if (
        !usedMethodNames.has(methodInfo.methodName) &&
        !usedTypeNames.has(methodInfo.requestType) &&
        !usedTypeNames.has(methodInfo.responseType)
      ) {
        usedMethodNames.add(methodInfo.methodName);
        usedTypeNames.add(methodInfo.requestType);
        usedTypeNames.add(methodInfo.responseType);
        return methodInfo;
      }
    }

    let suffix = 2;
    while (true) {
      const methodInfo = this.createMethodInfo([
        ...baseSegments,
        method.toLowerCase(),
        `${suffix}`,
      ]);
      if (
        !usedMethodNames.has(methodInfo.methodName) &&
        !usedTypeNames.has(methodInfo.requestType) &&
        !usedTypeNames.has(methodInfo.responseType)
      ) {
        usedMethodNames.add(methodInfo.methodName);
        usedTypeNames.add(methodInfo.requestType);
        usedTypeNames.add(methodInfo.responseType);
        return methodInfo;
      }
      suffix += 1;
    }
  }

  private resolveUniqueNames(
    operationContexts: OperationContext[],
  ): OperationContext[] {
    const usedMethodNames = new Set<string>();
    const usedTypeNames = new Set<string>();

    return operationContexts.map((context) => ({
      ...context,
      methodInfo: this.resolveMethodInfo(
        context.path,
        context.method,
        context.namingSegments,
        usedMethodNames,
        usedTypeNames,
      ),
    }));
  }

  private stripExcludedNamingContext(path: string): string[] {
    const pathSegments = this.normalizePathSegments(path);
    const excludedContexts = [
      ...this.config.naming.excludedUrlContexts,
    ].toSorted((left, right) => right.length - left.length);

    for (const context of excludedContexts) {
      const contextSegments = this.normalizePathSegments(context);
      if (
        contextSegments.length === 0 ||
        contextSegments.length > pathSegments.length
      ) {
        continue;
      }

      const matched = contextSegments.every(
        (segment, index) => segment === pathSegments[index],
      );
      if (matched) {
        return pathSegments.slice(contextSegments.length);
      }
    }

    return pathSegments;
  }
}
