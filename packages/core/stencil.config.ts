import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'core',
  bundles: [
    { components: ['gr-button', 'gr-spinner'] },
    { components: ['gr-checkbox', 'gr-field-group'] },
    { components: ['gr-input'] },
    { components: ['gr-textarea'] },
    {
      components: ['gr-select', 'gr-dropdown', 'gr-menu', 'gr-menu-item', 'gr-menu-divider', 'gr-menu-label', 'gr-tag'],
    },
    { components: ['gr-radio', 'gr-radio-group'] },
  ],
  plugins: [sass()],
  globalStyle: 'src/css/core.scss',
  globalScript: 'src/global/graphite-global.ts',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@graphiteds/core',
      proxiesFile: '../react/src/components.ts',
      includeDefineCustomElements: true,
      includePolyfills: false,
    }),
    vueOutputTarget({
      componentCorePackage: '@graphiteds/core',
      includeImportCustomElements: true,
      includePolyfills: false,
      includeDefineCustomElements: false,
      proxiesFile: '../vue/src/proxies.ts',
      componentModels: [
        {
          elements: ['gr-checkbox'],
          targetAttr: 'checked',
          event: 'v-gr-change',
          externalEvent: 'gr-change',
        },
        {
          elements: ['gr-select', 'gr-radio-group', 'gr-input', 'gr-textarea'],
          targetAttr: 'value',
          event: 'v-gr-change',
          externalEvent: 'gr-change',
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
      type: 'docs-vscode',
      file: 'dist/html.html-data.json',
      sourceCodeBaseUrl: 'https://github.com/way2web/graphite-design-system/tree/master/packages/core/',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      baseUrl: 'https://example.com/',
    },
  ],
  preamble: '(C) Way2Web https://www.way2web.nl - MIT License',
};
