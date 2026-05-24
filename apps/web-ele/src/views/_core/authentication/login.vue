<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import type { AuthLoginRequest } from '#/api/types';

import { computed } from 'vue';

import { AuthenticationLogin, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { authCaptchaApi } from '#/api/core';
import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();
const captchaData = ref();

type LoginFormValues = Pick<
  AuthLoginRequest,
  'captcha' | 'password' | 'username'
>;

async function fetchCaptcha() {
  captchaData.value = await authCaptchaApi();
}
fetchCaptcha();

function isLoginFormValues(
  value: Record<string, unknown>,
): value is LoginFormValues {
  return (
    typeof value.username === 'string' &&
    typeof value.password === 'string' &&
    typeof value.captcha === 'string'
  );
}

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: '请输入验证码',
        maxlength: 4,
      },
      wrapperClass: 'w-100',
      suffix: () =>
        h(
          'div',
          {
            class: 'flex items-center',
          },
          [
            // 验证码图片
            h('img', {
              src: captchaData.value?.captcha,
              alt: '验证码',
              class: 'cursor-pointer scale-140 -translate-y-2 ml-6',
              onClick: fetchCaptcha,
              title: '点击刷新验证码',
            }),
          ],
        ),
      fieldName: 'captcha',
      label: '验证码',
      rules: z.string().min(4, { message: '请输入正确的验证码' }),
    },
  ];
});

async function onSubmit(values: Record<string, unknown>) {
  if (!isLoginFormValues(values)) {
    await fetchCaptcha();
    return;
  }

  try {
    const captchaId = captchaData.value?.captchaId;
    if (!captchaId) {
      await fetchCaptcha();
      return;
    }

    await authStore.authLogin({
      ...values,
      captchaId,
    });
  } catch {
    fetchCaptcha();
  }
}
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    :show-code-login="false"
    :show-forget-password="false"
    :show-qrcode-login="false"
    :show-register="false"
    :show-third-party-login="false"
    @submit="onSubmit"
  />
</template>
