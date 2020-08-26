import { NgModule } from "@angular/core";
import { defineCustomElements } from "@w2wds/core/loader";

import { WayButton } from "./directives/proxies";

defineCustomElements(window);

const DECLARATIONS = [
  // proxies
  WayButton,
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: [],
})
export class Way2WebDesignSystemModule {}
