import type {
  MonetizationAdProviderCreateRequest,
  MonetizationAdProviderCreateResponse,
  MonetizationAdProviderPageRequest,
  MonetizationAdProviderPageResponse,
  MonetizationAdProviderUpdateRequest,
  MonetizationAdProviderUpdateResponse,
  MonetizationAdProviderUpdateStatusRequest,
  MonetizationAdProviderUpdateStatusResponse,
  MonetizationCouponCreateRequest,
  MonetizationCouponCreateResponse,
  MonetizationCouponGrantCreateRequest,
  MonetizationCouponGrantCreateResponse,
  MonetizationCouponPageRequest,
  MonetizationCouponPageResponse,
  MonetizationCouponUpdateRequest,
  MonetizationCouponUpdateResponse,
  MonetizationCouponUpdateStatusRequest,
  MonetizationCouponUpdateStatusResponse,
  MonetizationCurrencyPackageCreateRequest,
  MonetizationCurrencyPackageCreateResponse,
  MonetizationCurrencyPackagePageRequest,
  MonetizationCurrencyPackagePageResponse,
  MonetizationCurrencyPackageUpdateRequest,
  MonetizationCurrencyPackageUpdateResponse,
  MonetizationCurrencyPackageUpdateStatusRequest,
  MonetizationCurrencyPackageUpdateStatusResponse,
  MonetizationPaymentOrderPageRequest,
  MonetizationPaymentOrderPageResponse,
  MonetizationPaymentOrderUpdateStatusRequest,
  MonetizationPaymentOrderUpdateStatusResponse,
  MonetizationPaymentProviderCreateRequest,
  MonetizationPaymentProviderCreateResponse,
  MonetizationPaymentProviderPageRequest,
  MonetizationPaymentProviderPageResponse,
  MonetizationPaymentProviderUpdateRequest,
  MonetizationPaymentProviderUpdateResponse,
  MonetizationPaymentProviderUpdateStatusRequest,
  MonetizationPaymentProviderUpdateStatusResponse,
  MonetizationVipAutoRenewAgreementCancellationCreateRequest,
  MonetizationVipAutoRenewAgreementCancellationCreateResponse,
  MonetizationVipAutoRenewAgreementPageRequest,
  MonetizationVipAutoRenewAgreementPageResponse,
  MonetizationVipBenefitCreateRequest,
  MonetizationVipBenefitCreateResponse,
  MonetizationVipBenefitPageRequest,
  MonetizationVipBenefitPageResponse,
  MonetizationVipBenefitUpdateRequest,
  MonetizationVipBenefitUpdateResponse,
  MonetizationVipBenefitUpdateStatusRequest,
  MonetizationVipBenefitUpdateStatusResponse,
  MonetizationVipPageConfigCreateRequest,
  MonetizationVipPageConfigCreateResponse,
  MonetizationVipPageConfigPageRequest,
  MonetizationVipPageConfigPageResponse,
  MonetizationVipPageConfigUpdateRequest,
  MonetizationVipPageConfigUpdateResponse,
  MonetizationVipPageConfigUpdateStatusRequest,
  MonetizationVipPageConfigUpdateStatusResponse,
  MonetizationVipPlanCreateRequest,
  MonetizationVipPlanCreateResponse,
  MonetizationVipPlanPageRequest,
  MonetizationVipPlanPageResponse,
  MonetizationVipPlanUpdateRequest,
  MonetizationVipPlanUpdateResponse,
  MonetizationVipPlanUpdateStatusRequest,
  MonetizationVipPlanUpdateStatusResponse,
} from '../types/monetization.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询 VIP 套餐
 */
export async function monetizationVipPlanPageApi(
  params?: MonetizationVipPlanPageRequest,
): Promise<MonetizationVipPlanPageResponse> {
  return requestClient.get<MonetizationVipPlanPageResponse>(
    '/api/admin/monetization/vip-plan/page',
    { params },
  );
}

/**
 * 创建 VIP 套餐
 */
