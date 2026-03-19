import { requestClient } from '#/api/request';

/**
 * HealthController_healthCheck
 */
export async function apiHealthApi(
  params: ApiHealthRequest,
): Promise<ApiHealthResponse> {
  return requestClient.get<ApiHealthResponse>('/api/health', { params });
}

/**
 * HealthController_readinessCheck
 */
export async function apiReadyApi(
  params: ApiReadyRequest,
): Promise<ApiReadyResponse> {
  return requestClient.get<ApiReadyResponse>('/api/ready', { params });
}
