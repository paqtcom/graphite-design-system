export interface IFormElement extends ChildNode {
  getValue: () => any;
  callback: (e: any) => void;
}

export interface IFormElementData {
  name: string;
  value: any;
  errors: string[];
}
