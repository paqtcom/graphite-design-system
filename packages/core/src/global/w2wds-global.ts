import { setPlatformHelpers } from '@stencil/core';

import { Way2WebDesignSystemConfig } from '../interface';

export const initialize = (userConfig: Way2WebDesignSystemConfig = {}) => {
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
