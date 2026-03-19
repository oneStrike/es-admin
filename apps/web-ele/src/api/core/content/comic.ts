import type {
  ComicCreateRequest,
  ComicCreateResponse,
  ComicDeleteRequest,
  ComicDeleteResponse,
  ComicDetailRequest,
  ComicDetailResponse,
  ComicPageRequest,
  ComicPageResponse,
  ComicUpdateHotRequest,
  ComicUpdateHotResponse,
  ComicUpdateNewRequest,
  ComicUpdateNewResponse,
  ComicUpdateRecommendedRequest,
  ComicUpdateRecommendedResponse,
  ComicUpdateRequest,
  ComicUpdateResponse,
  ComicUpdateStatusRequest,
  ComicUpdateStatusResponse
} from '../../types/content/comic.d'

import { requestClient } from '#/api/request'


  /**
   * 创建漫画
   */
  export async function comicCreateApi(params: ComicCreateRequest): Promise<ComicCreateResponse> {
    return requestClient.post<ComicCreateResponse>('/api/admin/content/comic/create', params);
  }


  /**
   * 分页查询漫画列表
   */
  export async function comicPageApi(params?: ComicPageRequest): Promise<ComicPageResponse> {
    return requestClient.get<ComicPageResponse>('/api/admin/content/comic/page', { params });
  }


  /**
   * 获取漫画详情
   */
  export async function comicDetailApi(params: ComicDetailRequest): Promise<ComicDetailResponse> {
    return requestClient.get<ComicDetailResponse>('/api/admin/content/comic/detail', { params });
  }


  /**
   * 更新漫画信息
   */
  export async function comicUpdateApi(params: ComicUpdateRequest): Promise<ComicUpdateResponse> {
    return requestClient.post<ComicUpdateResponse>('/api/admin/content/comic/update', params);
  }


  /**
   * 更新漫画发布状态
   */
  export async function comicUpdateStatusApi(params: ComicUpdateStatusRequest): Promise<ComicUpdateStatusResponse> {
    return requestClient.post<ComicUpdateStatusResponse>('/api/admin/content/comic/update-status', params);
  }


  /**
   * 更新漫画推荐状态
   */
  export async function comicUpdateRecommendedApi(params: ComicUpdateRecommendedRequest): Promise<ComicUpdateRecommendedResponse> {
    return requestClient.post<ComicUpdateRecommendedResponse>('/api/admin/content/comic/update-recommended', params);
  }


  /**
   * 更新漫画热门状态
   */
  export async function comicUpdateHotApi(params: ComicUpdateHotRequest): Promise<ComicUpdateHotResponse> {
    return requestClient.post<ComicUpdateHotResponse>('/api/admin/content/comic/update-hot', params);
  }


  /**
   * 更新漫画新作状态
   */
  export async function comicUpdateNewApi(params: ComicUpdateNewRequest): Promise<ComicUpdateNewResponse> {
    return requestClient.post<ComicUpdateNewResponse>('/api/admin/content/comic/update-new', params);
  }


  /**
   * 软删除漫画
   */
  export async function comicDeleteApi(params: ComicDeleteRequest): Promise<ComicDeleteResponse> {
    return requestClient.post<ComicDeleteResponse>('/api/admin/content/comic/delete', params);
  }
