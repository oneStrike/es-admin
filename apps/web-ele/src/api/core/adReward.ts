import type {
  AdRewardCredentialOptionListResponse,
  AdRewardProviderCreateRequest,
  AdRewardProviderCreateResponse,
  AdRewardProviderPageRequest,
  AdRewardProviderPageResponse,
  AdRewardProviderUpdateRequest,
  AdRewardProviderUpdateResponse,
  AdRewardProviderUpdateStatusRequest,
  AdRewardProviderUpdateStatusResponse,
  AdRewardRecordDetailRequest,
  AdRewardRecordDetailResponse,
  AdRewardRecordPageRequest,
  AdRewardRecordPageResponse,
  AdRewardRecordReconcilePageRequest,
  AdRewardRecordReconcilePageResponse,
  AdRewardRecordRevokeRequest,
  AdRewardRecordRevokeResponse,
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
 * 查询广告验签密钥选项
 */
export async function adRewardCredentialOptionListApi(): Promise<AdRewardCredentialOptionListResponse> {
  return requestClient.get<AdRewardCredentialOptionListResponse>(
    '/api/admin/ad-reward/credential-option/list',
  );
}

/**
 * 分页查询广告奖励记录
 */
export async function adRewardRecordPageApi(
  params?: AdRewardRecordPageRequest,
): Promise<AdRewardRecordPageResponse> {
  return requestClient.get<AdRewardRecordPageResponse>(
    '/api/admin/ad-reward/record/page',
    { params },
  );
}

/**
 * 查询广告奖励记录详情
 */
export async function adRewardRecordDetailApi(
  params: AdRewardRecordDetailRequest,
): Promise<AdRewardRecordDetailResponse> {
  return requestClient.get<AdRewardRecordDetailResponse>(
    '/api/admin/ad-reward/record/detail',
    { params },
  );
}

/**
 * 分页查询广告奖励和内容权益对账视图
 */
export async function adRewardRecordReconcilePageApi(
  params?: AdRewardRecordReconcilePageRequest,
): Promise<AdRewardRecordReconcilePageResponse> {
  return requestClient.get<AdRewardRecordReconcilePageResponse>(
    '/api/admin/ad-reward/record/reconcile/page',
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

/**
 * 撤销广告奖励记录
 */
export async function adRewardRecordRevokeApi(
  params: AdRewardRecordRevokeRequest,
): Promise<AdRewardRecordRevokeResponse> {
  return requestClient.post<AdRewardRecordRevokeResponse>(
    '/api/admin/ad-reward/record/revoke',
    params,
  );
}
