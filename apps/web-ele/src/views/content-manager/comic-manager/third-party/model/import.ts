import { requestClient } from '#/api/request';

// The current generated spec omits the third-party import wizard endpoints.
// Keep their contract local to this feature instead of hand-patching generated API files.
export interface ThirdPartyComicSourceFlagsDto {
  isLock: boolean;
  isLogin: boolean;
  isMobileBind: boolean;
  isVip: boolean;
}

export interface ThirdPartyComicGroupDto {
  count: number;
  name: string;
  pathWord: string;
}

export interface ThirdPartyComicDetailDto {
  alias?: string;
  authors: string[];
  brief?: string;
  cover?: string;
  datetimeUpdated?: string;
  groups: ThirdPartyComicGroupDto[];
  id: string;
  name: string;
  pathWord: string;
  popular?: number;
  region?: string;
  sourceFlags: ThirdPartyComicSourceFlagsDto;
  status?: string;
  taxonomies: string[];
  uuid?: string;
}

export interface ThirdPartyComicChapterDto {
  [property: string]: unknown;
  chapterApiVersion?: number;
  datetimeCreated?: string;
  group?: string;
  imageCount?: number;
  providerChapterId: string;
  sortOrder: number;
  title: string;
}

export interface ThirdPartyComicImageDto {
  providerImageId: string;
  sortOrder: number;
  url: string;
}

export interface ThirdPartyComicChapterContentDto {
  images: ThirdPartyComicImageDto[];
  providerChapterId: string;
  title: string;
}

export interface ThirdPartyComicProviderCoverOptionDto {
  providerImageId: string;
  url: string;
}

export interface ThirdPartyComicCoverOptionsDto {
  localRequired: boolean;
  provider?: ThirdPartyComicProviderCoverOptionDto;
}

export interface ThirdPartyComicLocalCandidateDto {
  id: number;
  name: string;
}

export interface ThirdPartyComicRelationCandidateItemDto {
  localCandidates: ThirdPartyComicLocalCandidateDto[];
  providerName: string;
}

export interface ThirdPartyComicRelationCandidatesDto {
  authors: ThirdPartyComicRelationCandidateItemDto[];
  categories: ThirdPartyComicRelationCandidateItemDto[];
  tags: ThirdPartyComicRelationCandidateItemDto[];
}

export interface ThirdPartyComicSourceSnapshotDto {
  fetchedAt: string;
  pathWord?: string;
  providerComicId: string;
  uuid?: string;
}

export interface ThirdPartyComicImportPreviewWorkDraftDto {
  alias?: string;
  description: string;
  name: string;
  originalSource?: string;
  remark?: string;
  suggestedRegion?: string;
  suggestedSerialStatus?: number;
}

export interface ContentComicThirdPartyImportPreviewRequest {
  comicId: string;
  group?: string;
  platform: string;
}

export interface ContentComicThirdPartyImportPreviewResponse {
  chapters: ThirdPartyComicChapterDto[];
  comicId: string;
  coverOptions: ThirdPartyComicCoverOptionsDto;
  detail: ThirdPartyComicDetailDto;
  groups: ThirdPartyComicGroupDto[];
  missingLocalFields: string[];
  platform: string;
  relationCandidates: ThirdPartyComicRelationCandidatesDto;
  sourceSnapshot: ThirdPartyComicSourceSnapshotDto;
  workDraft: ThirdPartyComicImportPreviewWorkDraftDto;
}

export interface ThirdPartyComicImportCoverDto {
  localPath?: string;
  mode: 'local' | 'provider' | 'skip';
  providerImageId?: string;
}

export interface ThirdPartyComicImportWorkDraftDto {
  ageRating?: string;
  alias?: string;
  authorIds: number[];
  canComment?: boolean;
  categoryIds: number[];
  chapterPrice?: number;
  cover?: string;
  description: string;
  isHot?: boolean;
  isNew?: boolean;
  isPublished?: boolean;
  isRecommended?: boolean;
  language: string;
  name: string;
  originalSource?: string;
  recommendWeight?: number;
  region: string;
  remark?: string;
  serialStatus: number;
  tagIds: number[];
  viewRule: number;
}

export interface ThirdPartyComicImportChapterItemDto {
  action: 'create' | 'update';
  canComment?: boolean;
  canDownload?: boolean;
  chapterApiVersion?: number;
  cover?: ThirdPartyComicImportCoverDto;
  importImages: boolean;
  isPreview?: boolean;
  isPublished?: boolean;
  overwriteContent?: boolean;
  price?: number;
  providerChapterId: string;
  sortOrder: number;
  subtitle?: string;
  targetChapterId?: number;
  title: string;
  viewRule?: number;
}

