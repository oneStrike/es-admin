<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  BaseComicDto,
  ComicCreateRequest,
  ComicUpdateRequest,
} from '#/apis/types/comic';

import { Page, useVbenModal } from '@vben/common-ui';

import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  comicCreateApi,
  comicDeleteApi,
  comicDetailApi,
  comicPageApi,
  comicUpdateApi,
} from '#/apis';
import EsModalForm from '#/components/es-modal-form/index.vue';
import { useDict } from '#/hooks/useDict';
import { useMessage } from '#/hooks/useFeedback';
import { useForm } from '#/hooks/useForm';
import { formSchemaTransform } from '#/utils';
import { createSearchFormOptions } from '#/utils/grid-form-config';

import ComicDetail from './detail.vue';
import { formSchema, pageFilter, serialStatus } from './shared';

const gridOptions: VxeGridProps<BaseComicDto> = {
  columns: [],
  proxyConfig: {
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        return await comicPageApi(formatQuery({ page, formValues, sorts }));
      },
    },
    sort: true,
  },
};

const [Form, formApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: createSearchFormOptions(pageFilter),
  gridOptions,
});

const [DetailModal, detailApi] = useVbenModal({
  connectedComponent: ComicDetail,
});

async function openFormModal(row?: BaseComicDto) {
  let record;
  if (row) {
    record = await comicDetailApi({ id: row.id });
    record.authorIds = record?.comicAuthors.map((item) => item.author);
    record.categoryIds = record?.comicCategories.map(
      (item) => item.category.id,
    );
    record.tagIds = record?.comicTags.map((item) => item.tag.id);
  }
  formApi.setData({ title: '漫画', record }).open();
}

useDict('work_age_rating,work_publisher,work_region,work_language').then(
  ({ work_age_rating, work_publisher, work_region, work_language }) => {
    useForm.setOptions(formSchema, {
      publisher: work_publisher?.options || [],
      region: work_region?.options || [],
      language: work_language?.options || [],
      ageRating: work_age_rating?.options || [],
    });
    useForm.setOptions(pageFilter, {
      publisher: work_publisher?.options || [],
      region: work_region?.options || [],
      language: work_language?.options || [],
      ageRating: work_age_rating?.options || [],
    });
    gridApi.formApi.updateSchema(pageFilter);

    gridApi.setGridOptions({
      columns: formSchemaTransform.toTableColumns<BaseComicDto>(formSchema, {
        name: {
          width: 200,
          fixed: 'left',
          slots: { default: 'name' },
        },
        cover: {
          title: '封面',
          width: 100,
          cellRender: {
            name: 'CellImage',
            props: {
              fit: 'cover',
              height: 60,
              width: 80,
            },
          },
        },
        authorIds: {
          hide: true,
        },
        categoryIds: {
          hide: true,
        },
        tagIds: {
          hide: true,
        },
        description: {
          hide: true,
        },
        remark: {
          hide: true,
        },
        copyright: {
          hide: true,
        },
        disclaimer: {
          hide: true,
        },
        comicAuthors: {
          title: '作者',
          width: 240,
          sort: 2,
          cellRender: {
            name: 'CellTag',
            props: {
              formatter: (row: BaseComicDto['comicAuthors']) => {
                return row?.map((author) => author.author.name);
              },
            },
          },
        },
        serialStatus: {
          title: '连载状态',
          width: 100,
          cellRender: {
            name: 'CellTag',
            props: {
              mapOptions: serialStatus,
            },
          },
        },
        comicCategories: {
          title: '分类',
          width: 150,
          sort: 4,
          cellRender: {
            name: 'CellTag',
            props: {
              formatter: (row: BaseComicDto['comicCategories']) => {
                return row?.map((category) => category.category.name);
              },
            },
          },
        },
        comicTags: {
          title: '标签',
          width: 150,
          sort: 4,
          cellRender: {
            name: 'CellTag',
            props: {
              formatter: (row: BaseComicDto['comicCategories']) => {
                return row?.map((tag) => tag.tag.name);
              },
            },
          },
        },

        publisher: {
          width: 120,
          formatter: ({ cellValue }) => {
            return work_publisher?.labels[cellValue] ?? cellValue;
          },
        },
        region: {
          width: 120,
          formatter: ({ cellValue }) => {
            return work_region?.labels[cellValue] ?? cellValue;
          },
        },
        language: {
          width: 120,
          formatter: ({ cellValue }) => {
            return work_language?.labels[cellValue] ?? cellValue;
          },
        },
        ageRating: {
          width: 120,
          formatter: ({ cellValue }) => {
            return work_age_rating?.labels[cellValue] ?? cellValue;
          },
        },
        isHot: {
          slots: { default: 'isHot' },
        },
        isNew: {
          slots: { default: 'isNew' },
        },
        recommendWeight: {
          sortable: true,
        },
        isRecommended: {
          width: 120,
          title: '是否推荐',
          slots: { default: 'isRecommended' },
        },
        popularityWeight: {
          sortable: true,
          formatter: ({ cellValue }) => {
            return cellValue || '0';
          },
        },
        createdAt: {
          width: 160,
          sortable: true,
          show: true,
        },
        updatedAt: {
          title: '更新时间',
          width: 160,
          sortable: true,
          cellRender: {
            name: 'CellDate',
          },
        },
        actions: {
          show: true,
          width: 160,
        },
      }),
    });
  },
);

