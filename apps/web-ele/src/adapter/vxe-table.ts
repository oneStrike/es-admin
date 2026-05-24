import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { ComponentPropsMap, ComponentType } from './component';
import type { CellTagType } from './vxe-table-cell-tag';

import type { Options } from '#/utils/options';

import { h } from 'vue';

import { JsonViewer } from '@vben/common-ui';
import {
  setupVbenVxeTable,
  useVbenVxeGrid as useGrid,
} from '@vben/plugins/vxe-table';

import { ElButton, ElImage, ElTag, ElText, ElTooltip } from 'element-plus';

import { ImageLine } from '#/components/es-icons';
import { formatUTC } from '#/utils';

import { useVbenForm } from './form';
import {
  createCellTagProps,
  isCellTagType,
  resolveBooleanCellTagDisplay,
  resolveCellTagType,
} from './vxe-table-cell-tag';

type OptionWithDisplay = Options & {
  color?: string;
  type?: CellTagType | string;
};

type GridRow = Record<string, unknown>;

type SortItem = {
  field: string;
  order: string;
};

type QueryParams<T extends GridRow> = {
  formValues?: T;
  page: {
    currentPage: number;
    pageSize: number;
  };
  sorts?: SortItem[];
};

type PageQuery<T extends GridRow> = T & {
  orderBy?: string;
  pageIndex: number;
  pageSize: number;
};

function findOption(options: unknown, value: unknown) {
  if (!Array.isArray(options)) {
    return undefined;
  }

  return options.find((item: OptionWithDisplay) => item.value === value) as
    | OptionWithDisplay
    | undefined;
}

function resolveOptionDisplay(options: unknown, value: unknown) {
  const option = findOption(options, value);

  return {
    color: option?.color,
    label: option?.label ?? String(value ?? '-'),
    type: option?.type,
  };
}

function resolveTagTextStyle(textColor: unknown) {
  return typeof textColor === 'string' && textColor
    ? { style: { color: textColor } }
    : {};
}

function resolveTagDisplayProps(
  optionDisplay: ReturnType<typeof resolveOptionDisplay>,
  fallbackType: CellTagType = 'primary',
  textColor?: unknown,
) {
  const displayType = optionDisplay.type ?? optionDisplay.color;

  if (isCellTagType(displayType)) {
    return { type: displayType, ...resolveTagTextStyle(textColor) };
  }

  return {
    color: typeof displayType === 'string' ? displayType : undefined,
    type: fallbackType,
    ...resolveTagTextStyle(textColor),
  };
}

function resolveTextDisplayProps(
  optionDisplay: ReturnType<typeof resolveOptionDisplay>,
) {
  const displayType = optionDisplay.type ?? optionDisplay.color;

  if (isCellTagType(displayType)) {
    return { type: displayType };
  }

  return {
    style: typeof displayType === 'string' ? { color: displayType } : undefined,
  };
}

function getCellValue(row: unknown, field: unknown) {
  if (!row || typeof row !== 'object' || !field) {
    return undefined;
  }

  return (row as GridRow)[String(field)];
}

function isJsonRecord(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function normalizeJsonCellValue(value: unknown) {
  if (typeof value !== 'string') return value;

  const trimmed = value.trim();
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
    return value;
  }

  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return value;
  }
}

function isJsonViewerValue(value: unknown) {
  return Array.isArray(value) || isJsonRecord(value);
}

