<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {
  AuthorPageResponseDto,
  BaseCategoryDto,
  BaseTagDto,
  ContentComicThirdPartyImportConfirmRequest,
  ContentComicThirdPartyImportConfirmResponse,
  ContentComicThirdPartyImportPreviewResponse,
  CreateAuthorDto,
  CreateCategoryDto,
  CreateTagDto,
  PageWorkDto,
  PlatformResponseDto,
  SearchComicItemDto,
  ThirdPartyComicChapterContentDto,
  ThirdPartyComicImportChapterItemDto,
} from '#/api/types/content';
import type { EsFormSchema } from '#/types';

import { useRouter } from 'vue-router';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { formatQuery, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  contentAuthorCreateApi,
  contentAuthorPageApi,
  contentCategoryCreateApi,
  contentCategoryPageApi,
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
import { formatBackgroundTaskStatus } from '#/views/system-manager/background-task/model/status';

import { formSchema as authorFormSchema } from '../../author-manager/model/shared';
import { formSchema as categoryFormSchema } from '../../category-manager/model/shared';
import { formSchema as tagFormSchema } from '../../tag-manager/model/shared';
import {
  canUseProviderWorkCover,
  findCreatedOptionByName,
  resolveInitialGroup,
  resolveInitialWorkCoverMode,
  resolveSelectDefault,
  SERVER_COMIC_CATEGORY_TYPE,
  SERVER_MANGA_AUTHOR_TYPE,
  toApiGroup,
} from './model/helpers';

type ImportMode = ContentComicThirdPartyImportConfirmRequest['mode'];
type WorkCoverMode = NonNullable<
  ContentComicThirdPartyImportConfirmRequest['cover']
>['mode'];
type ChapterAction = ThirdPartyComicImportChapterItemDto['action'];

interface PlatformOption {
  label: string;
  value: string;
}

interface LocalOption {
  label: string;
  value: number;
}

interface DictOption {
  label: string;
  value: string;
}

interface SearchFormValues {
  keyword?: string;
  platform?: string;
}

interface WorkDraftForm {
  ageRating?: string;
  alias?: string;
  authorIds: number[];
  canComment: boolean;
  categoryIds: number[];
  chapterPrice: number;
  description: string;
  isHot: boolean;
  isNew: boolean;
  isPublished: boolean;
  isRecommended: boolean;
  language: string;
  name: string;
  originalSource?: string;
  recommendWeight: number;
  region: string;
  remark?: string;
  serialStatus: number;
  tagIds: number[];
  viewRule: number;
}

interface ChapterMappingForm {
  action: ChapterAction;
  canComment: boolean;
  canDownload: boolean;
  chapterApiVersion?: number;
  coverMode: Extract<WorkCoverMode, 'local' | 'skip'>;
  importImages: boolean;
  isPreview: boolean;
  isPublished: boolean;
  localCoverPath: string;
  overwriteContent: boolean;
  price: number;
  providerChapterId: string;
  selected: boolean;
  sortOrder: number;
  subtitle?: string;
  targetChapterId?: number;
  title: string;
  viewRule: number;
}

type SearchComicRow = SearchComicItemDto;
type ChapterPreviewRow =
  ContentComicThirdPartyImportPreviewResponse['chapters'][number];

const wizardSteps = ['检索', '预览', '作品', '关系', '章节', '正文', '导入'];

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
const contentPreviewLoading = ref(false);
const importLoading = ref(false);
const nextStepLoading = ref(false);
const selectingComicId = ref('');

const activeComic = ref<null | SearchComicItemDto>(null);
const activePlatform = ref('');
const selectedGroup = ref('');
const preview = ref<ContentComicThirdPartyImportPreviewResponse | null>(null);
const importMode = ref<ImportMode>('createNew');
const targetWorkId = ref<number>();
const localWorkOptions = ref<LocalOption[]>([]);
const workCoverMode =
  ref<Extract<WorkCoverMode, 'local' | 'provider'>>('provider');
const localWorkCoverPath = ref('');
const workDraft = ref<WorkDraftForm>(createEmptyWorkDraft());
const authorOptions = ref<LocalOption[]>([]);
const categoryOptions = ref<LocalOption[]>([]);
const tagOptions = ref<LocalOption[]>([]);
const chapterMappings = ref<ChapterMappingForm[]>([]);
const activeProviderChapterId = ref('');
const contentPreview = ref<null | ThirdPartyComicChapterContentDto>(null);
const submittedTask = ref<ContentComicThirdPartyImportConfirmResponse | null>(
  null,
);
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
        formItemClass: 'col-span-3',
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
  contentClass: 'min-h-0 !overflow-hidden p-0',
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
      slots: { default: 'searchCover' },
      title: '封面',
      width: 96,
    },
    {
      field: 'name',
      minWidth: 220,
      slots: { default: 'searchName' },
      title: '作品',
    },
    {
      field: 'author',
      minWidth: 220,
      slots: { default: 'searchAuthor' },
      title: '作者',
    },
    {
      field: 'platform',
      minWidth: 140,
      slots: { default: 'searchPlatform' },
      title: '平台',
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
  height: 360,
  pagerConfig: { enabled: false },
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

const [AuthorForm, authorFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});
const [CategoryForm, categoryFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});
const [TagForm, tagFormApi] = useVbenModal({
  connectedComponent: EsModalForm,
});

