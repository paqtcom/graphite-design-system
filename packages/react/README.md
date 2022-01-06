# @graphiteds/react

These are React specific building blocks on top of [@graphiteds/core](../core/README.md) components.

Tested on:

- [create-react-app](https://github.com/facebook/create-react-app)

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
npm install @graphiteds/react
```

In your index.js add the following code:

```js
// Core CSS required for Graphite components to work properly
import "@graphiteds/react/css/core.css";
```

Import the component(s) you want to use:

```js
import { GrButton } from "@graphiteds/react";
```

Use it in your JSX as any React component:

```html
<GrButton href="https://paqt.com">PAQT</GrButton>
```

A working example of this setup: https://codesandbox.io/s/graphiteds-react-example-yhr9p.

## Development

Follow the [instructions in the root of this repo](../../README.md).

### Test apps

In `packages/react/test-apps/react-app` there is a test app.

In order to run it:

- Make sure you've run `npm run bootstrap` & `npm run build` in the root of this repo
- Navigate to the test app with `cd packages/react/test-apps/react-app`
- Run `npm install`
- Run `npm run sync` (this copies the relevant core & react dist files to the node_modules of the test-app)
- Run the project with `npm start`
