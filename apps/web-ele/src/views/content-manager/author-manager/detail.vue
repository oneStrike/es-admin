<script setup lang="ts">
import type { BaseAuthorDto } from '#/apis/types/author';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { authorDetailApi } from '#/apis';
import { formatUTC } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import { genderMap, typeOptions } from './shared';

defineOptions({ name: 'AuthorDetail' });

defineProps<{
  registerModal?: any;
}>();

// 使用父组件传递的 Modal 实例
const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      getDetail();
    }
  },
  onConfirm() {
    modalApi.close();
  },
});

// 向父组件暴露 modalApi 实例
defineExpose({
  setData: modalApi.setData,
  open: modalApi.open,
  close: modalApi.close,
});

const detail = ref<BaseAuthorDto>();
const loading = ref(false);

const nationality = ref();
async function getDetail() {
  try {
    loading.value = true;
    const { recordId, nationalityMap } = modalApi.getData<{
      nationalityMap: Record<string, any>;
      recordId: number;
    }>();
    detail.value = await authorDetailApi({ id: recordId });
    nationality.value = nationalityMap;
  } finally {
    loading.value = false;
  }
}

// 解析作者类型
const authorTypes = computed(() => {
  return getOptionLabel(typeOptions, detail.value!.type);
});

// 详情卡片配置
const detailCards = computed(() => [
  {
    title: '基本信息',
    show: true,
    fields: [
      {
        label: '头像',
        value: detail.value?.avatar,
        type: 'image',
      },
      {
        label: '姓名',
        value: detail.value?.name,
        type: 'text',
      },
      {
        label: '性别',
        value: genderMap[detail.value?.gender || 0],
        type: 'text',
      },
      {
        label: '国籍',
        value: nationality.value[detail.value!.nationality!] || '-',
        type: 'text',
      },
      {
        label: '身份',
        value: authorTypes.value,
        type: 'text',
      },
      {
        label: '状态',
        value: detail.value?.isEnabled ? '启用' : '禁用',
        type: 'tag',
        tagType: detail.value?.isEnabled ? 'success' : 'danger',
        tagText: detail.value?.isEnabled ? '启用' : '禁用',
      },
      {
        label: '推荐',
        value: detail.value?.isRecommended ? '推荐' : '不推荐',
        type: 'tag',
        tagType: detail.value?.isRecommended ? 'success' : 'info',
        tagText: detail.value?.isRecommended ? '推荐' : '不推荐',
      },
    ],
  },
  {
    title: '作品信息',
    show: true,
    fields: [
      {
        label: '作品数量',
        value: detail.value?.worksCount || '0',
        type: 'text',
      },
      {
        label: '粉丝数量',
        value: detail.value?.followersCount || '0',
        type: 'text',
      },
    ],
  },
  {
    title: '详细信息',
    show: true,
    fields: [
      {
        label: '作者描述',
        value: detail.value?.description,
        type: 'text',
      },
    ],
  },
  {
    title: '管理信息',
    show: true,
    fields: [
      {
        label: '备注',
        value: detail.value?.remark,
        type: 'text',
      },
      {
        label: '创建时间',
        value: detail.value?.createdAt
          ? formatUTC(detail.value.createdAt, 'YYYY-MM-DD HH:mm:ss')
          : '-',
        type: 'text',
      },
      {
        label: '更新时间',
        value: detail.value?.updatedAt
          ? formatUTC(detail.value.updatedAt, 'YYYY-MM-DD HH:mm:ss')
          : '-',
        type: 'text',
      },
    ],
  },
]);
</script>

<template>
  <Modal title="作者详情" class="!min-w-[800px]" v-if="detail">
    <div v-loading="loading" class="space-y-6">
      <!-- 动态渲染卡片 -->
      <template v-for="card in detailCards" :key="card.title">
        <el-card v-if="card.show" shadow="never">
          <template #header>
            <div class="flex items-center">
              <span class="text-lg font-medium">{{ card.title }}</span>
            </div>
          </template>

          <!-- 使用 Descriptions 组件展示字段 -->
          <el-descriptions
            v-if="card.fields"
            :column="2"
            :border="false"
            class="!gap-x-6 !text-sm"
          >
            <el-descriptions-item
              v-for="field in card.fields"
              :key="field.label"
              :label="`${field.label}：`"
            >
              <!-- 普通文本 -->
              <el-text v-if="field.type === 'text'" class="text-sm">
                {{ field.value || '-' }}
              </el-text>

              <!-- 标签 -->
              <el-tag
                v-else-if="
                  field.type === 'tag' && 'tagText' in field && field.tagText
                "
                :type="'tagType' in field ? field.tagType : undefined"
                size="small"
              >
                {{ field.tagText }}
              </el-tag>

              <!-- 图片 -->
              <el-image
                v-else-if="field.type === 'image' && field.value"
                :src="field.value"
                :alt="field.label"
                class="max-h-[100px] max-w-[100px] rounded"
                fit="cover"
              />
              <el-text v-else-if="field.type === 'image'" class="text-sm">
                -
              </el-text>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </template>
    </div>
  </Modal>
</template>
