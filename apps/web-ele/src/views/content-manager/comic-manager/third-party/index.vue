<script setup lang="ts">
import type {
  ChapterAction,
  ChapterMappingForm,
  ChapterPreviewRow,
  ContentAuthorCreateRequest,
  ContentAuthorPageRequest,
  ContentCategoryCreateRequest,
  ContentCategoryPageRequest,
  ContentComicChapterPageRequest,
  ContentComicChapterPageResponse,
  ContentComicDetailRequest,
  ContentComicDetailResponse,
  ContentComicPageRequest,
  ContentComicThirdPartyChapterContentDetailRequest,
  ContentComicThirdPartyImportConfirmRequest,
  ContentComicThirdPartyImportConfirmResponse,
  ContentComicThirdPartyImportPreviewRequest,
  ContentComicThirdPartyImportPreviewResponse,
  ContentTagCreateRequest,
  ContentTagPageRequest,
  DictOption,
  ImportMode,
  LocalEntityRow,
  LocalOption,
  LocalWorkRow,
  PlatformOption,
  SearchComicRow,
  SearchFormValues,
  ThirdPartyComicChapterContentDto,
  WorkCoverMode,
  WorkDraftForm,
} from './model/types';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { EsFormSchema } from '#/types';

import { useRouter } from 'vue-router';

import {
  useVbenModal,
  VbenDescriptions,
  VbenDescriptionsItem,
} from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import { workflowDetailApi } from '#/api/core';
import {
  contentAuthorCreateApi,
  contentAuthorPageApi,
  contentCategoryCreateApi,
  contentCategoryPageApi,
  contentComicChapterPageApi,
  contentComicDetailApi,
  contentComicPageApi,
  contentComicThirdPartyChapterContentDetailApi,
  contentComicThirdPartyImportConfirmApi,
  contentComicThirdPartyImportPreviewApi,
  contentComicThirdPartyPlatformListApi,
  contentComicThirdPartySearchPageApi,
  contentTagCreateApi,
  contentTagPageApi,
} from '#/api/core/content';
import EsModalForm from '#/components/es-modal-form/index.vue';
import EsUpload from '#/components/es-upload/es-upload.vue';
import { UploadSceneEnum } from '#/enum/api';
import { useDict } from '#/hooks/useDict';
import { useMessage } from '#/hooks/useFeedback';
import { createSearchFormOptions, formatUTC } from '#/utils';
import {
  buildWorkflowManagerRoute,
  formatWorkflowStatus,
} from '#/views/system-manager/workflow/model/shared';

import { formSchema as authorFormSchema } from '../../author-manager/model/shared';
import { formSchema as categoryFormSchema } from '../../category-manager/model/shared';
import { formSchema as tagFormSchema } from '../../tag-manager/model/shared';
import { extractRelationIds } from '../../work-relations';
import {
  canSubmitImportAgain,
  canUseProviderWorkCover,
  findCreatedOptionByName,
  hasProviderGroupPathWord,
  resolveInitialGroup,
  resolveInitialWorkCoverMode,
  resolveSelectDefault,
  SERVER_COMIC_CATEGORY_TYPE,
  SERVER_MANGA_AUTHOR_TYPE,
  toApiGroup,
  toChapterImportItem,
  wizardSubmissionFingerprint,
} from './model/helpers';
import { resolvePreviewRelationMatches } from './model/relation-candidates';

const wizardSteps = ['检索', '预览', '作品', '章节', '正文'];

const importModeOptions: Array<{ label: string; value: ImportMode }> = [
  { label: '新建作品', value: 'createNew' },
  { label: '挂载已有', value: 'attachToExisting' },
];

const serialStatusOptions = [
  { label: '未开始', value: 0 },
  { label: '连载中', value: 1 },
  { label: '已完结', value: 2 },
  { label: '暂停更新', value: 3 },
  { label: '停止更新', value: 4 },
];

const workViewRuleOptions = [
  { label: '所有人', value: 0 },
  { label: '登录用户', value: 1 },
  { label: '会员用户', value: 2 },
  { label: '购买', value: 3 },
];

const chapterViewRuleOptions = [
  { label: '继承作品', value: -1 },
  ...workViewRuleOptions,
];

const chapterActionOptions: Array<{ label: string; value: ChapterAction }> = [
  { label: '新建章节', value: 'create' },
  { label: '更新章节', value: 'update' },
];

const chapterCoverOptions: Array<{
  label: string;
  value: ChapterMappingForm['coverMode'];
}> = [
  { label: '不导入', value: 'skip' },
  { label: '本地上传', value: 'local' },
];

const workCoverScene = 'comic' as UploadSceneEnum;
const chapterCoverScene = 'chapter' as UploadSceneEnum;
const mangaAuthorTypeOptions = [
  { label: '漫画家', value: SERVER_MANGA_AUTHOR_TYPE },
];
const comicCategoryTypeOptions = [
  { label: '漫画', value: SERVER_COMIC_CATEGORY_TYPE },
];

function getObjectComponentProps(field: EsFormSchema[number]) {
  return typeof field.componentProps === 'object' && field.componentProps
    ? field.componentProps
    : {};
}

function overrideSchemaField(
  schema: EsFormSchema,
  fieldName: string,
  overrides: Partial<EsFormSchema[number]>,
): EsFormSchema {
  return schema.map((field) => {
    if (field.fieldName !== fieldName) {
      return { ...field };
    }

    return {
      ...field,
      ...overrides,
      componentProps: {
        ...getObjectComponentProps(field),
        ...getObjectComponentProps(overrides as EsFormSchema[number]),
      },
    };
  });
}

const thirdPartyAuthorFormSchema = overrideSchemaField(
  overrideSchemaField(authorFormSchema, 'type', {
    componentProps: {
      options: mangaAuthorTypeOptions,
      placeholder: '请选择作者身份',
    },
    defaultValue: [SERVER_MANGA_AUTHOR_TYPE],
  }),
  'gender',
  {
    defaultValue: 0,
  },
);

const thirdPartyCategoryFormSchema = overrideSchemaField(
  categoryFormSchema,
  'contentType',
  {
    componentProps: {
      options: comicCategoryTypeOptions,
      placeholder: '请选择内容类型',
    },
    defaultValue: [SERVER_COMIC_CATEGORY_TYPE],
  },
);

const thirdPartyTagFormSchema = overrideSchemaField(
  tagFormSchema,
  'sortOrder',
  {
    defaultValue: 0,
  },
);

const step = ref(0);
const platform = ref('');
const keyword = ref('');
const platformOptions = ref<PlatformOption[]>([]);
const languageOptions = ref<DictOption[]>([]);
const regionOptions = ref<DictOption[]>([]);
const loading = ref(false);
const previewLoading = ref(false);
const relationLoading = ref(false);
const localWorkLoading = ref(false);
const localChapterLoading = ref(false);
const contentPreviewLoading = ref(false);
const importLoading = ref(false);
const nextStepLoading = ref(false);
const selectingComicId = ref('');

const activeComic = ref<null | SearchComicRow>(null);
const activePlatform = ref('');
const selectedGroup = ref('');
const preview = ref<ContentComicThirdPartyImportPreviewResponse | null>(null);
const importMode = ref<ImportMode>('createNew');
const targetWorkId = ref<number>();
const localWorkKeyword = ref('');
const localWorkOptions = ref<LocalOption[]>([]);
const localWorkRows = ref<LocalWorkRow[]>([]);
const localChapterOptions = ref<LocalOption[]>([]);
const workCoverMode =
  ref<Extract<WorkCoverMode, 'local' | 'provider'>>('provider');
const localWorkCoverPath = ref('');
const workDraft = ref<WorkDraftForm>(createEmptyWorkDraft());
const authorOptions = ref<LocalOption[]>([]);
const categoryOptions = ref<LocalOption[]>([]);
const tagOptions = ref<LocalOption[]>([]);
const chapterMappings = ref<ChapterMappingForm[]>([]);
const selectedChapterMappings = ref<ChapterMappingForm[]>([]);
const activeProviderChapterId = ref('');
const contentPreview = ref<null | ThirdPartyComicChapterContentDto>(null);
const submittedTask = ref<ContentComicThirdPartyImportConfirmResponse | null>(
  null,
);
const submittedTaskFingerprint = ref('');
const router = useRouter();

