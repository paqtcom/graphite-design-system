![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# @w2wds/vue

These are [Vue 3](https://v3.vuejs.org/) specific building blocks on top of [@w2wds/core](../core/README.md) components.

We recommend using [vite](https://vitejs.dev/) or otherwise [vue-cli v5](https://next.cli.vuejs.org/) (with Webpack 5) for the best bundle sizes (due to tree-shaking). If you want to migrate from vue-cli v4 to v5: [follow this guide](https://next.cli.vuejs.org/migrations/migrate-from-v4.html)].

Tested on:

- [vite](https://vitejs.dev/)
- [vue-cli v5](https://next.cli.vuejs.org/)
- [vue-cli v4](https://cli.vuejs.org/)

**Important**: Because of a breaking change in `vue@3.1.0`, you have to set `"vue": "3.0.11"` in the `package.json` of your project (and run `npm install`) until this is resolved.

## Browser Support

We support only modern browsers: https://browserslist.dev/?q=ZGVmYXVsdHMsIG5vdCBpZSAxMQ%3D%3D

```bash
npx browserslist "defaults, not ie 11"
```

## Using these components

Add this package to your project:

```shell
npm install @w2wds/vue --save
```

Or:

```shell
yarn add @w2wds/vue
```

Edit the `main.js` / `main.ts` file of a Vue 3 project like this:

```js
import { createApp } from "vue";
import App from "./App.vue";
import { Way2WebDesignSystemVue } from "@w2wds/vue";

/* Core CSS required for Way2Web Design System components to work properly */
import "@w2wds/core/dist/core/core.css";

createApp(App).use(Way2WebDesignSystemVue).mount("#app");
```

Import the component(s) you want to use:

```js
import { WayButton } from "@w2wds/vue";
```

Use it in your template as any Vue component:

```jsx
// In kebab-case
<way-button href="https://www.way2web.nl">Way2Web</way-button>

// Or PascalCase
<WayButton href="https://www.way2web.nl">Way2Web</WayButton>
```

We recommend using kebab-case for our components and PascalCase for your own Vue components to make them visible distinct.

### CodeSandbox example

An example of this setup using vue-cli v4: https://codesandbox.io/s/w2wds-vue3-example-5p787

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