export async function monetizationVipPlanCreateApi(
  params: MonetizationVipPlanCreateRequest,
): Promise<MonetizationVipPlanCreateResponse> {
  return requestClient.post<MonetizationVipPlanCreateResponse>(
    '/api/admin/monetization/vip-plan/create',
    params,
  );
}

/**
 * 更新 VIP 套餐
 */
export async function monetizationVipPlanUpdateApi(
  params: MonetizationVipPlanUpdateRequest,
): Promise<MonetizationVipPlanUpdateResponse> {
  return requestClient.post<MonetizationVipPlanUpdateResponse>(
    '/api/admin/monetization/vip-plan/update',
    params,
  );
}

/**
 * 更新 VIP 套餐启用状态
 */
export async function monetizationVipPlanUpdateStatusApi(
  params: MonetizationVipPlanUpdateStatusRequest,
): Promise<MonetizationVipPlanUpdateStatusResponse> {
  return requestClient.post<MonetizationVipPlanUpdateStatusResponse>(
    '/api/admin/monetization/vip-plan/update-status',
    params,
  );
}

/**
 * 分页查询会员权益定义
 */
export async function monetizationVipBenefitPageApi(
  params?: MonetizationVipBenefitPageRequest,
): Promise<MonetizationVipBenefitPageResponse> {
  return requestClient.get<MonetizationVipBenefitPageResponse>(
    '/api/admin/monetization/vip-benefit/page',
    { params },
  );
}

/**
 * 创建会员权益定义
 */
export async function monetizationVipBenefitCreateApi(
  params: MonetizationVipBenefitCreateRequest,
): Promise<MonetizationVipBenefitCreateResponse> {
  return requestClient.post<MonetizationVipBenefitCreateResponse>(
    '/api/admin/monetization/vip-benefit/create',
    params,
  );
}

/**
 * 更新会员权益定义
 */
export async function monetizationVipBenefitUpdateApi(
  params: MonetizationVipBenefitUpdateRequest,
): Promise<MonetizationVipBenefitUpdateResponse> {
  return requestClient.post<MonetizationVipBenefitUpdateResponse>(
    '/api/admin/monetization/vip-benefit/update',
    params,
  );
}

/**
 * 更新会员权益启用状态
 */
export async function monetizationVipBenefitUpdateStatusApi(
  params: MonetizationVipBenefitUpdateStatusRequest,
): Promise<MonetizationVipBenefitUpdateStatusResponse> {
  return requestClient.post<MonetizationVipBenefitUpdateStatusResponse>(
    '/api/admin/monetization/vip-benefit/update-status',
    params,
  );
}

/**
 * 分页查询会员订阅页配置
 */
export async function monetizationVipPageConfigPageApi(
  params?: MonetizationVipPageConfigPageRequest,
): Promise<MonetizationVipPageConfigPageResponse> {
  return requestClient.get<MonetizationVipPageConfigPageResponse>(
    '/api/admin/monetization/vip-page-config/page',
    { params },
  );
}

/**
 * 创建会员订阅页配置
 */
export async function monetizationVipPageConfigCreateApi(
  params: MonetizationVipPageConfigCreateRequest,
): Promise<MonetizationVipPageConfigCreateResponse> {
  return requestClient.post<MonetizationVipPageConfigCreateResponse>(
    '/api/admin/monetization/vip-page-config/create',
    params,
  );
}

/**
 * 更新会员订阅页配置
 */
export async function monetizationVipPageConfigUpdateApi(
  params: MonetizationVipPageConfigUpdateRequest,
): Promise<MonetizationVipPageConfigUpdateResponse> {
  return requestClient.post<MonetizationVipPageConfigUpdateResponse>(
    '/api/admin/monetization/vip-page-config/update',
    params,
  );
}

/**
 * 更新会员订阅页配置启用状态
 */
export async function monetizationVipPageConfigUpdateStatusApi(
  params: MonetizationVipPageConfigUpdateStatusRequest,
): Promise<MonetizationVipPageConfigUpdateStatusResponse> {
  return requestClient.post<MonetizationVipPageConfigUpdateStatusResponse>(
    '/api/admin/monetization/vip-page-config/update-status',
    params,
  );
}

