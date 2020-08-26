/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { defineCustomElements } from "@w2wds/core/loader";
import { WayButton } from "./directives/proxies";
defineCustomElements(window);
/** @type {?} */
var DECLARATIONS = [
    // proxies
    WayButton,
];
var Way2WebDesignSystemModule = /** @class */ (function () {
    function Way2WebDesignSystemModule() {
    }
    Way2WebDesignSystemModule.decorators = [
        { type: NgModule, args: [{
                    declarations: DECLARATIONS,
                    exports: DECLARATIONS,
                    imports: [],
                    providers: [],
                },] },
    ];
    return Way2WebDesignSystemModule;
}());
export { Way2WebDesignSystemModule };
