import type {
  DetectHighestLevelRequest,
  DetectHighestLevelResponse,
  DetectStatusResponse,
} from '../../types/forum/detect.d';

import { requestClient } from '#/api/request';

/**
 * 获取文本中敏感词的最高等级
 */
export async function detectHighestLevelApi(
  params: DetectHighestLevelRequest,
): Promise<DetectHighestLevelResponse> {
  return requestClient.post<DetectHighestLevelResponse>(
    '/api/admin/forum/sensitive-word/detect/highest-level',
    params,
  );
}

/**
 * 检查敏感词检测器状态
 */
export async function detectStatusApi(): Promise<DetectStatusResponse> {
  return requestClient.get<DetectStatusResponse>(
    '/api/admin/forum/sensitive-word/detect/status',
  );
}
