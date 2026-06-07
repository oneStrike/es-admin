export type FieldType = 'date' | 'image' | 'tag' | 'text' | 'title';
export type DetailTagType =
  | 'danger'
  | 'info'
  | 'primary'
  | 'success'
  | 'warning';

export interface RecordDescriptionItem {
  label: string;
  value: unknown;
  type: FieldType;
  tagType?: DetailTagType | string;
  tagText?: string;
  dateType?: string;
}

export interface RecordDetailSection {
  title: string;
  show: boolean;
  items?: RecordDescriptionItem[];
  type?: 'html' | 'image' | 'text';
  content?: string;
  imageUrl?: string;
  pinTop?: boolean;
}
