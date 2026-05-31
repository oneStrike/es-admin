import type { OpenAPISpec } from './types';

import assert from 'node:assert/strict';
import process from 'node:process';

import { OpenAPIGenerator } from './generator';

interface GeneratedModule {
  apiContent: string;
  typesContent: string;
}

interface TestCase {
  name: string;
  run: () => void;
}

function createGenerator(spec: OpenAPISpec): OpenAPIGenerator {
  const generator = new OpenAPIGenerator();
  (generator as unknown as { spec: OpenAPISpec }).spec = spec;
  return generator;
}

function generateModule(
  spec: OpenAPISpec,
  moduleName: string,
): GeneratedModule {
  const generator = createGenerator(spec);
  const groupedPaths = generator.groupPathsByModule();
  const group = groupedPaths[moduleName];

  assert.ok(group, `expected module ${moduleName} to be generated`);

  return generator.generateModuleCode(
    group.fileName,
    group.operations,
    `${group.fileName}.ts`,
    group.directory,
  );
}

const baseInfo = {
  title: 'OpenAPI Generator Fixture',
  version: '1.0.0',
};

const tests: TestCase[] = [
  {
    name: 'renders nullable refs and arrays from schema contracts',
    run() {
      const spec: OpenAPISpec = {
        openapi: '3.0.0',
        info: baseInfo,
        paths: {
          '/api/admin/check-in/summary': {
            get: {
              tags: ['签到'],
              summary: '签到摘要',
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: { $ref: '#/components/schemas/CheckInSummary' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            CheckInRewardItem: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
              },
              required: ['id'],
            },
            CheckInSummary: {
              type: 'object',
              properties: {
                latestRecord: {
                  $ref: '#/components/schemas/CheckInRewardItem',
                  nullable: true,
                },
                rewardItems: {
                  type: 'array',
                  nullable: true,
                  items: { $ref: '#/components/schemas/CheckInRewardItem' },
                },
                unionItems: {
                  type: 'array',
                  nullable: true,
                  items: {
                    oneOf: [
                      { $ref: '#/components/schemas/CheckInRewardItem' },
                      { type: 'string' },
                    ],
                  },
                },
                openApi31Items: {
                  type: ['array', 'null'],
                  items: { $ref: '#/components/schemas/CheckInRewardItem' },
                },
              },
              required: ['latestRecord'],
            },
            NullableRewardList: {
              type: 'array',
              nullable: true,
              items: { $ref: '#/components/schemas/CheckInRewardItem' },
            },
            OpenApi31NullableRewardList: {
              type: ['array', 'null'],
              items: { $ref: '#/components/schemas/CheckInRewardItem' },
            },
          },
        },
      };

      const generator = createGenerator(spec);

      const nullableListType = (
        generator as unknown as { generateSchemaType: (typeName: string) => string }
      ).generateSchemaType('NullableRewardList');
      assert.match(
        nullableListType,
        /export type NullableRewardList = CheckInRewardItem\[\] \| null/,
      );

      const openApi31NullableListType = (
        generator as unknown as { generateSchemaType: (typeName: string) => string }
      ).generateSchemaType('OpenApi31NullableRewardList');
      assert.match(
        openApi31NullableListType,
        /export type OpenApi31NullableRewardList = CheckInRewardItem\[\] \| null/,
      );

      const { typesContent } = generateModule(spec, 'checkIn');

      assert.match(typesContent, /latestRecord: CheckInRewardItem \| null/);
      assert.match(typesContent, /rewardItems\?: CheckInRewardItem\[\] \| null/);
      assert.match(
        typesContent,
        /unionItems\?: \(CheckInRewardItem \| string\)\[\] \| null/,
      );
      assert.match(
        typesContent,
        /openApi31Items\?: CheckInRewardItem\[\] \| null/,
      );
    },
  },
];

function runValidation(): void {
  for (const test of tests) {
    try {
      test.run();
      console.log(`PASS ${test.name}`);
    } catch (error) {
      console.error(`FAIL ${test.name}`);
      throw error;
    }
  }
}

try {
  runValidation();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
