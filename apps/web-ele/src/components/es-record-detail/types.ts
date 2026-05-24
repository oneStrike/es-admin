export type FieldType = 'date' | 'image' | 'tag' | 'text' | 'title';
export type DetailTagType =
  | 'danger'
  | 'info'
  | 'primary'
  | 'success'
  | 'warning';

export interface DetailField {
  label: string;
  value: unknown;
  type: FieldType;
  tagType?: DetailTagType | string;
  tagText?: string;
  dateType?: string;
}

export interface DetailCard {
  title: string;
  show: boolean;
  fields?: DetailField[];
  type?: 'html' | 'image' | 'text';
  content?: string;
  imageUrl?: string;
  pinTop?: boolean;
}
