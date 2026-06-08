import type { Recordable } from '@vben/types';

import type { BaseDictionaryItemDto } from '#/api/types';

/**
 * 数据字典
 */
import { dictionaryItemListApi } from '#/api/core';

export interface UseDictItem {
  labels: Record<string, string>;
  options: { label: string; value: string }[];
}

function assertDictionaryItemList(
  value: unknown,
): asserts value is BaseDictionaryItemDto[] {
  if (!Array.isArray(value)) {
    throw new TypeError('Dictionary item list response must be an array');
  }
}

export async function useDict(codes: string): Promise<Recordable<UseDictItem>> {
  const listResponse: unknown = await dictionaryItemListApi({
    dictionaryCode: codes,
  });
  assertDictionaryItemList(listResponse);

  const returnValue: Record<string, UseDictItem> = {};
  listResponse.forEach((item) => {
    // 使用中间变量解决TypeScript类型推断问题
    let dictItem = returnValue[item.dictionaryCode];
    if (!dictItem) {
      dictItem = returnValue[item.dictionaryCode] = {
        labels: {},
        options: [],
      };
    }
    // 现在TypeScript可以确定dictItem不是undefined
    dictItem.labels[item.code] = item.name;
    dictItem.options.push({
      label: item.name,
      value: item.code,
    });
  });
  return returnValue;
}
