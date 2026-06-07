import type {
  WalletCurrencyPackageCreateRequest,
  WalletCurrencyPackageCreateResponse,
  WalletCurrencyPackagePageRequest,
  WalletCurrencyPackagePageResponse,
  WalletCurrencyPackageUpdateRequest,
  WalletCurrencyPackageUpdateResponse,
  WalletCurrencyPackageUpdateStatusRequest,
  WalletCurrencyPackageUpdateStatusResponse,
  WalletLedgerPageRequest,
  WalletLedgerPageResponse,
} from '../types/wallet.d';

import { requestClient } from '#/api/request';

/**
 * 分页查询虚拟币充值包
 */
export async function walletCurrencyPackagePageApi(
  params?: WalletCurrencyPackagePageRequest,
): Promise<WalletCurrencyPackagePageResponse> {
  return requestClient.get<WalletCurrencyPackagePageResponse>(
    '/api/admin/wallet/currency-package/page',
    { params },
  );
}

/**
 * 分页查询虚拟币流水
 */
export async function walletLedgerPageApi(
  params: WalletLedgerPageRequest,
): Promise<WalletLedgerPageResponse> {
  return requestClient.get<WalletLedgerPageResponse>(
    '/api/admin/wallet/ledger/page',
    { params },
  );
}

/**
 * 创建虚拟币充值包
 */
export async function walletCurrencyPackageCreateApi(
  params: WalletCurrencyPackageCreateRequest,
): Promise<WalletCurrencyPackageCreateResponse> {
  return requestClient.post<WalletCurrencyPackageCreateResponse>(
    '/api/admin/wallet/currency-package/create',
    params,
  );
}

/**
 * 更新虚拟币充值包
 */
export async function walletCurrencyPackageUpdateApi(
  params: WalletCurrencyPackageUpdateRequest,
): Promise<WalletCurrencyPackageUpdateResponse> {
  return requestClient.post<WalletCurrencyPackageUpdateResponse>(
    '/api/admin/wallet/currency-package/update',
    params,
  );
}

/**
 * 更新虚拟币充值包启用状态
 */
export async function walletCurrencyPackageUpdateStatusApi(
  params: WalletCurrencyPackageUpdateStatusRequest,
): Promise<WalletCurrencyPackageUpdateStatusResponse> {
  return requestClient.post<WalletCurrencyPackageUpdateStatusResponse>(
    '/api/admin/wallet/currency-package/update-status',
    params,
  );
}
