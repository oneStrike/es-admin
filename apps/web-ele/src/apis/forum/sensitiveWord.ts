import type {
  SensitiveWordCreateRequest,
  SensitiveWordCreateResponse,
  SensitiveWordDeleteRequest,
  SensitiveWordDeleteResponse,
  SensitiveWordDetectRequest,
  SensitiveWordDetectResponse,
  SensitiveWordPageRequest,
  SensitiveWordPageResponse,
  SensitiveWordStatisticsResponse,
  SensitiveWordUpdateRequest,
  SensitiveWordUpdateResponse,
  SensitiveWordUpdateStatusRequest,
  SensitiveWordUpdateStatusResponse,
} from '../types/forum/sensitiveWord.d';

import { requestClient } from '#/utils/request';

/**
 * 获取敏感词分页列表
 */
export async function sensitiveWordPageApi(
  params?: SensitiveWordPageRequest,
): Promise<SensitiveWordPageResponse> {
  return requestClient.get<SensitiveWordPageResponse>(
    '/api/admin/forum/sensitive-word/page',
    { params },
  );
}

/**
 * 创建敏感词
 */
export async function sensitiveWordCreateApi(
  params: SensitiveWordCreateRequest,
): Promise<SensitiveWordCreateResponse> {
  return requestClient.post<SensitiveWordCreateResponse>(
    '/api/admin/forum/sensitive-word/create',
    params,
  );
}

/**
 * 更新敏感词
 */
export async function sensitiveWordUpdateApi(
  params: SensitiveWordUpdateRequest,
): Promise<SensitiveWordUpdateResponse> {
  return requestClient.post<SensitiveWordUpdateResponse>(
    '/api/admin/forum/sensitive-word/update',
    params,
  );
}

/**
 * 删除敏感词
 */
export async function sensitiveWordDeleteApi(
  params: SensitiveWordDeleteRequest,
): Promise<SensitiveWordDeleteResponse> {
  return requestClient.post<SensitiveWordDeleteResponse>(
    '/api/admin/forum/sensitive-word/delete',
    params,
  );
}

/**
 * 更新敏感词状态
 */
export async function sensitiveWordUpdateStatusApi(
  params: SensitiveWordUpdateStatusRequest,
): Promise<SensitiveWordUpdateStatusResponse> {
  return requestClient.post<SensitiveWordUpdateStatusResponse>(
    '/api/admin/forum/sensitive-word/update-status',
    params,
  );
}

/**
 * 检测文本中的敏感词
 */
export async function sensitiveWordDetectApi(
  params: SensitiveWordDetectRequest,
): Promise<SensitiveWordDetectResponse> {
  return requestClient.post<SensitiveWordDetectResponse>(
    '/api/admin/forum/sensitive-word/detect',
    params,
  );
}

/**
 * 获取统计查询结果
 */
export async function sensitiveWordStatisticsApi(): Promise<SensitiveWordStatisticsResponse> {
  return requestClient.get<SensitiveWordStatisticsResponse>(
    '/api/admin/forum/sensitive-word/statistics',
  );
}
