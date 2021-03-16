/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@w2wds/core';


export declare interface WayButton extends Components.WayButton {}
@ProxyCmp({
  inputs: ['fill', 'href', 'rel', 'target']
})
@Component({
  selector: 'way-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['fill', 'href', 'rel', 'target']
})
export class WayButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WayInput extends Components.WayInput {}
@ProxyCmp({
  inputs: ['disabled', 'inline', 'label', 'name', 'size', 'type']
})
@Component({
  selector: 'way-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'inline', 'label', 'name', 'size', 'type']
})
export class WayInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