function stringifyJsonCellValue(value: unknown) {
  if (value === null || value === undefined || value === '') return '-';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

setupVbenVxeTable({
  configVxeTable: (vxeUI) => {
    vxeUI.setConfig({
      grid: {
        align: 'center',
        border: false,
        height: 'auto',
        columnConfig: {
          resizable: true,
        },
        sortConfig: {
          remote: true,
          multiple: true,
        },
        rowConfig: {
          isHover: true,
          keyField: 'id',
        },
        minHeight: 180,
        formConfig: {
          // 全局禁用vxe-table的表单配置，使用formOptions
          enabled: false,
        },
        proxyConfig: {
          autoLoad: true,
          response: {
            result: 'list',
            total: 'total',
            list: 'list',
          },
          showActiveMsg: true,
          showResponseMsg: false,
        },
        round: true,
        showOverflow: true,
        size: 'medium',
        pagerConfig: {
          pageSize: 15,
          pageSizes: [15, 30, 45, 75, 100],
        },
        toolbarConfig: {
          custom: true,
          export: false,
          refresh: true,
          zoom: false,
          search: true,
        },
        exportConfig: {},
      } as VxeTableGridOptions,
    });

    // 表格配置项可以用 cellRender: { name: 'CellImage' },
    vxeUI.renderer.add('CellImage', {
      renderTableDefault(_renderOpts, params) {
        const { column, row } = params;
        const srcValue = getCellValue(row, column.field);
        const src =
          srcValue === undefined || srcValue === null ? '' : String(srcValue);
        return h(
          ElImage,
          {
            src,
            previewSrcList: [src],
            class: 'size-8',
            fit: 'contain',
            previewTeleported: true,
          },
          { error: () => h(ImageLine, { class: 'size-8' }) },
        );
      },
    });
    // 表格配置项可以用 cellRender: { name: 'CellDate' },
    vxeUI.renderer.add('CellDate', {
      renderTableDefault(_renderOpts, params) {
        const { column, row } = params;
        const type = _renderOpts.props?.type ?? '';
        const textValue = getCellValue(row, column.field);
        const text =
          textValue === undefined || textValue === null
            ? ''
            : String(textValue);
        return h(
          ElText,
          {
            type,
          },
          { default: () => formatUTC(text) || '-' },
        );
      },
    });

    // 表格配置项可以用 cellRender: { name: 'CellLink' },
    vxeUI.renderer.add('CellLink', {
      renderTableDefault(renderOpts, params) {
        const type = renderOpts.props?.type ?? 'primary';
        const { column, row } = params;
        const textValue = getCellValue(row, column.field);
        const text =
          textValue === undefined || textValue === null
            ? ''
            : String(textValue);
        return h(
          ElButton,
          { size: 'small', link: true, class: 'line-clamp-1 w-full', type },
          { default: () => text },
        );
      },
    });

    // 表格配置项可以用 cellRender: { name: 'CellJson' },
    vxeUI.renderer.add('CellJson', {
      renderTableDefault({ props }, params) {
        const { column, row } = params;
        const value = getCellValue(row, column.field);
        const viewerValue = normalizeJsonCellValue(value);
        const preview = stringifyJsonCellValue(viewerValue);

        if (!isJsonViewerValue(viewerValue)) {
          return h(ElText, {}, { default: () => preview });
        }

        return h(
          ElTooltip,
          {
            effect: 'light',
            enterable: true,
            placement: props?.placement ?? 'left',
            popperClass: props?.popperClass ?? 'cell-json-tooltip',
            showAfter: props?.showAfter ?? 200,
            teleported: true,
          },
          {
            content: () =>
              h('div', { class: 'max-h-[60vh] w-[520px] overflow-auto' }, [
                h(JsonViewer, {
                  boxed: true,
                  copyable: true,
                  expanded: true,
                  expandDepth: props?.expandDepth ?? 2,
                  showDoubleQuotes: true,
                  value: viewerValue,
                }),
              ]),
            default: () =>
              h(
                ElText,
                {
                  class: 'block w-full cursor-help truncate',
                  type: props?.type ?? 'primary',
                },
                { default: () => preview },
              ),
          },
        );
      },
    });

    // 表格配置项可以用 cellRender: { name: 'CellTag' },
    vxeUI.renderer.add('CellTag', {
      renderTableDefault({ props }, params) {
        const { column, row } = params;
        const cellValue = getCellValue(row, column.field);
        let tags = cellValue;

        // 处理格式化函数
        if (props?.formatter) {
          tags = props.formatter(cellValue);
        }

        // 处理数组情况
        if (Array.isArray(tags)) {
          const tagItems = tags;

          if (tagItems.length === 0) {
            return '-';
          }

          return tagItems.map((tag, idx) => {
            const optionDisplay = resolveOptionDisplay(props?.mapOptions, tag);
            const tagType = resolveCellTagType(
              props?.type,
              tag,
              'primary',
              row,
            );

            return h(
              ElTag,
              createCellTagProps(props, tag, tagType, row, {
                ...resolveTagDisplayProps(
                  optionDisplay,
                  tagType,
                  props?.textColor,
                ),
                class: [
                  props?.class,
                  idx + 1 === tagItems.length ? '' : 'mr-1',
                ],
              }),
              { default: () => optionDisplay.label },
            );
          });
        }
        // 处理 mapOptions 映射情况
        else if (props?.mapOptions) {
          const optionDisplay = resolveOptionDisplay(props.mapOptions, tags);
          const tagType = resolveCellTagType(
            props?.type,
            cellValue,
            'primary',
            row,
          );

          return h(
            ElTag,
            createCellTagProps(
              props,
              cellValue,
              tagType,
              row,
              resolveTagDisplayProps(optionDisplay, tagType, props?.textColor),
            ),
            { default: () => optionDisplay.label },
          );
        }
        // 处理布尔值情况
        else if (typeof tags === 'boolean') {
          const booleanDisplay = resolveBooleanCellTagDisplay(tags, props?.map);

          return h(
            ElTag,
            createCellTagProps(props, cellValue, booleanDisplay.type, row),
            { default: () => booleanDisplay.label },
          );
        }
        // 处理字符串和其他单一值情况
        else {
          // 确保 tags 是字符串形式
          const displayValue =
            tags !== null && tags !== undefined ? String(tags) : '-';

          return h(
            ElTag,
            createCellTagProps(props, cellValue, 'primary', row),
            { default: () => displayValue },
          );
        }
      },
    });

    // 表格配置项可以用 cellRender: { name: 'CellText' },
    // 类似 CellTag，但使用文本显示而不是标签，支持自定义颜色
    vxeUI.renderer.add('CellText', {
      renderTableDefault({ props }, params) {
        const { column, row } = params;
        let value = getCellValue(row, column.field);

        // 处理格式化函数
        if (props?.formatter) {
          value = props.formatter(value);
        }

        // 处理数组情况
        if (Array.isArray(value)) {
          if (value.length === 0) {
            return '-';
          }

          return value.map((item, idx) => {
            const optionDisplay = resolveOptionDisplay(props?.mapOptions, item);

            return h(
              'span',
              {
                ...resolveTextDisplayProps(optionDisplay),
                class: idx + 1 === value.length ? '' : 'mr-2',
              },
              optionDisplay.label,
            );
          });
        }
        // 处理 mapOptions 映射情况
        else if (props?.mapOptions) {
          const optionDisplay = resolveOptionDisplay(props.mapOptions, value);

          return h(ElText, resolveTextDisplayProps(optionDisplay), {
            default: () => optionDisplay.label,
          });
        }
        // 处理布尔值情况
        else if (typeof value === 'boolean') {
          const booleanMap = props?.map || {};
          const displayText =
            booleanMap[String(value)] || (value ? '是' : '否');
          const textColor = value ? '#52c41a' : '#ff4d4f'; // 成功绿色，失败红色

          return h(
            ElText,
            {
              style: { color: textColor },
            },
            { default: () => displayText },
          );
        }
        // 处理字符串和其他单一值情况
        else {
          const displayValue =
            value !== null && value !== undefined ? String(value) : '-';

          return h(ElText, {}, { default: () => displayValue });
        }
      },
    });

    // 这里可以自行扩展 vxe-table 的全局配置，比如自定义格式化
    // vxeUI.formats.add
  },
  useVbenForm,
});

export const useVbenVxeGrid = <T extends GridRow>(
  ...rest: Parameters<typeof useGrid<T, ComponentType, ComponentPropsMap>>
) => useGrid<T, ComponentType, ComponentPropsMap>(...rest);
const fromApiPageIndex = (pageIndex?: null | number) =>
  Math.max((pageIndex ?? 0) + 1, 1);

const formatQuery = <T extends GridRow = GridRow>({
  page,
  formValues = {} as T,
  sorts = [],
}: QueryParams<T>): PageQuery<T> => {
  const nextFormValues = { ...formValues } as T & { orderBy?: string };

  if (sorts.length > 0) {
    const orderBy = sorts.map((item) => ({
      [item.field]: item.order,
    }));
    nextFormValues.orderBy = JSON.stringify(orderBy);
  }
  return {
    pageIndex: page.currentPage,
    pageSize: page.pageSize,
    ...nextFormValues,
  };
};

export { formatQuery, fromApiPageIndex };

export type * from '@vben/plugins/vxe-table';
