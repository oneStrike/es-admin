import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type { EsFormSchema } from '#/types';

import { cloneDeep } from 'es-toolkit';

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
function sortItemsWithSortValue<T extends { sortValue: number }>(
  items: T[],
): T[] {
  return items.toSorted((a, b) => a.sortValue - b.sortValue);
}

export const formSchemaTransform: FormSchemaTransform = {
  toTableColumns: (schema, extra) => {
    const innerSchema = cloneDeep(schema);

    const columnsWithSort: Array<
      VxeGridPropTypes.Columns<any>[number] & {
        sortValue: number;
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
          sortValue: itemExtra?.sort ?? idx,
          formatter: itemExtra?.cellRender
            ? undefined
            : ({ cellValue }) => {
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
        sortValue: 999_999,
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
        sortValue: 99,
        width: 150,
        sortable: true,
        cellRender: {
          name: 'CellDate',
        },
        ...extra?.createdAt, // 修复：原来是 ...extra?.actions
      });
      delete extra.createdAt; // 修复：原来是 delete extra.actions
    }

    if (extra?.updatedAt && extra.updatedAt.hide !== true) {
      columnsWithSort.push({
        title: '更新时间',
        field: 'updatedAt',
        align: 'center',
        sortValue: 99,
        width: 150,
        sortable: true,
        cellRender: {
          name: 'CellDate',
        },
        ...extra?.updatedAt, // 修复：原来是 ...extra?.actions
      });
      delete extra.updatedAt; // 修复：原来是 delete extra.actions
    }

    if (extra && Object.keys(extra).length > 0) {
      Object.keys(extra).forEach((key) => {
        const item = extra[key];
        if (!['createdAt', 'seq'].includes(key)) {
          columnsWithSort.push({
            ...item,
            field: key,
            sortValue: item?.sort ?? columnsWithSort.length, // 改进：更合理的默认值
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
      sortValue: -1,
      ...extra?.seq,
    });

    // 移除辅助属性，返回最终的列配置
    return columnsWithSort;
  },
  toSearchSchema: (schema, extra) => {
    const innerSchema = cloneDeep(schema);
    const filterListWithSort: Array<
      EsFormSchema[number] & { sortValue: number }
    > = [];

    // 先过滤出需要的项目并添加排序信息
    for (const [i, item] of innerSchema.entries()) {
      delete item.formItemClass;
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
          sortValue: itemExtra?.sort ?? i,
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
            sortValue: item?.sort ?? filterListWithSort.length,
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
