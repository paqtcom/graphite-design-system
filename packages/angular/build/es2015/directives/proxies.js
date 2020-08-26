/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';
import { ProxyCmp } from './angular-component-lib/utils';
let WayButton = class WayButton {
    /**
     * @param {?} c
     * @param {?} r
     * @param {?} z
     */
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
WayButton.decorators = [
    { type: Component, args: [{
                selector: 'way-button',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: '<ng-content></ng-content>',
                inputs: ['fill', 'href', 'rel', 'target']
            },] },
];
/** @nocollapse */
WayButton.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
WayButton = tslib_1.__decorate([
    ProxyCmp({
        inputs: ['fill', 'href', 'rel', 'target']
    }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
], WayButton);
export { WayButton };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    WayButton.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    WayButton.prototype.z;
}