/**
 * 分页查询 VIP 自动续费协议
 */
export async function monetizationVipAutoRenewAgreementPageApi(
  params?: MonetizationVipAutoRenewAgreementPageRequest,
): Promise<MonetizationVipAutoRenewAgreementPageResponse> {
  return requestClient.get<MonetizationVipAutoRenewAgreementPageResponse>(
    '/api/admin/monetization/vip-auto-renew-agreement/page',
    { params },
  );
}

/**
 * 取消 VIP 自动续费协议
 */
export async function monetizationVipAutoRenewAgreementCancellationCreateApi(
  params: MonetizationVipAutoRenewAgreementCancellationCreateRequest,
): Promise<MonetizationVipAutoRenewAgreementCancellationCreateResponse> {
  return requestClient.post<MonetizationVipAutoRenewAgreementCancellationCreateResponse>(
    '/api/admin/monetization/vip-auto-renew-agreement/cancellation/create',
    params,
  );
}

/**
 * 分页查询虚拟币充值包
 */
export async function monetizationCurrencyPackagePageApi(
  params?: MonetizationCurrencyPackagePageRequest,
): Promise<MonetizationCurrencyPackagePageResponse> {
  return requestClient.get<MonetizationCurrencyPackagePageResponse>(
    '/api/admin/monetization/currency-package/page',
    { params },
  );
}

/**
 * 创建虚拟币充值包
 */
export async function monetizationCurrencyPackageCreateApi(
  params: MonetizationCurrencyPackageCreateRequest,
): Promise<MonetizationCurrencyPackageCreateResponse> {
  return requestClient.post<MonetizationCurrencyPackageCreateResponse>(
    '/api/admin/monetization/currency-package/create',
    params,
  );
}

/**
 * 更新虚拟币充值包
 */
export async function monetizationCurrencyPackageUpdateApi(
  params: MonetizationCurrencyPackageUpdateRequest,
): Promise<MonetizationCurrencyPackageUpdateResponse> {
  return requestClient.post<MonetizationCurrencyPackageUpdateResponse>(
    '/api/admin/monetization/currency-package/update',
    params,
  );
}

/**
 * 更新虚拟币充值包启用状态
 */
export async function monetizationCurrencyPackageUpdateStatusApi(
  params: MonetizationCurrencyPackageUpdateStatusRequest,
): Promise<MonetizationCurrencyPackageUpdateStatusResponse> {
  return requestClient.post<MonetizationCurrencyPackageUpdateStatusResponse>(
    '/api/admin/monetization/currency-package/update-status',
    params,
  );
}

/**
 * 分页查询券定义
 */
export async function monetizationCouponPageApi(
  params?: MonetizationCouponPageRequest,
): Promise<MonetizationCouponPageResponse> {
  return requestClient.get<MonetizationCouponPageResponse>(
    '/api/admin/monetization/coupon/page',
    { params },
  );
}

/**
 * 创建券定义
 */
export async function monetizationCouponCreateApi(
  params: MonetizationCouponCreateRequest,
): Promise<MonetizationCouponCreateResponse> {
  return requestClient.post<MonetizationCouponCreateResponse>(
    '/api/admin/monetization/coupon/create',
    params,
  );
}

/**
 * 更新券定义
 */
export async function monetizationCouponUpdateApi(
  params: MonetizationCouponUpdateRequest,
): Promise<MonetizationCouponUpdateResponse> {
  return requestClient.post<MonetizationCouponUpdateResponse>(
    '/api/admin/monetization/coupon/update',
    params,
  );
}

/**
 * 更新券定义启用状态
 */
export async function monetizationCouponUpdateStatusApi(
  params: MonetizationCouponUpdateStatusRequest,
): Promise<MonetizationCouponUpdateStatusResponse> {
  return requestClient.post<MonetizationCouponUpdateStatusResponse>(
    '/api/admin/monetization/coupon/update-status',
    params,
  );
}

/**
 * 发放券
 */
