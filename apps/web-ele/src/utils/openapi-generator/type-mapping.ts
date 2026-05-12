/**
 * 类型映射配置
 */
export const TYPE_MAPPING = {
  // 基础类型
  array: 'any[]',
  boolean: 'boolean',
  integer: 'number',
  number: 'number',
  object: 'Record<string, any>',
  string: 'string',
  null: 'null',

  // 字符串格式类型
  'string:date': 'string',
  'string:date-time': 'string',
  'string:email': 'string',
  'string:uri': 'string',
  'string:uuid': 'string',
  'string:binary': 'File | Blob',
  'string:byte': 'string',
  'string:password': 'string',

  // 数字格式类型
  'number:float': 'number',
  'number:double': 'number',
  'integer:int32': 'number',
  'integer:int64': 'number',

  // 默认类型
  default: 'any',
} as const;
