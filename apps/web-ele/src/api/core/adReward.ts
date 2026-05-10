import type {
  AdRewardProviderCreateRequest,
  AdRewardProviderCreateResponse,
  AdRewardProviderPageRequest,
  AdRewardProviderPageResponse,
  AdRewardProviderUpdateRequest,
  AdRewardProviderUpdateResponse,
  AdRewardProviderUpdateStatusRequest,
  AdRewardProviderUpdateStatusResponse,
} from '../types/adReward.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询广告 provider 配置
 */
export async function adRewardProviderPageApi(
  params?: AdRewardProviderPageRequest,
): Promise<AdRewardProviderPageResponse> {
  return requestClient.get<AdRewardProviderPageResponse>(
    '/api/admin/ad-reward/provider/page',
    { params },
  );
}

/**
 * 创建广告 provider 配置
 */
export async function adRewardProviderCreateApi(
  params: AdRewardProviderCreateRequest,
): Promise<AdRewardProviderCreateResponse> {
  return requestClient.post<AdRewardProviderCreateResponse>(
    '/api/admin/ad-reward/provider/create',
    params,
  );
}

/**
 * 更新广告 provider 配置
 */
export async function adRewardProviderUpdateApi(
  params: AdRewardProviderUpdateRequest,
): Promise<AdRewardProviderUpdateResponse> {
  return requestClient.post<AdRewardProviderUpdateResponse>(
    '/api/admin/ad-reward/provider/update',
    params,
  );
}

/**
 * 更新广告 provider 启用状态
 */
export async function adRewardProviderUpdateStatusApi(
  params: AdRewardProviderUpdateStatusRequest,
): Promise<AdRewardProviderUpdateStatusResponse> {
  return requestClient.post<AdRewardProviderUpdateStatusResponse>(
    '/api/admin/ad-reward/provider/update-status',
    params,
  );
}
