import type {
  RecordDetailRequest,
  RecordDetailResponse,
  RecordPageRequest,
  RecordPageResponse,
} from '../../types/app-users/record.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询 APP 用户积分记录
 */
export async function recordPageApi(
  params: RecordPageRequest,
): Promise<RecordPageResponse> {
  return requestClient.get<RecordPageResponse>(
    '/api/admin/app-users/points/record/page',
    { params },
  );
}

/**
 * 分页查询 APP 用户经验记录
 */
export async function recordPageApi(
  params: RecordPageRequest,
): Promise<RecordPageResponse> {
  return requestClient.get<RecordPageResponse>(
    '/api/admin/app-users/experience/record/page',
    { params },
  );
}

/**
 * 获取用户经验记录分页
 */
export async function recordPageApi(
  params: RecordPageRequest,
): Promise<RecordPageResponse> {
  return requestClient.get<RecordPageResponse>(
    '/api/admin/growth/experience-rules/record/page',
    { params },
  );
}

/**
 * 获取用户经验记录详情
 */
export async function recordDetailApi(
  params: RecordDetailRequest,
): Promise<RecordDetailResponse> {
  return requestClient.get<RecordDetailResponse>(
    '/api/admin/growth/experience-rules/record/detail',
    { params },
  );
}
