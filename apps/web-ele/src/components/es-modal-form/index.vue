<script lang="ts" setup>
import type { EsModalFormProps } from './types';

import type { EsFormSchema } from '#/types';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

defineOptions({
  name: 'EsModalForm',
});

const props = withDefaults(defineProps<EsModalFormProps>(), {
  record: () => ({}),
});

const sharedData = ref<Partial<EsModalFormProps>>({
  title: '',
});

const showForm = ref(false);

const modalTitle = computed(() => {
  return sharedData.value.record &&
    Object.keys(sharedData.value.record).length > 0
    ? `编辑${sharedData.value?.title ?? ''}`
    : `新增${sharedData.value?.title ?? ''}`;
});

const [Modal, modalApi] = useVbenModal({
  onConfirm: async () => {
    await formApi.validateAndSubmitForm();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      showForm.value = isOpen;
      sharedData.value = {
        ...props,
        ...modalApi.getData<EsModalFormProps>(),
      };
      sharedData.value.width = sharedData.value?.width || 900;
      modalApi.setState({
        title: modalTitle.value,
      });
      if (sharedData.value?.record) {
        formApi.setValues(sharedData.value.record);
      }
    }
  },
  onClosed() {
    showForm.value = false;
  },
});

const dynamicWrapperClass = computed(() => {
  return `grid-cols-${sharedData.value.cols || 2} gap-x-4`;
});

const normalizedSchema = computed<EsFormSchema>(
  () => (sharedData.value.schema || props.schema || []) as EsFormSchema,
);

const [BaseForm, formApi] = useVbenForm({
  layout: 'vertical',
  showDefaultActions: false,
  wrapperClass: dynamicWrapperClass as unknown as string,
  fieldMappingTime: props.fieldMappingTime,

  handleSubmit: async (values) => {
    modalApi.lock();

    try {
      await props.onSubmit?.({
        ...values,
        id: sharedData.value?.record?.id,
      });
      modalApi.close();
    } finally {
      modalApi.unlock();
    }
  },
});
</script>
<template>
  <Modal
    class="px-4"
    :class="sharedData.cols === 1 ? 'w-[700px]' : 'w-[1000px]'"
  >
    <template #prepend-footer>
      <el-button @click="formApi.resetForm()">重置</el-button>
    </template>
    <BaseForm v-if="showForm" :schema="normalizedSchema" />
  </Modal>
</template>
