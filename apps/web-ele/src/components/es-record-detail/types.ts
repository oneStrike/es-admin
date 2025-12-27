// 定义字段类型
export type FieldType = 'image' | 'tag' | 'text' | 'title';

// 定义字段配置
export interface DetailField {
  label: string;
  value: any;
  type: FieldType;
  tagType?: string;
  tagText?: string;
}

// 定义卡片配置
export interface DetailCard {
  title: string;
  show: boolean;
  fields?: DetailField[];
  type?: 'html' | 'image' | 'text';
  content?: string;
  imageUrl?: string;
}
