<script setup lang="ts">
import type { SystemConfigDto } from '#/api/types';

import { computed, onMounted, ref, watch } from 'vue';

import { Page } from '@vben/common-ui';

import { ElMenu, ElMenuItem, ElScrollbar } from 'element-plus';
import forge from 'node-forge';

import { useVbenForm } from '#/adapter/form';
import {
  systemConfigDetailApi,
  systemConfigUpdateApi,
} from '#/api/core/health/system';
import { useMessage } from '#/hooks/useFeedback';
import { useAuthStore } from '#/store';

import {
  aliyunFormSchema,
  contentReviewFormSchema,
  maintenanceFormSchema,
  siteFormSchema,
} from './modules/model/shared';

defineOptions({
  name: 'SystemConfig',
});

const loading = ref(false);
const authStore = useAuthStore();
const activeMenu = ref('site');

const menuItems = [
  { key: 'site', label: '站点配置' },
  { key: 'maintenance', label: '维护模式' },
  { key: 'aliyun', label: '阿里云配置' },
  { key: 'contentReview', label: '内容审核' },
];

const currentSchema = computed(() => {
  switch (activeMenu.value) {
    case 'aliyun': {
      return aliyunFormSchema;
    }
    case 'contentReview': {
      return contentReviewFormSchema;
    }
    case 'maintenance': {
      return maintenanceFormSchema;
    }
    default: {
      return siteFormSchema;
    }
  }
});

const [Form, formApi] = useVbenForm({
  schema: currentSchema.value,
  layout: 'horizontal',
  wrapperClass: 'grid-cols-1 gap-8',
  commonConfig: {
    formItemClass: 'max-w-xl',
  },
  actionPosition: 'left',
  handleSubmit: async (values) => {
    await handleSaveConfig(values);
  },
  handleReset: async () => {
    await loadConfig();
  },
});

// 缓存完整配置数据
const configData = ref<SystemConfigDto>({});

// 当切换菜单时更新表单
watch(activeMenu, async () => {
  formApi.setState({ schema: currentSchema.value });
  await formApi.resetForm();
  await updateFormValues();
});

async function loadConfig() {
  loading.value = true;
  try {
    const result = await systemConfigDetailApi();
    configData.value = result;
    await updateFormValues();
  } finally {
    loading.value = false;
  }
}

async function updateFormValues() {
  const values: Record<string, any> = {};

  switch (activeMenu.value) {
    case 'aliyun': {
      const aliyunConfig = configData.value.aliyunConfig || {};
      values.accessKeyId = aliyunConfig.accessKeyId;
      values.accessKeySecret = aliyunConfig.accessKeySecret;
      const sms = aliyunConfig.sms || {};
      values.smsEndpoint = sms.endpoint;
      values.smsSignName = sms.signName;
      values.smsVerifyCodeLength = sms.verifyCodeLength;
      values.smsVerifyCodeExpire = sms.verifyCodeExpire;
      break;
    }
    case 'contentReview': {
      const policy = configData.value.contentReviewPolicy || {};
      values.recordHits = policy.recordHits;
      const light = policy.lightAction || {};
      values.lightActionIsHidden = light.isHidden;
      values.lightActionAuditStatus = light.auditStatus;
      const general = policy.generalAction || {};
      values.generalActionIsHidden = general.isHidden;
      values.generalActionAuditStatus = general.auditStatus;
      const severe = policy.severeAction || {};
      values.severeActionIsHidden = severe.isHidden;
      values.severeActionAuditStatus = severe.auditStatus;
      break;
    }
    case 'maintenance': {
      const maintenanceConfig = configData.value.maintenanceConfig || {};
      values.enableMaintenanceMode = maintenanceConfig.enableMaintenanceMode;
      values.maintenanceMessage = maintenanceConfig.maintenanceMessage;
      break;
    }
    default: {
      const siteConfig = configData.value.siteConfig || {};
      values.siteName = siteConfig.siteName;
      values.siteDescription = siteConfig.siteDescription;
      values.siteKeywords = siteConfig.siteKeywords;
      values.siteLogo = siteConfig.siteLogo;
      values.siteFavicon = siteConfig.siteFavicon;
      values.contactEmail = siteConfig.contactEmail;
      values.icpNumber = siteConfig.icpNumber;
      break;
    }
  }

  await formApi.setValues(values);
}

