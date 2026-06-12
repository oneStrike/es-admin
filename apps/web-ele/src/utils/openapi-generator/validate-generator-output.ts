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
                lastSettlement: {
                  nullable: true,
                  allOf: [
                    { $ref: '#/components/schemas/CheckInRewardSettlement' },
                  ],
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
                maybeOwner: {
                  anyOf: [
                    { type: 'null' },
                    { $ref: '#/components/schemas/CheckInOwner' },
                  ],
                },
                onlyNullAnyOf: {
                  anyOf: [{ type: 'null' }],
                },
                status: {
                  type: 'string',
                  enum: ['OPEN', null],
                },
              },
              required: ['latestRecord'],
            },
            CheckInRewardSettlement: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
              },
              required: ['id'],
            },
            CheckInOwner: {
              type: 'object',
              properties: {
                nickname: { type: 'string' },
              },
              required: ['nickname'],
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
            NullableAllOfRewardSettlement: {
              nullable: true,
              allOf: [{ $ref: '#/components/schemas/CheckInRewardSettlement' }],
            },
            OpenApi31NullOnly: {
              type: ['null'],
            },
            NullOnlyEnum: {
              enum: [null],
            },
          },
        },
      };

      const generator = createGenerator(spec);

      const nullableListType = (
        generator as unknown as {
          generateSchemaType: (typeName: string) => string;
        }
      ).generateSchemaType('NullableRewardList');
      assert.match(
        nullableListType,
        /export type NullableRewardList = CheckInRewardItem\[\] \| null/,
      );

      const openApi31NullableListType = (
        generator as unknown as {
          generateSchemaType: (typeName: string) => string;
        }
      ).generateSchemaType('OpenApi31NullableRewardList');
      assert.match(
        openApi31NullableListType,
        /export type OpenApi31NullableRewardList = CheckInRewardItem\[\] \| null/,
      );

      const nullableAllOfType = (
        generator as unknown as {
          generateSchemaType: (typeName: string) => string;
        }
      ).generateSchemaType('NullableAllOfRewardSettlement');
      assert.match(
        nullableAllOfType,
        /export type NullableAllOfRewardSettlement = CheckInRewardSettlement \| null/,
      );

      const openApi31NullOnlyType = (
        generator as unknown as {
          generateSchemaType: (typeName: string) => string;
        }
      ).generateSchemaType('OpenApi31NullOnly');
      assert.match(
        openApi31NullOnlyType,
        /export type OpenApi31NullOnly = null/,
      );

      const nullOnlyEnumType = (
        generator as unknown as {
          generateSchemaType: (typeName: string) => string;
        }
      ).generateSchemaType('NullOnlyEnum');
      assert.match(nullOnlyEnumType, /export type NullOnlyEnum = null/);

      const { typesContent } = generateModule(spec, 'checkIn');

      assert.match(typesContent, /latestRecord\?: CheckInRewardItem \| null/);
      assert.match(
        typesContent,
        /lastSettlement\?: CheckInRewardSettlement \| null/,
      );
      assert.match(
        typesContent,
        /rewardItems\?: CheckInRewardItem\[\] \| null/,
      );
      assert.match(
        typesContent,
        /unionItems\?: \(CheckInRewardItem \| string\)\[\] \| null/,
      );
      assert.match(
        typesContent,
        /openApi31Items\?: CheckInRewardItem\[\] \| null/,
      );
      assert.match(typesContent, /maybeOwner\?: CheckInOwner \| null/);
      assert.match(typesContent, /onlyNullAnyOf\?: null/);
      assert.match(typesContent, /status\?: 'OPEN' \| null/);
    },
  },
  {
    name: 'emits transitive component dependencies referenced by generated DTOs',
    run() {
      const spec: OpenAPISpec = {
        openapi: '3.0.0',
        info: baseInfo,
        paths: {
          '/api/admin/task/definitions': {
            get: {
              tags: ['任务'],
              summary: '任务列表',
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: {
                            $ref: '#/components/schemas/TaskDefinition',
                          },
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
            TaskDefinition: {
              type: 'object',
              properties: {
                rewardItems: {
                  type: 'array',
                  nullable: true,
                  items: { $ref: '#/components/schemas/GrowthRewardItemDto' },
                },
                metadata: {
                  type: 'object',
                  additionalProperties: {
                    $ref: '#/components/schemas/TaskRewardMetadataDto',
                  },
                },
                settlement: {
                  allOf: [
                    { $ref: '#/components/schemas/TaskRewardSettlementDto' },
                  ],
                },
                claim: {
                  anyOf: [
                    { $ref: '#/components/schemas/TaskRewardClaimDto' },
                    { type: 'null' },
                  ],
                },
              },
            },
            GrowthRewardItemDto: {
              type: 'object',
              properties: {
                assetType: { type: 'integer' },
                assetKey: { type: 'string' },
                amount: { type: 'integer' },
              },
              required: ['assetType', 'amount'],
            },
            TaskRewardMetadataDto: {
              type: 'object',
              properties: {
                source: { type: 'string' },
              },
            },
            TaskRewardSettlementDto: {
              type: 'object',
              properties: {
                status: { type: 'integer' },
              },
            },
            TaskRewardClaimDto: {
              type: 'object',
              properties: {
                claimNo: { type: 'string' },
              },
            },
          },
        },
      };

      const { typesContent } = generateModule(spec, 'task');

      assert.match(
        typesContent,
        /rewardItems\?: GrowthRewardItemDto\[\] \| null/,
      );
      assert.match(typesContent, /export type GrowthRewardItemDto = \{/);
      assert.match(typesContent, /assetType: number/);
      assert.match(typesContent, /amount: number/);
      assert.match(
        typesContent,
        /metadata\?: Record<string, TaskRewardMetadataDto>/,
      );
      assert.match(typesContent, /settlement\?: TaskRewardSettlementDto/);
      assert.match(typesContent, /claim\?: TaskRewardClaimDto \| null/);
      assert.match(typesContent, /export type TaskRewardMetadataDto = \{/);
      assert.match(typesContent, /export type TaskRewardSettlementDto = \{/);
      assert.match(typesContent, /export type TaskRewardClaimDto = \{/);
    },
  },
  {
    name: 'emits gated legacy aliases only for generated target types',
    run() {
      const aliasSpec: OpenAPISpec = {
        openapi: '3.0.0',
        info: baseInfo,
        paths: {
          '/api/admin/forum/moderator-lifecycle-log': {
            get: {
              tags: ['论坛'],
              summary: '版主生命周期日志',
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: {
                            type: 'object',
                            properties: {
                              list: {
                                type: 'array',
                                items: {
                                  $ref: '#/components/schemas/BaseForumModeratorLifecycleLogDto',
                                },
                              },
                            },
                          },
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
            BaseForumModeratorLifecycleLogDto: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                eventType: { type: 'integer' },
              },
              required: ['id', 'eventType'],
            },
          },
        },
      };

      const { typesContent: forumTypesContent } = generateModule(
        aliasSpec,
        'forum',
      );
      assert.match(
        forumTypesContent,
        /export type BaseForumModeratorLifecycleLogDto = \{/,
      );
      assert.match(
        forumTypesContent,
        /export type ForumModeratorLifecycleLogDto = BaseForumModeratorLifecycleLogDto/,
      );

      const shadowSpec: OpenAPISpec = {
        openapi: '3.0.0',
        info: baseInfo,
        paths: {
          '/api/admin/legacy-shadow/detail': {
            get: {
              tags: ['兼容'],
              summary: '真实类型同名时不覆盖',
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: {
                            $ref: '#/components/schemas/ForumModeratorLifecycleLogDto',
                          },
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
            BaseForumModeratorLifecycleLogDto: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                eventType: { type: 'integer' },
              },
              required: ['id', 'eventType'],
            },
            ForumModeratorLifecycleLogDto: {
              type: 'object',
              properties: {
                realName: { type: 'string' },
              },
            },
          },
        },
      };

      const { typesContent: legacyShadowTypesContent } = generateModule(
        shadowSpec,
        'legacyShadow',
      );
      assert.match(
        legacyShadowTypesContent,
        /export type ForumModeratorLifecycleLogDto = \{/,
      );
      assert.doesNotMatch(
        legacyShadowTypesContent,
        /export type ForumModeratorLifecycleLogDto = BaseForumModeratorLifecycleLogDto/,
      );
    },
  },
  {
    name: 'applies confirmed backend contract overrides to stale OpenAPI schemas',
    run() {
      const nullableWorkflowFacts = {
        allOf: [{ $ref: '#/components/schemas/WorkflowErrorFactsDto' }],
      };
      const nullableSettlement = {
        allOf: [
          { $ref: '#/components/schemas/CheckInRewardSettlementSummaryDto' },
        ],
      };
      const nullableExperienceUser = {
        allOf: [{ $ref: '#/components/schemas/UserExperienceRecordUserDto' }],
      };
      const spec: OpenAPISpec = {
        openapi: '3.0.0',
        info: baseInfo,
        paths: {
          '/api/admin/workflow/contract': {
            get: {
              tags: ['工作流'],
              summary: '工作流契约',
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: {
                            type: 'object',
                            properties: {
                              attempt: {
                                $ref: '#/components/schemas/WorkflowAttemptDto',
                              },
                              item: {
                                $ref: '#/components/schemas/WorkflowItemDto',
                              },
                              job: {
                                $ref: '#/components/schemas/WorkflowJobDto',
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/api/admin/content/contract': {
            get: {
              tags: ['内容'],
              summary: '内容契约',
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: {
                            type: 'object',
                            properties: {
                              asset: {
                                $ref: '#/components/schemas/BaseEmojiAssetDto',
                              },
                              createAsset: {
                                $ref: '#/components/schemas/CreateEmojiAssetDto',
                              },
                              outputAsset: {
                                $ref: '#/components/schemas/EmojiAssetOutputDto',
                              },
                              updateAsset: {
                                $ref: '#/components/schemas/UpdateEmojiAssetDto',
                              },
                              importItem: {
                                $ref: '#/components/schemas/ContentImportItemDto',
                              },
                              matched: {
                                $ref: '#/components/schemas/ComicArchiveMatchedItemDto',
                              },
                              result: {
                                $ref: '#/components/schemas/ComicArchiveResultItemDto',
                              },
                              task: {
                                $ref: '#/components/schemas/ComicArchiveTaskResponseDto',
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/api/admin/check-in/contract': {
            get: {
              tags: ['签到'],
              summary: '签到契约',
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: {
                            type: 'object',
                            properties: {
                              calendarDay: {
                                $ref: '#/components/schemas/CheckInCalendarDayDto',
                              },
                              grant: {
                                $ref: '#/components/schemas/CheckInGrantItemDto',
                              },
                              reconciliation: {
                                $ref: '#/components/schemas/CheckInReconciliationPageItemDto',
                              },
                              signedUser: {
                                $ref: '#/components/schemas/AdminCheckInSignedUserPageItemDto',
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/api/admin/growth/contract': {
            get: {
              tags: ['成长'],
              summary: '成长契约',
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: {
                            type: 'object',
                            properties: {
                              detail: {
                                $ref: '#/components/schemas/UserExperienceRecordDetailDto',
                              },
                              record: {
                                $ref: '#/components/schemas/UserExperienceRecordDto',
                              },
                            },
                          },
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
            WorkflowAttemptDto: {
              type: 'object',
              properties: { error: nullableWorkflowFacts },
              required: ['error'],
            },
            WorkflowItemDto: {
              type: 'object',
              properties: { lastError: nullableWorkflowFacts },
              required: ['lastError'],
            },
            WorkflowJobDto: {
              type: 'object',
              properties: {
                error: nullableWorkflowFacts,
                lastError: nullableWorkflowFacts,
              },
              required: ['error', 'lastError'],
            },
            WorkflowErrorFactsDto: {
              type: 'object',
              properties: {
                code: { enum: ['KNOWN_ERROR'], type: 'string' },
              },
              required: ['code'],
            },
            BaseEmojiAssetDto: {
              type: 'object',
              properties: {
                keywords: { properties: {}, type: 'object' },
              },
              required: ['keywords'],
            },
            CreateEmojiAssetDto: {
              type: 'object',
              properties: {
                keywords: { properties: {}, type: 'object' },
              },
            },
            EmojiAssetOutputDto: {
              type: 'object',
              properties: {
                keywords: { properties: {}, type: 'object' },
              },
              required: ['keywords'],
            },
            UpdateEmojiAssetDto: {
              type: 'object',
              properties: {
                keywords: { properties: {}, type: 'object' },
              },
            },
            ComicArchiveTaskResponseDto: {
              type: 'object',
              properties: { lastError: nullableWorkflowFacts },
              required: ['lastError'],
            },
            ComicArchiveMatchedItemDto: {
              type: 'object',
              properties: { warning: nullableWorkflowFacts },
              required: ['warning'],
            },
            ComicArchiveResultItemDto: {
              type: 'object',
              properties: { error: nullableWorkflowFacts },
              required: ['error'],
            },
            ContentImportItemDto: {
              type: 'object',
              properties: {
                lastError: nullableWorkflowFacts,
                lastRetry: nullableWorkflowFacts,
              },
              required: ['lastError', 'lastRetry'],
            },
            CheckInCalendarDayDto: {
              type: 'object',
              properties: { rewardSettlement: nullableSettlement },
              required: ['rewardSettlement'],
            },
            AdminCheckInSignedUserPageItemDto: {
              type: 'object',
              properties: { rewardSettlement: nullableSettlement },
              required: ['rewardSettlement'],
            },
            CheckInGrantItemDto: {
              type: 'object',
              properties: { rewardSettlement: nullableSettlement },
              required: ['rewardSettlement'],
            },
            CheckInReconciliationPageItemDto: {
              type: 'object',
              properties: { rewardSettlement: nullableSettlement },
              required: ['rewardSettlement'],
            },
            CheckInRewardSettlementSummaryDto: {
              type: 'object',
              properties: { id: { type: 'integer' } },
              required: ['id'],
            },
            UserExperienceRecordDto: {
              type: 'object',
              properties: { user: nullableExperienceUser },
              required: ['user'],
            },
            UserExperienceRecordDetailDto: {
              type: 'object',
              properties: { user: nullableExperienceUser },
              required: ['user'],
            },
            UserExperienceRecordUserDto: {
              type: 'object',
              properties: { id: { type: 'integer' } },
              required: ['id'],
            },
          },
        },
      };

      const { typesContent: workflowTypes } = generateModule(spec, 'workflow');
      assert.match(workflowTypes, /error\?: WorkflowErrorFactsDto \| null/);
      assert.match(workflowTypes, /lastError\?: WorkflowErrorFactsDto \| null/);
      assert.match(workflowTypes, /code: 'KNOWN_ERROR' \| \(string & \{\}\)/);

      const { typesContent: contentTypes } = generateModule(spec, 'content');
      assert.match(contentTypes, /lastError\?: WorkflowErrorFactsDto \| null/);
      assert.match(contentTypes, /lastRetry\?: WorkflowErrorFactsDto \| null/);
      assert.match(contentTypes, /warning\?: WorkflowErrorFactsDto \| null/);
      assert.match(contentTypes, /error\?: WorkflowErrorFactsDto \| null/);
      assert.match(
        contentTypes,
        /keywords\?: Record<string, string\[\]> \| null/,
      );
      assert.match(
        contentTypes,
        /keywords\?: Record<string, string\[\]> \| null/,
      );

      const { typesContent: checkInTypes } = generateModule(spec, 'checkIn');
      assert.match(
        checkInTypes,
        /rewardSettlement\?: CheckInRewardSettlementSummaryDto \| null/,
      );

      const { typesContent: growthTypes } = generateModule(spec, 'growth');
      assert.match(growthTypes, /user\?: UserExperienceRecordUserDto \| null/);
    },
  },
  {
    name: 'renders request schemas and transport calls from parameter locations',
    run() {
      const spec: OpenAPISpec = {
        openapi: '3.0.0',
        info: baseInfo,
        paths: {
          '/api/admin/generator-transport/get-query': {
            get: {
              tags: ['生成器传参'],
              summary: 'GET 查询参数',
              parameters: [
                {
                  name: 'kind',
                  in: 'query',
                  required: false,
                  schema: {
                    type: 'string',
                    enum: ['topic', 'post'],
                    nullable: true,
                  },
                },
                {
                  name: 'page',
                  in: 'query',
                  required: true,
                  schema: { type: 'integer' },
                },
                {
                  name: 'filter-type',
                  in: 'query',
                  required: false,
                  schema: { type: 'string' },
                },
                {
                  name: 'range',
                  in: 'query',
                  required: false,
                  schema: {
                    $ref: '#/components/schemas/TransportRangeDto',
                  },
                },
              ],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: { type: 'boolean' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/api/admin/generator-transport/post-query-only': {
            post: {
              tags: ['生成器传参'],
              summary: 'POST 仅查询参数',
              parameters: [
                {
                  name: 'scene',
                  in: 'query',
                  required: false,
                  schema: { type: 'string' },
                },
              ],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: { type: 'boolean' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/api/admin/generator-transport/post-body-only': {
            post: {
              tags: ['生成器传参'],
              summary: 'POST 仅请求体',
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/TransportBodyDto',
                    },
                  },
                },
              },
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: { type: 'boolean' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/api/admin/generator-transport/post-mixed': {
            post: {
              tags: ['生成器传参'],
              summary: 'POST 查询参数与请求体混合',
              parameters: [
                {
                  name: 'dryRun',
                  in: 'query',
                  required: false,
                  schema: { type: 'boolean' },
                },
              ],
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/TransportBodyDto',
                    },
                  },
                },
              },
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: { type: 'boolean' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/api/admin/generator-transport/post-inline-body': {
            post: {
              tags: ['生成器传参'],
              summary: 'POST 内联请求体',
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        'display-name': { type: 'string' },
                        count: { type: 'integer' },
                      },
                      required: ['count'],
                    },
                  },
                },
              },
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: { type: 'boolean' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/api/admin/generator-transport/put-query-only': {
            put: {
              tags: ['生成器传参'],
              summary: 'PUT 仅查询参数',
              parameters: [
                {
                  name: 'scene',
                  in: 'query',
                  required: false,
                  schema: { type: 'string' },
                },
              ],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: { type: 'boolean' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/api/admin/generator-transport/{id}/delete-query': {
            delete: {
              tags: ['生成器传参'],
              summary: 'DELETE 路径参数与查询参数',
              parameters: [
                {
                  name: 'id',
                  in: 'path',
                  required: true,
                  schema: { type: 'string' },
                },
                {
                  name: 'reason',
                  in: 'query',
                  required: false,
                  schema: { type: 'string' },
                },
              ],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: { type: 'boolean' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/api/admin/generator-transport/{id}/detail': {
            get: {
              tags: ['生成器传参'],
              summary: 'GET 仅路径参数',
              parameters: [
                {
                  name: 'id',
                  in: 'path',
                  required: true,
                  schema: { type: 'string' },
                },
              ],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: { type: 'boolean' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/api/admin/generator-transport/{id}/post-body': {
            post: {
              tags: ['生成器传参'],
              summary: 'POST 路径参数与请求体',
              parameters: [
                {
                  name: 'id',
                  in: 'path',
                  required: true,
                  schema: { type: 'string' },
                },
              ],
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/TransportBodyDto',
                    },
                  },
                },
              },
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: { type: 'boolean' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/api/admin/generator-transport/{id}/patch-mixed': {
            patch: {
              tags: ['生成器传参'],
              summary: 'PATCH 路径参数、查询参数与请求体混合',
              parameters: [
                {
                  name: 'id',
                  in: 'path',
                  required: true,
                  schema: { type: 'string' },
                },
                {
                  name: 'id',
                  in: 'query',
                  required: false,
                  schema: { type: 'integer' },
                },
                {
                  name: 'default',
                  in: 'query',
                  required: false,
                  schema: { type: 'string' },
                },
              ],
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/TransportBodyDto',
                    },
                  },
                },
              },
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          data: { type: 'boolean' },
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
            TransportBodyDto: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                owner: {
                  $ref: '#/components/schemas/TransportOwnerDto',
                  nullable: true,
                },
                keywords: {
                  type: 'object',
                  additionalProperties: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                  nullable: true,
                },
                metadata: {
                  type: 'object',
                  additionalProperties: {
                    $ref: '#/components/schemas/TransportMetadataDto',
                  },
                },
                errorCode: {
                  anyOf: [
                    {
                      type: 'string',
                      enum: ['KNOWN_ERROR'],
                    },
                    { type: 'string' },
                  ],
                  nullable: true,
                },
              },
              required: ['title'],
            },
            TransportOwnerDto: {
              type: 'object',
              properties: {
                id: { type: 'string' },
              },
              required: ['id'],
            },
            TransportMetadataDto: {
              type: 'object',
              properties: {
                name: { type: 'string' },
              },
            },
            TransportRangeDto: {
              type: 'object',
              properties: {
                start: { type: 'integer' },
                end: { type: 'integer' },
              },
            },
          },
        },
      };

      const { apiContent, typesContent } = generateModule(
        spec,
        'generatorTransport',
      );

      assert.match(typesContent, /kind\?: string \| null/);
      assert.match(typesContent, /page: number/);
      assert.match(typesContent, /"filter-type"\?: string/);
      assert.match(typesContent, /range\?: TransportRangeDto/);
      assert.match(typesContent, /owner\?: TransportOwnerDto \| null/);
      assert.match(
        typesContent,
        /keywords\?: Record<string, string\[\]> \| null/,
      );
      assert.match(
        typesContent,
        /metadata\?: Record<string, TransportMetadataDto>/,
      );
      assert.match(
        typesContent,
        /errorCode\?: 'KNOWN_ERROR' \| \(string & \{\}\) \| null/,
      );
      assert.match(typesContent, /export type TransportRangeDto = \{/);
      assert.match(typesContent, /export type TransportMetadataDto = \{/);
      assert.match(
        typesContent,
        /export type GeneratorTransportPostBodyOnlyRequest = TransportBodyDto/,
      );
      assert.match(
        typesContent,
        /export type GeneratorTransportPostMixedRequest = \{[\s\S]*dryRun\?: boolean[\s\S]*\} & TransportBodyDto/,
      );
      assert.match(
        typesContent,
        /export type GeneratorTransportPostInlineBodyRequest = \{[\s\S]*"display-name"\?: string[\s\S]*count: number[\s\S]*\}/,
      );

      assert.match(
        apiContent,
        /requestClient\.get<GeneratorTransportGetQueryResponse>\('\/api\/admin\/generator-transport\/get-query', \{ params \}\)/,
      );
      assert.match(
        apiContent,
        /requestClient\.post<GeneratorTransportPostQueryOnlyResponse>\('\/api\/admin\/generator-transport\/post-query-only', undefined, \{ params \}\)/,
      );
      assert.match(
        apiContent,
        /requestClient\.post<GeneratorTransportPostBodyOnlyResponse>\('\/api\/admin\/generator-transport\/post-body-only', params\)/,
      );
      assert.match(
        apiContent,
        /requestClient\.post<GeneratorTransportPostInlineBodyResponse>\('\/api\/admin\/generator-transport\/post-inline-body', params\)/,
      );
      assert.match(
        apiContent,
        /const \{ dryRun, \.\.\.bodyParams \} = params;/,
      );
      assert.match(
        apiContent,
        /requestClient\.post<GeneratorTransportPostMixedResponse>\('\/api\/admin\/generator-transport\/post-mixed', bodyParams, \{ params: \{ dryRun \} \}\)/,
      );
      assert.match(
        apiContent,
        /requestClient\.put<GeneratorTransportPutQueryOnlyResponse>\('\/api\/admin\/generator-transport\/put-query-only', undefined, \{ params \}\)/,
      );
      assert.match(
        apiContent,
        /requestClient\.delete<GeneratorTransportIdDeleteQueryResponse>\(`\/api\/admin\/generator-transport\/\$\{encodeURIComponent\(String\(params\.id\)\)\}\/delete-query`, \{ params: \{ reason: params\.reason \} \}\)/,
      );
      assert.match(
        apiContent,
        /requestClient\.get<GeneratorTransportIdDetailResponse>\(`\/api\/admin\/generator-transport\/\$\{encodeURIComponent\(String\(params\.id\)\)\}\/detail`\)/,
      );
      assert.match(
        typesContent,
        /export type GeneratorTransportIdPostBodyRequest = \{[\s\S]*id: string[\s\S]*\} & TransportBodyDto/,
      );
      assert.match(
        apiContent,
        /const \{ id, \.\.\.bodyParams \} = params;[\s\S]*requestClient\.post<GeneratorTransportIdPostBodyResponse>\(`\/api\/admin\/generator-transport\/\$\{encodeURIComponent\(String\(id\)\)\}\/post-body`, bodyParams\)/,
      );
      assert.match(
        typesContent,
        /export type GeneratorTransportIdPatchMixedRequest = \{[\s\S]*pathId: string[\s\S]*queryId\?: number[\s\S]*default\?: string[\s\S]*\} & TransportBodyDto/,
      );
      assert.match(
        apiContent,
        /const \{ pathId, queryId, default: requestParam2, \.\.\.bodyParams \} = params;[\s\S]*requestClient\.request<GeneratorTransportIdPatchMixedResponse>\(`\/api\/admin\/generator-transport\/\$\{encodeURIComponent\(String\(pathId\)\)\}\/patch-mixed`, \{ method: 'PATCH', data: bodyParams, params: \{ id: queryId, default: requestParam2 \} \}\)/,
      );
    },
  },
];

function runValidation(): void {
  for (const test of tests) {
    try {
      test.run();
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
