import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'core',
  plugins: [sass()],
  globalStyle: 'src/css/core.scss',
  globalScript: 'src/global/w2wds-global.ts',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@w2wds/core',
      proxiesFile: '../react/src/components.ts',
      includeDefineCustomElements: true,
      includePolyfills: false,
    }),
    vueOutputTarget({
      componentCorePackage: '@w2wds/core',
      includeImportCustomElements: true,
      includePolyfills: false,
      includeDefineCustomElements: false,
      proxiesFile: '../vue/src/proxies.ts',
      componentModels: [
        {
          elements: ['way-checkbox'],
          targetAttr: 'checked',
          event: 'v-way-change',
          externalEvent: 'way-change',
        },
        {
          elements: ['way-select', 'way-radio-group', 'way-input', 'way-textarea'],
          targetAttr: 'value',
          event: 'v-way-change',
          externalEvent: 'way-change',
        },
      ],
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'dist-custom-elements',
      dir: 'components',
      copy: [
        {
          src: '../scripts/custom-elements',
          dest: 'components',
          warn: true,
        },
      ],
      includeGlobalScripts: false,
    },
    {
      type: 'dist-hydrate-script',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      baseUrl: 'https://example.com/',
    },
  ],
  preamble: '(C) Way2Web https://www.way2web.nl - MIT License',
};
