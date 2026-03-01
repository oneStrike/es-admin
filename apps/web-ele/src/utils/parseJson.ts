import { attempt } from 'es-toolkit';

/**
 * 安全解析 JSON 字符串
 * es-toolkit 的 attempt 返回 [error, result] 元组
 * 只有当字符串以 [ 或 { 开头时才尝试解析，避免普通字符串被错误解析
 */
export function safeParseJson(jsonString: string): any {
  const trimmed = jsonString.trim();
  // 只有以 [ 或 { 开头的才可能是 JSON 数组或对象
  if (!trimmed.startsWith('[') && !trimmed.startsWith('{')) {
    return undefined;
  }
  const [error, result] = attempt(() => JSON.parse(trimmed));
  if (error) {
    return undefined;
  }
  return result;
}
