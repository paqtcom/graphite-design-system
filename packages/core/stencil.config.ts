import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'core',
  taskQueue: 'async',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: '@w2wds/core',
      directivesProxyFile: '../angular/src/directives/proxies.ts',
    }),
    reactOutputTarget({
      componentCorePackage: '@w2wds/core',
      proxiesFile: '../react/src/components.ts',
      includeDefineCustomElements: true,
      includePolyfills: true, // Enable if needed
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
