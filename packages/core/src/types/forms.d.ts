export interface IFormElement extends ChildNode {
    getVal: ()=>any,
    callback: (e: any)=> void
}

export interface IFormElementData {
    name: string;
    value: any;
    errors: string[];
}
