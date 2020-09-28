![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# @w2wds/core

The Way2Web Design System (w2wds) Core package contains the Web Components that make up the reusable UI building blocks of the Way2Web Design System. These components are designed to be used in traditional frontend view libraries/frameworks (such as Stencil, React, Angular, or Vue), or on their own through traditional JavaScript in the browser.

# Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool. Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Using these components

We list a few options below, [check the Stencil docs for all the possibilities](https://stenciljs.com/docs/overview).

### Script tag

- Put a script tag similar to this in the head of your index.html:
  ```html
  <script src="https://unpkg.com/@w2wds/core@latest/dist/core.js"></script>
  ```
- Then you can use the element anywhere in your template, JSX, html etc
- For example:
  ```html
  <way-button href="https://www.way2web.nl">Way2Web</way-button>
  ```

### Vue 2

- Run `npm install @w2wds/core` or `yarn add @w2wds/core`
- Edit `src/main.js` to include:

  ```js
  // Import Way2Web Web Components
  import { applyPolyfills, defineCustomElements } from '@w2wds/loader';
  // ...
  // configure Vue.js to ignore Way2Web Web Components
  Vue.config.ignoredElements = [/way-\w*/];
  // Register Way2Web Web Components
  applyPolyfills().then(() => {
    defineCustomElements(window);
  });

  new Vue({
    render: h => h(App),
  }).$mount('#app');
  ```

- The components should then be available in any of the Vue components:
  ```js
  render() {
    return (
      <div>
        <way-button href="https://www.way2web.nl">Way2Web</way-button>
      </div>
    )
  }
  ```

_Vue provides several different ways to install and use the framework in an application. The above technique for integrating a Stencil custom element library has been tested on a Vue 2 application that was created using the vue-cli with ES2015 and WebPack as primary options. A similar technique should work if the application was generated using other options._

#### Binding Complex Data

When binding complex data such as objects and arrays, use the `.prop` modifier to make Vue bind them as a property instead of an attribute:

```html
<way-select :options.prop="myOptions" />
```

<small>[Based on the Shoelace docs](https://shoelace.style/getting-started/usage?id=binding-complex-data)</small>

#### Two-way Binding

One caveat is there's [no support for v-model on custom elements in Vue 2](https://github.com/vuejs/vue/issues/7830), but you can still achieve two-way binding manually:

```html
<!-- This doesn't work -->
<way-input v-model="name"></way-input>

<!-- This works, but it's a bit longer -->
<way-input :value="name" @input="name = $event.target.value"></way-input>
```

If that's too verbose, [you can use this Directive from Shoelace](https://shoelace.style/getting-started/usage?id=using-a-custom-directive).

<small>[Based on the Shoelace docs](https://shoelace.style/getting-started/usage?id=two-way-binding)</small>

### Vue 3

Vue 3 bindings are coming, which will provide better DX.

### React

Use the [React framework bindings](../react/README.md)

### Angular

Use the [Angular framework bindings](../angular/README.md)

### Svelte

Svelte bindings are possible. Please let us know if you would like them, and we will consider them.

## Development

To start building the components using Stencil, clone this repo to a new directory:

```bash
git clone https://github.com/Way2Web/way2web-design-system.git way2web-design-system
cd way2web-design-system
```

```bash
npm install
npm start
```

To build the components for production, run:

```bash
npm run build
```

To run the unit & e2e tests for the components, run:

```bash
npm test
```

Need help? Check out the docs [here](https://stenciljs.com/docs/my-first-component).
