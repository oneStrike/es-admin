import type { BaseComicDto } from '#/apis/types/comic';
import type { EsFormSchema } from '#/types';

import { ref } from 'vue';

import { z } from '#/adapter/form';
import { authorPageApi } from '#/apis';
import { formSchemaTransform } from '#/utils';

// 阅读权限配置
export const readRule = [
  { label: '所有人', value: 0 },
  { label: '登录用户', value: 1 },
  { label: '会员用户', value: 2 },
  { label: '积分购买', value: 3 },
];

export const readRuleMap = Object.fromEntries(
  readRule.map((item) => [item.value, item.label]),
);

// 连载状态配置
export const serialStatus = [
  { label: '未开始', value: 0 },
  { label: '连载中', value: 1 },
  { label: '已完结', value: 2 },
  { label: '暂停更新', value: 3 },
  { label: '停止更新', value: 4 },
];

export const serialStatusMap = Object.fromEntries(
  serialStatus.map((item) => [item.value, item.label]),
);

// 表单配置
const keyword = ref('');
const fetching = ref(false);
export const formSchema: EsFormSchema = [
  {
    component: 'Upload',
    componentProps: {
      placeholder: '请上传漫画封面',
      accept: 'image/*',
      scene: 'comic',
    },
    fieldName: 'cover',
    label: '封面',
    rules: z.string({ message: '请上传漫画封面' }),
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入漫画名称',
    },
    fieldName: 'name',
    label: '漫画名称',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入漫画别名（支持多别名，用逗号分隔）',
    },
    fieldName: 'alias',
    label: '漫画别名',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择连载状态',
      options: serialStatus,
      class: 'w-full',
    },
    fieldName: 'serialStatus',
    label: '连载状态',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择阅读权限',
      options: readRule,
      class: 'w-full',
    },
    fieldName: 'readRule',
    label: '阅读权限',
    rules: 'required',
  },
  // {
  //   component: 'Select',
  //   componentProps: {
  //     placeholder: '输入作者名称进行搜索',
  //     remote: true,
  //     multiple: true,
  //     filterable: true,
  //     options: options.value,
  //     remoteMethod: async (value: string) => {
  //       const res = await authorPageApi({ name: value || undefined });
  //       options.value =
  //         res.list?.map((item) => ({
  //           label: item.name,
  //           value: item.id,
  //         })) || [];
  //       return options.value;
  //     },
  //   },
  //   fieldName: 'author',
  //   label: '作者',
  //   rules: 'required',
  // },
  {
    component: 'ApiSelect',
    // 对应组件的参数
    componentProps: () => {
      return {
        api: authorPageApi,
        placeholder: '输入作者名称进行搜索',
        multiple: true,
        showSearch: true,
        labelField: 'name',
        valueField: 'id',
        immediate: false,
        afterFetch: (data: any) => {
          return data.list || [];
        },
        params: {
          keyword: keyword.value || undefined,
        },
      };
    },
    // 字段名
    fieldName: 'author',
    // 界面显示的label
    label: '作者',
    rules: 'selectRequired',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择出版社',
    },
    fieldName: 'publisher',
    label: '出版社',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择地区代码',
    },
    fieldName: 'region',
    label: '地区',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择语言代码',
    },
    fieldName: 'language',
    label: '语言',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择年龄分级',
    },
    fieldName: 'ageRating',
    label: '年龄分级',
    rules: 'required',
  },

  {
    component: 'Input',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入漫画简介',
      rows: 4,
    },
    fieldName: 'description',
    label: '漫画简介',
    formItemClass: 'col-span-2',
    rules: 'required',
  },
  {
    component: 'Checkbox',
    componentProps: {
      placeholder: '是否允许评论',
    },
    fieldName: 'canComment',
    label: '允许评论',
    defaultValue: true,
  },
  {
    component: 'Checkbox',
    componentProps: {
      placeholder: '是否允许下载',
    },
    fieldName: 'canDownload',
    label: '允许下载',
    defaultValue: false,
  },
  {
    component: 'Checkbox',
    componentProps: {
      placeholder: '是否热门',
    },
    fieldName: 'isHot',
    label: '热门',
    defaultValue: false,
  },
  {
    component: 'Checkbox',
    componentProps: {
      placeholder: '是否推荐',
    },
    fieldName: 'isRecommended',
    label: '推荐',
    defaultValue: false,
  },
  {
    component: 'Checkbox',
    componentProps: {
      placeholder: '是否新作',
    },
    fieldName: 'isNew',
    label: '新作',
    defaultValue: false,
  },
  {
    component: 'Checkbox',
    componentProps: {
      placeholder: '是否发布',
    },
    fieldName: 'isPublished',
    label: '发布状态',
    defaultValue: false,
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入推荐权重',
      min: 0,
      max: 100,
    },
    fieldName: 'recommendWeight',
    label: '推荐权重',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入热度权重',
      min: 0,
      max: 100,
    },
    fieldName: 'popularityWeight',
    label: '热度权重',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入版权信息',
    },
    fieldName: 'copyright',
    label: '版权信息',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入免责声明',
    },
    fieldName: 'disclaimer',
    label: '免责声明',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入SEO标题',
    },
    fieldName: 'seoTitle',
    label: 'SEO标题',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入SEO关键词',
    },
    fieldName: 'seoKeywords',
    label: 'SEO关键词',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入SEO描述',
    },
    fieldName: 'seoDescription',
    label: 'SEO描述',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入管理员备注',
    },
    fieldName: 'remark',
    label: '管理员备注',
  },
];

