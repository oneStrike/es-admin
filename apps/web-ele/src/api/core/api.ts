import type { ApiHealthResponse, ApiReadyResponse } from '../types/api.d';

import { requestClient } from '#/api/request';

/**
 * GET /api/health
 */
export async function apiHealthApi(): Promise<ApiHealthResponse> {
  return requestClient.get<ApiHealthResponse>('/api/health');
}

/**
 * GET /api/ready
 */
export async function apiReadyApi(): Promise<ApiReadyResponse> {
  return requestClient.get<ApiReadyResponse>('/api/ready');
}
