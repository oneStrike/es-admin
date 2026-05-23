import type { TagProps } from 'element-plus';

type GridRow = Record<string, unknown>;

export type CellTagType = TagProps['type'];

type CellTagRenderProps = Record<string, unknown> & {
  type?: CellTagType | ((value: unknown, row?: GridRow) => unknown);
};

type CellTagComponentProps = Partial<TagProps> & {
  class?: unknown;
  color?: unknown;
  style?: unknown;
  [key: string]: unknown;
};

type BooleanCellTagMap = Record<string, unknown>;

const tagTypes = new Set(['danger', 'info', 'primary', 'success', 'warning']);
const tagSizes = new Set(['', 'default', 'large', 'small']);

export function isCellTagType(value: unknown): value is CellTagType {
  return typeof value === 'string' && tagTypes.has(value);
}

export function resolveCellTagType(
  type: CellTagRenderProps['type'],
  value: unknown,
  fallbackType: CellTagType = 'primary',
  row?: GridRow,
): CellTagType {
  const resolvedType = typeof type === 'function' ? type(value, row) : type;

  return isCellTagType(resolvedType) ? resolvedType : fallbackType;
}

function resolveCellTagSize(size: unknown): TagProps['size'] {
  return typeof size === 'string' && tagSizes.has(size)
    ? (size as TagProps['size'])
    : 'small';
}

export function resolveBooleanCellTagDisplay(
  value: boolean,
  map: BooleanCellTagMap = {},
) {
  return {
    label: map[String(value)] || (value ? '是' : '否'),
    type: value ? 'primary' : 'danger',
  } satisfies { label: unknown; type: CellTagType };
}

export function createCellTagProps(
  props: CellTagRenderProps | undefined,
  value: unknown,
  fallbackType: CellTagType = 'primary',
  row?: GridRow,
  extraProps: CellTagComponentProps = {},
): CellTagComponentProps {
  const {
    formatter: _formatter,
    map: _map,
    mapOptions: _mapOptions,
    size,
    textColor: _textColor,
    type,
    ...tagProps
  } = props ?? {};

  return {
    ...tagProps,
    type: resolveCellTagType(type, value, fallbackType, row),
    size: resolveCellTagSize(size),
    ...extraProps,
  };
}