function encryptValue(value: string, publicKey: string) {
  const publicKeyPem = forge.pki.publicKeyFromPem(publicKey);
  const encrypted = publicKeyPem.encrypt(value, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha256.create(),
    },
  });
  return forge.util.encode64(encrypted);
}

async function handleSaveConfig(values: Record<string, any>) {
  loading.value = true;
  try {
    // 构建提交数据，保留原有数据
    const submitData: SystemConfigDto = {
      ...configData.value,
    };

    // 根据当前菜单更新对应配置
    switch (activeMenu.value) {
      case 'aliyun': {
        // 加密敏感字段
        const publicKey = await authStore.getRsaPublicKey();
        const encryptedAccessKeyId = values.accessKeyId
          ? encryptValue(values.accessKeyId, publicKey)
          : configData.value.aliyunConfig?.accessKeyId;
        const encryptedAccessKeySecret = values.accessKeySecret
          ? encryptValue(values.accessKeySecret, publicKey)
          : configData.value.aliyunConfig?.accessKeySecret;

        submitData.aliyunConfig = {
          ...configData.value.aliyunConfig,
          accessKeyId: encryptedAccessKeyId,
          accessKeySecret: encryptedAccessKeySecret,
          sms: {
            ...configData.value.aliyunConfig?.sms,
            endpoint: values.smsEndpoint,
            signName: values.smsSignName,
            verifyCodeLength: values.smsVerifyCodeLength,
            verifyCodeExpire: values.smsVerifyCodeExpire,
          },
        };
        break;
      }
      case 'contentReview': {
        submitData.contentReviewPolicy = {
          ...configData.value.contentReviewPolicy,
          recordHits: values.recordHits,
          lightAction: {
            ...configData.value.contentReviewPolicy?.lightAction,
            isHidden: values.lightActionIsHidden,
            auditStatus: values.lightActionAuditStatus,
          },
          generalAction: {
            ...configData.value.contentReviewPolicy?.generalAction,
            isHidden: values.generalActionIsHidden,
            auditStatus: values.generalActionAuditStatus,
          },
          severeAction: {
            ...configData.value.contentReviewPolicy?.severeAction,
            isHidden: values.severeActionIsHidden,
            auditStatus: values.severeActionAuditStatus,
          },
        };
        break;
      }
      case 'maintenance': {
        submitData.maintenanceConfig = {
          ...configData.value.maintenanceConfig,
          enableMaintenanceMode: values.enableMaintenanceMode,
          maintenanceMessage: values.maintenanceMessage,
        };
        break;
      }
      default: {
        submitData.siteConfig = {
          ...configData.value.siteConfig,
          siteName: values.siteName,
          siteDescription: values.siteDescription,
          siteKeywords: values.siteKeywords,
          siteLogo: values.siteLogo,
          siteFavicon: values.siteFavicon,
          contactEmail: values.contactEmail,
          icpNumber: values.icpNumber,
        };
        break;
      }
    }

    await systemConfigUpdateApi(submitData);
    useMessage.success('配置保存成功');
    await loadConfig();
  } finally {
    loading.value = false;
  }
}

async function handleMenuSelect(key: string) {
  activeMenu.value = key;
}

onMounted(() => {
  loadConfig();
});
</script>

<template>
  <Page auto-content-height title="系统配置">
    <div class="flex h-full overflow-hidden rounded-lg bg-white shadow">
      <!-- 左侧导航菜单 -->
      <div class="w-48 flex-shrink-0 border-r border-gray-200 bg-gray-50">
        <ElScrollbar>
          <ElMenu
            :default-active="activeMenu"
            class="border-r-0!"
            @select="handleMenuSelect"
          >
            <ElMenuItem
              v-for="item in menuItems"
              :key="item.key"
              :index="item.key"
            >
              <span>{{ item.label }}</span>
            </ElMenuItem>
          </ElMenu>
        </ElScrollbar>
      </div>

      <!-- 右侧表单内容 -->
      <div class="flex-1 overflow-auto p-6">
        <Form :loading="loading" />
      </div>
    </div>
  </Page>
</template>