export interface ContentComicThirdPartyImportConfirmRequest {
  chapters: ThirdPartyComicImportChapterItemDto[];
  comicId: string;
  cover?: ThirdPartyComicImportCoverDto;
  mode: 'attachToExisting' | 'createNew';
  platform: string;
  sourceSnapshot: ThirdPartyComicSourceSnapshotDto;
  targetWorkId?: number;
  workDraft?: ThirdPartyComicImportWorkDraftDto;
}

export interface ThirdPartyComicImportWorkResultDto {
  errorCode?: string;
  id?: number;
  message?: string;
  status: 'attached' | 'created' | 'failed';
}

export interface ThirdPartyComicImportCoverResultDto {
  errorCode?: string;
  filePath?: string;
  message?: string;
  status: 'failed' | 'local' | 'skipped' | 'uploaded';
}

export interface ThirdPartyComicImportChapterResultDto {
  [property: string]: unknown;
  action: 'create' | 'update';
  cover?: ThirdPartyComicImportCoverResultDto;
  errorCode?: string;
  imageSucceeded?: number;
  imageTotal?: number;
  localChapterId?: number;
  message?: string;
  providerChapterId: string;
  status:
    | 'content_imported'
    | 'created'
    | 'failed'
    | 'metadata_only'
    | 'skipped'
    | 'updated';
}

export interface ContentComicThirdPartyImportConfirmResponse {
  chapters: ThirdPartyComicImportChapterResultDto[];
  cover?: ThirdPartyComicImportCoverResultDto;
  mode: 'attachToExisting' | 'createNew';
  status: 'failed' | 'partial_failed' | 'success';
  work?: ThirdPartyComicImportWorkResultDto;
}

export type WorkCoverMode = 'local' | 'provider';

export interface SelectOption {
  label: string;
  value: number | string;
}

export const SERVER_MANGA_AUTHOR_TYPE = 1;
export const SERVER_COMIC_CATEGORY_TYPE = 1;

export function contentComicThirdPartyImportPreviewApi(
  params: ContentComicThirdPartyImportPreviewRequest,
) {
  return requestClient.post<ContentComicThirdPartyImportPreviewResponse>(
    '/api/admin/content/comic/third-party/import/preview',
    params,
  );
}

export function contentComicThirdPartyImportConfirmApi(
  params: ContentComicThirdPartyImportConfirmRequest,
) {
  return requestClient.post<ContentComicThirdPartyImportConfirmResponse>(
    '/api/admin/content/comic/third-party/import/confirm',
    params,
  );
}

export function contentComicThirdPartyChapterContentDetailApi(params: {
  chapterApiVersion?: number;
  chapterId: string;
  comicId: string;
  group?: string;
  platform: string;
}) {
  return requestClient.get<ThirdPartyComicChapterContentDto>(
    '/api/admin/content/comic/third-party/chapter-content/detail',
    { params },
  );
}

export function canUseProviderWorkCover(
  coverOptions: ThirdPartyComicCoverOptionsDto,
) {
  return Boolean(coverOptions.provider) && !coverOptions.localRequired;
}

export function resolveInitialWorkCoverMode(
  coverOptions: ThirdPartyComicCoverOptionsDto,
): WorkCoverMode {
  return canUseProviderWorkCover(coverOptions) ? 'provider' : 'local';
}

export function resolveInitialGroup(groups: ThirdPartyComicGroupDto[]) {
  return groups[0]?.pathWord || '';
}

export function toApiGroup(group: string) {
  return group.trim() || undefined;
}

function normalizeOptionLabel(value: string) {
  return value.trim();
}

export function findCreatedOptionByName<T extends SelectOption>(
  options: T[],
  name: string,
) {
  const normalizedName = normalizeOptionLabel(name);
  return options.find(
    (option) => normalizeOptionLabel(option.label) === normalizedName,
  );
}

export function resolveSelectDefault(
  options: Array<{ value: string }>,
  preferred?: string,
  fallback = '',
) {
  const values = new Set(options.map((item) => item.value));
  if (preferred && values.has(preferred)) {
    return preferred;
  }
  if (fallback && values.has(fallback)) {
    return fallback;
  }
  return '';
}
