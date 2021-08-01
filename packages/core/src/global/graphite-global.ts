import { setPlatformHelpers } from '@stencil/core';

import { GraphiteConfig } from '../interface';

export const initialize = (userConfig: GraphiteConfig = {}) => {
  if (typeof (window as any) === 'undefined') {
    return;
  }

  const platformHelpers: any = {};
  if (userConfig._ael) {
    platformHelpers.ael = userConfig._ael;
  }
  if (userConfig._rel) {
    platformHelpers.rel = userConfig._rel;
  }
  if (userConfig._ce) {
    platformHelpers.ce = userConfig._ce;
  }
  setPlatformHelpers(platformHelpers);
};

export default initialize;
