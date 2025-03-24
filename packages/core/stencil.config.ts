import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'core',
  extras: {
    experimentalImportInjection: true,
  },
  bundles: [
    { components: ['gr-button', 'gr-spinner'] },
    { components: ['gr-checkbox', 'gr-field-group'] },
    { components: ['gr-input'] },
    { components: ['gr-textarea'] },
    {
      components: ['gr-select', 'gr-dropdown', 'gr-menu', 'gr-menu-item', 'gr-menu-divider', 'gr-menu-label', 'gr-tag'],
    },
    { components: ['gr-radio', 'gr-radio-group'] },
    { components: ['gr-date-picker'] },
    { components: ['gr-tab', 'gr-tab-group', 'gr-tab-panel'] },
  ],
  plugins: [sass()],
  globalStyle: 'src/css/core.scss',
  globalScript: 'src/global/graphite-global.ts',
  sourceMap: true,
  minifyJs: true,
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@graphiteds/core',
      includeImportCustomElements: true,
      includePolyfills: false,
      includeDefineCustomElements: false,
      proxiesFile: '../react/src/components/proxies.ts',
      excludeComponents: ['duet-date-picker'],
    }),
    vueOutputTarget({
      componentCorePackage: '@graphiteds/core',
      includeImportCustomElements: true,
      includePolyfills: false,
      includeDefineCustomElements: false,
      proxiesFile: '../vue/src/proxies.ts',
      excludeComponents: ['duet-date-picker'],
      componentModels: [
        {
          elements: ['gr-checkbox'],
          targetAttr: 'checked',
          event: 'gr-change',
        },
        {
          elements: ['gr-select', 'gr-radio-group', 'gr-input', 'gr-textarea', 'gr-date-picker'],
          targetAttr: 'value',
          event: 'gr-change',
        },
      ],
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
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
      customElementsExportBehavior: 'auto-define-custom-elements',
    },
    {
      type: 'dist-hydrate-script',
      dir: 'hydrate',
      empty: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-vscode',
      file: 'dist/html.html-data.json',
      sourceCodeBaseUrl: 'https://github.com/paqtcom/graphite-design-system/tree/master/packages/core/',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      baseUrl: 'https://example.com/',
    },
  ],
  preamble: '(C) PAQT.com B.V. https://paqt.com - MIT License',
};
