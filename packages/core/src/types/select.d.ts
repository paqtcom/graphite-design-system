export interface ISelectOption {
  label: string;
  value: string | number;
  selected?: boolean;
  highlighted?: boolean;
}

export interface ISelectConfig {
  selectedText?: string;
  multi?: boolean;
  maxTagWidth?: string;
  maxTags?: number;
  tagColor?: string;
}
