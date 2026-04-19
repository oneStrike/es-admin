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
  CheckInStreakRoundDetailResponse,
  CheckInStreakRoundHistoryDetailRequest,
  CheckInStreakRoundHistoryDetailResponse,
  CheckInStreakRoundHistoryPageRequest,
  CheckInStreakRoundHistoryPageResponse,
  CheckInStreakRoundUpdateRequest,
  CheckInStreakRoundUpdateResponse
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
   * 查询当前连续奖励轮次详情
   */
  export async function checkInStreakRoundDetailApi(): Promise<CheckInStreakRoundDetailResponse> {
    return requestClient.get<CheckInStreakRoundDetailResponse>('/api/admin/check-in/streak-round/detail');
  }


  /**
   * 更新连续奖励轮次配置
   */
  export async function checkInStreakRoundUpdateApi(params: CheckInStreakRoundUpdateRequest): Promise<CheckInStreakRoundUpdateResponse> {
    return requestClient.post<CheckInStreakRoundUpdateResponse>('/api/admin/check-in/streak-round/update', params);
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


  /**
   * 分页查询连续奖励轮次历史
   */
  export async function checkInStreakRoundHistoryPageApi(params?: CheckInStreakRoundHistoryPageRequest): Promise<CheckInStreakRoundHistoryPageResponse> {
    return requestClient.get<CheckInStreakRoundHistoryPageResponse>('/api/admin/check-in/streak-round/history/page', { params });
  }


  /**
   * 查询连续奖励轮次历史详情
   */
  export async function checkInStreakRoundHistoryDetailApi(params: CheckInStreakRoundHistoryDetailRequest): Promise<CheckInStreakRoundHistoryDetailResponse> {
    return requestClient.get<CheckInStreakRoundHistoryDetailResponse>('/api/admin/check-in/streak-round/history/detail', { params });
  }
