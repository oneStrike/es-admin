import type { OpenAPIGeneratorConfig } from './config';
import type { GeneratedFile } from './types';

import path from 'node:path';
import process from 'node:process';

import { defaultConfig, mergeOpenAPIGeneratorConfig } from './config';
import { clearDirectory, ensureDirectory, writeFile } from './file-utils';
import { OpenAPIGenerator } from './generator';

/**
 * 生成 API 代码的主函数
 */
export async function generateAPIFromOpenAPI(
  openApiUrl: string,
  outputDir: string,
  config?: Partial<OpenAPIGeneratorConfig>,
): Promise<GeneratedFile[]> {
  const generator = new OpenAPIGenerator({
    ...mergeOpenAPIGeneratorConfig(config),
    openApiUrl,
    outputDir,
  });

  try {
    // 获取OpenAPI文档
    console.warn('正在获取OpenAPI文档...');
    await generator.fetchOpenAPISpec();

    // 生成代码
    console.warn('正在生成API代码...');
    const files = generator.generateAPICode();

    return files;
  } catch (error) {
    console.error('生成API代码失败:', error);
    throw error;
  }
}

/**
 * 生成 API 代码的完整流程
 */
export async function generateAPI(
  config: Partial<OpenAPIGeneratorConfig> = {},
): Promise<void> {
  const finalConfig = mergeOpenAPIGeneratorConfig({
    ...defaultConfig,
    ...config,
  });
  const outputDir = path.resolve(process.cwd(), finalConfig.outputDir);
  const typesDir = finalConfig.typesOutputDir;

  try {
    console.warn('开始生成API代码...');

    // 生成前清理文件
    if (finalConfig.cleanBeforeGenerate) {
      console.warn('正在清理之前的文件...');
      await clearDirectory(outputDir);
      await clearDirectory(typesDir);
    }

    // 确保目录存在
    await ensureDirectory(outputDir);
    await ensureDirectory(typesDir);

    // 生成代码
    const generator = new OpenAPIGenerator(finalConfig);

    // 获取OpenAPI文档
    console.warn('正在获取OpenAPI文档...');
    await generator.fetchOpenAPISpec();

    // 生成代码
    console.warn('正在生成API代码...');
    const originalFiles = generator.generateAPICode();

    // 检查是否有文件名为 index.ts 的冲突
    const hasIndexConflict = originalFiles.some(
      (file) => file.fileName === 'index.ts',
    );

    // 处理文件名冲突并重新生成内容
    const files: (GeneratedFile & { directory: string })[] = [];
    const groupedPaths = generator.groupPathsByModule();

    for (const group of Object.values(groupedPaths)) {
      let finalFileName = `${group.fileName}.ts`;

      // 如果存在 index.ts 冲突，将其重命名为 indexApi.ts
      if (hasIndexConflict && finalFileName === 'index.ts') {
        finalFileName = 'indexApi.ts';
        console.warn(
          `⚠️  检测到文件名冲突，将 ${finalFileName.replace('Api', '')} 重命名为 ${finalFileName}`,
        );
      }

      // 使用正确的最终文件名重新生成内容
      const { apiContent, typesContent } = generator.generateModuleCode(
        group.fileName,
        group.operations,
        finalFileName,
        group.directory,
      );

      files.push({
        fileName: finalFileName,
        content: apiContent,
        types: typesContent,
        directory: group.directory,
      });
    }

    // 写入文件
    for (const file of files) {
      // 构建API文件路径
      const apiFileDir = file.directory
        ? path.join(outputDir, file.directory)
        : outputDir;
      const apiFilePath = path.join(apiFileDir, file.fileName);

      // 构建类型文件路径
      const typeFileDir = file.directory
        ? path.join(typesDir, file.directory)
        : typesDir;
      const typeFileName = file.fileName.replace('.ts', '.d.ts');
      const typeFilePath = path.join(typeFileDir, typeFileName);

      // 确保目录存在
      await ensureDirectory(apiFileDir);

      // 写入API文件
      await writeFile(apiFilePath, file.content);

      // 写入类型文件
      if (file.types) {
        await ensureDirectory(typeFileDir);
        await writeFile(typeFilePath, file.types);
      }
    }

    // 生成索引文件，排除与索引文件同名的API文件
    const exportEntries = files
      .filter((file) => file.fileName !== 'index.ts')
      .flatMap((file) => {
        const filePath = file.directory
          ? `${file.directory}/${file.fileName.replace('.ts', '')}`
          : file.fileName.replace('.ts', '');
        const exportNames = [
          ...file.content.matchAll(/export async function (\w+)\(/g),
        ]
          .map((match) => match[1])
          .filter((name): name is string => Boolean(name));
        return exportNames.map((name) => ({ filePath, name }));
      });

    const exportNameCount = new Map<string, number>();
    for (const entry of exportEntries) {
      exportNameCount.set(
        entry.name,
        (exportNameCount.get(entry.name) || 0) + 1,
      );
    }

    const indexContent = `${exportEntries
      .filter((entry) => exportNameCount.get(entry.name) === 1)
      .map((entry) => `export { ${entry.name} } from './${entry.filePath}'`)
      .join('\n')}\n`;

    {
      const indexPath = path.join(outputDir, 'index.ts');
      await writeFile(indexPath, indexContent);
    }

    // 生成类型索引文件，汇总所有类型导出
    const typeExportFiles = files
      .filter((file) => file.types) // 只包含有类型定义的文件
      .map((file) => {
        const typeFilePath = file.directory
          ? `${file.directory}/${file.fileName.replace('.ts', '.d')}`
          : file.fileName.replace('.ts', '.d');
        return typeFilePath;
      });

    const typeIndexContent = `${typeExportFiles
      .map((filePath) => `export * from './${filePath}'`)
      .join('\n')}\n`;

    {
      const typeIndexPath = path.join(typesDir, 'index.d.ts');
      await writeFile(typeIndexPath, typeIndexContent);
    }

    console.warn(`✅ API代码生成完成！共生成 ${files.length} 个模块`);
  } catch (error) {
    console.error('❌ API代码生成失败:', error);
    throw error;
  }
}

// 如果直接运行此脚本
if (process.argv[1] && process.argv[1].endsWith('index.ts')) {
  // 使用立即执行函数确保异步操作正确处理
  (async () => {
    try {
      await generateAPI();
      console.warn('🎉 正在运行eslint和prettier！请稍等...');
      // 任务完成后，让Node.js事件循环自然结束
    } catch (error) {
      console.error('❌ 任务执行失败:', error);
      process.exitCode = 1;
      throw error;
    }
  })();
}
