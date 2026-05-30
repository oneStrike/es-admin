import type {
  MembershipBenefitCreateRequest,
  MembershipBenefitCreateResponse,
  MembershipBenefitPageRequest,
  MembershipBenefitPageResponse,
  MembershipBenefitUpdateRequest,
  MembershipBenefitUpdateResponse,
  MembershipBenefitUpdateStatusRequest,
  MembershipBenefitUpdateStatusResponse,
  MembershipPageConfigCreateRequest,
  MembershipPageConfigCreateResponse,
  MembershipPageConfigPageRequest,
  MembershipPageConfigPageResponse,
  MembershipPageConfigUpdateRequest,
  MembershipPageConfigUpdateResponse,
  MembershipPageConfigUpdateStatusRequest,
  MembershipPageConfigUpdateStatusResponse,
  MembershipPlanCreateRequest,
  MembershipPlanCreateResponse,
  MembershipPlanPageRequest,
  MembershipPlanPageResponse,
  MembershipPlanUpdateRequest,
  MembershipPlanUpdateResponse,
  MembershipPlanUpdateStatusRequest,
  MembershipPlanUpdateStatusResponse,
} from '../types/membership.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询 VIP 套餐
 */
export async function membershipPlanPageApi(
  params?: MembershipPlanPageRequest,
): Promise<MembershipPlanPageResponse> {
  return requestClient.get<MembershipPlanPageResponse>(
    '/api/admin/membership/plan/page',
    { params },
  );
}

/**
 * 创建 VIP 套餐
 */
export async function membershipPlanCreateApi(
  params: MembershipPlanCreateRequest,
): Promise<MembershipPlanCreateResponse> {
  return requestClient.post<MembershipPlanCreateResponse>(
    '/api/admin/membership/plan/create',
    params,
  );
}

/**
 * 更新 VIP 套餐
 */
export async function membershipPlanUpdateApi(
  params: MembershipPlanUpdateRequest,
): Promise<MembershipPlanUpdateResponse> {
  return requestClient.post<MembershipPlanUpdateResponse>(
    '/api/admin/membership/plan/update',
    params,
  );
}

/**
 * 更新 VIP 套餐启用状态
 */
export async function membershipPlanUpdateStatusApi(
  params: MembershipPlanUpdateStatusRequest,
): Promise<MembershipPlanUpdateStatusResponse> {
  return requestClient.post<MembershipPlanUpdateStatusResponse>(
    '/api/admin/membership/plan/update-status',
    params,
  );
}

/**
 * 分页查询会员权益定义
 */
export async function membershipBenefitPageApi(
  params?: MembershipBenefitPageRequest,
): Promise<MembershipBenefitPageResponse> {
  return requestClient.get<MembershipBenefitPageResponse>(
    '/api/admin/membership/benefit/page',
    { params },
  );
}

/**
 * 创建会员权益定义
 */
export async function membershipBenefitCreateApi(
  params: MembershipBenefitCreateRequest,
): Promise<MembershipBenefitCreateResponse> {
  return requestClient.post<MembershipBenefitCreateResponse>(
    '/api/admin/membership/benefit/create',
    params,
  );
}

/**
 * 更新会员权益定义
 */
export async function membershipBenefitUpdateApi(
  params: MembershipBenefitUpdateRequest,
): Promise<MembershipBenefitUpdateResponse> {
  return requestClient.post<MembershipBenefitUpdateResponse>(
    '/api/admin/membership/benefit/update',
    params,
  );
}

/**
 * 更新会员权益启用状态
 */
export async function membershipBenefitUpdateStatusApi(
  params: MembershipBenefitUpdateStatusRequest,
): Promise<MembershipBenefitUpdateStatusResponse> {
  return requestClient.post<MembershipBenefitUpdateStatusResponse>(
    '/api/admin/membership/benefit/update-status',
    params,
  );
}

/**
 * 分页查询会员订阅页配置
 */
export async function membershipPageConfigPageApi(
  params?: MembershipPageConfigPageRequest,
): Promise<MembershipPageConfigPageResponse> {
  return requestClient.get<MembershipPageConfigPageResponse>(
    '/api/admin/membership/page-config/page',
    { params },
  );
}

/**
 * 创建会员订阅页配置
 */
export async function membershipPageConfigCreateApi(
  params: MembershipPageConfigCreateRequest,
): Promise<MembershipPageConfigCreateResponse> {
  return requestClient.post<MembershipPageConfigCreateResponse>(
    '/api/admin/membership/page-config/create',
    params,
  );
}

/**
 * 更新会员订阅页配置
 */
export async function membershipPageConfigUpdateApi(
  params: MembershipPageConfigUpdateRequest,
): Promise<MembershipPageConfigUpdateResponse> {
  return requestClient.post<MembershipPageConfigUpdateResponse>(
    '/api/admin/membership/page-config/update',
    params,
  );
}

/**
 * 更新会员订阅页配置启用状态
 */
export async function membershipPageConfigUpdateStatusApi(
  params: MembershipPageConfigUpdateStatusRequest,
): Promise<MembershipPageConfigUpdateStatusResponse> {
  return requestClient.post<MembershipPageConfigUpdateStatusResponse>(
    '/api/admin/membership/page-config/update-status',
    params,
  );
}
