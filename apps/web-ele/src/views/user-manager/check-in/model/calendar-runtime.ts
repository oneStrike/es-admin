import type {
  AdminCheckInCalendarDayDto,
  CheckInCalendarDetailRequest,
  CheckInCalendarSignedUserPageRequest,
  CheckInCalendarUserDetailRequest,
  CheckInStreakDetailRequest,
  CheckInStreakHistoryDetailRequest,
} from '#/api/types';

import { dayjs } from '#/utils';

type DateFormatter = {
  format: (template: string) => string;
};

type SignedUserQueryMonthCell = {
  date: string;
  isCurrentMonth?: boolean;
};

export function buildDefaultSignedUserQueryDate(now: DateFormatter = dayjs()) {
  return now.format('YYYY-MM-DD');
}

export function isSignedUserQueryDateVisible(
  targetDate: string,
  today = buildDefaultSignedUserQueryDate(),
) {
  return (
    dayjs(targetDate).startOf('day').valueOf() <=
    dayjs(today).startOf('day').valueOf()
  );
}

export function isMonthSignedUserQueryDateVisible(
  cell: SignedUserQueryMonthCell,
  today = buildDefaultSignedUserQueryDate(),
) {
  return (
    cell.isCurrentMonth === true &&
    isSignedUserQueryDateVisible(cell.date, today)
  );
}

export function resolveCalendarDay(
  days: AdminCheckInCalendarDayDto[],
  targetDate: string,
) {
  return days.find((day) => day.signDate === targetDate);
}

export function buildCalendarDetailRequest(
  targetDate: string,
): CheckInCalendarDetailRequest {
  return { targetDate };
}

export function buildSignedUserPageRequest(
  targetDate: string,
  pageIndex: number,
  pageSize: number,
): CheckInCalendarSignedUserPageRequest {
  return { pageIndex, pageSize, targetDate };
}

export function buildSignedUserGridPageRequest(
  targetDate: string,
  page: { currentPage?: number; pageSize?: number },
  fallbackPageSize = 15,
): CheckInCalendarSignedUserPageRequest {
  return buildSignedUserPageRequest(
    targetDate,
    page.currentPage || 1,
    page.pageSize || fallbackPageSize,
  );
}

export function buildCalendarUserDetailRequest(
  targetDate: string,
  userId: number,
): CheckInCalendarUserDetailRequest {
  return { targetDate, userId };
}

export function buildStreakDetailRequest(
  id: number,
): CheckInStreakDetailRequest {
  return { id };
}

export function buildStreakHistoryDetailRequest(
  id: number,
): CheckInStreakHistoryDetailRequest {
  return { id };
}

export function isPositiveIntegerUserId(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return false;
  }

  const numericValue = Number(value);
  return Number.isInteger(numericValue) && numericValue > 0;
}

export function parsePositiveIntegerUserId(value: unknown) {
  return isPositiveIntegerUserId(value) ? Number(value) : undefined;
}
