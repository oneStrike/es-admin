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
    const extraConfig = { ...(extra ?? {}) } as ColumnItemExtra<any>;

    const columnsWithSort: Array<
      VxeGridPropTypes.Columns<any>[number] & {
        sortValue: number;
      }
    > = [];

    innerSchema.forEach((item, idx) => {
      const itemExtra = extraConfig[item.fieldName];
      delete extraConfig[item.fieldName];
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

    if (extraConfig.actions && extraConfig.actions.show) {
      columnsWithSort.push({
        title: '操作',
        field: 'actions',
        align: 'center',
        fixed: 'right',
        sortValue: 999_999,
        width: 150,
        slots: { default: 'actions' },
        ...extraConfig.actions,
      });
      delete extraConfig.actions;
    }

    if (extraConfig.updatedAt && extraConfig.updatedAt.hide !== true) {
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
        ...extraConfig.updatedAt, // 修复：原来是 ...extra?.actions
      });
      delete extraConfig.updatedAt; // 修复：原来是 delete extra.actions
    }
    if (extraConfig.createdAt && extraConfig.createdAt.hide !== true) {
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
        ...extraConfig.createdAt, // 修复：原来是 ...extra?.actions
      });
      delete extraConfig.createdAt; // 修复：原来是 delete extra.actions
    }
    if (Object.keys(extraConfig).length > 0) {
      Object.keys(extraConfig).forEach((key) => {
        const item = extraConfig[key];
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
      ...extraConfig.seq,
    });

    // 移除辅助属性，返回最终的列配置
    return sortedColumns.map(({ sortValue: _ignored, ...rest }) => rest);
  },
  toSearchSchema: (schema, extra) => {
    const innerSchema = cloneDeep(schema);
    const extraConfig = cloneDeep(extra ?? {}) as FilterItemExtra;
    const filterList: EsFormSchema = [];

    // 按照 extra 对象的属性顺序处理
    if (Object.keys(extraConfig).length > 0) {
      Object.keys(extraConfig).forEach((key) => {
        const itemExtra = extraConfig[key];
        if (!itemExtra || itemExtra.hide === true) return;

        // 先从 schema 中查找对应字段
        const schemaItem = innerSchema.find((item) => item.fieldName === key);

        if (schemaItem) {
          const componentConfig =
            filterComponentProps[
              schemaItem.component as keyof typeof filterComponentProps
            ];

          const componentProps =
            schemaItem.componentProps &&
            typeof schemaItem.componentProps === 'object' &&
            !Array.isArray(schemaItem.componentProps)
              ? ({ ...schemaItem.componentProps } as Record<string, any>)
              : ({} as Record<string, any>);

          // 获取原有的options（如果componentProps是对象类型）
          const existingOptions = componentProps.options;
          const nextComponentProps: Record<string, any> = {
            ...componentProps,
            placeholder: componentConfig?.placeholder || schemaItem.label,
            class: 'w-[280px]',
            clearable: true,
            options: existingOptions ?? [],
          };

          const nextSchemaItem = {
            ...schemaItem,
            componentProps: nextComponentProps,
            label: '',
            rules: '',
            hideLabel: true,
          };
          delete nextSchemaItem.formItemClass;
          delete nextSchemaItem.defaultValue;

          if (nextSchemaItem.component === 'CheckboxGroup') {
            nextSchemaItem.component = 'Select';
            nextSchemaItem.componentProps.multiple = true;
            nextSchemaItem.componentProps.collapseTags = true;
            nextSchemaItem.componentProps.collapseTagsTooltip = true;
          }
          if (nextSchemaItem.component === 'RadioGroup') {
            nextSchemaItem.component = 'Select';
          }
          if (nextSchemaItem.component === 'DatePicker') {
            nextSchemaItem.componentProps.startPlaceholder =
              nextSchemaItem.componentProps.startPlaceholder || '开始时间';
            nextSchemaItem.componentProps.endPlaceholder =
              nextSchemaItem.componentProps.endPlaceholder || '结束时间';
          }

          // 合并 extra 中的配置
          filterList.push({
            ...nextSchemaItem,
            ...itemExtra,
          });
        } else {
          // schema 中不存在，使用 extra 中的配置创建新项
          const componentProps = (itemExtra.componentProps ?? {}) as Record<
            string,
            any
          >;
          const nextItemExtra = {
            ...itemExtra,
            fieldName: itemExtra.fieldName || key,
            componentProps: {
              ...componentProps,
              placeholder: componentProps.placeholder ?? itemExtra.label,
            },
          };
          filterList.push(nextItemExtra as EsFormSchema[number]);
        }
      });
    }

    return filterList;
  },
};
