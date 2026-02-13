import type { Recordable } from '@vben/types';

import type { BaseDictionaryItemDto } from '#/api/types';

/**
 * 数据字典
 */
import { dictionaryItemsApi } from '#/api';

export interface UseDictItem {
  labels: Record<string, string>;
  options: { label: string; value: string }[];
}

export async function useDict(codes: string): Promise<Recordable<UseDictItem>> {
  const { list = [] } = await dictionaryItemsApi({
    dictionaryCode: codes,
    isEnabled: true,
  });
  const returnValue: Record<string, UseDictItem> = {};
  list.forEach((item: BaseDictionaryItemDto) => {
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
