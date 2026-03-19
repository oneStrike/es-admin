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
      if (!item.hide && item.component !== 'Divider' && !itemExtra?.hide) {
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
    if (extra && Object.keys(extra).length > 0) {
      Object.keys(extra).forEach((key) => {
        const item = extra[key];
        if (!['createdAt', 'seq'].includes(key) && item && !item.hide) {
          columnsWithSort.push({
            ...item,
            field: key,
            sortValue: item?.sort ?? columnsWithSort.length, // 改进：更合理的默认值
          });
        }
      });
    }

    // 根据 sort 属性排序，没有 sort 的保持原有位置
    const sortedColumns = sortItemsWithSortValue(columnsWithSort);
    sortedColumns.unshift({
      title: '序号',
      type: 'seq',
      width: 80,
      fixed: 'left',
      sortValue: -1,
      ...extra?.seq,
    });

    // 移除辅助属性，返回最终的列配置
    return sortedColumns.map(({ sortValue: _ignored, ...rest }) => rest);
  },
  toSearchSchema: (schema, extra) => {
    const innerSchema = cloneDeep(schema);
    const filterList: EsFormSchema = [];

    // 按照 extra 对象的属性顺序处理
    if (extra) {
      Object.keys(extra).forEach((key) => {
        const itemExtra = extra[key];
        if (!itemExtra || itemExtra.hide === true) return;

        // 先从 schema 中查找对应字段
        const schemaItem = innerSchema.find((item) => item.fieldName === key);

        if (schemaItem) {
          delete schemaItem.formItemClass;
          const componentConfig =
            filterComponentProps[
              schemaItem.component as keyof typeof filterComponentProps
            ];

          // 获取原有的options（如果componentProps是对象类型）
          const existingOptions =
            schemaItem.componentProps &&
            typeof schemaItem.componentProps === 'object' &&
            !Array.isArray(schemaItem.componentProps)
              ? schemaItem.componentProps.options
              : undefined;

          schemaItem.componentProps = {
            ...schemaItem.componentProps,
            placeholder: componentConfig?.placeholder || schemaItem.label,
            class: 'w-[280px]',
            clearable: true,
            options: existingOptions ?? [],
          };
          if (schemaItem.component === 'CheckboxGroup') {
            schemaItem.component = 'Select';
            schemaItem.componentProps.multiple = true;
            schemaItem.componentProps.collapseTags = true;
            schemaItem.componentProps.collapseTagsTooltip = true;
          }
          if (schemaItem.component === 'RadioGroup') {
            schemaItem.component = 'Select';
          }
          if (schemaItem.component === 'DatePicker') {
            schemaItem.componentProps.startPlaceholder =
              schemaItem.componentProps.startPlaceholder || '开始时间';
            schemaItem.componentProps.endPlaceholder =
              schemaItem.componentProps.endPlaceholder || '结束时间';
          }
          schemaItem.label = '';
          schemaItem.rules = '';
          schemaItem.hideLabel = true;
          delete schemaItem.defaultValue;

          // 合并 extra 中的配置
          filterList.push({
            ...schemaItem,
            ...itemExtra,
          });
        } else {
          // schema 中不存在，使用 extra 中的配置创建新项
          itemExtra.fieldName = itemExtra?.fieldName || key;
          const componentProps = (itemExtra.componentProps ?? {}) as Record<
            string,
            any
          >;
          itemExtra.componentProps = {
            ...componentProps,
            placeholder: componentProps.placeholder ?? itemExtra.label,
          };
          filterList.push(itemExtra as EsFormSchema[number]);
        }
      });
    }

    return filterList;
  },
};
