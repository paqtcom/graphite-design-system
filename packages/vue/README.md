![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# @w2wds/vue

These are Vue 3 specific building blocks on top of [@w2wds/core](../core/README.md) components.

## Using these components

Add this package to your project:

```shell
npm install @w2wds/vue --save
```

Or:

```shell
yarn add @w2wds/vue
```

Edit the `main.js` file of a Vue 3 project like this:

```js
import { createApp } from "vue";
import App from "./App.vue";
import { defineCustomElements } from "@w2wds/core/loader";

/* Core CSS required for Way2Web Design System components to work properly */
import "@w2wds/core/dist/core/core.css";

const app = createApp(App);

defineCustomElements().then(() => {
  app.mount("#app");
});
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

We recommend using kebab-case for our components and KebabCase for your own Vue components to make them visible distinct.

### CodeSandbox example

An example of this setup: https://codesandbox.io/s/w2wds-vue3-example-5p787

## How to release a new version

- Build the core package
- Run build on this package
- Publish
