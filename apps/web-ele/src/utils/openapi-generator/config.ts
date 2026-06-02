import path from 'node:path';
import process from 'node:process';

/**
 * 使用dotenv加载开发环境变量
 */
import dotenv from 'dotenv';

// 加载.env.development文件
const envPath = path.resolve(process.cwd(), '.env.development');
const result = dotenv.config({
  path: envPath,
});

// 检查加载结果
if (result.error) {
  console.error(`❌ 无法加载.env.development文件: ${result.error.message}`);
  console.error(`📁 尝试加载的路径: ${envPath}`);
  console.error(`💡 当前工作目录: ${process.cwd()}`);
  throw result.error;
}

/**
 * 命名配置
 */
export interface NamingConfig {
  /** 方法名生成策略：使用路径的几个上下文段 */
  methodNameSegments: number;
  /** 命名时需要排除的接口 URL 上下文 */
  excludedUrlContexts: string[];
  /** 方法名后缀 */
  methodNameSuffix: string;
  /** 请求类型后缀 */
  requestTypeSuffix: string;
  /** 响应类型后缀 */
  responseTypeSuffix: string;
  /** 是否使用驼峰命名 */
  useCamelCase: boolean;
  /** 是否使用帕斯卡命名（类型） */
  usePascalCase: boolean;
}

// 移除了格式化配置接口

/**
 * OpenAPI 生成器配置
 */
export interface OpenAPIGeneratorConfig {
  /** OpenAPI 规范 URL */
  openApiUrl: string;
  /** 获取 OpenAPI 规范的请求方式 */
  openApiMethod: 'GET' | 'POST';
  /** 输出目录 */
  outputDir: string;
  /** 类型定义输出目录 */
  typesOutputDir: string;
  /** 类型文件目录名 */
  typesDirName: string;
  /** 请求处理器 */
  httpHandler: string;
  /** 请求处理器导入路径 */
  httpHandlerImport: string;
  /** 命名配置 */
  naming: NamingConfig;
  /** 日期时间格式化选项 */
  dateTimeOptions: Intl.DateTimeFormatOptions;
  proxyConfig: {
    data: Record<string, any>;
    headers: Record<string, string>;
  };
  /** 文件夹解析器，如需额外创建子目录可自定义 */
  directoryResolver: (path: string) => string;
  /** 生成前是否清理之前的文件 */
  cleanBeforeGenerate: boolean;
}

/**
 * 默认配置
 */
export const defaultConfig: OpenAPIGeneratorConfig = {
  openApiUrl:
    process.env.OPENAPI_GENERATOR_URL ||
    `https://api.apifox.com/v1/projects/${process.env.VITE_APIFOX_PROJECT_ID}/export-openapi?locale=zh-CN`,
  openApiMethod:
    process.env.OPENAPI_GENERATOR_METHOD?.toUpperCase() === 'GET'
      ? 'GET'
      : 'POST',
  proxyConfig: {
    headers: {
      Authorization: `Bearer ${process.env.VITE_APIFOX_API_KEY}`,
      'X-Apifox-Api-Version': '2024-03-28',
    },
    data: {
      scope: {
        type: 'ALL',
      },
    },
  },
  outputDir: './src/api/core',
  typesOutputDir: './src/api/types',
  typesDirName: 'types',
  httpHandler: 'requestClient',
  httpHandlerImport: '#/api/request',
  naming: {
    methodNameSegments: 2,
    excludedUrlContexts: ['api/admin'],
    methodNameSuffix: 'Api',
    requestTypeSuffix: 'Request',
    responseTypeSuffix: 'Response',
    useCamelCase: true,
    usePascalCase: true,
  },
  dateTimeOptions: {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  },
  // 默认不额外创建子目录，按首个上下文直接生成文件
  directoryResolver: () => '',
  // 默认不清理之前的文件
  cleanBeforeGenerate: true,
};

export function mergeOpenAPIGeneratorConfig(
  config: Partial<OpenAPIGeneratorConfig> = {},
): OpenAPIGeneratorConfig {
  return {
    ...defaultConfig,
    ...config,
    naming: {
      ...defaultConfig.naming,
      ...config.naming,
    },
    dateTimeOptions: {
      ...defaultConfig.dateTimeOptions,
      ...config.dateTimeOptions,
    },
    proxyConfig: {
      data: {
        ...defaultConfig.proxyConfig.data,
        ...config.proxyConfig?.data,
      },
      headers: {
        ...defaultConfig.proxyConfig.headers,
        ...config.proxyConfig?.headers,
      },
    },
  };
}

export { TYPE_MAPPING } from './type-mapping';

/**
 * 模板配置
 */
export const TEMPLATES = {
  /** API 方法注释模板 */
  apiMethodComment: (
    tag: string,
    summary: string,
    method: string,
    path: string,
    updateTime: string,
  ) => `/**
 *  @标签 ${tag}/${summary}
 *  @方式 ${method}
 *  @地址 ${path}
 *  @更新时间 ${updateTime}
 */`,

  /** 类型定义注释模板 */
  typeComment: (typeName: string, source: string, updateTime: string) => `/**
 *  类型定义 [${typeName}]
 *  @来源 ${source}
 *  @更新时间 ${updateTime}
 */`,

  /** 接口注释模板 */
  interfaceComment: (
    summary: string,
    tag: string,
    method: string,
    path: string,
    updateTime: string,
  ) => `/**
 *  接口 [${summary}]
 *  @标签 ${tag}/${summary}
 *  @方式 ${method}
 *  @地址 ${path}
 *  @更新时间 ${updateTime}
 */`,

  /** 索引签名模板 */
  indexSignature: '  /** 任意合法数值 */\n  [property: string]: any',
} as const;
