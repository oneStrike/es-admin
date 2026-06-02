import type {
  CouponDefinitionCreateRequest,
  CouponDefinitionCreateResponse,
  CouponDefinitionPageRequest,
  CouponDefinitionPageResponse,
  CouponDefinitionUpdateRequest,
  CouponDefinitionUpdateResponse,
  CouponDefinitionUpdateStatusRequest,
  CouponDefinitionUpdateStatusResponse,
  CouponGrantWorkflowCreateRequest,
  CouponGrantWorkflowCreateResponse,
} from '../types/coupon.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询券定义
 */
export async function couponDefinitionPageApi(
  params?: CouponDefinitionPageRequest,
): Promise<CouponDefinitionPageResponse> {
  return requestClient.get<CouponDefinitionPageResponse>(
    '/api/admin/coupon/definition/page',
    { params },
  );
}

/**
 * 创建券定义
 */
export async function couponDefinitionCreateApi(
  params: CouponDefinitionCreateRequest,
): Promise<CouponDefinitionCreateResponse> {
  return requestClient.post<CouponDefinitionCreateResponse>(
    '/api/admin/coupon/definition/create',
    params,
  );
}

/**
 * 更新券定义
 */
export async function couponDefinitionUpdateApi(
  params: CouponDefinitionUpdateRequest,
): Promise<CouponDefinitionUpdateResponse> {
  return requestClient.post<CouponDefinitionUpdateResponse>(
    '/api/admin/coupon/definition/update',
    params,
  );
}

/**
 * 更新券定义启用状态
 */
export async function couponDefinitionUpdateStatusApi(
  params: CouponDefinitionUpdateStatusRequest,
): Promise<CouponDefinitionUpdateStatusResponse> {
  return requestClient.post<CouponDefinitionUpdateStatusResponse>(
    '/api/admin/coupon/definition/update-status',
    params,
  );
}

/**
 * 创建批量发券任务
 */
export async function couponGrantWorkflowCreateApi(
  params: CouponGrantWorkflowCreateRequest,
): Promise<CouponGrantWorkflowCreateResponse> {
  return requestClient.post<CouponGrantWorkflowCreateResponse>(
    '/api/admin/coupon/grant-workflow/create',
    params,
  );
}
