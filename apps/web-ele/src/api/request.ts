/**
 * 该文件可自行根据业务逻辑进行调整
 */
import type { RequestClientOptions, RequestResponse } from '@vben/request';

import { useAppConfig } from '@vben/hooks';
import { preferences } from '@vben/preferences';
import {
  authenticateResponseInterceptor,
  errorMessageResponseInterceptor,
  RequestClient,
} from '@vben/request';
import { useAccessStore } from '@vben/stores';

import { authTokenRefreshApi } from '#/api/core';
import {
  getApiErrorMessage,
  normalizeApiClientError,
  unwrapApiResponse,
} from '#/api/error';
import { useMessage } from '#/hooks/useFeedback';
import { useAuthStore } from '#/store';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

function createRequestClient(
  baseURL: string,
  options?: RequestClientOptions,
  config: {
    enableAuthenticationInterceptor?: boolean;
  } = {},
) {
  const client = new RequestClient({
    ...options,
    baseURL,
  });
  const { enableAuthenticationInterceptor = true } = config;

  /**
   * 重新认证逻辑
   */
  async function doReAuthenticate() {
    console.warn('Access token or refresh token is invalid or expired. ');
    const accessStore = useAccessStore();
    const authStore = useAuthStore();

    if (
      preferences.app.loginExpiredMode === 'modal' &&
      accessStore.isAccessChecked
    ) {
      accessStore.setLoginExpired(true);
    } else if (accessStore.refreshToken && accessStore.accessToken) {
      await authStore.logout();
    }
  }

  /**
   * 刷新token逻辑
   */
  async function doRefreshToken() {
    const accessStore = useAccessStore();
    const resp = await authTokenRefreshApi({
      refreshToken: accessStore.refreshToken as string,
    });
    const { accessToken, refreshToken } = resp;
    accessStore.setAccessToken(accessToken);
    accessStore.setRefreshToken(refreshToken);
    return accessToken;
  }

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null;
  }

  function normalizeResponseData(response: RequestResponse) {
    const { config, data: responseData, status } = response;

    if (config.responseReturn === 'raw') {
      return response;
    }

    if (config.responseReturn === 'body') {
      return responseData;
    }

    return unwrapApiResponse(responseData, status);
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore();
      const accessToken = config.url?.includes('logout')
        ? config.data.accessToken || ''
        : accessStore.accessToken || '';

      config.headers.Authorization = formatToken(accessToken);
      config.headers['Accept-Language'] = preferences.app.locale;
      return config;
    },
  });

  // 处理返回的响应数据格式
  client.addResponseInterceptor({
    fulfilled: normalizeResponseData,
  });

  // token过期的处理
  if (enableAuthenticationInterceptor) {
    client.addResponseInterceptor(
      authenticateResponseInterceptor({
        client,
        doReAuthenticate,
        doRefreshToken,
        enableRefreshToken: preferences.app.enableRefreshToken,
        formatToken,
      }),
    );
  }

  client.addResponseInterceptor({
    rejected: (error) => {
      throw normalizeApiClientError(error);
    },
  });

  // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      useMessage.error(getApiErrorMessage(error, msg));
    }),
  );

  return client;
}

export const requestClient = createRequestClient(apiURL, {
  responseReturn: 'data',
});

export const authRequestClient = createRequestClient(
  apiURL,
  {
    responseReturn: 'data',
  },
  {
    enableAuthenticationInterceptor: false,
  },
);

export const baseRequestClient = new RequestClient({ baseURL: apiURL });
