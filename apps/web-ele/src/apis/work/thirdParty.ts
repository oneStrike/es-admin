import type {
  ThirdPartyChapterContentRequest,
  ThirdPartyChapterContentResponse,
  ThirdPartyChapterRequest,
  ThirdPartyChapterResponse,
  ThirdPartyDetailRequest,
  ThirdPartyDetailResponse,
  ThirdPartyPlatformResponse,
  ThirdPartySearchRequest,
  ThirdPartySearchResponse,
} from '../types/work/thirdParty.d';

import { requestClient } from '#/utils/request';

/**
 * 获取第三方漫画平台列表
 */
export async function thirdPartyPlatformApi(): Promise<ThirdPartyPlatformResponse> {
  return requestClient.get<ThirdPartyPlatformResponse>(
    '/api/admin/work/comic/third-party/platform',
  );
}

/**
 * 搜索第三方平台漫画
 */
export async function thirdPartySearchApi(
  params: ThirdPartySearchRequest,
): Promise<ThirdPartySearchResponse> {
  return requestClient.get<ThirdPartySearchResponse>(
    '/api/admin/work/comic/third-party/search',
    { params },
  );
}

/**
 * 获取第三方平台漫画详情
 */
export async function thirdPartyDetailApi(
  params: ThirdPartyDetailRequest,
): Promise<ThirdPartyDetailResponse> {
  return requestClient.get<ThirdPartyDetailResponse>(
    '/api/admin/work/comic/third-party/detail',
    { params },
  );
}

/**
 * 根据平台获取漫画章节
 */
export async function thirdPartyChapterApi(
  params: ThirdPartyChapterRequest,
): Promise<ThirdPartyChapterResponse> {
  return requestClient.get<ThirdPartyChapterResponse>(
    '/api/admin/work/comic/third-party/chapter',
    { params },
  );
}

/**
 * 根据平台获取漫画章节内容
 */
export async function thirdPartyChapterContentApi(
  params: ThirdPartyChapterContentRequest,
): Promise<ThirdPartyChapterContentResponse> {
  return requestClient.get<ThirdPartyChapterContentResponse>(
    '/api/admin/work/comic/third-party/chapter-content',
    { params },
  );
}
