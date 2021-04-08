export interface WayAutosuggestOption {
  label: string;
  value: string | number;
  selected?: boolean;
  highlighted?: boolean;
}

export interface WayAutosuggestConfig {
  backspaceDelete?: boolean;
  maxTags?: number;
  multi?: boolean;
  selectedText?: string;
}
