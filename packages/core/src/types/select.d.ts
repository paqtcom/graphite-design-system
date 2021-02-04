export interface ISelectOption {
  label: string;
  value: any;
  selected?: boolean;
  highLighted?: boolean;
}

export interface ISelectConfig {
  selectedText?: string;
  multi?: boolean;
  maxTagWidth?: string;
  maxTags?: number;
  tagColor?: string;
}
