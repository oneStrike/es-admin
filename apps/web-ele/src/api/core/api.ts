import { requestClient } from '#/api/request'
import type {
  ApiHealthResponse,
  ApiReadyResponse
} from '../types/api.d'


  /**
   * HealthController_healthCheck
   */
  export async function apiHealthApi(): Promise<ApiHealthResponse> {
    return requestClient.get<ApiHealthResponse>('/api/health');
  }


  /**
   * HealthController_readinessCheck
   */
  export async function apiReadyApi(): Promise<ApiReadyResponse> {
    return requestClient.get<ApiReadyResponse>('/api/ready');
  }
