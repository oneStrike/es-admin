import { requestClient } from '#/utils/request'
import type {
  ComicCreateRequest,
  ComicCreateResponse,
  ComicPageRequest,
  ComicPageResponse,
  ComicDetailRequest,
  ComicDetailResponse,
  ComicUpdateRequest,
  ComicUpdateResponse,
  ComicDeleteRequest,
  ComicDeleteResponse,
  ComicUpdateStatusRequest,
  ComicUpdateStatusResponse,
  ComicUpdateRecommendedRequest,
  ComicUpdateRecommendedResponse,
  ComicUpdateHotRequest,
  ComicUpdateHotResponse,
  ComicUpdateNewRequest,
  ComicUpdateNewResponse,
  CreateComicDto,
  IdDto,
  BaseComicDto,
  ComicCategoryDto,
  ComicAuthorDto,
  ComicTagDto,
  UpdateComicDto,
  UpdateComicStatusDto,
  BatchOperationResponseDto,
  UpdateComicRecommendedDto,
  UpdateComicHotDto,
  UpdateComicNewDto
} from './types/comic.d'


  /**
   * 创建漫画
   */
  export async function comicCreateApi(params: ComicCreateRequest): Promise<ComicCreateResponse> {
    return requestClient.post<ComicCreateResponse>('/api/admin/work/comic/create', params);
  }


  /**
   * 分页查询漫画列表
   */
  export async function comicPageApi(params?: ComicPageRequest): Promise<ComicPageResponse> {
    return requestClient.get<ComicPageResponse>('/api/admin/work/comic/page', { params });
  }


  /**
   * 获取漫画详情
   */
  export async function comicDetailApi(params: ComicDetailRequest): Promise<ComicDetailResponse> {
    return requestClient.get<ComicDetailResponse>('/api/admin/work/comic/detail', { params });
  }


  /**
   * 更新漫画信息
   */
  export async function comicUpdateApi(params: ComicUpdateRequest): Promise<ComicUpdateResponse> {
    return requestClient.post<ComicUpdateResponse>('/api/admin/work/comic/update', params);
  }


  /**
   * 软删除漫画
   */
  export async function comicDeleteApi(params: ComicDeleteRequest): Promise<ComicDeleteResponse> {
    return requestClient.post<ComicDeleteResponse>('/api/admin/work/comic/delete', params);
  }


  /**
   * 更新漫画发布状态
   */
  export async function comicUpdateStatusApi(params: ComicUpdateStatusRequest): Promise<ComicUpdateStatusResponse> {
    return requestClient.post<ComicUpdateStatusResponse>('/api/admin/work/comic/update-status', params);
  }


  /**
   * 更新漫画推荐状态
   */
  export async function comicUpdateRecommendedApi(params: ComicUpdateRecommendedRequest): Promise<ComicUpdateRecommendedResponse> {
    return requestClient.post<ComicUpdateRecommendedResponse>('/api/admin/work/comic/update-recommended', params);
  }


  /**
   * 更新漫画热门状态
   */
  export async function comicUpdateHotApi(params: ComicUpdateHotRequest): Promise<ComicUpdateHotResponse> {
    return requestClient.post<ComicUpdateHotResponse>('/api/admin/work/comic/update-hot', params);
  }


  /**
   * 更新漫画新作状态
   */
  export async function comicUpdateNewApi(params: ComicUpdateNewRequest): Promise<ComicUpdateNewResponse> {
    return requestClient.post<ComicUpdateNewResponse>('/api/admin/work/comic/update-new', params);
  }
