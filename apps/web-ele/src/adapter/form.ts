import type {
  VbenFormSchema as FormSchema,
  VbenFormProps,
} from '@vben/common-ui';

import type { ComponentType } from './component';

import { setupVbenForm, useVbenForm as useForm, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

async function initSetupVbenForm() {
  setupVbenForm<ComponentType>({
    config: {
      modelPropNameMap: {
        Upload: 'fileList',
        CheckboxGroup: 'model-value',
      },
    },
    defineRules: {
      required: (value: any, _params: any, ctx: any) => {
        if (value === undefined || value === null || value.length === 0) {
          return $t('ui.formRules.required', [ctx.label]);
        }
        return true;
      },
      selectRequired: (value: any, _params: any, ctx: any) => {
        if (value === undefined || value === null || value.length === 0) {
          return $t('ui.formRules.selectRequired', [ctx.label]);
        }
        return true;
      },
      arrayRequired: (value: any, _params: any, ctx: any) => {
        if (
          value === undefined ||
          value === null ||
          !Array.isArray(value) ||
          value.length === 0
        ) {
          return $t('ui.formRules.arrayRequired', [ctx.label]);
        }
        return true;
      },
      uploadRequired: (value: any, _params: any, ctx: any) => {
        // 处理上传组件的值，可能是数组、对象或字符串
        if (value === undefined || value === null) {
          return $t('ui.formRules.uploadRequired', [ctx.label]);
        }

        // 如果是数组（文件列表），检查是否为空
        if (Array.isArray(value)) {
          if (value.length === 0) {
            return $t('ui.formRules.uploadRequired', [ctx.label]);
          }
          // 检查数组中是否有有效的文件项
          const hasValidFile = value.some(
            (item) =>
              item && (item.url || item.response?.url || item.name || item.uid),
          );
          if (!hasValidFile) {
            return $t('ui.formRules.uploadRequired', [ctx.label]);
          }
        } else if (typeof value === 'object') {
          // 如果是对象，检查是否有有效属性
          const hasValidProperty =
            value.url || value.response?.url || value.name || value.uid;
          if (!hasValidProperty) {
            return $t('ui.formRules.uploadRequired', [ctx.label]);
          }
        } else if (
          typeof value === 'string' && // 如果是字符串（URL），检查是否为空
          value.trim() === ''
        ) {
          return $t('ui.formRules.uploadRequired', [ctx.label]);
        }

        return true;
      },
    },
  });
}

const useVbenForm = useForm<ComponentType>;

export { initSetupVbenForm, useVbenForm, z };

export type VbenFormSchema = FormSchema<ComponentType>;
export type { VbenFormProps };
