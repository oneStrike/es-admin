import type {
  CheckInCalendarDetailRequest,
  CheckInCalendarDetailResponse,
  CheckInCalendarOverviewRequest,
  CheckInCalendarOverviewResponse,
  CheckInCalendarSignedUserPageRequest,
  CheckInCalendarSignedUserPageResponse,
  CheckInCalendarUserDetailRequest,
  CheckInCalendarUserDetailResponse,
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
  CheckInStreakRepairRequest,
  CheckInStreakRepairResponse,
  CheckInStreakTerminateRequest,
  CheckInStreakTerminateResponse,
} from '../types/checkIn.d';

import { requestClient } from '#/api/request';

/**
 * 查询签到配置详情
 */
export async function checkInConfigDetailApi(): Promise<CheckInConfigDetailResponse> {
  return requestClient.get<CheckInConfigDetailResponse>(
    '/api/admin/check-in/config/detail',
  );
}

/**
 * 查询目标周期全局签到日历
 */
export async function checkInCalendarDetailApi(
  params: CheckInCalendarDetailRequest,
): Promise<CheckInCalendarDetailResponse> {
  return requestClient.get<CheckInCalendarDetailResponse>(
    '/api/admin/check-in/calendar/detail',
    { params },
  );
}

/**
 * 查询目标周期签到轻量概览
 */
export async function checkInCalendarOverviewApi(
  params: CheckInCalendarOverviewRequest,
): Promise<CheckInCalendarOverviewResponse> {
  return requestClient.get<CheckInCalendarOverviewResponse>(
    '/api/admin/check-in/calendar/overview',
    { params },
  );
}

/**
 * 查询指定用户目标周期签到日历
 */
export async function checkInCalendarUserDetailApi(
  params: CheckInCalendarUserDetailRequest,
): Promise<CheckInCalendarUserDetailResponse> {
  return requestClient.get<CheckInCalendarUserDetailResponse>(
    '/api/admin/check-in/calendar/user/detail',
    { params },
  );
}

/**
 * 分页查询某日已签用户列表
 */
export async function checkInCalendarSignedUserPageApi(
  params: CheckInCalendarSignedUserPageRequest,
): Promise<CheckInCalendarSignedUserPageResponse> {
  return requestClient.get<CheckInCalendarSignedUserPageResponse>(
    '/api/admin/check-in/calendar/signed-user/page',
    { params },
  );
}

/**
 * 更新签到配置
 */
export async function checkInConfigUpdateApi(
  params: CheckInConfigUpdateRequest,
): Promise<CheckInConfigUpdateResponse> {
  return requestClient.post<CheckInConfigUpdateResponse>(
    '/api/admin/check-in/config/update',
    params,
  );
}

/**
 * 更新签到开关
 */
export async function checkInConfigUpdateEnabledApi(
  params: CheckInConfigUpdateEnabledRequest,
): Promise<CheckInConfigUpdateEnabledResponse> {
  return requestClient.post<CheckInConfigUpdateEnabledResponse>(
    '/api/admin/check-in/config/update-enabled',
    params,
  );
}

/**
 * 分页查询连续签到记录
 */
export async function checkInStreakPageApi(
  params?: CheckInStreakPageRequest,
): Promise<CheckInStreakPageResponse> {
  return requestClient.get<CheckInStreakPageResponse>(
    '/api/admin/check-in/streak/page',
    { params },
  );
}

/**
 * 查询连续签到记录详情
 */
export async function checkInStreakDetailApi(
  params: CheckInStreakDetailRequest,
): Promise<CheckInStreakDetailResponse> {
  return requestClient.get<CheckInStreakDetailResponse>(
    '/api/admin/check-in/streak/detail',
    { params },
  );
}

/**
 * 分页查询连续签到记录历史
 */
export async function checkInStreakHistoryPageApi(
  params: CheckInStreakHistoryPageRequest,
): Promise<CheckInStreakHistoryPageResponse> {
  return requestClient.get<CheckInStreakHistoryPageResponse>(
    '/api/admin/check-in/streak/history/page',
    { params },
  );
}

/**
 * 查询连续签到记录历史详情
 */
export async function checkInStreakHistoryDetailApi(
  params: CheckInStreakHistoryDetailRequest,
): Promise<CheckInStreakHistoryDetailResponse> {
  return requestClient.get<CheckInStreakHistoryDetailResponse>(
    '/api/admin/check-in/streak/history/detail',
    { params },
  );
}

/**
 * 发布连续签到记录
 */
export async function checkInStreakPublishApi(
  params: CheckInStreakPublishRequest,
): Promise<CheckInStreakPublishResponse> {
  return requestClient.post<CheckInStreakPublishResponse>(
    '/api/admin/check-in/streak/publish',
    params,
  );
}

/**
 * 终止连续签到记录
 */
export async function checkInStreakTerminateApi(
  params: CheckInStreakTerminateRequest,
): Promise<CheckInStreakTerminateResponse> {
  return requestClient.post<CheckInStreakTerminateResponse>(
    '/api/admin/check-in/streak/terminate',
    params,
  );
}

/**
 * 分页查询签到对账结果
 */
export async function checkInReconciliationPageApi(
  params?: CheckInReconciliationPageRequest,
): Promise<CheckInReconciliationPageResponse> {
  return requestClient.get<CheckInReconciliationPageResponse>(
    '/api/admin/check-in/reconciliation/page',
    { params },
  );
}

/**
 * 补偿签到奖励
 */
export async function checkInReconciliationRepairApi(
  params: CheckInReconciliationRepairRequest,
): Promise<CheckInReconciliationRepairResponse> {
  return requestClient.post<CheckInReconciliationRepairResponse>(
    '/api/admin/check-in/reconciliation/repair',
    params,
  );
}

/**
 * 重算连续签到进度
 */
export async function checkInStreakRepairApi(
  params: CheckInStreakRepairRequest,
): Promise<CheckInStreakRepairResponse> {
  return requestClient.post<CheckInStreakRepairResponse>(
    '/api/admin/check-in/streak/repair',
    params,
  );
}
