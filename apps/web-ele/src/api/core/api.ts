import { requestClient } from '#/api/request'

  /**
   * HealthController_healthCheck
   */
  export async function apiHealthApi(): Promise<any> {
    return requestClient.get<any>('/api/health');
  }


  /**
   * HealthController_readinessCheck
   */
  export async function apiReadyApi(): Promise<any> {
    return requestClient.get<any>('/api/ready');
  }