const selectedMappings = computed(() =>
  chapterMappings.value.filter((item) => item.selected),
);

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
    isPublished: false,
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
  localWorkOptions.value = [];
  workCoverMode.value = 'provider';
  localWorkCoverPath.value = '';
  workDraft.value = createEmptyWorkDraft();
  chapterMappings.value = [];
  activeProviderChapterId.value = '';
  contentPreview.value = null;
  submittedTask.value = null;
  formApi.setValues({
    keyword: '',
    platform: '',
  });
  searchGridApi.setGridOptions({ data: [] });
  chapterPreviewGridApi.setGridOptions({ data: [] });
}

function resolveComicPlatform(item: SearchComicItemDto) {
  return String(item.platform || activePlatform.value || platform.value || '');
}

function resolveComicId(item: SearchComicItemDto) {
  return String(item.id ?? '');
}

function formatTextList(values?: string[]) {
  return values && values.length > 0 ? values.join('、') : '-';
}

async function loadPlatforms() {
  try {
    const list = await contentComicThirdPartyPlatformListApi();
    platformOptions.value = (list || []).map((item: PlatformResponseDto) => ({
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

async function selectComic(item: SearchComicItemDto) {
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
  try {
    const res = await contentComicThirdPartyImportPreviewApi({
      comicId: String(comicId),
      group: apiGroup,
      platform: activePlatform.value,
    });
    preview.value = res;
    selectedGroup.value = apiGroup ?? resolveInitialGroup(res.groups);
    applyPreviewToDraft(res);
    chapterMappings.value = res.chapters.map((chapter) =>
      createChapterMapping(chapter),
    );
    activeProviderChapterId.value =
      chapterMappings.value[0]?.providerChapterId || '';
    chapterPreviewGridApi.setGridOptions({ data: res.chapters });
  } catch {
    preview.value = null;
    chapterMappings.value = [];
    chapterPreviewGridApi.setGridOptions({ data: [] });
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

function createChapterMapping(
  chapter: ContentComicThirdPartyImportPreviewResponse['chapters'][number],
): ChapterMappingForm {
  return {
    action: 'create',
    canComment: true,
    canDownload: false,
    chapterApiVersion: chapter.chapterApiVersion ?? undefined,
    coverMode: 'skip',
    importImages: true,
    isPreview: false,
    isPublished: false,
    localCoverPath: '',
    overwriteContent: false,
    price: 0,
    providerChapterId: chapter.providerChapterId,
    selected: true,
    sortOrder: chapter.sortOrder,
    title: chapter.title,
    viewRule: -1,
  };
}

function toLocalOptions(
  list: Array<{ id: number; name: string }> | undefined,
): LocalOption[] {
  return (list || []).map((item) => ({
    label: item.name,
    value: item.id,
  }));
}

function authorPageParams(name?: string) {
  return {
    isEnabled: true,
    name: name || undefined,
    pageSize: name ? 20 : 500,
    type: JSON.stringify([SERVER_MANGA_AUTHOR_TYPE]),
  };
}

function categoryPageParams(name?: string) {
  return {
    contentType: JSON.stringify([SERVER_COMIC_CATEGORY_TYPE]),
    isEnabled: true,
    name: name || undefined,
    pageSize: name ? 20 : 500,
  };
}

function tagPageParams(name?: string) {
  return {
    isEnabled: true,
    name: name || undefined,
    pageSize: name ? 20 : 500,
  };
}

async function loadAuthorOptions() {
  const authors = await contentAuthorPageApi(authorPageParams());
  authorOptions.value = toLocalOptions(authors.list as AuthorPageResponseDto[]);
}

async function loadCategoryOptions() {
  const categories = await contentCategoryPageApi(categoryPageParams());
  categoryOptions.value = toLocalOptions(categories.list as BaseCategoryDto[]);
}

async function loadTagOptions() {
  const tags = await contentTagPageApi(tagPageParams());
  tagOptions.value = toLocalOptions(tags.list as BaseTagDto[]);
}

async function loadRelationOptions(force = false) {
  if (
    !force &&
    authorOptions.value.length > 0 &&
    categoryOptions.value.length > 0 &&
    tagOptions.value.length > 0
  ) {
    return;
  }

  relationLoading.value = true;
  try {
    await Promise.all([
      loadAuthorOptions(),
      loadCategoryOptions(),
      loadTagOptions(),
    ]);
  } catch {
    authorOptions.value = [];
    categoryOptions.value = [];
    tagOptions.value = [];
  } finally {
    relationLoading.value = false;
  }
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
  return findCreatedOptionByName(
    toLocalOptions(res.list as AuthorPageResponseDto[]),
    name,
  ) as LocalOption | undefined;
}

async function findCreatedCategory(name: string) {
  const res = await contentCategoryPageApi(categoryPageParams(name));
  return findCreatedOptionByName(
    toLocalOptions(res.list as BaseCategoryDto[]),
    name,
  ) as LocalOption | undefined;
}

async function findCreatedTag(name: string) {
  const res = await contentTagPageApi(tagPageParams(name));
  return findCreatedOptionByName(
    toLocalOptions(res.list as BaseTagDto[]),
    name,
  ) as LocalOption | undefined;
}

async function handleCreateAuthor(values: CreateAuthorDto) {
  const name = values.name.trim();
  const payload: CreateAuthorDto = {
    avatar: values.avatar,
    description: values.description,
    gender: values.gender ?? 0,
    name,
    nationality: values.nationality,
    remark: values.remark,
    type: [SERVER_MANGA_AUTHOR_TYPE],
  };
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

async function handleCreateCategory(values: CreateCategoryDto) {
  const name = values.name.trim();
  const payload: CreateCategoryDto = {
    contentType: [SERVER_COMIC_CATEGORY_TYPE],
    description: values.description,
    icon: values.icon,
    isEnabled: values.isEnabled ?? true,
    name,
    sortOrder: values.sortOrder ?? 0,
  };
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

async function handleCreateTag(values: CreateTagDto) {
  const name = values.name.trim();
  const payload: CreateTagDto = {
    description: values.description,
    icon: values.icon,
    name,
    sortOrder: values.sortOrder ?? 0,
  };
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
  localWorkLoading.value = true;
  try {
    const res = await contentComicPageApi({
      name: query || undefined,
      pageIndex: 1,
      pageSize: 20,
      type: 1,
    });
    localWorkOptions.value = (res.list || []).map((item: PageWorkDto) => ({
      label: `${item.name}（ID: ${item.id}）`,
      value: item.id,
    }));
  } catch {
    localWorkOptions.value = [];
  } finally {
    localWorkLoading.value = false;
  }
}

function selectAllChapters(selected: boolean) {
  chapterMappings.value.forEach((item) => {
    item.selected = selected;
  });
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
    });
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
    if (step.value === 2 && importMode.value === 'createNew') {
      await loadRelationOptions();
    }
    if (step.value === 4 && selectedMappings.value.length > 0) {
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
    return validateWorkStep();
  }
  if (currentStep === 3) {
    return validateRelationStep();
  }
  if (currentStep === 4) {
    return validateChapterStep();
  }
  if (currentStep === 5 && updateWithoutOverwriteCount.value > 0) {
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
    useMessage.warning(`章节「${invalidUpdate.title}」缺少目标章节ID`);
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
  for (let index = 2; index <= 5; index++) {
    if (!validateStep(index)) return;
  }

  const request = buildImportRequest();
  if (!request) return;

  importLoading.value = true;
  submittedTask.value = null;
  try {
    submittedTask.value = await contentComicThirdPartyImportConfirmApi(request);
    useMessage.success(
      `导入任务已提交：${submittedTask.value.taskId.slice(0, 8)}`,
    );
  } catch {
    submittedTask.value = null;
  } finally {
    importLoading.value = false;
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
      isPublished: draft.isPublished,
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

function toChapterImportItem(
  item: ChapterMappingForm,
): ThirdPartyComicImportChapterItemDto {
  const chapterItem = {
    action: item.action,
    canComment: item.canComment,
    canDownload: item.canDownload,
    cover:
      item.coverMode === 'local'
        ? { localPath: item.localCoverPath, mode: 'local' }
        : { mode: 'skip' },
    chapterApiVersion: item.chapterApiVersion,
    importImages: item.importImages,
    isPreview: item.isPreview,
    isPublished: item.isPublished,
    overwriteContent: item.overwriteContent,
    price: item.price,
    providerChapterId: item.providerChapterId,
    sortOrder: item.sortOrder,
    subtitle: item.subtitle || undefined,
    targetChapterId: item.targetChapterId,
    title: item.title,
    viewRule: item.viewRule,
  } satisfies ThirdPartyComicImportChapterItemDto;

  return chapterItem;
}

function openSubmittedTask() {
  if (!submittedTask.value) return;

  void router.push({
    name: 'BackgroundTaskManager',
    query: { taskId: submittedTask.value.taskId },
  });
}
</script>

<template>
  <Modal
    class="third-party-import-modal !h-[86vh] !max-h-[86vh] w-[1280px] max-w-[calc(100vw-32px)]"
  >
    <div class="flex h-full min-h-0 flex-col">
      <div class="shrink-0 border-b border-border bg-card p-4">
        <el-steps :active="step" finish-status="success" simple>
          <el-step v-for="item in wizardSteps" :key="item" :title="item" />
        </el-steps>
      </div>

      <div class="min-h-0 flex-1 overflow-auto p-4" v-loading="previewLoading">
        <div
          v-show="step === 0"
          class="flex h-full min-h-0 flex-col gap-4"
          v-loading="loading"
        >
          <Form />

          <SearchGrid class="min-h-0 flex-1">
            <template #searchCover="{ row }">
              <div class="flex justify-center">
                <el-image
                  :src="row.cover"
                  class="h-[82px] w-[56px] rounded object-cover"
                  fit="cover"
                />
              </div>
            </template>

            <template #searchName="{ row }">
              <div class="line-clamp-2 text-sm font-semibold">
                {{ row.name }}
              </div>
              <div class="mt-1 text-xs text-muted-foreground">
                ID：{{ row.id ?? '-' }}
              </div>
            </template>

            <template #searchAuthor="{ row }">
              {{ formatTextList(row.author) }}
            </template>

            <template #searchPlatform="{ row }">
              {{ resolveComicPlatform(row) || '-' }}
            </template>

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
                选择导入
              </el-button>
            </template>
          </SearchGrid>
        </div>

        <div v-show="step === 1" class="space-y-4">
          <el-empty v-if="!preview" description="请选择第三方作品" />
          <template v-else>
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-4 rounded border border-border bg-card p-4">
                <div class="flex gap-4">
                  <el-image
                    v-if="preview.detail.cover"
                    :src="preview.detail.cover"
                    class="h-[170px] w-[116px] shrink-0 rounded object-cover"
                    fit="cover"
                  />
                  <div class="min-w-0 space-y-2">
                    <div class="line-clamp-2 text-lg font-semibold">
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
                <div class="mt-3 text-sm leading-6 text-muted-foreground">
                  {{ preview.detail.brief || '-' }}
                </div>
              </div>

              <div class="col-span-8 rounded border border-border bg-card p-4">
                <div class="mb-3 flex items-center justify-between">
                  <div class="font-semibold">章节分组</div>
                  <el-select
                    v-model="selectedGroup"
                    class="w-[220px]"
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

                <div class="mb-3 flex flex-wrap gap-2">
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

                <ChapterPreviewGrid />
              </div>
            </div>
          </template>
        </div>

        <div v-show="step === 2" class="space-y-4">
          <el-radio-group v-model="importMode">
            <el-radio-button
              v-for="item in importModeOptions"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>

          <div
            v-if="importMode === 'attachToExisting'"
            class="rounded border border-border bg-card p-4"
          >
            <el-form label-width="110px">
              <el-form-item label="目标作品">
                <el-select
                  v-model="targetWorkId"
                  class="w-full"
                  filterable
                  remote
                  reserve-keyword
                  :loading="localWorkLoading"
                  :remote-method="searchLocalWorks"
                  @focus="searchLocalWorks()"
                >
                  <el-option
                    v-for="item in localWorkOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>

          <div v-else class="grid grid-cols-12 gap-4">
            <div class="col-span-4 rounded border border-border bg-card p-4">
              <div class="mb-3 font-semibold">作品封面</div>
              <el-radio-group v-model="workCoverMode" class="mb-3">
                <el-radio-button
                  label="provider"
                  :disabled="!canUseProviderCover"
                >
                  三方封面
                </el-radio-button>
                <el-radio-button label="local">本地上传</el-radio-button>
              </el-radio-group>

              <el-image
                v-if="
                  workCoverMode === 'provider' && preview?.coverOptions.provider
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

            <el-form
              class="col-span-8 grid grid-cols-2 gap-x-4 rounded border border-border bg-card p-4"
              label-width="110px"
            >
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
                <el-select v-model="workDraft.serialStatus" class="w-full">
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
              <el-form-item label="发布">
                <el-switch v-model="workDraft.isPublished" />
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
            </el-form>
          </div>
        </div>

        <div v-show="step === 3" v-loading="relationLoading">
          <el-alert
            v-if="importMode === 'attachToExisting'"
            :closable="false"
            title="挂载已有作品不会修改本地作品元数据、封面、作者、分类或标签"
            type="info"
          />
          <div v-else class="grid grid-cols-12 gap-4">
            <div class="col-span-5 rounded border border-border bg-card p-4">
              <div class="mb-3 font-semibold">三方字段</div>
              <div class="space-y-3 text-sm">
                <div>
                  作者：{{
                    preview?.relationCandidates.authors
                      .map((item) => item.providerName)
                      .join('、') || '-'
                  }}
                </div>
                <div>
                  分类：{{
                    preview?.relationCandidates.categories
                      .map((item) => item.providerName)
                      .join('、') || '-'
                  }}
                </div>
                <div>
                  标签：{{
                    preview?.relationCandidates.tags
                      .map((item) => item.providerName)
                      .join('、') || '-'
                  }}
                </div>
              </div>
            </div>

            <el-form
              class="col-span-7 rounded border border-border bg-card p-4"
              label-width="100px"
            >
              <el-form-item label="本地作者">
                <div class="flex w-full gap-2">
                  <el-select
                    v-model="workDraft.authorIds"
                    class="flex-1"
                    filterable
                    multiple
                  >
                    <el-option
                      v-for="item in authorOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <el-button type="primary" @click="openCreateAuthorModal">
                    新增
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item label="本地分类">
                <div class="flex w-full gap-2">
                  <el-select
                    v-model="workDraft.categoryIds"
                    class="flex-1"
                    filterable
                    multiple
                  >
                    <el-option
                      v-for="item in categoryOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <el-button type="primary" @click="openCreateCategoryModal">
                    新增
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item label="本地标签">
                <div class="flex w-full gap-2">
                  <el-select
                    v-model="workDraft.tagIds"
                    class="flex-1"
                    filterable
                    multiple
                  >
                    <el-option
                      v-for="item in tagOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <el-button type="primary" @click="openCreateTagModal">
                    新增
                  </el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div v-show="step === 4" class="grid grid-cols-12 gap-4">
          <div class="col-span-5 rounded border border-border bg-card p-4">
            <div class="mb-3 flex items-center justify-between">
              <div class="font-semibold">
                章节映射 {{ selectedMappings.length }} /
                {{ chapterMappings.length }}
              </div>
              <div class="space-x-2">
                <el-button size="small" @click="selectAllChapters(true)">
                  全选
                </el-button>
                <el-button size="small" @click="selectAllChapters(false)">
                  清空
                </el-button>
              </div>
            </div>
            <div class="max-h-[520px] space-y-2 overflow-y-auto pr-1">
              <button
                v-for="mapping in chapterMappings"
                :key="mapping.providerChapterId"
                class="flex w-full items-start gap-3 rounded border border-border p-3 text-left hover:border-primary"
                :class="{
                  'border-primary bg-primary/10':
                    mapping.providerChapterId === activeProviderChapterId,
                }"
                type="button"
                @click="selectActiveMapping(mapping)"
              >
                <el-checkbox v-model="mapping.selected" @click.stop />
                <div class="min-w-0 flex-1">
                  <div class="line-clamp-2 text-sm font-medium">
                    {{ mapping.title }}
                  </div>
                  <div class="mt-1 text-xs text-muted-foreground">
                    {{ mapping.providerChapterId }}
                  </div>
                </div>
              </button>
            </div>
          </div>

          <el-form
            v-if="activeMapping"
            class="chapter-mapping-form col-span-7 rounded border border-border bg-card p-4"
            label-width="110px"
          >
            <div class="grid grid-cols-2 gap-x-6 gap-y-1">
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
                label="目标章节ID"
              >
                <el-input-number
                  v-model="activeMapping.targetChapterId"
                  :min="1"
                  class="!w-full"
                />
              </el-form-item>
              <el-form-item label="查看规则">
                <el-select v-model="activeMapping.viewRule" class="w-full">
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
              <el-form-item label="发布">
                <el-switch v-model="activeMapping.isPublished" />
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
              <el-form-item label="章节封面">
                <el-select v-model="activeMapping.coverMode" class="w-full">
                  <el-option
                    v-for="item in chapterCoverOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
            </div>
          </el-form>
        </div>

        <div v-show="step === 5" class="space-y-4">
          <div
            class="flex items-center gap-3 rounded border border-border bg-card p-4"
          >
            <el-select
              v-model="activeProviderChapterId"
              class="w-[360px]"
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
              class="flex-1"
              title="存在更新章节未确认覆盖内容"
              type="warning"
            />
          </div>

          <div
            class="rounded border border-border bg-card p-4"
            v-loading="contentPreviewLoading"
          >
            <el-empty v-if="!contentPreview" description="请选择章节预览正文" />
            <template v-else>
              <div class="mb-3 flex items-center justify-between">
                <div class="font-semibold">
                  {{ contentPreview.title }}
                </div>
                <el-tag>{{ contentPreview.images.length }} 张图片</el-tag>
              </div>
              <div class="grid grid-cols-6 gap-3">
                <el-image
                  v-for="image in contentPreview.images"
                  :key="image.providerImageId"
                  :preview-src-list="contentPreviewImages"
                  :src="image.url"
                  class="aspect-[9/14] rounded border border-border object-cover"
                  fit="cover"
                  lazy
                />
              </div>
            </template>
          </div>
        </div>

        <div v-show="step === 6" class="space-y-4">
          <div class="grid grid-cols-4 gap-4">
            <div class="rounded border border-border bg-card p-4">
              <div class="text-sm text-muted-foreground">导入模式</div>
              <div class="mt-2 text-lg font-semibold">
                {{ importMode === 'createNew' ? '新建作品' : '挂载已有作品' }}
              </div>
            </div>
            <div class="rounded border border-border bg-card p-4">
              <div class="text-sm text-muted-foreground">章节数量</div>
              <div class="mt-2 text-lg font-semibold">
                {{ selectedMappings.length }}
              </div>
            </div>
            <div class="rounded border border-border bg-card p-4">
              <div class="text-sm text-muted-foreground">作品封面</div>
              <div class="mt-2 text-lg font-semibold">
                {{
                  importMode === 'attachToExisting'
                    ? '不修改'
                    : workCoverMode === 'provider'
                      ? '三方下载'
                      : '本地上传'
                }}
              </div>
            </div>
            <div class="rounded border border-border bg-card p-4">
              <div class="text-sm text-muted-foreground">覆盖确认</div>
              <div class="mt-2 text-lg font-semibold">
                {{ updateWithoutOverwriteCount === 0 ? '已满足' : '未满足' }}
              </div>
            </div>
          </div>

          <el-empty v-if="!submittedTask" description="尚未提交导入任务" />
          <div v-else class="space-y-4">
            <div class="rounded border border-border bg-card p-4">
              <div class="mb-3 flex items-center justify-between gap-3">
                <span class="font-semibold">后台任务</span>
                <el-button type="primary" @click="openSubmittedTask">
                  查看后台任务
                </el-button>
              </div>
              <el-alert
                :closable="false"
                class="mb-4"
                show-icon
                title="导入任务已提交后台处理，可前往后台任务查看进度、错误、结果和重试状态。"
                type="success"
              />
              <el-descriptions :column="2" border size="small">
                <el-descriptions-item label="任务ID">
                  {{ submittedTask.taskId }}
                </el-descriptions-item>
                <el-descriptions-item label="任务类型">
                  {{ submittedTask.taskType }}
                </el-descriptions-item>
                <el-descriptions-item label="任务状态">
                  <el-tag
                    :type="
                      formatBackgroundTaskStatus(submittedTask.status).type
                    "
                  >
                    {{ formatBackgroundTaskStatus(submittedTask.status).label }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="重试次数">
                  {{ submittedTask.retryCount }} /
                  {{ submittedTask.maxRetries }}
                </el-descriptions-item>
                <el-descriptions-item label="创建时间">
                  {{ formatUTC(submittedTask.createdAt) || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="更新时间">
                  {{ formatUTC(submittedTask.updatedAt) || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
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
.third-party-import-modal .el-step.is-simple .el-step__title {
  font-size: 13px;
}

.third-party-import-modal .chapter-mapping-form .el-form-item {
  margin-bottom: 14px;
}

.third-party-import-modal .chapter-mapping-form .el-form-item__content {
  min-width: 0;
}

.third-party-import-modal .chapter-mapping-form .el-select,
.third-party-import-modal .chapter-mapping-form .el-input,
.third-party-import-modal .chapter-mapping-form .el-input-number {
  width: 100%;
}
</style>
