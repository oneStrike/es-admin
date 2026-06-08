<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AdminChatConversationPageItemDto,
  AdminChatMessagePageItemDto,
  MessageChatConversationPageRequest,
  MessageChatMessagePageRequest,
} from '#/api/types';

import { computed, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  messageChatConversationPageApi,
  messageChatMessagePageApi,
} from '#/api/core';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import {
  booleanTagOptions,
  buildConversationPageQuery,
  buildMessagePageQuery,
  chatMessageStatusOptions,
  chatMessageTypeOptions,
  conversationColumns,
  conversationSearchFormSchema,
  conversationVisibilityOptions,
  formatChatUser,
  messageColumns,
  messageSearchFormSchema,
} from './model/shared';

defineOptions({
  name: 'MessageChatInvestigation',
});

type PageParams = {
  currentPage: number;
  pageSize: number;
};
type TagType = 'danger' | 'info' | 'primary' | 'success' | 'warning';

const currentConversation = ref<AdminChatConversationPageItemDto | null>(null);
let reloadMessageGrid = async () => {};

const currentConversationTitle = computed(() => {
  if (!currentConversation.value) {
    return '请选择会话';
  }

  return `${formatChatUser(currentConversation.value.user)} 与 ${formatChatUser(
    currentConversation.value.peerUser,
  )}`;
});

function createEmptyPage<T>(page: PageParams) {
  return {
    list: [] as T[],
    pageIndex: page.currentPage,
    pageSize: page.pageSize,
    total: 0,
  };
}

function getTagOption<T extends boolean | number>(
  options: Array<{ color: TagType; label: string; value: T }>,
  value: T,
) {
  return (
    options.find((item) => item.value === value) ?? {
      color: 'info',
      label: String(value),
      value,
    }
  );
}

function clearCurrentConversation() {
  if (!currentConversation.value) return;

  currentConversation.value = null;
  void reloadMessageGrid();
}

const conversationGridOptions: VxeGridProps<AdminChatConversationPageItemDto> =
  {
    columns: conversationColumns,
    height: '100%',
    proxyConfig: {
      autoLoad: false,
      ajax: {
        query: async ({ page, sorts }, formValues) => {
          const filters = buildConversationPageQuery(formValues);
          const userId = filters.userId;

          if (!userId) {
            clearCurrentConversation();
            return createEmptyPage<AdminChatConversationPageItemDto>(page);
          }

          clearCurrentConversation();
          const request = {
            ...formatQuery({
              page,
              formValues: filters,
              sorts,
            }),
            userId,
          } satisfies MessageChatConversationPageRequest;

          return await messageChatConversationPageApi(request);
        },
      },
      sort: true,
    },
    rowConfig: {
      isCurrent: true,
    },
  };

const messageGridOptions: VxeGridProps<AdminChatMessagePageItemDto> = {
  columns: messageColumns,
  height: '100%',
  proxyConfig: {
    autoLoad: false,
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const conversation = currentConversation.value;
        if (!conversation) {
          return createEmptyPage<AdminChatMessagePageItemDto>(page);
        }

        const conversationId = conversation.conversationId;
        const userId = conversation.user.userId;
        const filters = buildMessagePageQuery(
          conversationId,
          userId,
          formValues,
        );
        const request = {
          ...formatQuery({
            page,
            formValues: filters,
            sorts,
          }),
          conversationId,
          userId,
        } satisfies MessageChatMessagePageRequest;

        return await messageChatMessagePageApi(request);
      },
    },
    sort: true,
  },
};

const [ConversationGrid, conversationGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(conversationSearchFormSchema),
  gridEvents: {
    cellClick({ row }: { row: AdminChatConversationPageItemDto }) {
      selectConversation(row);
    },
  },
  gridOptions: conversationGridOptions,
});

const [MessageGrid, messageGridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(messageSearchFormSchema),
  gridOptions: messageGridOptions,
});

reloadMessageGrid = () => messageGridApi.reload();

async function selectConversation(row: AdminChatConversationPageItemDto) {
  currentConversation.value = row;
  await conversationGridApi.grid?.setCurrentRow?.(row);
  await messageGridApi.reload();
}
</script>

<template>
  <Page auto-content-height content-class="es-full-height-page-content">
    <div class="message-chat-investigation flex h-full min-h-0 gap-4">
      <div class="flex min-w-0 flex-[0_0_46%] flex-col">
        <ConversationGrid class="message-chat-investigation__grid">
          <template #toolbar-actions>
            <el-text type="info">先按用户定位，再查看会话消息</el-text>
          </template>

          <template #user="{ row }">
            <div class="truncate">{{ formatChatUser(row.user) }}</div>
          </template>

          <template #peerUser="{ row }">
            <div class="truncate">{{ formatChatUser(row.peerUser) }}</div>
          </template>

          <template #isPinned="{ row }">
            <el-tag
              :type="getTagOption(booleanTagOptions, row.isPinned).color"
              size="small"
            >
              {{ getTagOption(booleanTagOptions, row.isPinned).label }}
            </el-tag>
          </template>

          <template #visibility="{ row }">
            <el-tag
              :type="
                getTagOption(conversationVisibilityOptions, row.isHiddenForUser)
                  .color
              "
              size="small"
            >
              {{
                getTagOption(conversationVisibilityOptions, row.isHiddenForUser)
                  .label
              }}
            </el-tag>
          </template>
        </ConversationGrid>
      </div>

      <div class="flex min-w-0 flex-1 flex-col">
        <div class="mb-3 flex min-h-8 items-center gap-2">
          <el-text class="truncate" type="primary">
            {{ currentConversationTitle }}
          </el-text>
          <el-tag v-if="currentConversation" type="info">
            未读 {{ currentConversation.unreadCount }}
          </el-tag>
        </div>

        <MessageGrid class="message-chat-investigation__grid">
          <template #sender="{ row }">
            <span>
              {{
                row.senderId === currentConversation?.user.userId
                  ? formatChatUser(currentConversation?.user)
                  : row.senderId === currentConversation?.peerUser.userId
                    ? formatChatUser(currentConversation?.peerUser)
                    : `用户 ${row.senderId}`
              }}
            </span>
          </template>

          <template #messageType="{ row }">
            <el-tag
              :type="
                getTagOption(chatMessageTypeOptions, row.messageType).color
              "
              size="small"
            >
              {{ getTagOption(chatMessageTypeOptions, row.messageType).label }}
            </el-tag>
          </template>

          <template #messageStatus="{ row }">
            <el-tag
              :type="getTagOption(chatMessageStatusOptions, row.status).color"
              size="small"
            >
              {{ getTagOption(chatMessageStatusOptions, row.status).label }}
            </el-tag>
          </template>

          <template #hasPayload="{ row }">
            <el-tag
              :type="getTagOption(booleanTagOptions, row.hasPayload).color"
              size="small"
            >
              {{ getTagOption(booleanTagOptions, row.hasPayload).label }}
            </el-tag>
          </template>

          <template #hasBodyTokens="{ row }">
            <el-tag
              :type="getTagOption(booleanTagOptions, row.hasBodyTokens).color"
              size="small"
            >
              {{ getTagOption(booleanTagOptions, row.hasBodyTokens).label }}
            </el-tag>
          </template>
        </MessageGrid>
      </div>
    </div>
  </Page>
</template>

<style scoped>
.message-chat-investigation__grid {
  flex: 1;
  min-height: 0;
}

.message-chat-investigation :deep(.vxe-body--row) {
  cursor: pointer;
}
</style>