const wizardBusy = computed(
  () =>
    loading.value ||
    previewLoading.value ||
    relationLoading.value ||
    contentPreviewLoading.value ||
    importLoading.value ||
    nextStepLoading.value,
);

const [Form, formApi] = useVbenForm(
  createSearchFormOptions(
    [
      {
        fieldName: 'platform',
        label: '',
        formItemClass: 'col-span-1',
        component: 'Select',
        componentProps: () => ({
          options: platformOptions.value,
          placeholder: '请选择平台',
        }),
      },
      {
        fieldName: 'keyword',
        label: '',
        formItemClass: 'col-span-2',
        component: 'Input',
        componentProps: {
          placeholder: '请输入关键词',
        },
      },
    ],
    {
      handleSubmit: async (values) => {
        const searchValues = normalizeSearchValues(values);
        const currentPlatform = searchValues.platform;
        const trimmedKeyword = searchValues.keyword;
        if (!currentPlatform) {
          useMessage.warning('请先选择平台');
          return;
        }
        if (!trimmedKeyword) {
          useMessage.warning('请输入有效的关键词');
          return;
        }
        platform.value = currentPlatform;
        keyword.value = trimmedKeyword;
        await searchGridApi.reload({ page: { currentPage: 1 } });
      },
      submitOnEnter: true,
      showCollapseButton: false,
      submitButtonOptions: {
        content: '搜索',
      },
      submitOnChange: false,
    },
  ),
);

watch(loading, (isLoading) => {
  formApi.setState((prev) => ({
    ...prev,
    submitButtonOptions: {
      ...prev.submitButtonOptions,
      content: '搜索',
      loading: isLoading,
    },
  }));
});

const [Modal, modalApi] = useVbenModal({
  contentClass: 'min-h-0 !overflow-hidden p-4',
  footer: false,
  onOpenChange: async (isOpen) => {
    if (!isOpen) return;
    resetWizard();
    modalApi.setState({
      title: '第三方平台资源解析',
    });
    await Promise.all([loadPlatforms(), loadWorkDictionaries()]);
  },
});

const searchGridOptions: VxeGridProps<SearchComicRow> = {
  columns: [
    {
      field: 'cover',
      title: '封面',
      width: 96,
      cellRender: {
        name: 'CellImage',
      },
    },
    {
      field: 'name',
      minWidth: 220,
      title: '作品',
    },
    {
      field: 'author',
      minWidth: 220,
      title: '作者',
    },
    {
      field: 'source',
      minWidth: 160,
      title: '来源',
    },
    {
      fixed: 'right',
      slots: { default: 'searchActions' },
      title: '操作',
      width: 120,
    },
  ],
  pagerConfig: {
    pageSize: 20,
    pageSizes: [10, 20, 30, 50],
  },
  proxyConfig: {
    autoLoad: false,
    ajax: {
      query: async ({ page }) => {
        if (!keyword.value || !platform.value) {
          return { list: [], total: 0 };
        }

        loading.value = true;
        try {
          const res = await contentComicThirdPartySearchPageApi(
            formatQuery({
              page,
              formValues: {
                keyword: keyword.value.trim(),
                platform: platform.value,
              },
            }),
          );
          return {
            list: res.list || [],
            total: res.total || 0,
          };
        } catch {
          return { list: [], total: 0 };
        } finally {
          loading.value = false;
        }
      },
    },
  },
  toolbarConfig: {
    custom: false,
    export: false,
    refresh: false,
    zoom: false,
  },
};

const chapterPreviewGridOptions: VxeGridProps<ChapterPreviewRow> = {
  columns: [
    { field: 'sortOrder', title: '序号', width: 90 },
    { field: 'title', minWidth: 220, title: '章节' },
    { field: 'imageCount', title: '图片数', width: 100 },
    { field: 'providerChapterId', minWidth: 260, title: '三方章节ID' },
  ],
  data: [],
  height: '100%',
  pagerConfig: { enabled: false },
  toolbarConfig: {
    custom: false,
    export: false,
    refresh: false,
    zoom: false,
  },
};

const chapterMappingGridOptions: VxeGridProps<ChapterMappingForm> = {
  checkboxConfig: {
    highlight: true,
    trigger: 'row',
  },
  columns: [
    { type: 'checkbox', width: 46 },
    { field: 'sortOrder', title: '序号', width: 70 },
    { field: 'title', minWidth: 200, title: '章节' },
    {
      field: 'imageCount',
      formatter: ({ cellValue }) => cellValue ?? '-',
      title: '图片数',
      width: 100,
    },
    { field: 'providerChapterId', minWidth: 260, title: '三方章节ID' },
  ],
  data: [],
  height: '100%',
  pagerConfig: { enabled: false },
  rowConfig: {
    keyField: 'providerChapterId',
  },
  toolbarConfig: {
    custom: false,
    export: false,
    refresh: false,
    zoom: false,
  },
};

const [SearchGrid, searchGridApi] = useVbenVxeGrid<SearchComicRow>({
  gridOptions: searchGridOptions,
  showSearchForm: false,
});
const [ChapterPreviewGrid, chapterPreviewGridApi] =
  useVbenVxeGrid<ChapterPreviewRow>({
    gridOptions: chapterPreviewGridOptions,
    showSearchForm: false,
  });
const [ChapterMappingGrid, chapterMappingGridApi] =
  useVbenVxeGrid<ChapterMappingForm>({
    gridEvents: {
      cellClick({ row }: { row: ChapterMappingForm }) {
        selectActiveMapping(row);
      },
      checkboxAll: handleChapterMappingSelectionChange,
      checkboxChange: handleChapterMappingSelectionChange,
    },
    gridOptions: chapterMappingGridOptions,
    showSearchForm: false,
  });

