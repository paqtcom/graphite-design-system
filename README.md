<p align="center">
  <a href="https://graphitedesignsystem.com">
    <img width="100" src="https://graphitedesignsystem.com/favicon.svg" alt="Graphite logo"></a>
</p>

<h1 align="center">
  Graphite Design System
</h1>

<p align="center">
  Graphite is <a href="https://paqt.com/">PAQT</a>'s white-label design system for digital products and experiences. The system consists of working code, design kits, and human interface guidelines.
</p>

<p align="center">
This repository contains the working code of the components. The core components are <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">Web Components</a>, and we offer wrappers for React & Vue 3 for optimal DX.
</p>

<p align="center">
  <a href="https://github.com/paqtcom/graphite-design-system/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Graphite Design System is released under the MIT license." />
  </a>
  <a href="https://www.jsdelivr.com/package/npm/@shoelace-style/shoelace">
    <img src="https://data.jsdelivr.com/v1/package/npm/@graphiteds/core/badge" alt="Graphite Design System is available on jsDelivr." />
  </a>
</p>

<h2 align="center">
  <a href="https://graphitedesignsystem.com/getting-started/developers/#quick-start">Quickstart</a>
  <span> · </span>
  <a href="https://graphitedesignsystem.com/">
    Documentation
  </a>
</h2>

### Packages

| Project   | Package                                                                | Version                                                                                                                  | Downloads                                                                                                                                                           |                  Links                  |
| --------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------: |
| **Core**  | [`@graphiteds/core`](https://www.npmjs.com/package/@graphiteds/core)   | [![version](https://img.shields.io/npm/v/@graphiteds/core/latest.svg)](https://www.npmjs.com/package/@graphiteds/core)   | <a href="https://www.npmjs.com/package/@graphiteds/core" target="_blank"><img src="https://img.shields.io/npm/dm/@graphiteds/core.svg" alt="NPM Downloads" /></a>   | [`README.md`](packages/core/README.md)  |
| **React** | [`@graphiteds/react`](https://www.npmjs.com/package/@graphiteds/react) | [![version](https://img.shields.io/npm/v/@graphiteds/react/latest.svg)](https://www.npmjs.com/package/@graphiteds/react) | <a href="https://www.npmjs.com/package/@graphiteds/react" target="_blank"><img src="https://img.shields.io/npm/dm/@graphiteds/react.svg" alt="NPM Downloads" /></a> | [`README.md`](packages/react/README.md) |
| **Vue 3** | [`@graphiteds/vue`](https://www.npmjs.com/package/@graphiteds/vue)     | [![version](https://img.shields.io/npm/v/@graphiteds/vue/latest.svg)](https://www.npmjs.com/package/@graphiteds/vue)     | <a href="https://www.npmjs.com/package/@graphiteds/vue" target="_blank"><img src="https://img.shields.io/npm/dm/@graphiteds/vue.svg" alt="NPM Downloads" /></a>     |  [`README.md`](packages/vue/README.md)  |

### Getting Started

Start using our design system by following our quick [Getting Started guide](https://graphitedesignsystem.com/getting-started/developers/#quick-start).
We would love to hear from you! If you have any feedback or run into issues using our design system, please file an [issue](https://github.com/paqtcom/graphite-design-system/issues/new) on this repository.

### Development

To start building the components using [Stencil](https://stenciljs.com/), clone this repo to a new directory:

Make sure you are using Node v16 (with npm v8). If you use `nvm`, you can run `nvm use`.

```bash
git clone https://github.com/paqtcom/graphite-design-system.git graphite-design-system
cd graphite-design-system
```

Run these commands to setup this project:

```bash
npm install
npm run bootstrap
```

Navigate to the [core package](packages/core/) and run `npm start`:

```bash
cd packages/core
npm start
```

Now you can develop the components.

Need help? Check out the [Stencil docs](https://stenciljs.com/docs/my-first-component).

## Automated tests

Run this command in the [core package](packages/core/) to test the core components:

```bash
npm run test
```

Or run this command in the root to test the core components and all the framework bindings.

## Release a new version

Run this command in the root:

```bash
npm run build
```

This will generate all necessary builds in the packages (core components and framework bindings).

You can then publish all the packages to npm (with lerna):

```bash
npm run publish
```

This will ask what the next version should be, changes all the package.json's, creates a tag in the repo and publishes it to npm (if your terminal has GitHub and npm access).
