export interface WayAutosuggestOption {
  label: string;
  value: string | number;
  selected?: boolean;
  highlighted?: boolean;
}

export interface WayAutosuggestConfig {
  selectedText?: string;
  startTypingText?: string;
  multi?: boolean;
  maxTagWidth?: string;
  maxTags?: number;
  tagColor?: string;
}
