import type { GrowthRewardItemDto } from '#/api/types';

import { requestClient } from '#/api/request';

export type CheckInStreakRuleDetailResponse = {
  createdAt: string;
  effectiveFrom: string;
  effectiveTo?: null | string;
  id: number;
  isCurrent: boolean;
  publishStrategy: 1 | 2 | 3;
  repeatable: boolean;
  rewardItems: GrowthRewardItemDto[];
  ruleCode: string;
  status: 0 | 1 | 2 | 3 | 4;
  streakDays: number;
  updatedAt: string;
  version: number;
};

export type CheckInStreakRulePageRequest = {
  orderBy?: string;
  pageIndex?: number;
  pageSize?: number;
  status?: number;
  streakDays?: number;
};

export type CheckInStreakRulePageResponse = {
  list?: CheckInStreakRuleDetailResponse[];
  pageIndex?: number;
  pageSize?: number;
  total?: number;
};

export type CheckInStreakRuleHistoryPageRequest = {
  orderBy?: string;
  pageIndex?: number;
  pageSize?: number;
  streakDays: number;
};

export type CheckInStreakRuleHistoryPageResponse =
  CheckInStreakRulePageResponse;

export type PublishCheckInStreakRuleRequest = {
  effectiveFrom?: string;
  publishStrategy: 1 | 2 | 3;
  repeatable?: boolean;
  rewardItems: GrowthRewardItemDto[];
  streakDays: number;
};

export async function checkInStreakRulePageApi(
  params?: CheckInStreakRulePageRequest,
): Promise<CheckInStreakRulePageResponse> {
  return requestClient.get<CheckInStreakRulePageResponse>(
    '/api/admin/check-in/streak/page',
    { params },
  );
}

export async function checkInStreakRuleDetailApi(params: {
  id: number;
}): Promise<CheckInStreakRuleDetailResponse> {
  return requestClient.get<CheckInStreakRuleDetailResponse>(
    '/api/admin/check-in/streak/detail',
    { params },
  );
}

export async function checkInStreakRuleHistoryPageApi(
  params: CheckInStreakRuleHistoryPageRequest,
): Promise<CheckInStreakRuleHistoryPageResponse> {
  return requestClient.get<CheckInStreakRuleHistoryPageResponse>(
    '/api/admin/check-in/streak/history/page',
    { params },
  );
}

export async function checkInStreakRuleHistoryDetailApi(params: {
  id: number;
}): Promise<CheckInStreakRuleDetailResponse> {
  return requestClient.get<CheckInStreakRuleDetailResponse>(
    '/api/admin/check-in/streak/history/detail',
    { params },
  );
}

export async function checkInStreakRulePublishApi(
  params: PublishCheckInStreakRuleRequest,
): Promise<boolean> {
  return requestClient.post<boolean>('/api/admin/check-in/streak/publish', params);
}

export async function checkInStreakRuleTerminateApi(params: {
  id: number;
}): Promise<boolean> {
  return requestClient.post<boolean>('/api/admin/check-in/streak/terminate', params);
}
