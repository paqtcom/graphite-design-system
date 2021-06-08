![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# @w2wds/core

The Way2Web Design System (w2wds) Core package contains the Web Components that make up the reusable UI building blocks of the Way2Web Design System. These components are designed to be used in traditional frontend view libraries/frameworks (such as Stencil, React, Angular, or Vue), or on their own through traditional JavaScript in the browser.

## Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool. Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Browser Support

We support these browsers: https://browserslist.dev/?q=ZGVmYXVsdHMsIG5vdCBpZSAxMQ%3D%3D

```bash
npx browserslist "defaults, not ie 11"
```

So it doesn't run on legacy browsers: IE11, Edge 18 & below (Edge before it moved to Chromium), and Safari 10.

The advantage of this is we have less runtime within our builds, and having faster production builds by not having to also downlevel to es5. Plus you don't need any polyfills.

If you really need support for these legacy browsers, let us know, and we might consider it.

## Using these components

### Script tag

- Just add the following tags to your page.
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@w2wds/core@latest/dist/core/core.css" />
  <script type="module" src="https://cdn.jsdelivr.net/npm/@w2wds/core@latest/dist/core/core.esm.js"></script>
  ```
- Then you can use the elements anywhere in your template, JSX, html etc.
- For example:
  ```html
  <way-button href="https://www.way2web.nl">Way2Web</way-button>
  ```

#### CodeSandbox example

An example of this setup: https://codesandbox.io/s/w2wds-script-tag-example-zx09l

### Angular

Angular bindings are possible. Please let us know if you would like them, and we will consider them.

### React

Use the [React bindings](../react/README.md).

### Svelte

Svelte bindings are possible. Please let us know if you would like them, and we will consider them.

### Vue 3

Use the [Vue bindings](../vue/README.md).

### Vue 2

- Run `npm install @w2wds/core` or `yarn add @w2wds/core`
- Edit `src/main.js` to include:

  ```js
  // Import Way2Web Design System components
  import { defineCustomElements } from '@w2wds/core/loader';

  /* Core CSS required for Way2Web Design System components to work properly */
  import '@w2wds/core/dist/core/core.css';

  // ...
  // configure Vue.js to ignore Way2Web Design System components
  Vue.config.ignoredElements = [/way-\w*/];
  // Register Way2Web Design System components
  defineCustomElements(window);

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

#### CodeSandbox example

An example of this setup: https://codesandbox.io/s/w2wds-vue2-example-mkbm4

#### Binding Complex Data

When binding complex data such as objects and arrays, use the `.prop` modifier to make Vue bind them as a property instead of an attribute:

```html
<way-select :options.prop="myOptions" />
```

_[Based on the Shoelace docs](https://shoelace.style/getting-started/usage?id=binding-complex-data)_

#### Two-way Binding

One caveat is there's [no support for v-model on custom elements in Vue 2](https://github.com/vuejs/vue/issues/7830), but you can still achieve two-way binding manually:

```html
<!-- This doesn't work -->
<way-input v-model="name"></way-input>

<!-- This works, but it's a bit longer -->
<way-input :value="name" @input="name = $event.target.value"></way-input>
```

If that's too verbose, [you can use this Directive from Shoelace](https://shoelace.style/getting-started/usage?id=using-a-custom-directive).

## Customization

Way2Web Design System components are built with [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) for easy customization of an application. CSS variables allow a value to be stored in one place, then referenced in multiple other places. They also make it possible to change CSS dynamically at runtime (which previously required a CSS preprocessor), useful for a dark theme for example. CSS variables make it easier than ever to override Way2Web Design System components to match a brand or theme.

### Global Variables

CSS variables can be set globally in an application in the :root selector.

```css
:root {
  /* Changes the primary color palette to purple */
  --way-color-primary: #a855f7;
  --way-color-primary-rgb: 168, 85, 247;
  --way-color-primary-contrast: #ffffff;
  --way-color-primary-contrast-rgb: 255, 255, 255;
  --way-color-primary-shade: #7e22ce;
  --way-color-primary-tint: #d8b4fe;

  /* Changes the font family */
  --way-font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Roboto', sans-serif;
}
```

For a complete list of these global variables, [refer to core.scss in the project's source code](./src/css/core.scss).

#### Colors

There are nine colors used throughout the Way2Web Design System components:

- primary
- secondary
- tertiary
- success
- warning
- danger
- dark
- medium
- light

Each color consists of the following properties: a `base`, `contrast`, `shade`, and `tint`. The `base` and `contrast` colors also require a `rgb` property which is the same color, just in [rgb format](https://developer.mozilla.org/en-US/docs/Glossary/RGB). The Way2Web Design System uses colors with an opacity (alpha) in several components. In order for this to work, those properties must be provided in RGB format. When changing any of the properties that have a variation ending in `-rgb`, it is important they are also provided in a comma separated format without parentheses.

| Name           | Property                           | Description                                                              |
| :------------- | :--------------------------------- | ------------------------------------------------------------------------ |
| Base           | `--way-color-primary`              | The main color that all variations are derived from                      |
| Base (rgb)     | `--way-color-primary-rgb`          | The base color in red, green, blue format                                |
| Contrast       | `--way-color-primary-contrast`     | The opposite of the base color, should be visible against the base color |
| Contrast (rgb) | `--way-color-primary-contrast-rgb` | The contrast color in red, green, blue format                            |
| Shade          | `--way-color-primary-shade`        | A slightly darker version of the base color                              |
| Tint           | `--way-color-primary-tint`         | A slightly lighter version of the base color                             |

Please use [this contrast checker](https://webaim.org/resources/contrastchecker/) for accessiblity.

You could use this [Color Generator](https://ionicframework.com/docs/theming/color-generator) from Ionic and simply replace `--ion` with `--way`.

### Component Variables

The Way2Web Design System provides variables that exist at the component level, such as `--background` and `--color`. For a list of the custom properties a component accepts, view the CSS Custom Properties section of its API reference. For example, see the [Button CSS Custom Properties](./src/components/way-button/readme.md#css-custom-properties).

```css
/* Set the color on all way-button elements */
way-button {
  --color: #222;
}

/* Set the background on a way-button with the .fancy-button class */
.fancy-button {
  --background: #00ff00;
}
```

## Development

Follow the [instructions in the root of this repo](../../README.md).

## License

- [MIT](../../LICENSE)

## Attribution

### Ionic Framework

Some component code & documentation is based or inspired on the [Ionic Framework](https://ionicframework.com/) components.

```
Copyright 2015-present Drifty Co.
http://drifty.com/

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

### Ionicons

We used some SVG's from [Ionicons](https://ionicons.com/).

```
The MIT License (MIT)

Copyright (c) 2015-present Ionic (http://ionic.io/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

### Shoelace

Some component code & documentation is based or inspired on the [Shoelace](https://shoelace.style/) components.

```
Copyright (c) 2020 A Beautiful Site, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
