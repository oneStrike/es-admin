import type {
  CheckInConfigDetailResponse,
  CheckInConfigUpdateEnabledRequest,
  CheckInConfigUpdateEnabledResponse,
  CheckInConfigUpdateRequest,
  CheckInConfigUpdateResponse,
  CheckInReconciliationPageRequest,
  CheckInReconciliationPageResponse,
  CheckInReconciliationRepairRequest,
  CheckInReconciliationRepairResponse,
  CheckInStreakDetailRequest,
  CheckInStreakDetailResponse,
  CheckInStreakHistoryDetailRequest,
  CheckInStreakHistoryDetailResponse,
  CheckInStreakHistoryPageRequest,
  CheckInStreakHistoryPageResponse,
  CheckInStreakPageRequest,
  CheckInStreakPageResponse,
  CheckInStreakPublishRequest,
  CheckInStreakPublishResponse,
  CheckInStreakTerminateRequest,
  CheckInStreakTerminateResponse
} from '../types/checkIn.d'

import { requestClient } from '#/api/request'


  /**
   * 查询签到配置详情
   */
  export async function checkInConfigDetailApi(): Promise<CheckInConfigDetailResponse> {
    return requestClient.get<CheckInConfigDetailResponse>('/api/admin/check-in/config/detail');
  }


  /**
   * 更新签到配置
   */
  export async function checkInConfigUpdateApi(params: CheckInConfigUpdateRequest): Promise<CheckInConfigUpdateResponse> {
    return requestClient.post<CheckInConfigUpdateResponse>('/api/admin/check-in/config/update', params);
  }


  /**
   * 更新签到开关
   */
  export async function checkInConfigUpdateEnabledApi(params: CheckInConfigUpdateEnabledRequest): Promise<CheckInConfigUpdateEnabledResponse> {
    return requestClient.post<CheckInConfigUpdateEnabledResponse>('/api/admin/check-in/config/update-enabled', params);
  }


  /**
   * 分页查询连续签到记录
   */
  export async function checkInStreakPageApi(params?: CheckInStreakPageRequest): Promise<CheckInStreakPageResponse> {
    return requestClient.get<CheckInStreakPageResponse>('/api/admin/check-in/streak/page', { params });
  }


  /**
   * 查询连续签到记录详情
   */
  export async function checkInStreakDetailApi(params: CheckInStreakDetailRequest): Promise<CheckInStreakDetailResponse> {
    return requestClient.get<CheckInStreakDetailResponse>('/api/admin/check-in/streak/detail', { params });
  }


  /**
   * 分页查询连续签到记录历史
   */
  export async function checkInStreakHistoryPageApi(params: CheckInStreakHistoryPageRequest): Promise<CheckInStreakHistoryPageResponse> {
    return requestClient.get<CheckInStreakHistoryPageResponse>('/api/admin/check-in/streak/history/page', { params });
  }


  /**
   * 查询连续签到记录历史详情
   */
  export async function checkInStreakHistoryDetailApi(params: CheckInStreakHistoryDetailRequest): Promise<CheckInStreakHistoryDetailResponse> {
    return requestClient.get<CheckInStreakHistoryDetailResponse>('/api/admin/check-in/streak/history/detail', { params });
  }


  /**
   * 发布连续签到记录
   */
  export async function checkInStreakPublishApi(params: CheckInStreakPublishRequest): Promise<CheckInStreakPublishResponse> {
    return requestClient.post<CheckInStreakPublishResponse>('/api/admin/check-in/streak/publish', params);
  }


  /**
   * 终止连续签到记录
   */
  export async function checkInStreakTerminateApi(params: CheckInStreakTerminateRequest): Promise<CheckInStreakTerminateResponse> {
    return requestClient.post<CheckInStreakTerminateResponse>('/api/admin/check-in/streak/terminate', params);
  }


  /**
   * 分页查询签到对账结果
   */
  export async function checkInReconciliationPageApi(params?: CheckInReconciliationPageRequest): Promise<CheckInReconciliationPageResponse> {
    return requestClient.get<CheckInReconciliationPageResponse>('/api/admin/check-in/reconciliation/page', { params });
  }


  /**
   * 补偿签到奖励
   */
  export async function checkInReconciliationRepairApi(params: CheckInReconciliationRepairRequest): Promise<CheckInReconciliationRepairResponse> {
    return requestClient.post<CheckInReconciliationRepairResponse>('/api/admin/check-in/reconciliation/repair', params);
  }
