import type {
  PaymentOrderPageRequest,
  PaymentOrderPageResponse,
  PaymentOrderUpdateStatusRequest,
  PaymentOrderUpdateStatusResponse,
  PaymentProviderCreateRequest,
  PaymentProviderCreateResponse,
  PaymentProviderPageRequest,
  PaymentProviderPageResponse,
  PaymentProviderUpdateRequest,
  PaymentProviderUpdateResponse,
  PaymentProviderUpdateStatusRequest,
  PaymentProviderUpdateStatusResponse,
} from '../types/payment.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询支付 provider 配置
 */
export async function paymentProviderPageApi(
  params?: PaymentProviderPageRequest,
): Promise<PaymentProviderPageResponse> {
  return requestClient.get<PaymentProviderPageResponse>(
    '/api/admin/payment/provider/page',
    { params },
  );
}

/**
 * 创建支付 provider 配置
 */
export async function paymentProviderCreateApi(
  params: PaymentProviderCreateRequest,
): Promise<PaymentProviderCreateResponse> {
  return requestClient.post<PaymentProviderCreateResponse>(
    '/api/admin/payment/provider/create',
    params,
  );
}

/**
 * 更新支付 provider 配置
 */
export async function paymentProviderUpdateApi(
  params: PaymentProviderUpdateRequest,
): Promise<PaymentProviderUpdateResponse> {
  return requestClient.post<PaymentProviderUpdateResponse>(
    '/api/admin/payment/provider/update',
    params,
  );
}

/**
 * 更新支付 provider 启用状态
 */
export async function paymentProviderUpdateStatusApi(
  params: PaymentProviderUpdateStatusRequest,
): Promise<PaymentProviderUpdateStatusResponse> {
  return requestClient.post<PaymentProviderUpdateStatusResponse>(
    '/api/admin/payment/provider/update-status',
    params,
  );
}

/**
 * 分页查询支付订单
 */
export async function paymentOrderPageApi(
  params?: PaymentOrderPageRequest,
): Promise<PaymentOrderPageResponse> {
  return requestClient.get<PaymentOrderPageResponse>(
    '/api/admin/payment/order/page',
    { params },
  );
}

/**
 * 手工确认支付订单状态
 */
export async function paymentOrderUpdateStatusApi(
  params: PaymentOrderUpdateStatusRequest,
): Promise<PaymentOrderUpdateStatusResponse> {
  return requestClient.post<PaymentOrderUpdateStatusResponse>(
    '/api/admin/payment/order/update-status',
    params,
  );
}
