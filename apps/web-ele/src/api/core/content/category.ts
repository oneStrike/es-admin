import type {
  CategoryCreateRequest,
  CategoryCreateResponse,
  CategoryDeleteRequest,
  CategoryDeleteResponse,
  CategoryDetailRequest,
  CategoryDetailResponse,
  CategoryPageRequest,
  CategoryPageResponse,
  CategorySwapSortOrderRequest,
  CategorySwapSortOrderResponse,
  CategoryUpdateRequest,
  CategoryUpdateResponse,
  CategoryUpdateStatusRequest,
  CategoryUpdateStatusResponse
} from '../../types/content/category.d'

import { requestClient } from '#/api/request'


  /**
   * 创建分类
   */
  export async function categoryCreateApi(params: CategoryCreateRequest): Promise<CategoryCreateResponse> {
    return requestClient.post<CategoryCreateResponse>('/api/admin/content/category/create', params);
  }


  /**
   * 分页查询分类列表
   */
  export async function categoryPageApi(params?: CategoryPageRequest): Promise<CategoryPageResponse> {
    return requestClient.get<CategoryPageResponse>('/api/admin/content/category/page', { params });
  }


  /**
   * 获取分类详情
   */
  export async function categoryDetailApi(params: CategoryDetailRequest): Promise<CategoryDetailResponse> {
    return requestClient.get<CategoryDetailResponse>('/api/admin/content/category/detail', { params });
  }


  /**
   * 更新分类信息
   */
  export async function categoryUpdateApi(params: CategoryUpdateRequest): Promise<CategoryUpdateResponse> {
    return requestClient.post<CategoryUpdateResponse>('/api/admin/content/category/update', params);
  }


  /**
   * 更新分类状态
   */
  export async function categoryUpdateStatusApi(params: CategoryUpdateStatusRequest): Promise<CategoryUpdateStatusResponse> {
    return requestClient.post<CategoryUpdateStatusResponse>('/api/admin/content/category/update-status', params);
  }


  /**
   * 删除分类
   */
  export async function categoryDeleteApi(params: CategoryDeleteRequest): Promise<CategoryDeleteResponse> {
    return requestClient.post<CategoryDeleteResponse>('/api/admin/content/category/delete', params);
  }


  /**
   * 分类交换排序
   */
  export async function categorySwapSortOrderApi(params: CategorySwapSortOrderRequest): Promise<CategorySwapSortOrderResponse> {
    return requestClient.post<CategorySwapSortOrderResponse>('/api/admin/content/category/swap-sort-order', params);
  }
