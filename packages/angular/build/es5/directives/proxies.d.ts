import { ChangeDetectorRef, ElementRef, NgZone } from '@angular/core';
import { Components } from '@w2wds/core';
export declare interface WayButton extends Components.WayButton {
}
export declare class WayButton {
    protected z: NgZone;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
