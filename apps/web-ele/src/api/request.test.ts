import { beforeEach, describe, expect, it, vi } from 'vitest';

interface MockAccessStore {
  accessToken: null | string;
  isAccessChecked: boolean;
  loginExpired: boolean;
  refreshToken: null | string;
  setAccessToken: ReturnType<typeof vi.fn<(token: null | string) => void>>;
  setLoginExpired: ReturnType<typeof vi.fn<(loginExpired: boolean) => void>>;
  setRefreshToken: ReturnType<typeof vi.fn<(token: null | string) => void>>;
}

interface MockRequestConfig {
  headers: Record<string, unknown>;
  method?: string;
  url?: string;
  [key: string]: unknown;
}

interface MockResponse {
  config: MockRequestConfig;
  data: unknown;
  headers: Record<string, unknown>;
  status: number;
  statusText: string;
}

const { accessStore, authStore, messageError } = vi.hoisted(() => {
  const accessStore: MockAccessStore = {
    accessToken: 'expired-access-token',
    isAccessChecked: false,
    loginExpired: false,
    refreshToken: 'expired-refresh-token',
    setAccessToken: vi.fn((token: null | string) => {
      accessStore.accessToken = token;
    }),
    setLoginExpired: vi.fn((loginExpired: boolean) => {
      accessStore.loginExpired = loginExpired;
    }),
    setRefreshToken: vi.fn((token: null | string) => {
      accessStore.refreshToken = token;
    }),
  };

  return {
    accessStore,
    authStore: {
      logout: vi.fn().mockResolvedValue(undefined),
    },
    messageError: vi.fn(),
  };
});

vi.mock('@vben/hooks', () => ({
  useAppConfig: () => ({
    apiURL: '',
  }),
}));

vi.mock('@vben/preferences', () => ({
  preferences: {
    app: {
      enableRefreshToken: true,
      locale: 'zh-CN',
      loginExpiredMode: 'page',
    },
  },
}));

vi.mock('@vben/stores', () => ({
  useAccessStore: () => accessStore,
}));

vi.mock('#/hooks/useFeedback', () => ({
  useMessage: {
    error: messageError,
  },
}));

vi.mock('#/store', () => ({
  useAuthStore: () => authStore,
}));

async function settleWithin<T>(promise: Promise<T>, timeout = 100) {
  return Promise.race([
    promise.then(
      (value) => ({ status: 'resolved' as const, value }),
      (error: unknown) => ({ status: 'rejected' as const, error }),
    ),
    new Promise<{ status: 'timeout' }>((resolve) => {
      setTimeout(() => resolve({ status: 'timeout' }), timeout);
    }),
  ]);
}

function createRejectedResponse(
  config: MockRequestConfig,
  status: number,
  data: unknown,
) {
  return Promise.reject({
    config,
    isAxiosError: true,
    message: `Request failed with status code ${status}`,
    response: {
      config,
      data,
      headers: {},
      status,
      statusText: status === 401 ? 'Unauthorized' : 'Error',
    },
  });
}

function createResolvedResponse(config: MockRequestConfig, data: unknown) {
  return Promise.resolve<MockResponse>({
    config,
    data,
    headers: {},
    status: 200,
    statusText: 'OK',
  });
}

function createAdapter(
  routes: Array<{
    data: unknown;
    method: string;
    status: number;
    url: string;
  }>,
): (config: MockRequestConfig) => Promise<MockResponse> {
  return (config: MockRequestConfig) => {
    const matchedRoute = routes.find(
      (route) =>
        route.method === config.method?.toUpperCase() &&
        route.url === config.url,
    );

    if (!matchedRoute) {
      return createRejectedResponse(config, 404, {
        code: 10_004,
        data: null,
        message: 'not found',
      });
    }

    if (matchedRoute.status >= 200 && matchedRoute.status < 300) {
      return createResolvedResponse(config, matchedRoute.data);
    }

    return createRejectedResponse(
      config,
      matchedRoute.status,
      matchedRoute.data,
    );
  };
}

describe('requestClient refresh fallback', () => {
  beforeEach(() => {
    vi.resetModules();

    accessStore.accessToken = 'expired-access-token';
    accessStore.refreshToken = 'expired-refresh-token';
    accessStore.isAccessChecked = false;
    accessStore.loginExpired = false;
    accessStore.setAccessToken.mockClear();
    accessStore.setLoginExpired.mockClear();
    accessStore.setRefreshToken.mockClear();

    authStore.logout.mockReset();
    authStore.logout.mockResolvedValue(undefined);
    messageError.mockReset();
  });

  it('logs out instead of hanging when refresh token request also returns 401', async () => {
    const { authRequestClient, requestClient } = await import('./request');

    requestClient.instance.defaults.adapter = createAdapter([
      {
        data: {
          code: 10_002,
          data: null,
          message: 'unauthorized',
        },
        method: 'GET',
        status: 401,
        url: '/api/admin/system-user/profile',
      },
      {
        data: {
          code: 10_002,
          data: null,
          message: 'should not reuse the authenticated client',
        },
        method: 'POST',
        status: 401,
        url: '/api/admin/auth/token/refresh',
      },
    ]) as never;

    authRequestClient.instance.defaults.adapter = createAdapter([
      {
        data: {
          code: 10_002,
          data: null,
          message: 'refresh expired',
        },
        method: 'POST',
        status: 401,
        url: '/api/admin/auth/token/refresh',
      },
    ]) as never;

    const result = await settleWithin(
      requestClient.get('/api/admin/system-user/profile'),
    );

    expect(result.status).toBe('rejected');
    expect(authStore.logout).toHaveBeenCalledTimes(1);

    if (result.status === 'rejected') {
      expect(result.error).toBeInstanceOf(Error);
      expect((result.error as Error).message).toBe('refresh expired');
    }
  });
});
