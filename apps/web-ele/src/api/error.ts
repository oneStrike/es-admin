export const API_SUCCESS_CODE = 0;

export const API_BAD_REQUEST_CODE = 10_001;
export const API_UNAUTHORIZED_CODE = 10_002;
export const API_FORBIDDEN_CODE = 10_003;
export const API_ROUTE_NOT_FOUND_CODE = 10_004;
export const API_PAYLOAD_TOO_LARGE_CODE = 10_005;
export const API_RATE_LIMITED_CODE = 10_006;

export const API_RESOURCE_NOT_FOUND_CODE = 20_001;
export const API_RESOURCE_ALREADY_EXISTS_CODE = 20_002;
export const API_STATE_CONFLICT_CODE = 20_003;
export const API_OPERATION_NOT_ALLOWED_CODE = 20_004;
export const API_QUOTA_NOT_ENOUGH_CODE = 20_005;

export const API_INTERNAL_SERVER_ERROR_CODE = 50_001;

type ApiErrorKind = 'business' | 'transport';

interface ApiResponse<T = unknown> {
  code: number;
  data: null | T;
  message: string;
}

interface NormalizedApiError extends Error {
  code: number;
  data: unknown;
  httpStatus: number;
  kind: ApiErrorKind;
  raw: unknown;
}

const BUSINESS_ERROR_CODES = new Set([
  API_OPERATION_NOT_ALLOWED_CODE,
  API_QUOTA_NOT_ENOUGH_CODE,
  API_RESOURCE_ALREADY_EXISTS_CODE,
  API_RESOURCE_NOT_FOUND_CODE,
  API_STATE_CONFLICT_CODE,
]);

const TRANSPORT_ERROR_CODES = new Set([
  API_BAD_REQUEST_CODE,
  API_FORBIDDEN_CODE,
  API_INTERNAL_SERVER_ERROR_CODE,
  API_PAYLOAD_TOO_LARGE_CODE,
  API_RATE_LIMITED_CODE,
  API_ROUTE_NOT_FOUND_CODE,
  API_UNAUTHORIZED_CODE,
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isApiResponse<T = unknown>(value: unknown): value is ApiResponse<T> {
  return (
    isRecord(value) &&
    typeof value.code === 'number' &&
    'data' in value &&
    typeof value.message === 'string'
  );
}

function isKnownApiCode(code: number) {
  return (
    code === API_SUCCESS_CODE ||
    BUSINESS_ERROR_CODES.has(code) ||
    TRANSPORT_ERROR_CODES.has(code)
  );
}

function createApiError({
  code,
  data = null,
  httpStatus,
  kind,
  message,
  raw,
}: {
  code: number;
  data?: unknown;
  httpStatus: number;
  kind: ApiErrorKind;
  message: string;
  raw: unknown;
}): NormalizedApiError {
  const error = new Error(message) as NormalizedApiError;

  error.name = 'NormalizedApiError';
  error.code = code;
  error.data = data;
  error.httpStatus = httpStatus;
  error.kind = kind;
  error.raw = raw;

  return error;
}

function mapHttpStatusToCode(httpStatus: number) {
  switch (httpStatus) {
    case 400: {
      return API_BAD_REQUEST_CODE;
    }
    case 401: {
      return API_UNAUTHORIZED_CODE;
    }
    case 403: {
      return API_FORBIDDEN_CODE;
    }
    case 404: {
      return API_ROUTE_NOT_FOUND_CODE;
    }
    case 413: {
      return API_PAYLOAD_TOO_LARGE_CODE;
    }
    case 429: {
      return API_RATE_LIMITED_CODE;
    }
    default: {
      return API_INTERNAL_SERVER_ERROR_CODE;
    }
  }
}

function getRawMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (!isRecord(error)) {
    return '';
  }

  if (typeof error.message === 'string' && error.message) {
    return error.message;
  }

  if (typeof error.error === 'string' && error.error) {
    return error.error;
  }

  return '';
}

function createMalformedResponseError(raw: unknown, httpStatus: number) {
  return createApiError({
    code: API_INTERNAL_SERVER_ERROR_CODE,
    httpStatus,
    kind: 'transport',
    message: '接口响应格式不合法',
    raw,
  });
}

function isNormalizedApiError(error: unknown): error is NormalizedApiError {
  return (
    error instanceof Error &&
    isRecord(error) &&
    typeof error.code === 'number' &&
    typeof error.httpStatus === 'number' &&
    (error.kind === 'business' || error.kind === 'transport') &&
    'raw' in error
  );
}

function unwrapApiResponse<T>(payload: unknown, httpStatus: number): null | T {
  if (!isApiResponse<T>(payload)) {
    throw createMalformedResponseError(payload, httpStatus);
  }

  if (payload.code === API_SUCCESS_CODE) {
    return payload.data;
  }

  if (httpStatus === 200 && BUSINESS_ERROR_CODES.has(payload.code)) {
    throw createApiError({
      code: payload.code,
      data: payload.data,
      httpStatus,
      kind: 'business',
      message: payload.message,
      raw: payload,
    });
  }

  const transportCode = isKnownApiCode(payload.code)
    ? payload.code
    : mapHttpStatusToCode(httpStatus);

  throw createApiError({
    code: transportCode,
    data: payload.data,
    httpStatus,
    kind: 'transport',
    message: payload.message || '请求失败',
    raw: payload,
  });
}

function normalizeApiClientError(error: unknown): NormalizedApiError {
  if (isNormalizedApiError(error)) {
    return error;
  }

  const response = isRecord(error) && isRecord(error.response)
    ? error.response
    : undefined;
  const httpStatus =
    typeof response?.status === 'number' ? response.status : 0;
  const responseData = response?.data;

  if (isApiResponse(responseData)) {
    const code =
      httpStatus === 200 && BUSINESS_ERROR_CODES.has(responseData.code)
        ? responseData.code
        : (isKnownApiCode(responseData.code)
          ? responseData.code
          : mapHttpStatusToCode(httpStatus));

    return createApiError({
      code,
      data: responseData.data,
      httpStatus,
      kind:
        httpStatus === 200 && BUSINESS_ERROR_CODES.has(code)
          ? 'business'
          : 'transport',
      message: responseData.message || '请求失败',
      raw: error,
    });
  }

  if (httpStatus >= 200 && httpStatus < 300) {
    return createMalformedResponseError(error, httpStatus);
  }

  return createApiError({
    code: mapHttpStatusToCode(httpStatus),
    httpStatus,
    kind: 'transport',
    message: getRawMessage(error) || '请求失败',
    raw: error,
  });
}

function getApiErrorMessage(error: unknown, fallback = '') {
  const message = isNormalizedApiError(error)
    ? error.message
    : getRawMessage(error);

  if (!message) {
    return fallback;
  }

  const shouldUseFallback =
    message === 'Network Error' ||
    message.includes('timeout') ||
    /^Request failed with status code \d+$/.test(message);

  return shouldUseFallback ? fallback || message : message;
}

function isBusinessApiError(error: unknown): error is NormalizedApiError {
  return isNormalizedApiError(error) && error.kind === 'business';
}

function isTransportApiError(error: unknown): error is NormalizedApiError {
  return isNormalizedApiError(error) && error.kind === 'transport';
}

export type { ApiErrorKind, ApiResponse, NormalizedApiError };
export {
  BUSINESS_ERROR_CODES,
  getApiErrorMessage,
  isBusinessApiError,
  isNormalizedApiError,
  isTransportApiError,
  mapHttpStatusToCode,
  normalizeApiClientError,
  TRANSPORT_ERROR_CODES,
  unwrapApiResponse,
};
