export type FieldType = 'date' | 'image' | 'tag' | 'text' | 'title';

export interface DetailField {
  label: string;
  value: unknown;
  type: FieldType;
  tagType?: string;
  tagText?: string;
  dateType?: string;
  color?: string;
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
