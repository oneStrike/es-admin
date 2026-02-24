import type {
  SystemConfigDetailResponse,
  SystemConfigResponse,
  SystemConfigUpdateRequest,
  SystemConfigUpdateResponse,
  SystemHealthResponse,
  SystemReadyResponse,
} from '../../types/health/system.d';

import { requestClient } from '#/api/request';

/**
 * HealthController_healthCheck
 */
export async function systemHealthApi(): Promise<SystemHealthResponse> {
  return requestClient.get<SystemHealthResponse>('/api/system/health');
}

/**
 * HealthController_readinessCheck
 */
export async function systemReadyApi(): Promise<SystemReadyResponse> {
  return requestClient.get<SystemReadyResponse>('/api/system/ready');
}

/**
 * 获取系统配置
 */
export async function systemConfigDetailApi(): Promise<SystemConfigDetailResponse> {
  return requestClient.get<SystemConfigDetailResponse>(
    '/api/admin/system/config-detail',
  );
}

/**
 * 获取系统配置
 */
export async function systemConfigApi(): Promise<SystemConfigResponse> {
  return requestClient.get<SystemConfigResponse>('/api/admin/system/config');
}

/**
 * 更新系统配置
 */
export async function systemConfigUpdateApi(
  params?: SystemConfigUpdateRequest,
): Promise<SystemConfigUpdateResponse> {
  return requestClient.post<SystemConfigUpdateResponse>(
    '/api/admin/system/config-update',
    params,
  );
}
