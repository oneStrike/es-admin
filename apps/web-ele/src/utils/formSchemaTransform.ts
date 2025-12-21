import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type { EsFormSchema } from '#/types';

import { cloneDeep } from 'lodash-es';

type ColumnItemExtra<T> = Partial<
  Record<
    EsFormSchema[number]['fieldName'],
    Partial<T> & {
      formatter?: VxeGridPropTypes.Columns<T>[number]['formatter'];
      hide?: boolean;
      show?: boolean;
      sort?: number;
    }
  >
>;

type FilterItemExtra = Partial<
  Record<
    EsFormSchema[number]['fieldName'],
    Partial<EsFormSchema[number]> & {
      hide?: boolean;
      show?: boolean;
      sort?: number;
    }
  >
>;

interface FormSchemaTransform {
  toTableColumns: <T extends Record<string, any> = any>(
    schema: EsFormSchema,
    extra?: ColumnItemExtra<T>,
  ) => VxeGridPropTypes.Columns<T>;
  toSearchSchema: (
    schema: EsFormSchema,
    extra?: FilterItemExtra,
  ) => EsFormSchema;
}

const filterComponentProps = {
  RangePicker: {
    placeholder: ['开始时间', '结束时间'],
  },
} as const;

// 通用排序函数
function sortItemsWithSortValue<
  T extends { originalIndex: number; sortValue?: number },
>(items: T[]): T[] {
  return items.sort((a, b) => {
    // 如果两个都有 sort 值，按 sort 值排序
    if (a.sortValue !== undefined && b.sortValue !== undefined) {
      // 当 sort 值相等时，按照原始索引排序
      if (a.sortValue === b.sortValue) {
        return a.originalIndex - b.originalIndex;
      }
      return a.sortValue - b.sortValue;
    }
    // 如果两个都没有 sort 值，按原有位置排序
    if (a.sortValue === undefined && b.sortValue === undefined) {
      return a.originalIndex - b.originalIndex;
    }
    // 如果只有一个有 sort 值，有 sort 值的排在后面
    if (a.sortValue !== undefined && b.sortValue === undefined) {
      return 1;
    }
    if (a.sortValue === undefined && b.sortValue !== undefined) {
      return 1;
    }
    // 默认按原有位置排序
    return a.originalIndex - b.originalIndex;
  });
}

export const formSchemaTransform: FormSchemaTransform = {
  toTableColumns: (schema, extra) => {
    const innerSchema = cloneDeep(schema);

    const columnsWithSort: Array<
      VxeGridPropTypes.Columns<any>[number] & {
        originalIndex: number;
        sortValue?: number;
      }
    > = [];

    innerSchema.forEach((item, idx) => {
      const itemExtra = extra?.[item.fieldName];
      delete extra?.[item.fieldName];
      if ((!itemExtra || !itemExtra?.hide) && item.component !== 'Divider') {
        columnsWithSort.push({
          title: item.label as string,
          field: item.fieldName,
          align: 'center',
          minWidth: 100,
          sortValue: itemExtra?.sort,
          originalIndex: idx,
          formatter: ({ cellValue }) => {
            return cellValue || '-';
          },
          ...itemExtra,
        });
      }
    });

    if (extra?.actions && extra.actions.show) {
      columnsWithSort.push({
        title: '操作',
        field: 'actions',
        align: 'center',
        fixed: 'right',
        originalIndex: -1,
        width: 150,
        slots: { default: 'actions' },
        ...extra?.actions,
      });
      delete extra.actions;
    }

    if (extra?.createdAt && extra.createdAt.hide !== true) {
      columnsWithSort.push({
        title: '创建时间',
        field: 'createdAt',
        align: 'center',
        originalIndex: 99,
        width: 150,
        ...extra?.createdAt, // 修复：原来是 ...extra?.actions
        sortable: true,
        cellRender: {
          name: 'CellDate',
        },
      });
      delete extra.createdAt; // 修复：原来是 delete extra.actions
    }

    if (extra && Object.keys(extra).length > 0) {
      Object.keys(extra).forEach((key) => {
        const item = extra[key];
        if (!['createdAt', 'seq'].includes(key)) {
          columnsWithSort.push({
            ...item,
            field: key,
            originalIndex: item?.sort ?? columnsWithSort.length, // 改进：更合理的默认值
          });
        }
      });
    }

    // 根据 sort 属性排序，没有 sort 的保持原有位置
    sortItemsWithSortValue(columnsWithSort);

    columnsWithSort.unshift({
      title: '序号',
      type: 'seq',
      width: 80,
      fixed: 'left',
      originalIndex: -1,
      ...extra?.seq,
    });

    // 移除辅助属性，返回最终的列配置
    return columnsWithSort;
  },
  toSearchSchema: (schema, extra) => {
    const innerSchema = cloneDeep(schema);
    const filterListWithSort: Array<
      EsFormSchema[number] & { originalIndex: number; sortValue?: number }
    > = [];

    // 先过滤出需要的项目并添加排序信息
    for (const [i, item] of innerSchema.entries()) {
      const itemExtra = extra?.[item.fieldName];
      delete extra?.[item.fieldName];

      if (itemExtra && itemExtra.hide !== true) {
        const componentConfig =
          filterComponentProps[
            item.component as keyof typeof filterComponentProps
          ];

        // 获取原有的options（如果componentProps是对象类型）
        const existingOptions =
          item.componentProps &&
          typeof item.componentProps === 'object' &&
          !Array.isArray(item.componentProps)
            ? item.componentProps.options
            : undefined;

        item.componentProps = {
          ...item.componentProps,
          placeholder: componentConfig?.placeholder || item.label,
          class: 'w-[280px]',
          clearable: true,
          options: existingOptions ?? [],
        };
        if (item.component === 'CheckboxGroup') {
          item.component = 'Select';
          item.componentProps.multiple = true;
          item.componentProps.collapseTags = true;
          item.componentProps.collapseTagsTooltip = true;
        }
        if (item.component === 'RadioGroup') {
          item.component = 'Select';
        }
        if (item.component === 'DatePicker') {
          item.componentProps.startPlaceholder =
            item.componentProps.startPlaceholder || '开始时间';
          item.componentProps.endPlaceholder =
            item.componentProps.endPlaceholder || '结束时间';
        }
        item.label = '';
        item.rules = '';
        item.hideLabel = true;
        delete item.defaultValue;
        filterListWithSort.push({
          ...item,
          originalIndex: i,
          sortValue: itemExtra?.sort,
        });
      }
    }

    if (extra) {
      Object.keys(extra).forEach((key) => {
        const item = extra[key];
        if (item) {
          item.fieldName = item?.fieldName || key;
          item.componentProps = {
            ...item.componentProps,
            // @ts-expect-error ignore
            placeholder: item.componentProps.placeholder ?? item.label,
          };
          filterListWithSort.push({
            ...item,
            originalIndex: filterListWithSort.length,
            sortValue: item?.sort,
          } as (typeof filterListWithSort)[number]);
        }
      });
    }
    // 根据 sort 属性排序，没有 sort 的保持原有位置
    sortItemsWithSortValue(filterListWithSort);

    // 移除辅助属性，返回最终的过滤列表
    return filterListWithSort;
  },
};