async function handleSubmit(values: ComicCreateRequest | ComicUpdateRequest) {
  await (values?.id
    ? comicUpdateApi(values as ComicUpdateRequest)
    : comicCreateApi(values as ComicCreateRequest));
  formApi.close();
  useMessage.success('操作成功');
  gridApi.reload();
}

async function deleteComic(record: BaseComicDto) {
  await comicDeleteApi({ id: record.id });
  useMessage.success('删除成功');
  gridApi.reload();
}

async function toggleStatus(record: BaseComicDto, field: keyof BaseComicDto) {
  record.loading = true;
  const newValue = !record[field];
  await comicUpdateApi({
    id: record.id,
    [field]: newValue,
  });
  record.loading = false;
  useMessage.success('操作成功');
  gridApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <el-button class="ml-2" type="primary" @click="openFormModal()">
          添加漫画
        </el-button>
      </template>

      <template #name="{ row }">
        <div class="inline-flex">
          <el-tag class="mr-2" v-if="row.isNew" type="danger" size="small">
            新
          </el-tag>
          <el-tag class="mr-2" type="danger" v-if="row.isHot" size="small">
            热
          </el-tag>
          <el-tag
            class="mr-2"
            type="danger"
            v-if="row.isRecommended"
            size="small"
          >
            荐
          </el-tag>
        </div>
        <el-text
          class="cursor-pointer hover:opacity-50"
          type="primary"
          @click="detailApi.setData({ recordId: row.id }).open()"
        >
          {{ row.name }}
        </el-text>
      </template>

      <template #isPublished="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isPublished"
          @change="toggleStatus(row, 'isPublished')"
        />
      </template>

      <template #isRecommended="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isRecommended"
          @change="toggleStatus(row, 'isRecommended')"
        />
      </template>

      <template #isHot="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isHot"
          @change="toggleStatus(row, 'isHot')"
        />
      </template>

      <template #isNew="{ row }">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          :loading="row.loading"
          :model-value="row.isNew"
          @change="toggleStatus(row, 'isNew')"
        />
      </template>

      <template #actions="{ row }">
        <div class="my-1">
          <el-button link type="primary" @click="openFormModal(row)">
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" @click="openFormModal(row)">
            版本
          </el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确认删除当前漫画?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteComic(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Grid>

    <Form :schema="formSchema" :on-submit="handleSubmit" />

    <DetailModal />
  </Page>
</template>

<style scoped></style>
