import type {
  CheckInPlanCreateRequest,
  CheckInPlanCreateResponse,
  CheckInPlanDetailRequest,
  CheckInPlanDetailResponse,
  CheckInPlanPageRequest,
  CheckInPlanPageResponse,
  CheckInPlanRewardConfigCreateRequest,
  CheckInPlanRewardConfigCreateResponse,
  CheckInPlanRewardConfigUpdateRequest,
  CheckInPlanRewardConfigUpdateResponse,
  CheckInPlanUpdateRequest,
  CheckInPlanUpdateResponse,
  CheckInPlanUpdateStatusRequest,
  CheckInPlanUpdateStatusResponse,
  CheckInReconciliationPageRequest,
  CheckInReconciliationPageResponse,
  CheckInReconciliationRepairRequest,
  CheckInReconciliationRepairResponse
} from '../types/checkIn.d'

import { requestClient } from '#/api/request'


  /**
   * 分页查询签到计划
   */
  export async function checkInPlanPageApi(params?: CheckInPlanPageRequest): Promise<CheckInPlanPageResponse> {
    return requestClient.get<CheckInPlanPageResponse>('/api/admin/check-in/plan/page', { params });
  }


  /**
   * 查询签到计划详情
   */
  export async function checkInPlanDetailApi(params: CheckInPlanDetailRequest): Promise<CheckInPlanDetailResponse> {
    return requestClient.get<CheckInPlanDetailResponse>('/api/admin/check-in/plan/detail', { params });
  }


  /**
   * 创建签到计划
   */
  export async function checkInPlanCreateApi(params: CheckInPlanCreateRequest): Promise<CheckInPlanCreateResponse> {
    return requestClient.post<CheckInPlanCreateResponse>('/api/admin/check-in/plan/create', params);
  }


  /**
   * 创建计划奖励配置
   */
  export async function checkInPlanRewardConfigCreateApi(params: CheckInPlanRewardConfigCreateRequest): Promise<CheckInPlanRewardConfigCreateResponse> {
    return requestClient.post<CheckInPlanRewardConfigCreateResponse>('/api/admin/check-in/plan/reward-config/create', params);
  }


  /**
   * 更新签到计划
   */
  export async function checkInPlanUpdateApi(params: CheckInPlanUpdateRequest): Promise<CheckInPlanUpdateResponse> {
    return requestClient.post<CheckInPlanUpdateResponse>('/api/admin/check-in/plan/update', params);
  }


  /**
   * 更新计划奖励配置
   */
  export async function checkInPlanRewardConfigUpdateApi(params: CheckInPlanRewardConfigUpdateRequest): Promise<CheckInPlanRewardConfigUpdateResponse> {
    return requestClient.post<CheckInPlanRewardConfigUpdateResponse>('/api/admin/check-in/plan/reward-config/update', params);
  }


  /**
   * 更新签到计划状态
   */
  export async function checkInPlanUpdateStatusApi(params: CheckInPlanUpdateStatusRequest): Promise<CheckInPlanUpdateStatusResponse> {
    return requestClient.post<CheckInPlanUpdateStatusResponse>('/api/admin/check-in/plan/update-status', params);
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
