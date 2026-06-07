import type {
  PaymentCertificateOptionListRequest,
  PaymentCertificateOptionListResponse,
  PaymentCredentialOptionListRequest,
  PaymentCredentialOptionListResponse,
  PaymentOrderPageRequest,
  PaymentOrderPageResponse,
  PaymentOrderRepairPaidRequest,
  PaymentOrderRepairPaidResponse,
  PaymentProviderAccountOptionListRequest,
  PaymentProviderAccountOptionListResponse,
  PaymentProviderCreateRequest,
  PaymentProviderCreateResponse,
  PaymentProviderPageRequest,
  PaymentProviderPageResponse,
  PaymentProviderUpdateRequest,
  PaymentProviderUpdateResponse,
  PaymentProviderUpdateStatusRequest,
  PaymentProviderUpdateStatusResponse,
  PaymentReconcilePageRequest,
  PaymentReconcilePageResponse,
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
 * 查询支付 provider 账号选项
 */
export async function paymentProviderAccountOptionListApi(
  params?: PaymentProviderAccountOptionListRequest,
): Promise<PaymentProviderAccountOptionListResponse> {
  return requestClient.get<PaymentProviderAccountOptionListResponse>(
    '/api/admin/payment/provider-account-option/list',
    { params },
  );
}

/**
 * 查询支付凭据选项
 */
export async function paymentCredentialOptionListApi(
  params?: PaymentCredentialOptionListRequest,
): Promise<PaymentCredentialOptionListResponse> {
  return requestClient.get<PaymentCredentialOptionListResponse>(
    '/api/admin/payment/credential-option/list',
    { params },
  );
}

/**
 * 查询支付证书选项
 */
export async function paymentCertificateOptionListApi(
  params?: PaymentCertificateOptionListRequest,
): Promise<PaymentCertificateOptionListResponse> {
  return requestClient.get<PaymentCertificateOptionListResponse>(
    '/api/admin/payment/certificate-option/list',
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
 * 分页查询支付对账记录
 */
export async function paymentReconcilePageApi(
  params?: PaymentReconcilePageRequest,
): Promise<PaymentReconcilePageResponse> {
  return requestClient.get<PaymentReconcilePageResponse>(
    '/api/admin/payment/reconcile/page',
    { params },
  );
}

/**
 * 异常修复支付订单为已支付
 */
export async function paymentOrderRepairPaidApi(
  params: PaymentOrderRepairPaidRequest,
): Promise<PaymentOrderRepairPaidResponse> {
  return requestClient.post<PaymentOrderRepairPaidResponse>(
    '/api/admin/payment/order/repair-paid',
    params,
  );
}
