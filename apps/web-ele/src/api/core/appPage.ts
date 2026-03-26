import { requestClient } from '#/api/request'
import type {
  AppPageCreateRequest,
  AppPageCreateResponse,
  AppPagePageRequest,
  AppPagePageResponse,
  AppPageDetailRequest,
  AppPageDetailResponse,
  AppPageDetailCodeRequest,
  AppPageDetailCodeResponse,
  AppPageUpdateRequest,
  AppPageUpdateResponse,
  AppPageDeleteRequest,
  AppPageDeleteResponse
} from '../types/appPage.d'


  /**
   * 创建页面配置
   */
  export async function appPageCreateApi(params: AppPageCreateRequest): Promise<AppPageCreateResponse> {
    return requestClient.post<AppPageCreateResponse>('/api/admin/app-page/create', params);
  }


  /**
   * 分页查询页面配置列表
   */
  export async function appPagePageApi(params?: AppPagePageRequest): Promise<AppPagePageResponse> {
    return requestClient.get<AppPagePageResponse>('/api/admin/app-page/page', { params });
  }


  /**
   * 根据ID查询页面配置详情
   */
  export async function appPageDetailApi(params: AppPageDetailRequest): Promise<AppPageDetailResponse> {
    return requestClient.get<AppPageDetailResponse>('/api/admin/app-page/detail', { params });
  }


  /**
   * 根据页面编码查询页面配置详情
   */
  export async function appPageDetailCodeApi(params: AppPageDetailCodeRequest): Promise<AppPageDetailCodeResponse> {
    return requestClient.get<AppPageDetailCodeResponse>('/api/admin/app-page/detail/code', { params });
  }


  /**
   * 更新页面配置
   */
  export async function appPageUpdateApi(params: AppPageUpdateRequest): Promise<AppPageUpdateResponse> {
    return requestClient.post<AppPageUpdateResponse>('/api/admin/app-page/update', params);
  }


  /**
   * 批量下线页面配置
   */
  export async function appPageDeleteApi(params: AppPageDeleteRequest): Promise<AppPageDeleteResponse> {
    return requestClient.post<AppPageDeleteResponse>('/api/admin/app-page/delete', params);
  }
