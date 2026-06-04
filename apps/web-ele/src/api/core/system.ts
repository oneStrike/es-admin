import type {
  SystemConfigResponse,
  SystemIp2regionStatusResponse,
  SystemIp2regionUploadResponse,
  SystemUpdateRequest,
  SystemUpdateResponse,
} from '../types/system.d';

import { requestClient } from '#/api/request';

/**
 * 获取当前 IP 属地库状态
 */
export async function systemIp2regionStatusApi(): Promise<SystemIp2regionStatusResponse> {
  return requestClient.get<SystemIp2regionStatusResponse>(
    '/api/admin/system/ip2region/status',
  );
}

/**
 * 上传 ip2region xdb 并热切换当前进程
 */
export async function systemIp2regionUploadApi(): Promise<SystemIp2regionUploadResponse> {
  return requestClient.post<SystemIp2regionUploadResponse>(
    '/api/admin/system/ip2region/upload',
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
export async function systemUpdateApi(
  params: SystemUpdateRequest,
): Promise<SystemUpdateResponse> {
  return requestClient.post<SystemUpdateResponse>(
    '/api/admin/system/update',
    params,
  );
}
