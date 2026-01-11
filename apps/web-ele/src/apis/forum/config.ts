import type {
  ConfigGetResponse,
  ConfigHistoryResponse,
  ConfigResetResponse,
  ConfigRestoreRequest,
  ConfigRestoreResponse,
  ConfigUpdateRequest,
  ConfigUpdateResponse,
} from '../types/forum/config.d';

import { requestClient } from '#/utils/request';

/**
 * 获取论坛配置
 */
export async function configGetApi(): Promise<ConfigGetResponse> {
  return requestClient.get<ConfigGetResponse>('/api/admin/forum/config/get');
}

/**
 * 更新论坛配置
 */
export async function configUpdateApi(
  params: ConfigUpdateRequest,
): Promise<ConfigUpdateResponse> {
  return requestClient.post<ConfigUpdateResponse>(
    '/api/admin/forum/config/update',
    params,
  );
}

/**
 * 重置为默认配置
 */
export async function configResetApi(): Promise<ConfigResetResponse> {
  return requestClient.post<ConfigResetResponse>(
    '/api/admin/forum/config/reset',
  );
}

/**
 * 获取配置变更历史
 */
export async function configHistoryApi(): Promise<ConfigHistoryResponse> {
  return requestClient.get<ConfigHistoryResponse>(
    '/api/admin/forum/config/history',
  );
}

/**
 * 从历史记录恢复配置
 */
export async function configRestoreApi(
  params: ConfigRestoreRequest,
): Promise<ConfigRestoreResponse> {
  return requestClient.post<ConfigRestoreResponse>(
    '/api/admin/forum/config/restore',
    params,
  );
}
