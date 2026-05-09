import type { VxeGridPropTypes } from '#/adapter/vxe-table';
import type { EsFormSchema } from '#/types';

import { cloneDeep } from 'es-toolkit';

type SchemaRecord = Record<string, unknown>;

type TableColumn<T extends SchemaRecord> = VxeGridPropTypes.Columns<T>[number];

type ColumnItemExtra<T extends SchemaRecord> = Partial<
  Record<
    EsFormSchema[number]['fieldName'],
    Partial<TableColumn<T>> & {
      hide?: boolean;
      show?: boolean;
      sort?: number;
    }
  >
>;

type ColumnExtraItem = NonNullable<ColumnItemExtra<SchemaRecord>[string]>;
type TableCellRender = TableColumn<SchemaRecord>['cellRender'];

type SchemaOption = {
  color?: string;
  label: string;
  type?: string;
  value: boolean | number | string;
};

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
  toTableColumns: <T extends SchemaRecord = SchemaRecord>(
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

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function mergePlainObjectProps(
  ...sources: Array<Record<string, unknown> | undefined>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  sources.forEach((source) => {
    if (!source) return;

    Object.entries(source).forEach(([key, value]) => {
      const currentValue = result[key];
      result[key] =
        isPlainObject(currentValue) && isPlainObject(value)
          ? mergePlainObjectProps(currentValue, value)
          : value;
    });
  });

  return result;
}

function getPlainComponentProps(item: EsFormSchema[number]) {
  return isPlainObject(item.componentProps) ? item.componentProps : {};
}

function getSchemaOptions(item: EsFormSchema[number]) {
  const componentProps = getPlainComponentProps(item);
  return Array.isArray(componentProps.options)
    ? (componentProps.options as SchemaOption[])
    : undefined;
}

function isBooleanOptions(options: SchemaOption[] | undefined) {
  return options?.some((option) => typeof option.value === 'boolean') ?? false;
}

function hasDisplayType(options: SchemaOption[] | undefined) {
  return (
    options?.some((option) => Boolean(option.color || option.type)) ?? false
  );
}

function isStatusLikeField(item: EsFormSchema[number]) {
  const fieldName = String(item.fieldName);
  const label = String(item.label ?? '');

  return (
    /status|state|enabled|visible|audit|review/i.test(fieldName) ||
    /状态|审核|启用|禁用|可见/.test(label)
  );
}

function getCellRenderName(cellRender: unknown) {
  if (!isPlainObject(cellRender)) {
    return undefined;
  }

  return typeof cellRender.name === 'string' ? cellRender.name : undefined;
}

function hasDefaultSlot(itemExtra: ColumnExtraItem | undefined) {
  return isPlainObject(itemExtra?.slots) && Boolean(itemExtra.slots.default);
}

function shouldUseCellTag(
  item: EsFormSchema[number],
  componentProps: Record<string, unknown>,
  options: SchemaOption[] | undefined,
) {
  return (
    item.component === 'CheckboxGroup' ||
    item.component === 'RadioGroup' ||
    item.component === 'Switch' ||
    componentProps.multiple === true ||
    isBooleanOptions(options) ||
    hasDisplayType(options) ||
    isStatusLikeField(item)
  );
}

function shouldUseCellText(
  item: EsFormSchema[number],
  options: SchemaOption[] | undefined,
) {
  return item.component === 'Select' && Boolean(options?.length);
}

function createCellRender(
  name: 'CellTag' | 'CellText',
  options?: SchemaOption[],
): TableCellRender {
  return options?.length ? { name, props: { mapOptions: options } } : { name };
}

function mergeSourceOptionsIntoRenderer(
  cellRender: TableCellRender,
  options: SchemaOption[] | undefined,
): TableCellRender {
  if (!isPlainObject(cellRender) || !options?.length) {
    return cellRender;
  }

  const name = getCellRenderName(cellRender);
  if (name !== 'CellTag' && name !== 'CellText') {
    return cellRender;
  }

  const props = isPlainObject(cellRender.props) ? cellRender.props : {};
  if (Object.prototype.hasOwnProperty.call(props, 'mapOptions')) {
    return cellRender;
  }

  return {
    ...cellRender,
    props: {
      ...props,
      mapOptions: options,
    },
  };
}

function deriveTableColumnExtra(
  item: EsFormSchema[number],
  itemExtra: ColumnExtraItem | undefined,
) {
  const options = getSchemaOptions(item);
  const explicitRendererName = getCellRenderName(itemExtra?.cellRender);
  const hasExplicitCommonRenderer =
    explicitRendererName === 'CellTag' || explicitRendererName === 'CellText';

  if (hasExplicitCommonRenderer) {
    return {
      ...itemExtra,
      cellRender: mergeSourceOptionsIntoRenderer(
        itemExtra?.cellRender,
        options,
      ),
    };
  }

  if (itemExtra?.formatter || hasDefaultSlot(itemExtra)) {
    return itemExtra;
  }

  const componentProps = getPlainComponentProps(item);
  if (shouldUseCellTag(item, componentProps, options)) {
    return {
      ...itemExtra,
      cellRender: createCellRender('CellTag', options),
    };
  }

  if (shouldUseCellText(item, options)) {
    return {
      ...itemExtra,
      cellRender: createCellRender('CellText', options),
    };
  }

  return itemExtra;
}

// 通用排序函数
function sortItemsWithSortValue<T extends { sortValue: number }>(
  items: T[],
): T[] {
  return items.toSorted((a, b) => a.sortValue - b.sortValue);
}

export const formSchemaTransform: FormSchemaTransform = {
  toTableColumns: <T extends SchemaRecord = SchemaRecord>(
    schema: EsFormSchema,
    extra?: ColumnItemExtra<T>,
  ) => {
    const innerSchema = cloneDeep(schema);
    const extraConfig = {
      ...(extra as ColumnItemExtra<SchemaRecord> | undefined),
    };
    const consumedExtraKeys = new Set<string>();

    const columnsWithSort: Array<
      VxeGridPropTypes.Columns<SchemaRecord>[number] & {
        sortValue: number;
      }
    > = [];

    innerSchema.forEach((item, idx) => {
      const itemExtra = extraConfig[item.fieldName];
      const columnExtra = deriveTableColumnExtra(item, itemExtra);
      consumedExtraKeys.add(item.fieldName);
      if (!item.hide && item.component !== 'Divider' && !columnExtra?.hide) {
        columnsWithSort.push({
          title: item.label as string,
          field: item.fieldName,
          align: 'center',
          minWidth: 100,
          sortValue: columnExtra?.sort ?? idx,
          formatter: columnExtra?.cellRender
            ? undefined
            : ({ cellValue }) => {
                return cellValue ?? '-';
              },
          ...columnExtra,
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
        minWidth: 170,
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
        minWidth: 170,
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
        if (
          !consumedExtraKeys.has(key) &&
          !['createdAt', 'seq'].includes(key) &&
          item &&
          !item.hide
        ) {
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
    return sortedColumns.map(
      ({ sortValue: _ignored, ...rest }) => rest,
    ) as VxeGridPropTypes.Columns<T>;
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

          const componentProps = isPlainObject(schemaItem.componentProps)
            ? schemaItem.componentProps
            : {};

          // 获取原有的options（如果componentProps是对象类型）
          const existingOptions = componentProps.options;
          const nextComponentProps: Record<string, unknown> = {
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

          const { componentProps: extraComponentProps, ...itemExtraRest } =
            itemExtra;
          const hasExtraComponentProps = Object.prototype.hasOwnProperty.call(
            itemExtra,
            'componentProps',
          );
          let mergedComponentProps: EsFormSchema[number]['componentProps'] =
            nextSchemaItem.componentProps;
          if (isPlainObject(extraComponentProps)) {
            mergedComponentProps = mergePlainObjectProps(
              nextSchemaItem.componentProps,
              extraComponentProps,
            );
          } else if (hasExtraComponentProps) {
            mergedComponentProps = extraComponentProps;
          }

          // 先合并非 componentProps 配置，再回填二次合并后的 componentProps。
          filterList.push({
            ...nextSchemaItem,
            ...itemExtraRest,
            componentProps: mergedComponentProps,
          });
        } else {
          // schema 中不存在，使用 extra 中的配置创建新项
          const componentProps = isPlainObject(itemExtra.componentProps)
            ? itemExtra.componentProps
            : {};
          const placeholder =
            typeof componentProps.placeholder === 'string'
              ? componentProps.placeholder
              : itemExtra.label;
          const nextItemExtra = {
            ...itemExtra,
            fieldName: itemExtra.fieldName || key,
            componentProps: {
              ...componentProps,
              placeholder,
            },
          };
          filterList.push(nextItemExtra as EsFormSchema[number]);
        }
      });
    }

    return filterList;
  },
};