export async function monetizationCouponGrantCreateApi(
  params: MonetizationCouponGrantCreateRequest,
): Promise<MonetizationCouponGrantCreateResponse> {
  return requestClient.post<MonetizationCouponGrantCreateResponse>(
    '/api/admin/monetization/coupon/grant/create',
    params,
  );
}

/**
 * 分页查询支付 provider 配置
 */
export async function monetizationPaymentProviderPageApi(
  params?: MonetizationPaymentProviderPageRequest,
): Promise<MonetizationPaymentProviderPageResponse> {
  return requestClient.get<MonetizationPaymentProviderPageResponse>(
    '/api/admin/monetization/payment-provider/page',
    { params },
  );
}

/**
 * 创建支付 provider 配置
 */
export async function monetizationPaymentProviderCreateApi(
  params: MonetizationPaymentProviderCreateRequest,
): Promise<MonetizationPaymentProviderCreateResponse> {
  return requestClient.post<MonetizationPaymentProviderCreateResponse>(
    '/api/admin/monetization/payment-provider/create',
    params,
  );
}

/**
 * 更新支付 provider 配置
 */
export async function monetizationPaymentProviderUpdateApi(
  params: MonetizationPaymentProviderUpdateRequest,
): Promise<MonetizationPaymentProviderUpdateResponse> {
  return requestClient.post<MonetizationPaymentProviderUpdateResponse>(
    '/api/admin/monetization/payment-provider/update',
    params,
  );
}

/**
 * 更新支付 provider 启用状态
 */
export async function monetizationPaymentProviderUpdateStatusApi(
  params: MonetizationPaymentProviderUpdateStatusRequest,
): Promise<MonetizationPaymentProviderUpdateStatusResponse> {
  return requestClient.post<MonetizationPaymentProviderUpdateStatusResponse>(
    '/api/admin/monetization/payment-provider/update-status',
    params,
  );
}

/**
 * 分页查询支付订单
 */
export async function monetizationPaymentOrderPageApi(
  params?: MonetizationPaymentOrderPageRequest,
): Promise<MonetizationPaymentOrderPageResponse> {
  return requestClient.get<MonetizationPaymentOrderPageResponse>(
    '/api/admin/monetization/payment-order/page',
    { params },
  );
}

/**
 * 确认支付订单状态
 */
export async function monetizationPaymentOrderUpdateStatusApi(
  params: MonetizationPaymentOrderUpdateStatusRequest,
): Promise<MonetizationPaymentOrderUpdateStatusResponse> {
  return requestClient.post<MonetizationPaymentOrderUpdateStatusResponse>(
    '/api/admin/monetization/payment-order/update-status',
    params,
  );
}

/**
 * 分页查询广告 provider 配置
 */
export async function monetizationAdProviderPageApi(
  params?: MonetizationAdProviderPageRequest,
): Promise<MonetizationAdProviderPageResponse> {
  return requestClient.get<MonetizationAdProviderPageResponse>(
    '/api/admin/monetization/ad-provider/page',
    { params },
  );
}

/**
 * 创建广告 provider 配置
 */
export async function monetizationAdProviderCreateApi(
  params: MonetizationAdProviderCreateRequest,
): Promise<MonetizationAdProviderCreateResponse> {
  return requestClient.post<MonetizationAdProviderCreateResponse>(
    '/api/admin/monetization/ad-provider/create',
    params,
  );
}

/**
 * 更新广告 provider 配置
 */
export async function monetizationAdProviderUpdateApi(
  params: MonetizationAdProviderUpdateRequest,
): Promise<MonetizationAdProviderUpdateResponse> {
  return requestClient.post<MonetizationAdProviderUpdateResponse>(
    '/api/admin/monetization/ad-provider/update',
    params,
  );
}

/**
 * 更新广告 provider 启用状态
 */
export async function monetizationAdProviderUpdateStatusApi(
  params: MonetizationAdProviderUpdateStatusRequest,
): Promise<MonetizationAdProviderUpdateStatusResponse> {
  return requestClient.post<MonetizationAdProviderUpdateStatusResponse>(
    '/api/admin/monetization/ad-provider/update-status',
    params,
  );
}
