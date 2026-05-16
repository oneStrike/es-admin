import type {
  ContentAuthorPageResponse,
  ContentCategoryPageResponse,
  ContentComicPageResponse,
  ContentComicThirdPartyImportConfirmRequest,
  ContentComicThirdPartyImportPreviewResponse,
  ContentComicThirdPartyPlatformListResponse,
  ContentComicThirdPartySearchPageRequest,
  ContentComicThirdPartySearchPageResponse,
  ContentTagPageResponse,
  ThirdPartyComicImportChapterItemDto,
} from '#/api/types/content';

export type {
  ContentAuthorCreateRequest,
  ContentAuthorPageRequest,
  ContentCategoryCreateRequest,
  ContentCategoryPageRequest,
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
  ThirdPartyComicChapterContentDto,
  ThirdPartyComicImportChapterItemDto,
} from '#/api/types/content';

export interface SelectOption<
  TValue extends number | string = number | string,
> {
  label: string;
  value: TValue;
}

export type ImportMode = ContentComicThirdPartyImportConfirmRequest['mode'];
export type WorkCoverMode = NonNullable<
  ContentComicThirdPartyImportConfirmRequest['cover']
>['mode'];
type ImportWorkDraft = NonNullable<
  ContentComicThirdPartyImportConfirmRequest['workDraft']
>;
export type ChapterAction = ThirdPartyComicImportChapterItemDto['action'];
export type SearchComicRow = NonNullable<
  ContentComicThirdPartySearchPageResponse['list']
>[number];
export type ChapterPreviewRow =
  ContentComicThirdPartyImportPreviewResponse['chapters'][number];
export type PlatformOption = SelectOption<
  ContentComicThirdPartyPlatformListResponse[number]['code']
>;
type AuthorRow = NonNullable<ContentAuthorPageResponse['list']>[number];
type CategoryRow = NonNullable<ContentCategoryPageResponse['list']>[number];
type TagRow = NonNullable<ContentTagPageResponse['list']>[number];
export type LocalWorkRow = NonNullable<
  ContentComicPageResponse['list']
>[number];
export type LocalEntityRow =
  | Pick<AuthorRow, 'id' | 'name'>
  | Pick<CategoryRow, 'id' | 'name'>
  | Pick<LocalWorkRow, 'id' | 'name'>
  | Pick<TagRow, 'id' | 'name'>;
export type LocalOption = SelectOption<LocalEntityRow['id']>;
export type DictOption = SelectOption<string>;
export type SearchFormValues = Partial<
  Pick<ContentComicThirdPartySearchPageRequest, 'keyword' | 'platform'>
>;
type WorkDraftRequiredField =
  | 'authorIds'
  | 'categoryIds'
  | 'description'
  | 'language'
  | 'name'
  | 'region'
  | 'serialStatus'
  | 'tagIds'
  | 'viewRule';
type WorkDraftDefaultedField =
  | 'canComment'
  | 'chapterPrice'
  | 'isHot'
  | 'isNew'
  | 'isPublished'
  | 'isRecommended'
  | 'recommendWeight';
type WorkDraftOptionalTextField =
  | 'ageRating'
  | 'alias'
  | 'originalSource'
  | 'remark';
export type WorkDraftForm = Pick<ImportWorkDraft, WorkDraftRequiredField> & {
  [Field in WorkDraftDefaultedField]-?: NonNullable<ImportWorkDraft[Field]>;
} & {
  [Field in WorkDraftOptionalTextField]?: Exclude<ImportWorkDraft[Field], null>;
};
type ChapterMappingRequiredField =
  | 'action'
  | 'importImages'
  | 'providerChapterId'
  | 'sortOrder'
  | 'title';
type ChapterMappingDefaultedField =
  | 'canComment'
  | 'canDownload'
  | 'isPreview'
  | 'isPublished'
  | 'overwriteContent'
  | 'price'
  | 'viewRule';
type ChapterMappingOptionalField =
  | 'chapterApiVersion'
  | 'subtitle'
  | 'targetChapterId';
export type ChapterMappingForm = Pick<
  ThirdPartyComicImportChapterItemDto,
  ChapterMappingRequiredField
> & {
  [Field in ChapterMappingDefaultedField]-?: NonNullable<
    ThirdPartyComicImportChapterItemDto[Field]
  >;
} & {
  [Field in ChapterMappingOptionalField]?: Exclude<
    ThirdPartyComicImportChapterItemDto[Field],
    null
  >;
} & {
  coverMode: Extract<WorkCoverMode, 'local' | 'skip'>;
  localCoverPath: string;
  selected: boolean;
};
