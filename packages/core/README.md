# @graphiteds/core

The Graphite Design System (graphiteds) Core package contains the Web Components that make up the reusable UI building blocks of the [Graphite Design System](https://graphitedesignsystem.com). These components are designed to be used in traditional frontend view libraries/frameworks (such as React, Angular, or Vue), or on their own through traditional JavaScript in the browser.

## Browser Support

We support only [modern browsers](https://browserslist.dev/?q=PiAxJSwgbGFzdCAyIHZlcnNpb25zLCBub3QgZGVhZCwgbm90IGllIDEx).

```bash
npx browserslist "> 1%, last 2 versions, not dead, not ie 11"
```

So it doesn't run on legacy browsers: IE11, Edge 18 & below (Edge before it moved to Chromium), and Safari 10.

The advantage of this is we have less runtime within our builds, and having faster production builds by not having to also downlevel to es5. Plus you don't need any polyfills.

If you really need support for these legacy browsers, let us know, and we might consider it (but no guarantees).

## Installation

### CDN

The easiest way to install Graphite components is with the CDN. A lightweight loader will be added to your page that registers components asynchronously as you use them. It's like magic. ✨

The CDN is optimized for performance by using caching, HTTP/2, etc.

Just add the following tags to your page.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@graphiteds/core@1/css/graphite.bundle.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@graphiteds/core@1/dist/core/core.esm.js"></script>
```

_Note: This loads the latest v1 release. Replace `@1` with a specific version number and build, for example `@1.2.2`, if you want to load a specific version, and be in control of updating to the latest version. For production, we recommend linking to a specific version number and build to avoid unexpected breakage from newer versions._

Then you can use the elements anywhere in your template, JSX, html etc.

For example:

```html
<gr-button href="https://paqt.com">PAQT</gr-button>
```

A working example of this setup: https://codesandbox.io/s/graphiteds-script-tag-example-9foz6.

### Usage with bundlers

Follow these instructions if you use a bundler such as webpack, vite, or rollup.

#### Self lazy-loading components (webpack only)

Add this code to your main JS/TS file:

```js
// Import Graphite components
import { defineCustomElements } from '@graphiteds/core/loader';

// Core CSS required for Graphite components to work properly
import '@graphiteds/core/css/core.css';

// Optional CSS to prevent Flash Of Unstyled Content (FOUC)
import '@graphiteds/core/css/prevent-fouc.css';

// Register Graphite components
defineCustomElements(window);
```

Note: this currently only works with Webpack because of [this issue](https://github.com/ionic-team/stencil/issues/2827). For other bundlers, use one of the following options.

#### Cherry-pick components

Add this code to your main JS/TS file:

```js
// Core CSS required for Graphite components to work properly
import '@graphiteds/core/css/core.css';
```

Add code like this to the files where you want to use the components, depending on the components you use:

```js
// Import & register gr-button component
import '@graphiteds/core/components/gr-button.js';
```

This automatically defines the custom element, and imports any components it depends upon.

This enables the bundler to remove unused Graphite components from your bundle (tree-shaking). If you use Webpack, we recommend to use Webpack 5 to make the most out of this improvement.

### Usage with Vue 3

We offer [Vue 3 wrappers](../vue/README.md) on top of `@graphiteds/core` components for optimal DX (typings, v-model support, out of the box tree-shaking, etc.).

### Usage with Vue 2

If you use Vue with a direct script include, [look at this example](https://codesandbox.io/s/graphiteds-script-tag-with-vue-example-kouct) to get up and running quickly.

Otherwise when using a bundler, follow these steps:

Run:

```sh
npm install @graphiteds/core
```

Edit the `main.js` or `main.ts` file of a Vue 2 project to include:

```js
// Import Graphite components
import { defineCustomElements } from '@graphiteds/core/loader';

// Core CSS required for Graphite components to work properly
import '@graphiteds/core/css/core.css';

// Optional CSS to prevent Flash Of Unstyled Content (FOUC)
import '@graphiteds/core/css/prevent-fouc.css';

// ...

// configure Vue.js to ignore Graphite components
Vue.config.ignoredElements = [/gr-\w*/];

// Register Graphite components
defineCustomElements(window);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

The components should then be available in any of the Vue components:

```html
<template>
  <gr-button href="https://paqt.com">PAQT</gr-button>
</template>
```

_Vue provides several different ways to install and use the framework in an application. The above technique has been tested on a Vue 2 application that was created using the vue-cli. A similar technique should work if the application was generated using other options._

A working example of this setup: https://codesandbox.io/s/graphiteds-vue2-example-q7o2c.

Note: All components are part of your bundle, but only lazy-loaded by the browser when needed. This can introduce some Cumulative Layout Shift (CLS). Alternately, [cherry-pick components](#cherry-pick-components) for optimal bundle size, and to reduce Cumulative Layout Shift (CLS). Or if you want to use some other bundler than webpack (because of [this issue](https://github.com/ionic-team/stencil/issues/2827)).

#### Binding Complex Data

When binding complex data such as objects and arrays, use the `.prop` modifier to make Vue bind them as a property instead of an attribute:

```html
<gr-example :options.prop="myOptions"></gr-example>
```

#### Two-way Binding

One caveat is there's [no support for v-model on custom elements in Vue 2](https://github.com/vuejs/vue/issues/7830), but you can still achieve two-way binding manually:

```html
<!-- This doesn't work -->
<gr-input v-model="name"></gr-input>

<!-- This works, but it's a bit longer -->
<gr-input :value="name" @gr-change="name = $event.target.value"></gr-input>
```

If that's too verbose, you can use a custom directive instead.

#### Using a Custom Directive

You can use [this utility](https://www.npmjs.com/package/@graphiteds/vue2-gr-model) to add a custom directive to Vue that will work just like v-model but for Graphite components. To install it, use this command.

```sh
npm install @graphiteds/vue2-gr-model
```

Next, import the directive and enable it like this.

```js
import GraphiteModelDirective from '@graphiteds/vue2-gr-model';

Vue.config.ignoredElements = [/^gr-/];
Vue.use(GraphiteModelDirective);

// Your init here
new Vue({ ... });
```

Now you can use the v-gr-model directive to keep your data in sync!

```html
<gr-input v-gr-model="name"></gr-input>
```

#### Usage with Nuxt 2

```sh
npm install @graphiteds/core
```

Edit `nuxt.config.js` to include:

```js
module.exports = {
  vue: {
    config: {
      ignoredElements: [/gr-\w*/],
    },
  },
};
```

Add `plugins/graphiteds.js` with the following content:

```js
// Import Graphite components
import { defineCustomElements } from '@graphiteds/core/loader';

// Core CSS required for Graphite components to work properly
import '@graphiteds/core/css/core.css';

// Optional CSS to prevent Flash Of Unstyled Content (FOUC)
import '@graphiteds/core/css/prevent-fouc.css';

export default function () {
  if (process.client) {
    defineCustomElements(window);
  }
}
```

Add the plugin to the project configuration (`nuxt.config.js`):

```js
module.exports = {
  plugins: ['~/plugins/graphiteds.js'],
};
```

The components should then be available in any of the Nuxt pages & components:

```html
<template>
  <gr-button href="https://paqt.com">PAQT</gr-button>
</template>
```

The instructions above about [Binding Complex Data](#binding-complex-data), [Two-way Binding](#two-way-binding), and [Using a Custom Directive](#using-a-custom-directive) also apply here (except you need to do the `Vue.use(GraphiteModelDirective)` in the `graphiteds.js` plugin).

Note: All components are part of your bundle, but only lazy-loaded by the browser when needed. This can introduce some Cumulative Layout Shift (CLS). Alternately, [cherry-pick components](#cherry-pick-components) for optimal bundle size, and to reduce Cumulative Layout Shift (CLS). Or if you want to use some other bundler than webpack (because of [this issue](https://github.com/ionic-team/stencil/issues/2827)).

A working example of this setup: https://codesandbox.io/s/graphiteds-nuxt2-example-jyvc9.

### Usage with React

We offer [React wrappers](<(../react/README.md)>) on top of `@graphiteds/core` components, because React [does not play nice](https://custom-elements-everywhere.com/#react) with custom elements, and to offer optimal DX (typings, out of the box tree-shaking, etc.).

Note: React support for Web Components is coming, and is currently under an experimental flag.

### Usage with Angular

Angular bindings are possible for optimal DX (typings, ngModel & reactive forms support, etc.). Please let us know if you would like them, and we will consider them.

Otherwise, to use our web components directly within an Angular CLI project, run:

```sh
npm install @graphiteds/core
```

Include `CUSTOM_ELEMENTS_SCHEMA` in any module that uses our components. This allows the use of the web components in the HTML markup without the compiler producing errors. This code should be added into the `AppModule` and in every other modules that uses our components. Here is an example of adding it to `AppModule`:

```js
// ...
// Import custom elements schema
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  // ...
  // Add custom elements schema to NgModule
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

The final step is to load and register the Graphite components in the browser. `@graphiteds/core` includes a main function that handles this. That function is called `defineCustomElements()` and it needs to be called once during the bootstrapping of your application. One convenient place to do this is in `main.ts` as such:

```js
// Import Graphite components
import { defineCustomElements } from '@graphiteds/core/loader';

// Core CSS required for Graphite components to work properly
import '@graphiteds/core/css/core.css';

// Optional CSS to prevent Flash Of Unstyled Content (FOUC)
import '@graphiteds/core/css/prevent-fouc.css';

// ...

// Register Graphite components
defineCustomElements(window);
```

Once included, components can be used in your HTML markup as in the following example:

```html
<gr-button variant="primary">Send</gr-button>
```

Note: All components are part of your bundle, but only lazy-loaded by the browser when needed. This can introduce some Cumulative Layout Shift (CLS). Alternately, [cherry-pick components](#cherry-pick-components) for optimal bundle size, and to reduce Cumulative Layout Shift (CLS). Or if you want to use some other bundler than webpack (because of [this issue](https://github.com/ionic-team/stencil/issues/2827)).

A working example of this setup: https://codesandbox.io/s/graphiteds-angular-example-e4gju

### Usage with Livewire

Just add the following tags to your page:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@graphiteds/core@1/css/graphite.bundle.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@graphiteds/core@1/dist/core/core.esm.js"></script>
```

Then you can use the elements anywhere in your blade templates, but you have to use `wire:ignore`.

For example:

```html
<gr-button wire:click="increment" variant="primary" circle wire:ignore><div slot="icon-only">+</div></gr-button>
```

Note: All components are only lazy-loaded by the browser when needed. This can introduce some Cumulative Layout Shift (CLS). To reduce this, you can move the components below the fold (outside the visible viewport of the user, or use a bundler with [cherry-pick components](#cherry-pick-components).

You can't use dynamic php variables in attributes because of the `wire:ignore`. For example, to show error messages as `invalid-text`. To work around this, you have to use AlpineJS.

Add the following code to the head of your page:

```html
<script src="https://cdn.jsdelivr.net/npm/alpinejs@2.8.2/dist/alpine.min.js" defer></script>
```

Add a `x-data` attribute to your form, and set `errors` to the `$errors` php variable:

```html
<form wire:submit.prevent="submit" x-data="{ 'errors':  }"></form>
```

Use the AlpineJS `errors` variable in `x-bind` attributes, for example:

```html
<gr-input
  label="Naam"
  x-bind:invalid="errors.hasOwnProperty('name')"
  x-bind:invalid-text="errors.hasOwnProperty('name') ? errors.name[0] : ''"
  wire:model.debounce.500ms="name"
  wire:gr-blur="touch('name')"
  wire:ignore
  required-indicator
></gr-input>
```

Note: `wire:model` only works with `gr-input` & `gr-textarea`. For other form elements, like `gr-radio-group`, you have to utilize the `gr-change` event, like this: `wire:gr-change="$set('exampleProperty', $event.target.value)"`.

### Usage with Livewire

Follow the instructions above for your client-side framework of choice.

You can use links like this:

```html
<inertia-link as="gr-button" variant="primary" :href="route('organizations.create')">
  Create organization
</inertia-link>
```

Or like this:

```html
<gr-button variant="primary" @click="$inertia.visit(route('organizations.create'))"> Create organization </gr-button>
```

The above examples are using Vue 2. For other frameworks it might differ slightly. Refer to the [Links](https://inertiajs.com/links) and [Manual visits](https://inertiajs.com/manual-visits) pages in the Inertia.js docs for more help.

### Usage with other frameworks

You can either use the `@graphiteds/core` package directly or load the components [from our CDN](#cdn). Please see [Custom Elements Everywhere](https://custom-elements-everywhere.com/) for more details about wider support in Frameworks like Preact, Svelte, Solid, Riot.js and similar.

## Customization

Graphite components are built with [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (sometimes referred to as CSS variables) for easy customization of an application. CSS custom properties allow a value to be stored in one place, then referenced in multiple other places. They also make it possible to change CSS dynamically at runtime (which previously required a CSS preprocessor), useful for a dark theme for example. CSS custom properties make it easier than ever to override Graphite components to match a brand or theme.

### Global Variables

CSS custom properties can be set globally in an application in the :root selector.

```css
:root {
  /* Changes the primary color palette to purple */
  --gr-color-primary: #a855f7;
  --gr-color-primary-rgb: 168, 85, 247;
  --gr-color-primary-contrast: #ffffff;
  --gr-color-primary-contrast-rgb: 255, 255, 255;
  --gr-color-primary-shade: #7e22ce;
  --gr-color-primary-tint: #d8b4fe;

  /* Changes the font family */
  --gr-font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Roboto', sans-serif;
}
```

For a complete list of these global variables, [refer to core.scss in the project's source code](./src/css/core.scss).

#### Colors

There are nine colors used throughout the Graphite components:

- primary
- secondary
- tertiary
- success
- warning
- danger
- dark
- medium
- light

Each color consists of the following properties: a `base`, `contrast`, `shade`, and `tint`. The `base` and `contrast` colors also require a `rgb` property which is the same color, just in [rgb format](https://developer.mozilla.org/en-US/docs/Glossary/RGB). The Graphite Design System uses colors with an opacity (alpha) in several components. In order for this to work, those properties must be provided in RGB format. When changing any of the properties that have a variation ending in `-rgb`, it is important they are also provided in a comma separated format without parentheses.

| Name           | Property                          | Description                                                              |
| :------------- | :-------------------------------- | ------------------------------------------------------------------------ |
| Base           | `--gr-color-primary`              | The main color that all variations are derived from                      |
| Base (rgb)     | `--gr-color-primary-rgb`          | The base color in red, green, blue format                                |
| Contrast       | `--gr-color-primary-contrast`     | The opposite of the base color, should be visible against the base color |
| Contrast (rgb) | `--gr-color-primary-contrast-rgb` | The contrast color in red, green, blue format                            |
| Shade          | `--gr-color-primary-shade`        | A slightly darker version of the base color                              |
| Tint           | `--gr-color-primary-tint`         | A slightly lighter version of the base color                             |

You could use this [Color Generator](https://ionicframework.com/docs/theming/color-generator) from Ionic and simply replace `--ion` with `--gr`.

Please use [this contrast checker](https://webaim.org/resources/contrastchecker/) for accessiblity.

Ensure `--gr-color-primary`, `--gr-color-medium`, `--gr-color-dark`, `--gr-color-danger`, `--gr-color-success-shade`, and `--gr-color-warning-shade` (plus corresponding rgb values) have a minimum contrast ratio of `4:5:1` with the background color of your application.

### Component Variables

The Graphite Design System provides variables that exist at the component level, such as `--background` and `--color`. For a list of the custom properties a component accepts, view the CSS Custom Properties section of its API reference. For example, see the [Button CSS Custom Properties](./src/components/button/readme.md#css-custom-properties).

```css
/* Set the color on all gr-button elements */
gr-button {
  --color: #222;
}

/* Set the background on a gr-button with the .fancy-button class */
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

### Elusive Icons

We used the asterisk icon from Elusive Icons by Team Redux - http://reduxframework.com/

### Duet Date Picker

Our date picker is a wrapper around the [Duet Date Picker](https://github.com/duetds/date-picker/).

```
MIT License

Copyright (c) 2020 LocalTapiola Services Ltd / Duet Design System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
