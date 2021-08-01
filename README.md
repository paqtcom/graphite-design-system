![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Graphite Design System

Library of components for the Graphite Design System

### Packages

| Project             | Package                                                                | Version                                                                                                                  |                  Links                  |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------: |
| **Core components** | [`@graphiteds/core`](https://www.npmjs.com/package/@graphiteds/core)   | [![version](https://img.shields.io/npm/v/@graphiteds/core/latest.svg)](https://www.npmjs.com/package/@graphiteds/core)   | [`README.md`](packages/core/README.md)  |
| **React bindings**  | [`@graphiteds/react`](https://www.npmjs.com/package/@graphiteds/react) | [![version](https://img.shields.io/npm/v/@graphiteds/react/latest.svg)](https://www.npmjs.com/package/@graphiteds/react) | [`README.md`](packages/react/README.md) |
| **Vue 3 bindings**  | [`@graphiteds/vue`](https://www.npmjs.com/package/@graphiteds/vue)     | [![version](https://img.shields.io/npm/v/@graphiteds/vue/latest.svg)](https://www.npmjs.com/package/@graphiteds/vue)     |  [`README.md`](packages/vue/README.md)  |

## Development

To start building the components using [Stencil](https://stenciljs.com/), clone this repo to a new directory:

```bash
git clone https://github.com/way2web/graphiteds.git graphiteds
cd graphiteds
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

Need help? Check out the docs [here](https://stenciljs.com/docs/my-first-component).

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

This will ask what the next version of each package should be, changes all the package.json's, creates all the tags in the repo and publishes it to npm (if your terminal has GitHub and npm access).

Or you can navigate to the packages yourself, change the `package.json`, create the tag in the repo, and run `npm publish`.
