import type { TagProps } from 'element-plus';

import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { Options } from '#/utils/options';

import { h } from 'vue';

import { setupVbenVxeTable, useVbenVxeGrid } from '@vben/plugins/vxe-table';

import { ElButton, ElImage, ElTag, ElText } from 'element-plus';

import { ImageLine } from '#/components/es-icons';
import { formatUTC } from '#/utils';

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
      renderTableDefault(renderOpts, params) {
        const { props } = renderOpts;
        const { column, row } = params;
        const src = row[column.field];
        return h(ElImage, { src, previewSrcList: [src], ...props });
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
        const originalValue = tags;

        const getType = (): TagProps['type'] => {
          if (typeof props?.type === 'function') {
            return props.type(row[column.field], row);
          }
          return props?.type || 'primary';
        };

        const defaultSize = props?.size || 'small';

        if (props?.formatter) {
          tags = props.formatter(originalValue);
        }

        const optionsMap = props?.mapOptions
          ? new Map(props.mapOptions.map((item: Options) => [item.value, item]))
          : null;

        if (Array.isArray(tags)) {
          if (tags.length === 0) {
            return '-';
          }

          return tags.map((tag, idx) => {
            let tagValue = tag;
            let tagType = getType();

            if (optionsMap) {
              const option = optionsMap.get(tag) as Record<string, any>;
              tagValue = option?.label || tag;
              tagType = option?.color || tagType;
            }

            return h(
              ElTag,
              {
                type: tagType,
                size: defaultSize,
                class: idx + 1 === (tags as any[]).length ? '' : 'mr-1',
                key: `${idx}-${tag}`,
              },
              { default: () => tagValue },
            );
          });
        } else if (optionsMap) {
          const option = optionsMap.get(tags) as Record<string, any>;
          const label = option?.label || '';
          const color = option?.color || getType();

          return h(
            ElTag,
            {
              type: color,
              size: defaultSize,
            },
            { default: () => label },
          );
        } else if (typeof tags === 'boolean') {
          const type = tags ? 'primary' : 'danger';
          const booleanMap = props?.map || {};
          tags = booleanMap[String(tags)] || (tags ? '是' : '否');

          return h(
            ElTag,
            {
              type,
              size: defaultSize,
            },
            { default: () => tags },
          );
        } else {
          const displayValue =
            tags !== null && tags !== undefined ? String(tags) : '-';

          return h(
            ElTag,
            {
              type: getType(),
              size: defaultSize,
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
