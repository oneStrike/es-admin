import type { TagProps } from 'element-plus';

import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { Options } from '#/utils/options';

import type { ComponentPropsMap, ComponentType } from './component';

import { h } from 'vue';

import {
  setupVbenVxeTable,
  useVbenVxeGrid as useGrid,
} from '@vben/plugins/vxe-table';

import { ElButton, ElImage, ElTag, ElText } from 'element-plus';

import { ImageLine } from '#/components/es-icons';
import { formatUTC } from '#/utils';
import { getOptionLabel } from '#/utils/options';

import { useVbenForm } from './form';

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
        const src = row[column.field] || '';
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
        const text = row[column.field] || '';
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
        const text = row[column.field] || '';
        return h(
          ElButton,
          { size: 'small', link: true, class: 'line-clamp-1 w-full', type },
          { default: () => text },
        );
      },
    });

    // 表格配置项可以用 cellRender: { name: 'CellTag' },
    vxeUI.renderer.add('CellTag', {
      renderTableDefault({ props }, params) {
        const { column, row } = params;
        let tags: (boolean | string)[] | boolean | string = row[column.field];
        let type: TagProps['type'] = props?.type || 'primary';

        // 处理格式化函数
        if (props?.formatter) {
          tags = props.formatter(row[column.field]);
        }

        // 处理数组情况
        if (Array.isArray(tags)) {
          if (tags.length === 0) {
            return '-';
          }

          return tags.map((tag, idx) => {
            let tagValue = tag;
            if (Array.isArray(props?.mapOptions)) {
              tagValue = getOptionLabel(props?.mapOptions, tag);
            }

            return h(
              ElTag,
              {
                type: props?.type || 'primary',
                size: props?.size || 'small',
                class: idx + 1 === (tags as any[]).length ? '' : 'mr-1',
                ...props,
              },
              { default: () => tagValue },
            );
          });
        }
        // 处理 mapOptions 映射情况
        else if (props?.mapOptions) {
          const option = props.mapOptions.find(
            (item: Options) => item.value === tags,
          );
          const label = option?.label || '';
          const color = option?.color || props?.type || 'primary';

          return h(
            ElTag,
            {
              type: color,
              size: props?.size || 'small',
              ...props,
            },
            { default: () => label },
          );
        }
        // 处理布尔值情况
        else if (typeof tags === 'boolean') {
          type = tags ? 'primary' : 'danger';
          const booleanMap = props?.map || {};
          tags = booleanMap[String(tags)] || (tags ? '是' : '否');

          return h(
            ElTag,
            {
              type,
              size: props?.size || 'small',
              ...props,
            },
            { default: () => tags },
          );
        }
        // 处理字符串和其他单一值情况
        else {
          // 确保 tags 是字符串形式
          const displayValue =
            tags !== null && tags !== undefined ? String(tags) : '-';

          return h(
            ElTag,
            {
              type,
              size: props?.size || 'small',
              ...props,
            },
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
        let value: any = row[column.field];

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
            let displayText = item;
            let textColor: string | undefined;

            if (Array.isArray(props?.mapOptions)) {
              const option = props.mapOptions.find(
                (opt: Options) => opt.value === item,
              );
              displayText = option?.label || item;
              textColor = option?.color;
            }

            return h(
              'span',
              {
                style: textColor ? { color: textColor } : undefined,
                class: idx + 1 === value.length ? '' : 'mr-2',
              },
              displayText,
            );
          });
        }
        // 处理 mapOptions 映射情况
        else if (props?.mapOptions) {
          const option = props.mapOptions.find(
            (item: Options) => item.value === value,
          );
          const label = option?.label || String(value ?? '-');
          const color = option?.color;

          return h(
            ElText,
            {
              style: color ? { color } : undefined,
            },
            { default: () => label },
          );
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

export const useVbenVxeGrid = <T extends Record<string, any>>(
  ...rest: Parameters<typeof useGrid<T, ComponentType, ComponentPropsMap>>
) => useGrid<T, ComponentType, ComponentPropsMap>(...rest);
const fromApiPageIndex = (pageIndex?: null | number) =>
  Math.max((pageIndex ?? 0) + 1, 1);

const formatQuery = ({ page, formValues, sorts }: any) => {
  if (sorts.length > 0) {
    formValues.orderBy = [];
    sorts.forEach((item: any) => {
      formValues.orderBy.push({
        [item.field]: item.order,
      });
    });
    formValues.orderBy = JSON.stringify(formValues.orderBy);
  }
  return {
    pageIndex: page.currentPage,
    pageSize: page.pageSize,
    ...formValues,
  };
};

export { formatQuery, fromApiPageIndex, useVbenVxeGrid };

export type * from '@vben/plugins/vxe-table';
