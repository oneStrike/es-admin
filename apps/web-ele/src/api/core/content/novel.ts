import type {
  NovelCreateRequest,
  NovelCreateResponse,
  NovelDeleteRequest,
  NovelDeleteResponse,
  NovelDetailRequest,
  NovelDetailResponse,
  NovelPageRequest,
  NovelPageResponse,
  NovelUpdateHotRequest,
  NovelUpdateHotResponse,
  NovelUpdateNewRequest,
  NovelUpdateNewResponse,
  NovelUpdateRecommendedRequest,
  NovelUpdateRecommendedResponse,
  NovelUpdateRequest,
  NovelUpdateResponse,
  NovelUpdateStatusRequest,
  NovelUpdateStatusResponse
} from '../../types/content/novel.d'

import { requestClient } from '#/api/request'


  /**
   * 创建小说
   */
  export async function novelCreateApi(params: NovelCreateRequest): Promise<NovelCreateResponse> {
    return requestClient.post<NovelCreateResponse>('/api/admin/content/novel/create', params);
  }


  /**
   * 分页查询小说列表
   */
  export async function novelPageApi(params?: NovelPageRequest): Promise<NovelPageResponse> {
    return requestClient.get<NovelPageResponse>('/api/admin/content/novel/page', { params });
  }


  /**
   * 获取小说详情
   */
  export async function novelDetailApi(params: NovelDetailRequest): Promise<NovelDetailResponse> {
    return requestClient.get<NovelDetailResponse>('/api/admin/content/novel/detail', { params });
  }


  /**
   * 更新小说信息
   */
  export async function novelUpdateApi(params: NovelUpdateRequest): Promise<NovelUpdateResponse> {
    return requestClient.post<NovelUpdateResponse>('/api/admin/content/novel/update', params);
  }


  /**
   * 更新小说发布状态
   */
  export async function novelUpdateStatusApi(params: NovelUpdateStatusRequest): Promise<NovelUpdateStatusResponse> {
    return requestClient.post<NovelUpdateStatusResponse>('/api/admin/content/novel/update-status', params);
  }


  /**
   * 更新小说推荐状态
   */
  export async function novelUpdateRecommendedApi(params: NovelUpdateRecommendedRequest): Promise<NovelUpdateRecommendedResponse> {
    return requestClient.post<NovelUpdateRecommendedResponse>('/api/admin/content/novel/update-recommended', params);
  }


  /**
   * 更新小说热门状态
   */
  export async function novelUpdateHotApi(params: NovelUpdateHotRequest): Promise<NovelUpdateHotResponse> {
    return requestClient.post<NovelUpdateHotResponse>('/api/admin/content/novel/update-hot', params);
  }


  /**
   * 更新小说新作状态
   */
  export async function novelUpdateNewApi(params: NovelUpdateNewRequest): Promise<NovelUpdateNewResponse> {
    return requestClient.post<NovelUpdateNewResponse>('/api/admin/content/novel/update-new', params);
  }


  /**
   * 软删除小说
   */
  export async function novelDeleteApi(params: NovelDeleteRequest): Promise<NovelDeleteResponse> {
    return requestClient.post<NovelDeleteResponse>('/api/admin/content/novel/delete', params);
  }
