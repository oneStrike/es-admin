export type * from './types/index';

export type { AuditItemDto as BaseAuditDto } from './types/index';
export type { BaseSystemConfigDto as SystemConfigDto } from './types/index';
export type { BaseSensitiveWordDto as BaseForumSensitiveWordDto } from './types/index';
export type {
  SensitiveWordRecentHitStatisticsDto as ForumSensitiveWordRecentHitStatisticsDto,
} from './types/index';
export type {
  SensitiveWordStatisticsDataDto as ForumSensitiveWordStatisticsDataDto,
} from './types/index';
export type {
  SensitiveWordTopHitStatisticsDto as ForumSensitiveWordTopHitStatisticsDto,
} from './types/index';
export type { FileUploadResponse as UploadUploadFileResponse } from './types/index';
export type { SystemUserCreateRequest as UserRegisterRequest } from './types/index';
export type { ComicChapterCreateRequest as ChapterCreateRequest } from './types/index';
export type { ComicChapterPageResponse as ChapterPageResponse } from './types/index';
export type { ComicChapterUpdateRequest as ChapterUpdateRequest } from './types/index';
export type { CreateWorkDto as WorkCreateRequest } from './types/index';
export type { UpdateWorkDto as WorkUpdateRequest } from './types/index';
export type {
  ExperienceRulesCreateRequest as ExperienceRulesRulesCreateRequest,
} from './types/index';
export type {
  ExperienceRulesUpdateRequest as ExperienceRulesRulesUpdateRequest,
} from './types/index';
export type {
  PointsRulesCreateRequest as PointsRulesRulesCreateRequest,
} from './types/index';
export type {
  PointsRulesUpdateRequest as PointsRulesRulesUpdateRequest,
} from './types/index';

export type SystemHealthResponse = any;
export type SystemReadyResponse = any;
export type BaseForumConfigDto = Record<string, any>;
export type BaseWorkChapterDto = any;
export type ConfigUpdateRequest = Record<string, any>;