// 表格列配置
export const pageColumns = formSchemaTransform.toTableColumns<BaseComicDto>(
  formSchema,
  {
    name: {
      title: '漫画名称',
      width: 300,
      showOverflow: 'tooltip',
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
    comicAuthors: {
      title: '作者',
      width: 150,
      cellRender: {
        name: 'CellText',
        props: {
          formatter: (row: BaseComicDto) => {
            return (
              row.comicAuthors?.map((author) => author.name).join(', ') || '-'
            );
          },
        },
      },
    },
    comicCategories: {
      title: '分类',
      width: 150,
      cellRender: {
        name: 'CellText',
        props: {
          formatter: (row: BaseComicDto) => {
            return (
              row.comicCategories
                ?.map((category) => category.name)
                .join(', ') || '-'
            );
          },
        },
      },
    },
    publisher: {
      title: '出版社',
      width: 120,
      showOverflow: 'tooltip',
    },
    serialStatus: {
      title: '连载状态',
      width: 100,
      cellRender: {
        name: 'CellText',
        props: {
          formatter: (row: BaseComicDto) => serialStatusMap[row.serialStatus],
        },
      },
    },
    readRule: {
      title: '阅读权限',
      width: 100,
      cellRender: {
        name: 'CellText',
        props: {
          formatter: (row: BaseComicDto) => readRuleMap[row.readRule],
        },
      },
    },
    isPublished: {
      title: '发布状态',
      width: 100,
      slots: { default: 'isPublished' },
    },
    isRecommended: {
      title: '推荐',
      width: 80,
      slots: { default: 'isRecommended' },
    },
    isHot: {
      title: '热门',
      width: 80,
      slots: { default: 'isHot' },
    },
    isNew: {
      title: '新作',
      width: 80,
      slots: { default: 'isNew' },
    },
    totalChapters: {
      title: '总章节数',
      width: 100,
      sortable: true,
    },
    totalViews: {
      title: '总阅读量',
      width: 100,
      sortable: true,
    },
    favoriteCount: {
      title: '收藏数',
      width: 100,
      sortable: true,
    },
    likeCount: {
      title: '点赞数',
      width: 100,
      sortable: true,
    },
    createdAt: {
      title: '创建时间',
      width: 160,
      sortable: true,
    },
    updatedAt: {
      title: '更新时间',
      width: 160,
      sortable: true,
    },
    actions: {
      show: true,
      width: 220,
    },
  },
);

// 搜索表单配置
export const pageFilter = formSchemaTransform
  .toSearchSchema(formSchema, {
    name: {
      show: true,
    },
    author: {
      show: true,
    },
    publisher: {
      show: true,
    },
    isPublished: {
      show: true,
    },
    isRecommended: {
      show: true,
    },
    isHot: {
      show: true,
    },
    isNew: {
      show: true,
    },
    serialStatus: {
      show: true,
    },
    readRule: {
      show: true,
    },
  })
  .reverse();
