import type { TagProps } from 'element-plus';

import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { Options } from '#/utils/options';

import { h } from 'vue';

import { setupVbenVxeTable, useVbenVxeGrid } from '@vben/plugins/vxe-table';

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
          { default: () => formatUTC(text) },
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

    // 这里可以自行扩展 vxe-table 的全局配置，比如自定义格式化
    // vxeUI.formats.add
  },
  useVbenForm,
});

// 表格查询参数
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
    pageIndex: --page.currentPage,
    pageSize: page.pageSize,
    ...formValues,
  };
};

export { formatQuery, useVbenVxeGrid };

export type * from '@vben/plugins/vxe-table';
