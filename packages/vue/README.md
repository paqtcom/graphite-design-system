# @graphiteds/vue

These are [Vue 3](https://v3.vuejs.org/) specific building blocks on top of [@graphiteds/core](../core/README.md) components.

We recommend using [vite](https://vitejs.dev/) or otherwise [vue-cli v5](https://next.cli.vuejs.org/) (with Webpack 5) for the best bundle sizes (due to tree-shaking). If you want to migrate from vue-cli v4 to v5: [follow this guide](https://next.cli.vuejs.org/migrations/migrate-from-v4.html).

Tested on:

- [vite](https://vitejs.dev/)
- [vue-cli v5](https://next.cli.vuejs.org/)
- [vue-cli v4](https://cli.vuejs.org/)

## Browser Support

We support only [modern browsers](https://browserslist.dev/?q=PiAxJSwgbGFzdCAyIHZlcnNpb25zLCBub3QgZGVhZCwgbm90IGllIDEx).

```bash
npx browserslist "> 1%, last 2 versions, not dead, not ie 11"
```

So it doesn't run on legacy browsers: IE11, Edge 18 & below (Edge before it moved to Chromium), and Safari 10.

The advantage of this is we have less runtime within our builds, and having faster production builds by not having to also downlevel to es5. Plus you don't need any polyfills.

## Using these components

Add this package to your project:

```sh
npm install @graphiteds/vue
```

Edit the `main.js` / `main.ts` file of a Vue 3 project like this:

```js
import { createApp } from "vue";
import App from "./App.vue";
import { GraphiteVue } from "@graphiteds/vue";

// Core CSS required for Graphite components to work properly
import "@graphiteds/vue/css/core.css";

createApp(App).use(GraphiteVue).mount("#app");
```

Import the component(s) you want to use:

```js
import { GrButton } from "@graphiteds/vue";
```

Use it in your template as any Vue component:

```jsx
// In kebab-case
<gr-button href="https://paqt.com">PAQT</gr-button>

// Or PascalCase
<GrButton href="https://paqt.com">PAQT</GrButton>
```

We recommend using kebab-case for our components and PascalCase for your own Vue components to make them visible distinct.

An example of this setup using vue-cli v4: https://codesandbox.io/s/graphiteds-vue3-example-jhk03.

## Development

Follow the [instructions in the root of this repo](../../README.md).

### Test apps

In `packages/vue/test-apps` there are test apps for [vite](https://vitejs.dev/), [vue-cli v5](https://next.cli.vuejs.org/), and [vue-cli v4](https://cli.vuejs.org/)

In order to run them:

- Make sure you've run `npm run bootstrap` & `npm run build` in the root of this repo
- Navigate to a test app, for example `cd packages/vue/test-apps/vite`
- Run `npm install`
- Run `npm run sync` (this copies the relevant core & vue dist files to the node_modules of the test-app)
- Run the project, for example `npm run dev` for vite or `npm run serve` for vue-cli