const [AuthorForm, authorFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});
const [CategoryForm, categoryFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});
const [TagForm, tagFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const selectedMappings = computed(() => selectedChapterMappings.value);

const activeMapping = computed(() =>
  chapterMappings.value.find(
    (item) => item.providerChapterId === activeProviderChapterId.value,
  ),
);

const canUseProviderCover = computed(() =>
  preview.value ? canUseProviderWorkCover(preview.value.coverOptions) : false,
);

const contentPreviewImages = computed(
  () => contentPreview.value?.images.map((item) => item.url) ?? [],
);

const relationCandidateTags = computed(() => {
  const candidates = preview.value?.relationCandidates;
  if (!candidates) {
    return [];
  }

  return [
    ...candidates.authors.map((item) => ({
      key: `author-${item.providerName}`,
      label: `作者：${item.providerName}`,
    })),
    ...candidates.categories.map((item) => ({
      key: `category-${item.providerName}`,
      label: `分类：${item.providerName}`,
    })),
    ...candidates.tags.map((item) => ({
      key: `tag-${item.providerName}`,
      label: `标签：${item.providerName}`,
    })),
  ];
});

const updateWithoutOverwriteCount = computed(
  () =>
    selectedMappings.value.filter(
      (item) =>
        item.action === 'update' && item.importImages && !item.overwriteContent,
    ).length,
);

function normalizeSearchValues(values: unknown): Required<SearchFormValues> {
  const record = values as SearchFormValues;
  return {
    keyword: String(record.keyword || '').trim(),
    platform: String(record.platform || '').trim(),
  };
}

function createEmptyWorkDraft(): WorkDraftForm {
  return {
    authorIds: [],
    canComment: true,
    categoryIds: [],
    chapterPrice: 0,
    description: '',
    isHot: false,
    isNew: false,
    isRecommended: false,
    language: '',
    name: '',
    recommendWeight: 0,
    region: '',
    serialStatus: 1,
    tagIds: [],
    viewRule: 0,
  };
}

function resetWizard() {
  step.value = 0;
  keyword.value = '';
  activeComic.value = null;
  activePlatform.value = '';
  selectedGroup.value = '';
  preview.value = null;
  importMode.value = 'createNew';
  targetWorkId.value = undefined;
  localWorkKeyword.value = '';
  localWorkOptions.value = [];
  localWorkRows.value = [];
  workCoverMode.value = 'provider';
  localWorkCoverPath.value = '';
  workDraft.value = createEmptyWorkDraft();
  chapterMappings.value = [];
  selectedChapterMappings.value = [];
  activeProviderChapterId.value = '';
  contentPreview.value = null;
  submittedTask.value = null;
  submittedTaskFingerprint.value = '';
  formApi.setValues({
    keyword: '',
    platform: '',
  });
  searchGridApi.setGridOptions({ data: [] });
  chapterPreviewGridApi.setGridOptions({ data: [] });
  chapterMappingGridApi.setGridOptions({ data: [] });
  chapterMappingGridApi.grid?.clearCheckboxRow?.();
}

function resolveComicPlatform(item: SearchComicRow) {
  return String(item.platform || activePlatform.value || platform.value || '');
}

function resolveComicId(item: SearchComicRow) {
  return String(item.id ?? '');
}

function formatTextList(values?: string[]) {
  return values && values.length > 0 ? values.join('、') : '-';
}

async function loadPlatforms() {
  try {
    const list = await contentComicThirdPartyPlatformListApi();
    platformOptions.value = (list || []).map((item) => ({
      label: item.name,
      value: item.code,
    }));
    const defaultPlatform = String(platformOptions.value[0]?.value || '');
    if (defaultPlatform) {
      platform.value = defaultPlatform;
      formApi.setValues({
        platform: defaultPlatform,
      });
    }
  } catch {
    platformOptions.value = [];
  }
}

async function loadWorkDictionaries() {
  try {
    const { work_language, work_region } = await useDict(
      'work_language,work_region',
    );
    languageOptions.value = work_language?.options || [];
    regionOptions.value = work_region?.options || [];
    applyDictionaryDefaultsToDraft();
  } catch {
    languageOptions.value = [];
    regionOptions.value = [];
  }
}

async function selectComic(item: SearchComicRow) {
  const currentPlatform = resolveComicPlatform(item);
  if (!currentPlatform) {
    useMessage.warning('当前资源缺少平台标识，请重新搜索');
    return;
  }

  selectingComicId.value = resolveComicId(item);
  try {
    activeComic.value = item;
    activePlatform.value = currentPlatform;
    selectedGroup.value = '';
    await loadImportPreview();
    if (preview.value) {
      step.value = 1;
    }
  } finally {
    selectingComicId.value = '';
  }
}

async function loadImportPreview(group = selectedGroup.value) {
  const comicId = activeComic.value?.id;
  if (!comicId || !activePlatform.value) return;
  const apiGroup = toApiGroup(group);

  previewLoading.value = true;
  contentPreview.value = null;
  submittedTask.value = null;
  submittedTaskFingerprint.value = '';
  try {
    const res = await contentComicThirdPartyImportPreviewApi({
      comicId: String(comicId),
      group: apiGroup,
      platform: activePlatform.value,
    } satisfies ContentComicThirdPartyImportPreviewRequest);
    preview.value = res;
    selectedGroup.value = apiGroup ?? resolveInitialGroup(res.groups);
    applyPreviewToDraft(res);
    chapterMappings.value = res.chapters.map((chapter) =>
      createChapterMapping(chapter),
    );
    activeProviderChapterId.value =
      chapterMappings.value[0]?.providerChapterId || '';
    chapterPreviewGridApi.setGridOptions({ data: res.chapters });
    await syncChapterMappingGrid(chapterMappings.value);
  } catch {
    preview.value = null;
    chapterMappings.value = [];
    selectedChapterMappings.value = [];
    chapterPreviewGridApi.setGridOptions({ data: [] });
    chapterMappingGridApi.setGridOptions({ data: [] });
    chapterMappingGridApi.grid?.clearCheckboxRow?.();
  } finally {
    previewLoading.value = false;
  }
}

async function handleGroupChange(group: string) {
  selectedGroup.value = group;
  await loadImportPreview(group);
}

function applyPreviewToDraft(res: ContentComicThirdPartyImportPreviewResponse) {
  workDraft.value = {
    ...createEmptyWorkDraft(),
    alias: res.workDraft.alias || undefined,
    description: res.workDraft.description,
    language: resolveSelectDefault(languageOptions.value, undefined, 'zh'),
    name: res.workDraft.name,
    originalSource: res.workDraft.originalSource || undefined,
    region: resolveSelectDefault(
      regionOptions.value,
      res.workDraft.suggestedRegion,
      'CN',
    ),
    remark: res.workDraft.remark || undefined,
    serialStatus: res.workDraft.suggestedSerialStatus ?? 1,
  };
  workCoverMode.value = resolveInitialWorkCoverMode(res.coverOptions);
  localWorkCoverPath.value = '';
}

function applyDictionaryDefaultsToDraft() {
  workDraft.value = {
    ...workDraft.value,
    language: resolveSelectDefault(
      languageOptions.value,
      workDraft.value.language,
      'zh',
    ),
    region: resolveSelectDefault(
      regionOptions.value,
      workDraft.value.region,
      'CN',
    ),
  };
}

function toDraftOptionalText(value?: null | string) {
  return value && value.trim() ? value : undefined;
}

function resolveDraftRelationIds(
  list: Parameters<typeof extractRelationIds>[0],
  relationKey: Parameters<typeof extractRelationIds>[1],
  fallbackIds: number[],
) {
  return list ? extractRelationIds(list, relationKey) : fallbackIds;
}

function applyLocalWorkToDraft(work: ContentComicDetailResponse) {
  workDraft.value = {
    ...workDraft.value,
    ageRating: toDraftOptionalText(work.ageRating),
    alias: toDraftOptionalText(work.alias),
    authorIds: resolveDraftRelationIds(
      work.authors,
      'author',
      workDraft.value.authorIds,
    ),
    canComment: work.canComment ?? workDraft.value.canComment,
    categoryIds: resolveDraftRelationIds(
      work.categories,
      'category',
      workDraft.value.categoryIds,
    ),
    chapterPrice: work.chapterPrice ?? workDraft.value.chapterPrice,
    description: work.description ?? workDraft.value.description,
    isHot: work.isHot ?? workDraft.value.isHot,
    isNew: work.isNew ?? workDraft.value.isNew,
    isRecommended: work.isRecommended ?? workDraft.value.isRecommended,
    language: resolveSelectDefault(
      languageOptions.value,
      work.language,
      workDraft.value.language,
    ),
    name: work.name ?? workDraft.value.name,
    originalSource: toDraftOptionalText(work.originalSource),
    recommendWeight: work.recommendWeight ?? workDraft.value.recommendWeight,
    region: resolveSelectDefault(
      regionOptions.value,
      work.region,
      workDraft.value.region,
    ),
    remark: toDraftOptionalText(work.remark),
    serialStatus: work.serialStatus ?? workDraft.value.serialStatus,
    tagIds: resolveDraftRelationIds(work.tags, 'tag', workDraft.value.tagIds),
    viewRule: work.viewRule ?? workDraft.value.viewRule,
  };
}

function createChapterMapping(
  chapter: ContentComicThirdPartyImportPreviewResponse['chapters'][number],
): ChapterMappingForm {
  return {
    action: 'create',
    canComment: true,
    canDownload: false,
    chapterApiVersion: chapter.chapterApiVersion ?? undefined,
    coverMode: 'skip',
    datetimeCreated: chapter.datetimeCreated ?? undefined,
    group: chapter.group ?? undefined,
    imageCount: chapter.imageCount,
    importImages: true,
    isPreview: false,
    localCoverPath: '',
    overwriteContent: false,
    price: 0,
    providerChapterId: chapter.providerChapterId,
    sortOrder: chapter.sortOrder,
    title: chapter.title,
    viewRule: -1,
  };
}

function toLocalOptions(
  list: LocalEntityRow[] | null | undefined,
): LocalOption[] {
  return (list || []).map((item) => ({
    label: item.name,
    value: item.id,
  }));
}

function toChapterOptions(
  list: ContentComicChapterPageResponse['list'] | undefined,
): LocalOption[] {
  return (list || []).map((item) => ({
    label: `${item.sortOrder ?? 0}. ${item.title}`,
    value: item.id,
  }));
}

function ensureRelationOptions(
  options: { value: LocalOption[] },
  matchedOptions: LocalOption[],
) {
  const existingValues = new Set(options.value.map((item) => item.value));
  const missingOptions = matchedOptions.filter(
    (item) => !existingValues.has(item.value),
  );
  if (missingOptions.length > 0) {
    options.value = [...missingOptions, ...options.value];
  }
}

function selectRelationMatches(
  selectedIds: number[],
  matchedOptions: LocalOption[],
) {
  const selectedValues = new Set(selectedIds);
  const nextIds = [...selectedIds];
  for (const option of matchedOptions) {
    if (selectedValues.has(option.value)) {
      continue;
    }
    selectedValues.add(option.value);
    nextIds.push(option.value);
  }
  return nextIds;
}

function authorPageParams(name?: string) {
  return {
    isEnabled: true,
    name: name || undefined,
    pageSize: name ? 20 : 500,
    type: JSON.stringify([SERVER_MANGA_AUTHOR_TYPE]),
  } satisfies ContentAuthorPageRequest;
}

function categoryPageParams(name?: string) {
  return {
    contentType: JSON.stringify([SERVER_COMIC_CATEGORY_TYPE]),
    isEnabled: true,
    name: name || undefined,
    pageSize: name ? 20 : 500,
  } satisfies ContentCategoryPageRequest;
}

function tagPageParams(name?: string) {
  return {
    isEnabled: true,
    name: name || undefined,
    pageSize: name ? 20 : 500,
  } satisfies ContentTagPageRequest;
}

async function loadAuthorOptions() {
  const authors = await contentAuthorPageApi(authorPageParams());
  authorOptions.value = toLocalOptions(authors.list);
}

async function loadCategoryOptions() {
  const categories = await contentCategoryPageApi(categoryPageParams());
  categoryOptions.value = toLocalOptions(categories.list);
}

async function loadTagOptions() {
  const tags = await contentTagPageApi(tagPageParams());
  tagOptions.value = toLocalOptions(tags.list);
}

async function loadRelationOptions(force = false) {
  const shouldLoadBaseOptions =
    force ||
    authorOptions.value.length === 0 ||
    categoryOptions.value.length === 0 ||
    tagOptions.value.length === 0;
  if (!shouldLoadBaseOptions && importMode.value !== 'createNew') {
    return;
  }

  relationLoading.value = true;
  try {
    if (shouldLoadBaseOptions) {
      const results = await Promise.allSettled([
        loadAuthorOptions(),
        loadCategoryOptions(),
        loadTagOptions(),
      ]);
      const failedLabels = results
        .map((result, index) => ({
          index,
          result,
        }))
        .filter(({ result }) => result.status === 'rejected')
        .map(({ index }) => ['作者', '分类', '标签'][index]);

      if (failedLabels.length > 0) {
        useMessage.error(`关系选项加载失败：${failedLabels.join('、')}`);
      }
    }

    if (importMode.value === 'createNew') {
      try {
        await applyRelationSearchMatches();
      } catch {
        useMessage.error('关系自动匹配失败，请手动选择后继续');
      }
    }
  } finally {
    relationLoading.value = false;
  }
}

async function applyRelationSearchMatches() {
  const candidates = preview.value?.relationCandidates;
  if (!candidates) {
    return;
  }

  const matchedAuthors = resolvePreviewRelationMatches(candidates.authors);
  const matchedCategories = resolvePreviewRelationMatches(
    candidates.categories,
  );
  const matchedTags = resolvePreviewRelationMatches(candidates.tags);

  ensureRelationOptions(authorOptions, matchedAuthors);
  ensureRelationOptions(categoryOptions, matchedCategories);
  ensureRelationOptions(tagOptions, matchedTags);
  workDraft.value = {
    ...workDraft.value,
    authorIds: selectRelationMatches(workDraft.value.authorIds, matchedAuthors),
    categoryIds: selectRelationMatches(
      workDraft.value.categoryIds,
      matchedCategories,
    ),
    tagIds: selectRelationMatches(workDraft.value.tagIds, matchedTags),
  };
}

function openCreateAuthorModal() {
  authorFormApi
    .setData({
      schema: thirdPartyAuthorFormSchema,
      title: '作者',
    })
    .open();
}

function openCreateCategoryModal() {
  categoryFormApi
    .setData({
      schema: thirdPartyCategoryFormSchema,
      title: '分类',
    })
    .open();
}

function openCreateTagModal() {
  tagFormApi
    .setData({
      schema: thirdPartyTagFormSchema,
      title: '标签',
    })
    .open();
}

function selectCreatedRelation(
  selectedIds: number[],
  createdOption: LocalOption | undefined,
) {
  if (!createdOption || selectedIds.includes(createdOption.value)) {
    return selectedIds;
  }
  return [...selectedIds, createdOption.value];
}

function ensureRelationOption(
  options: { value: LocalOption[] },
  createdOption: LocalOption | undefined,
) {
  if (
    createdOption &&
    !options.value.some((item) => item.value === createdOption.value)
  ) {
    options.value = [createdOption, ...options.value];
  }
}

async function findCreatedAuthor(name: string) {
  const res = await contentAuthorPageApi(authorPageParams(name));
  return findCreatedOptionByName(toLocalOptions(res.list), name);
}

async function findCreatedCategory(name: string) {
  const res = await contentCategoryPageApi(categoryPageParams(name));
  return findCreatedOptionByName(toLocalOptions(res.list), name);
}

async function findCreatedTag(name: string) {
  const res = await contentTagPageApi(tagPageParams(name));
  return findCreatedOptionByName(toLocalOptions(res.list), name);
}

async function handleCreateAuthor(values: ContentAuthorCreateRequest) {
  const name = values.name.trim();
  const payload = {
    avatar: values.avatar,
    description: values.description,
    gender: values.gender ?? 0,
    name,
    nationality: values.nationality,
    remark: values.remark,
    type: [SERVER_MANGA_AUTHOR_TYPE],
  } satisfies ContentAuthorCreateRequest;
  await contentAuthorCreateApi(payload);
  const created = await findCreatedAuthor(name);
  await loadAuthorOptions();
  ensureRelationOption(authorOptions, created);
  workDraft.value.authorIds = selectCreatedRelation(
    workDraft.value.authorIds,
    created,
  );
  useMessage.success(
    created ? '作者已新增并选中' : '作者已新增，请从列表中选择',
  );
}

async function handleCreateCategory(values: ContentCategoryCreateRequest) {
  const name = values.name.trim();
  const payload = {
    contentType: [SERVER_COMIC_CATEGORY_TYPE],
    description: values.description,
    icon: values.icon,
    isEnabled: values.isEnabled ?? true,
    name,
    sortOrder: values.sortOrder ?? 0,
  } satisfies ContentCategoryCreateRequest;
  await contentCategoryCreateApi(payload);
  const created = await findCreatedCategory(name);
  await loadCategoryOptions();
  ensureRelationOption(categoryOptions, created);
  workDraft.value.categoryIds = selectCreatedRelation(
    workDraft.value.categoryIds,
    created,
  );
  useMessage.success(
    created ? '分类已新增并选中' : '分类已新增，请从列表中选择',
  );
}

async function handleCreateTag(values: ContentTagCreateRequest) {
  const name = values.name.trim();
  const payload = {
    description: values.description,
    icon: values.icon,
    name,
    sortOrder: values.sortOrder ?? 0,
  } satisfies ContentTagCreateRequest;
  await contentTagCreateApi(payload);
  const created = await findCreatedTag(name);
  await loadTagOptions();
  ensureRelationOption(tagOptions, created);
  workDraft.value.tagIds = selectCreatedRelation(
    workDraft.value.tagIds,
    created,
  );
  useMessage.success(
    created ? '标签已新增并选中' : '标签已新增，请从列表中选择',
  );
}

async function searchLocalWorks(query = '') {
  const keyword = query.trim();
  localWorkKeyword.value = keyword;
  if (!keyword) {
    localWorkOptions.value = [];
    localWorkRows.value = [];
    return;
  }

  localWorkLoading.value = true;
  try {
    const res = await contentComicPageApi({
      name: keyword,
      pageIndex: 1,
      pageSize: 20,
      type: 1,
    } satisfies ContentComicPageRequest);
    const list = res.list || [];
    localWorkRows.value = list;
    localWorkOptions.value = list.map((item) => ({
      label: `${item.name}（ID: ${item.id}）`,
      value: item.id,
    }));
  } catch {
    localWorkOptions.value = [];
    localWorkRows.value = [];
  } finally {
    localWorkLoading.value = false;
  }
}

async function handleTargetWorkChange(id?: number) {
  localChapterOptions.value = [];
  chapterMappings.value = chapterMappings.value.map((item) => ({
    ...item,
    targetChapterId: undefined,
  }));
  if (!id) {
    return;
  }

  localWorkLoading.value = true;
  try {
    const detail = await contentComicDetailApi({
      id,
    } satisfies ContentComicDetailRequest);
    if (targetWorkId.value === id) {
      applyLocalWorkToDraft(detail);
      await searchLocalChapters();
    }
  } catch {
    // 详情加载失败时保留当前表单内容，避免用分页行冒充详情数据。
  } finally {
    localWorkLoading.value = false;
  }
}

async function searchLocalChapters(keyword = '') {
  const workId = targetWorkId.value;
  if (!workId) {
    localChapterOptions.value = [];
    return;
  }

  localChapterLoading.value = true;
  try {
    const response = await contentComicChapterPageApi({
      pageIndex: 1,
      pageSize: 50,
      title: keyword.trim() || undefined,
      workId,
    } satisfies ContentComicChapterPageRequest);
    localChapterOptions.value = toChapterOptions(response.list);
  } finally {
    localChapterLoading.value = false;
  }
}

function handleImportModeChange(
  mode: boolean | ImportMode | number | string | undefined,
) {
  if (mode === 'attachToExisting') {
    if (targetWorkId.value) {
      void handleTargetWorkChange(targetWorkId.value);
    }
    return;
  }

  if (preview.value) {
    applyPreviewToDraft(preview.value);
  }
  void loadRelationOptions();
}

function getDefaultLocalWorkKeyword() {
  return preview.value?.detail.name?.trim() || workDraft.value.name.trim();
}

function handleLocalWorkDropdownVisibleChange(visible: boolean) {
  if (!visible || importMode.value !== 'attachToExisting') {
    return;
  }
  if (localWorkKeyword.value) {
    return;
  }
  void searchLocalWorks(getDefaultLocalWorkKeyword());
}

async function syncChapterMappingGrid(rows: ChapterMappingForm[]) {
  selectedChapterMappings.value = [...rows];
  chapterMappingGridApi.setGridOptions({ data: rows });
  await nextTick();
  chapterMappingGridApi.grid?.clearCheckboxRow?.();
  chapterMappingGridApi.grid?.setCheckboxRow?.(rows, true);
}

function handleChapterMappingSelectionChange(params: {
  records: ChapterMappingForm[];
}) {
  selectedChapterMappings.value =
    chapterMappingGridApi.grid?.getCheckboxRecords?.() ?? params.records;
}

function selectActiveMapping(mapping: ChapterMappingForm) {
  activeProviderChapterId.value = mapping.providerChapterId;
  contentPreview.value = null;
}

async function loadActiveChapterContent() {
  const currentPreview = preview.value;
  const mapping = activeMapping.value;
  if (!currentPreview || !mapping) {
    useMessage.warning('请先选择章节');
    return;
  }

  contentPreviewLoading.value = true;
  try {
    contentPreview.value = await contentComicThirdPartyChapterContentDetailApi({
      chapterApiVersion: mapping.chapterApiVersion,
      chapterId: mapping.providerChapterId,
      comicId: currentPreview.comicId,
      group: toApiGroup(selectedGroup.value),
      platform: currentPreview.platform,
    } satisfies ContentComicThirdPartyChapterContentDetailRequest);
  } catch {
    contentPreview.value = null;
  } finally {
    contentPreviewLoading.value = false;
  }
}

async function goNext() {
  if (nextStepLoading.value) return;
  if (!validateStep(step.value)) return;

  nextStepLoading.value = true;
  try {
    if (step.value === 1 && importMode.value === 'createNew') {
      await loadRelationOptions();
    }
    if (step.value === 3 && selectedMappings.value.length > 0) {
      const first = selectedMappings.value[0];
      if (first) {
        activeProviderChapterId.value = first.providerChapterId;
        await loadActiveChapterContent();
      }
    }

    step.value = Math.min(step.value + 1, wizardSteps.length - 1);
  } finally {
    nextStepLoading.value = false;
  }
}

function goPrev() {
  step.value = Math.max(step.value - 1, 0);
}

function validateStep(currentStep: number) {
  if (currentStep === 0 && !preview.value) {
    useMessage.warning('请先选择一个第三方作品');
    return false;
  }
  if (currentStep === 1 && !preview.value) {
    useMessage.warning('导入预览尚未加载完成');
    return false;
  }
  if (currentStep === 2) {
    return validateWorkStep() && validateRelationStep();
  }
  if (currentStep === 3) {
    return validateChapterStep();
  }
  if (currentStep === 4 && updateWithoutOverwriteCount.value > 0) {
    useMessage.warning('更新章节导入图片时必须确认覆盖内容');
    return false;
  }
  return true;
}

function validateWorkStep() {
  if (importMode.value === 'attachToExisting') {
    if (!targetWorkId.value) {
      useMessage.warning('请选择要挂载的本地作品');
      return false;
    }
    return true;
  }

  const draft = workDraft.value;
  if (
    !draft.name.trim() ||
    !draft.description.trim() ||
    !draft.language.trim() ||
    !draft.region.trim()
  ) {
    useMessage.warning('请补全作品名称、简介、语言和地区');
    return false;
  }
  if (workCoverMode.value === 'provider' && !canUseProviderCover.value) {
    useMessage.warning('当前三方作品必须使用本地上传封面');
    return false;
  }
  if (workCoverMode.value === 'local' && !localWorkCoverPath.value) {
    useMessage.warning('请上传本地作品封面');
    return false;
  }
  return true;
}

function validateRelationStep() {
  if (importMode.value === 'attachToExisting') {
    return true;
  }
  const draft = workDraft.value;
  if (
    draft.authorIds.length === 0 ||
    draft.categoryIds.length === 0 ||
    draft.tagIds.length === 0
  ) {
    useMessage.warning('请确认本地作者、分类和标签');
    return false;
  }
  return true;
}

function validateChapterStep() {
  const selected = selectedMappings.value;
  if (selected.length === 0) {
    useMessage.warning('请至少选择一个章节');
    return false;
  }

  const invalidUpdate = selected.find(
    (item) => item.action === 'update' && !item.targetChapterId,
  );
  if (invalidUpdate) {
    useMessage.warning(`章节「${invalidUpdate.title}」缺少目标章节`);
    return false;
  }

  const invalidCover = selected.find(
    (item) => item.coverMode === 'local' && !item.localCoverPath,
  );
  if (invalidCover) {
    useMessage.warning(`章节「${invalidCover.title}」缺少本地章节封面`);
    return false;
  }

  if (updateWithoutOverwriteCount.value > 0) {
    useMessage.warning('更新章节导入图片时必须确认覆盖内容');
    return false;
  }
  return true;
}

async function handleImport() {
  if (!preview.value) return;
  for (let index = 2; index <= 4; index++) {
    if (!validateStep(index)) return;
  }

  const request = buildImportRequest();
  if (!request) return;
  if (!hasProviderGroupPathWord(request)) {
    useMessage.warning('三方来源分组缺失，请重新预览后再导入');
    return;
  }

  const fingerprint = wizardSubmissionFingerprint(request);

  importLoading.value = true;
  try {
    if (submittedTask.value && submittedTaskFingerprint.value === fingerprint) {
      submittedTask.value = await refreshSubmittedTask(submittedTask.value);
    }
    if (
      !canSubmitImportAgain(
        submittedTask.value,
        submittedTaskFingerprint.value,
        fingerprint,
      )
    ) {
      useMessage.warning('当前导入配置已提交，请等待任务完成或修改配置后重试');
      return;
    }

    submittedTask.value = await contentComicThirdPartyImportConfirmApi(request);
    submittedTaskFingerprint.value = fingerprint;
    useMessage.success(
      `导入任务已提交：${submittedTask.value.jobId.slice(0, 8)}，将按章节处理，限流时自动重试`,
    );
  } catch {
    submittedTask.value = null;
    submittedTaskFingerprint.value = '';
  } finally {
    importLoading.value = false;
  }
}

async function refreshSubmittedTask(
  task: ContentComicThirdPartyImportConfirmResponse,
) {
  try {
    return await workflowDetailApi({ jobId: task.jobId });
  } catch {
    return task;
  }
}

function buildImportRequest(): ContentComicThirdPartyImportConfirmRequest | null {
  const currentPreview = preview.value;
  if (!currentPreview) return null;

  const chapters = selectedMappings.value.map((item) =>
    toChapterImportItem(item),
  );

  if (importMode.value === 'attachToExisting') {
    return {
      chapters,
      comicId: currentPreview.comicId,
      mode: importMode.value,
      platform: currentPreview.platform,
      sourceSnapshot: currentPreview.sourceSnapshot,
      targetWorkId: targetWorkId.value ?? null,
    } satisfies ContentComicThirdPartyImportConfirmRequest;
  }

  const providerCover = currentPreview.coverOptions.provider;
  if (workCoverMode.value === 'provider') {
    if (!canUseProviderWorkCover(currentPreview.coverOptions)) {
      useMessage.warning('当前三方作品必须使用本地上传封面');
      return null;
    }
    if (!providerCover) {
      useMessage.warning('当前三方作品没有可用封面，请改为本地上传');
      return null;
    }
  }
  const draft = workDraft.value;

  return {
    chapters,
    comicId: currentPreview.comicId,
    cover:
      workCoverMode.value === 'local'
        ? { localPath: localWorkCoverPath.value, mode: 'local' }
        : {
            mode: 'provider',
            providerImageId: providerCover?.providerImageId,
          },
    mode: importMode.value,
    platform: currentPreview.platform,
    sourceSnapshot: currentPreview.sourceSnapshot,
    workDraft: {
      ageRating: draft.ageRating || undefined,
      alias: draft.alias || undefined,
      authorIds: draft.authorIds,
      canComment: draft.canComment,
      categoryIds: draft.categoryIds,
      chapterPrice: draft.chapterPrice,
      description: draft.description,
      isHot: draft.isHot,
      isNew: draft.isNew,
      isRecommended: draft.isRecommended,
      language: draft.language,
      name: draft.name,
      originalSource: draft.originalSource || undefined,
      recommendWeight: draft.recommendWeight,
      region: draft.region,
      remark: draft.remark || undefined,
      serialStatus: draft.serialStatus,
      tagIds: draft.tagIds,
      viewRule: draft.viewRule,
    },
  } satisfies ContentComicThirdPartyImportConfirmRequest;
}

function openSubmittedTask() {
  if (!submittedTask.value) return;

  void router.push(buildWorkflowManagerRoute(submittedTask.value.jobId));
}

function getSubmittedTaskReservationValue(field: 'dedupeKey' | 'serialKey') {
  const value = (submittedTask.value as null | Record<string, unknown>)?.[
    field
  ];
  return typeof value === 'string' && value ? value : '';
}
</script>

<template>
  <Modal class="!h-[86vh] w-[1280px]">
    <div class="flex h-full min-h-0 flex-col">
      <el-steps class="mb-4" :active="step" finish-status="success" simple>
        <el-step v-for="item in wizardSteps" :key="item" :title="item" />
      </el-steps>

      <div class="min-h-0 flex-1 overflow-auto" v-loading="previewLoading">
        <div v-show="step === 0" class="flex h-full min-h-0 flex-col">
          <Form />

          <SearchGrid class="min-h-0 flex-1">
            <template #searchActions="{ row }">
              <el-button
                link
                type="primary"
                :disabled="
                  !!selectingComicId && selectingComicId !== resolveComicId(row)
                "
                :loading="selectingComicId === resolveComicId(row)"
                @click="selectComic(row)"
              >
                解析
              </el-button>
            </template>
          </SearchGrid>
        </div>

        <div v-show="step === 1" class="h-full min-h-0 pb-4">
          <el-empty v-if="!preview" description="请选择第三方作品" />
          <template v-else>
            <div class="grid h-full min-h-0 grid-cols-12 gap-4">
              <el-card class="col-span-4 h-full min-h-0 overflow-auto">
                <div class="flex gap-4">
                  <el-image
                    v-if="preview.detail.cover"
                    :src="preview.detail.cover"
                    class="h-[170px] w-[116px] shrink-0 rounded object-cover"
                    fit="cover"
                  />
                  <div class="min-w-0 space-y-2">
                    <div class="line-clamp-2 text-lg">
                      {{ preview.detail.name }}
                    </div>
                    <div class="text-sm text-muted-foreground">
                      ID：{{ preview.detail.id }}
                    </div>
                    <div class="text-sm text-muted-foreground">
                      作者：{{ formatTextList(preview.detail.authors) }}
                    </div>
                    <div class="text-sm text-muted-foreground">
                      状态：{{ preview.detail.status || '-' }}
                    </div>
                    <div class="text-sm text-muted-foreground">
                      地区：{{ preview.detail.region || '-' }}
                    </div>
                  </div>
                </div>
                <div class="mt-4 text-sm leading-6 text-muted-foreground">
                  {{ preview.detail.brief || '-' }}
                </div>
              </el-card>

              <div
                class="col-span-8 flex h-full min-h-0 flex-col rounded border p-4"
              >
                <div class="mb-4 flex items-center">
                  <div class="shrink-0 mr-4">章节分组</div>
                  <el-select
                    v-model="selectedGroup"
                    @change="handleGroupChange"
                  >
                    <el-option
                      v-for="group in preview.groups"
                      :key="group.pathWord"
                      :label="`${group.name}（${group.count}）`"
                      :value="group.pathWord"
                    />
                  </el-select>
                </div>

                <div class="mb-4 flex flex-wrap gap-2">
                  <el-tag
                    v-for="taxonomy in preview.detail.taxonomies"
                    :key="taxonomy"
                    type="info"
                  >
                    {{ taxonomy }}
                  </el-tag>
                  <el-tag
                    v-if="preview.detail.sourceFlags.isVip"
                    type="warning"
                  >
                    VIP
                  </el-tag>
                  <el-tag
                    v-if="preview.detail.sourceFlags.isLogin"
                    type="warning"
                  >
                    需登录
                  </el-tag>
                </div>

                <ChapterPreviewGrid class="min-h-0 flex-1" />
              </div>
            </div>
          </template>
        </div>

        <div v-show="step === 2" class="h-full min-h-0 pb-4">
          <el-scrollbar class="h-full" view-class="h-full">
            <div class="grid h-full min-h-0 grid-cols-12 gap-4">
              <div class="col-span-4 flex h-full min-h-0">
                <el-card
                  body-class="min-h-0 flex-1 overflow-auto p-4"
                  class="flex h-full min-h-0 flex-1 flex-col"
                  shadow="never"
                >
                  <template #header>
                    <div
                      class="flex flex-wrap items-center justify-between gap-3"
                    >
                      <span>作品封面</span>
                      <el-radio-group v-model="workCoverMode">
                        <el-radio-button
                          value="provider"
                          :disabled="!canUseProviderCover"
                        >
                          三方封面
                        </el-radio-button>
                        <el-radio-button value="local">
                          本地上传
                        </el-radio-button>
                      </el-radio-group>
                    </div>
                  </template>

                  <div class="flex justify-center">
                    <el-image
                      v-if="
                        workCoverMode === 'provider' &&
                        preview?.coverOptions.provider
                      "
                      :src="preview.coverOptions.provider.url"
                      class="h-[260px] w-[180px] rounded object-cover"
                      fit="cover"
                    />
                    <EsUpload
                      v-else
                      v-model="localWorkCoverPath"
                      :max-count="1"
                      :multiple="false"
                      :scene="workCoverScene"
                      accept="image/*"
                    />
                  </div>
                </el-card>
              </div>

              <div class="col-span-8 flex h-full min-h-0">
                <el-card
                  body-class="min-h-0 flex-1 overflow-auto p-4"
                  class="flex h-full min-h-0 flex-1 flex-col"
                  shadow="never"
                >
                  <el-form class="grid grid-cols-2 gap-x-4" label-width="110px">
                    <el-form-item
                      :class="{
                        'col-span-2': importMode !== 'attachToExisting',
                      }"
                      label="导入方式"
                    >
                      <el-radio-group
                        v-model="importMode"
                        @change="handleImportModeChange"
                      >
                        <el-radio-button
                          v-for="item in importModeOptions"
                          :key="item.value"
                          :value="item.value"
                        >
                          {{ item.label }}
                        </el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item
                      v-if="importMode === 'attachToExisting'"
                      label="目标作品"
                    >
                      <el-select
                        v-model="targetWorkId"
                        class="w-full"
                        filterable
                        remote
                        reserve-keyword
                        :loading="localWorkLoading"
                        :remote-method="searchLocalWorks"
                        placeholder="展开后默认按三方作品名搜索"
                        @change="handleTargetWorkChange"
                        @visible-change="handleLocalWorkDropdownVisibleChange"
                      >
                        <el-option
                          v-for="item in localWorkOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="作品名称">
                      <el-input v-model="workDraft.name" />
                    </el-form-item>
                    <el-form-item label="作品别名">
                      <el-input v-model="workDraft.alias" />
                    </el-form-item>
                    <el-form-item class="col-span-2" label="作品简介">
                      <el-input
                        v-model="workDraft.description"
                        :rows="4"
                        type="textarea"
                      />
                    </el-form-item>
                    <el-form-item label="语言">
                      <el-select v-model="workDraft.language" class="w-full">
                        <el-option
                          v-for="item in languageOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="地区">
                      <el-select v-model="workDraft.region" class="w-full">
                        <el-option
                          v-for="item in regionOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="连载状态">
                      <el-select
                        v-model="workDraft.serialStatus"
                        class="w-full"
                      >
                        <el-option
                          v-for="item in serialStatusOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="查看规则">
                      <el-select v-model="workDraft.viewRule" class="w-full">
                        <el-option
                          v-for="item in workViewRuleOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="章节价格">
                      <el-input-number
                        v-model="workDraft.chapterPrice"
                        :min="0"
                        :precision="2"
                        class="!w-full"
                      />
                    </el-form-item>
                    <el-form-item label="推荐权重">
                      <el-input-number
                        v-model="workDraft.recommendWeight"
                        :min="0"
                        class="!w-full"
                      />
                    </el-form-item>
                    <el-form-item label="允许评论">
                      <el-switch v-model="workDraft.canComment" />
                    </el-form-item>
                    <el-form-item label="热门">
                      <el-switch v-model="workDraft.isHot" />
                    </el-form-item>
                    <el-form-item label="新作">
                      <el-switch v-model="workDraft.isNew" />
                    </el-form-item>
                    <el-form-item label="推荐">
                      <el-switch v-model="workDraft.isRecommended" />
                    </el-form-item>
                    <el-form-item label="原始来源">
                      <el-input v-model="workDraft.originalSource" />
                    </el-form-item>
                    <el-form-item class="col-span-2" label="备注">
                      <el-input
                        v-model="workDraft.remark"
                        :rows="3"
                        type="textarea"
                      />
                    </el-form-item>

                    <template v-if="importMode === 'createNew'">
                      <el-divider class="col-span-2">关系映射</el-divider>
                      <el-form-item class="col-span-2" label="三方字段">
                        <div class="flex flex-wrap gap-2">
                          <el-tag
                            v-for="item in relationCandidateTags"
                            :key="item.key"
                            type="info"
                          >
                            {{ item.label }}
                          </el-tag>
                          <span
                            v-if="relationCandidateTags.length === 0"
                            class="text-muted-foreground"
                          >
                            -
                          </span>
                        </div>
                      </el-form-item>
                      <el-form-item class="col-span-2" label="本地作者">
                        <div class="flex w-full gap-2">
                          <el-select
                            v-model="workDraft.authorIds"
                            class="flex-1"
                            filterable
                            multiple
                            :loading="relationLoading"
                          >
                            <el-option
                              v-for="item in authorOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                          <el-button
                            type="primary"
                            :disabled="relationLoading"
                            @click="openCreateAuthorModal"
                          >
                            新增
                          </el-button>
                        </div>
                      </el-form-item>
                      <el-form-item class="col-span-2" label="本地分类">
                        <div class="flex w-full gap-2">
                          <el-select
                            v-model="workDraft.categoryIds"
                            class="flex-1"
                            filterable
                            multiple
                            :loading="relationLoading"
                          >
                            <el-option
                              v-for="item in categoryOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                          <el-button
                            type="primary"
                            :disabled="relationLoading"
                            @click="openCreateCategoryModal"
                          >
                            新增
                          </el-button>
                        </div>
                      </el-form-item>
                      <el-form-item class="col-span-2" label="本地标签">
                        <div class="flex w-full gap-2">
                          <el-select
                            v-model="workDraft.tagIds"
                            class="flex-1"
                            filterable
                            multiple
                            :loading="relationLoading"
                          >
                            <el-option
                              v-for="item in tagOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                          <el-button
                            type="primary"
                            :disabled="relationLoading"
                            @click="openCreateTagModal"
                          >
                            新增
                          </el-button>
                        </div>
                      </el-form-item>
                    </template>
                  </el-form>
                </el-card>
              </div>
            </div>
          </el-scrollbar>
        </div>

        <div v-show="step === 3" class="h-full min-h-0 pb-4">
          <el-scrollbar class="h-full" view-class="h-full">
            <div class="grid h-full min-h-0 grid-cols-12 gap-4">
              <div class="col-span-6 flex h-full min-h-0">
                <el-card
                  body-class="min-h-0 flex-1 overflow-hidden p-0"
                  class="flex h-full min-h-0 flex-1 flex-col"
                  shadow="never"
                >
                  <template #header>
                    <div
                      class="flex flex-wrap items-center justify-between gap-3"
                    >
                      <span>
                        章节映射 {{ selectedMappings.length }} /
                        {{ chapterMappings.length }}
                      </span>
                    </div>
                  </template>

                  <ChapterMappingGrid
                    class="chapter-mapping-grid min-h-0 flex-1"
                  />
                </el-card>
              </div>

              <div class="col-span-6 flex h-full min-h-0">
                <el-card
                  body-class="min-h-0 flex-1 overflow-auto"
                  class="flex h-full min-h-0 flex-1 flex-col"
                  shadow="never"
                >
                  <el-form
                    v-if="activeMapping"
                    class="grid grid-cols-2 gap-x-4"
                    label-width="70px"
                  >
                    <el-form-item class="col-span-2" label="章节标题">
                      <el-input v-model="activeMapping.title" />
                    </el-form-item>
                    <el-form-item label="章节序号">
                      <el-input-number
                        v-model="activeMapping.sortOrder"
                        :min="0"
                        class="!w-full"
                      />
                    </el-form-item>
                    <el-form-item label="导入动作">
                      <el-select v-model="activeMapping.action" class="w-full">
                        <el-option
                          v-for="item in chapterActionOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      v-if="activeMapping.action === 'update'"
                      label="目标章节"
                    >
                      <el-select
                        v-model="activeMapping.targetChapterId"
                        :loading="localChapterLoading"
                        class="!w-full"
                        clearable
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请选择目标章节"
                        @focus="searchLocalChapters()"
                        @remote-method="searchLocalChapters"
                      >
                        <el-option
                          v-for="item in localChapterOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="查看规则">
                      <el-select
                        v-model="activeMapping.viewRule"
                        class="w-full"
                      >
                        <el-option
                          v-for="item in chapterViewRuleOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="章节价格">
                      <el-input-number
                        v-model="activeMapping.price"
                        :min="0"
                        :precision="2"
                        class="!w-full"
                      />
                    </el-form-item>
                    <el-form-item label="章节封面">
                      <el-select
                        v-model="activeMapping.coverMode"
                        class="w-full"
                      >
                        <el-option
                          v-for="item in chapterCoverOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="导入图片">
                      <el-switch v-model="activeMapping.importImages" />
                    </el-form-item>
                    <el-form-item
                      v-if="
                        activeMapping.action === 'update' &&
                        activeMapping.importImages
                      "
                      label="覆盖内容"
                    >
                      <el-switch v-model="activeMapping.overwriteContent" />
                    </el-form-item>
                    <el-form-item label="试读">
                      <el-switch v-model="activeMapping.isPreview" />
                    </el-form-item>
                    <el-form-item label="允许评论">
                      <el-switch v-model="activeMapping.canComment" />
                    </el-form-item>
                    <el-form-item label="允许下载">
                      <el-switch v-model="activeMapping.canDownload" />
                    </el-form-item>
                    <el-form-item
                      v-if="activeMapping.coverMode === 'local'"
                      class="col-span-2"
                      label="本地封面"
                    >
                      <EsUpload
                        v-model="activeMapping.localCoverPath"
                        :max-count="1"
                        :multiple="false"
                        :scene="chapterCoverScene"
                        accept="image/*"
                      />
                    </el-form-item>
                  </el-form>
                  <el-empty v-else description="请选择章节" />
                </el-card>
              </div>
            </div>
          </el-scrollbar>
        </div>

        <div v-show="step === 4" class="h-full min-h-0 pb-4">
          <el-scrollbar class="h-full" view-class="h-full">
            <div class="flex h-full min-h-0 flex-col gap-4">
              <div class="flex flex-wrap items-start gap-3">
                <VbenDescriptions
                  :column="4"
                  bordered
                  class="flex-1"
                  size="small"
                >
                  <VbenDescriptionsItem label="导入模式">
                    {{
                      importMode === 'createNew' ? '新建作品' : '挂载已有作品'
                    }}
                  </VbenDescriptionsItem>
                  <VbenDescriptionsItem label="章节数量">
                    {{ selectedMappings.length }}
                  </VbenDescriptionsItem>
                  <VbenDescriptionsItem label="作品封面">
                    {{
                      importMode === 'attachToExisting'
                        ? '不修改'
                        : workCoverMode === 'provider'
                          ? '三方下载'
                          : '本地上传'
                    }}
                  </VbenDescriptionsItem>
                  <VbenDescriptionsItem label="覆盖确认">
                    {{
                      updateWithoutOverwriteCount === 0 ? '已满足' : '未满足'
                    }}
                  </VbenDescriptionsItem>
                  <template v-if="submittedTask">
                    <VbenDescriptionsItem label="任务ID">
                      {{ submittedTask.jobId }}
                    </VbenDescriptionsItem>
                    <VbenDescriptionsItem label="任务状态">
                      <el-tag
                        :type="formatWorkflowStatus(submittedTask.status).type"
                      >
                        {{ formatWorkflowStatus(submittedTask.status).label }}
                      </el-tag>
                    </VbenDescriptionsItem>
                    <VbenDescriptionsItem label="创建时间">
                      {{ formatUTC(submittedTask.createdAt) || '-' }}
                    </VbenDescriptionsItem>
                    <VbenDescriptionsItem label="更新时间">
                      {{ formatUTC(submittedTask.updatedAt) || '-' }}
                    </VbenDescriptionsItem>
                    <VbenDescriptionsItem
                      v-if="getSubmittedTaskReservationValue('dedupeKey')"
                      label="去重键"
                    >
                      {{ getSubmittedTaskReservationValue('dedupeKey') }}
                    </VbenDescriptionsItem>
                    <VbenDescriptionsItem
                      v-if="getSubmittedTaskReservationValue('serialKey')"
                      label="串行键"
                    >
                      {{ getSubmittedTaskReservationValue('serialKey') }}
                    </VbenDescriptionsItem>
                  </template>
                </VbenDescriptions>
                <div class="flex gap-2">
                  <el-button
                    v-if="submittedTask"
                    type="primary"
                    @click="openSubmittedTask"
                  >
                    查看工作流任务
                  </el-button>
                </div>
              </div>
              <el-alert
                v-if="submittedTask"
                :closable="false"
                class="mt-3"
                show-icon
                title="导入任务已提交工作流处理，可前往工作流任务查看进度、错误、结果和重试状态。"
                description="章节会逐个处理；遇到三方限流会按等待窗口自动重试。"
                type="success"
              />

              <el-card shadow="never">
                <div class="flex flex-wrap items-center gap-3">
                  <el-select
                    v-model="activeProviderChapterId"
                    class="w-[360px] max-w-full"
                    @change="loadActiveChapterContent"
                  >
                    <el-option
                      v-for="item in selectedMappings"
                      :key="item.providerChapterId"
                      :label="item.title"
                      :value="item.providerChapterId"
                    />
                  </el-select>
                  <el-button
                    :loading="contentPreviewLoading"
                    type="primary"
                    @click="loadActiveChapterContent"
                  >
                    预览正文
                  </el-button>
                  <el-alert
                    v-if="updateWithoutOverwriteCount > 0"
                    :closable="false"
                    class="min-w-[280px] flex-1"
                    title="存在更新章节未确认覆盖内容"
                    type="warning"
                  />
                </div>
              </el-card>

              <el-card
                body-class="min-h-0 flex-1 overflow-hidden p-4"
                class="flex min-h-0 flex-1 flex-col"
                shadow="never"
                v-loading="contentPreviewLoading"
              >
                <template #header>
                  <div class="flex items-center justify-between gap-3">
                    <span>{{ contentPreview?.title || '正文预览' }}</span>
                    <el-tag v-if="contentPreview">
                      {{ contentPreview.images.length }} 张图片
                    </el-tag>
                  </div>
                </template>

                <el-empty
                  v-if="!contentPreview"
                  description="请选择章节预览正文"
                />
                <el-scrollbar v-else class="h-full">
                  <div
                    class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
                  >
                    <el-image
                      v-for="(image, imageIndex) in contentPreview.images"
                      :key="image.providerImageId"
                      :initial-index="imageIndex"
                      :preview-src-list="contentPreviewImages"
                      :src="image.url"
                      class="aspect-[9/14] rounded border border-border object-cover"
                      fit="cover"
                      lazy
                      preview-teleported
                    />
                  </div>
                </el-scrollbar>
              </el-card>
            </div>
          </el-scrollbar>
        </div>
      </div>

      <div
        class="flex shrink-0 items-center justify-end gap-2 border-t border-border bg-card p-3 pb-0"
      >
        <el-button :disabled="wizardBusy" @click="modalApi.close()">
          关闭
        </el-button>
        <el-button :disabled="step === 0 || wizardBusy" @click="goPrev">
          上一步
        </el-button>
        <el-button
          v-if="step < wizardSteps.length - 1"
          type="primary"
          :disabled="wizardBusy && !nextStepLoading"
          :loading="nextStepLoading"
          @click="goNext"
        >
          下一步
        </el-button>
        <el-button
          v-else
          :loading="importLoading"
          type="primary"
          @click="handleImport"
        >
          开始导入
        </el-button>
      </div>
    </div>
  </Modal>

  <AuthorForm
    :on-submit="handleCreateAuthor"
    :schema="thirdPartyAuthorFormSchema"
  />
  <CategoryForm
    :on-submit="handleCreateCategory"
    :schema="thirdPartyCategoryFormSchema"
  />
  <TagForm :on-submit="handleCreateTag" :schema="thirdPartyTagFormSchema" />
</template>

<style>
.chapter-mapping-grid .vxe-table--body .vxe-body--row,
.chapter-mapping-grid .vxe-table--body .vxe-body--column {
  cursor: pointer;
}
</style>
