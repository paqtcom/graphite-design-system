# way-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                                                            | Type                                                          | Default     |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------- |
| `circle`   | `circle`   | Set to true to draw a circle button.                                                                                                                                                   | `boolean`                                                     | `false`     |
| `disabled` | `disabled` | If `true`, the user cannot interact with the button.                                                                                                                                   | `boolean`                                                     | `false`     |
| `expand`   | `expand`   | Set to `"block"` for a full-width button or to `"full"` for a full-width button without left and right borders.                                                                        | `"block" \| "full"`                                           | `undefined` |
| `href`     | `href`     | Contains a URL or a URL fragment that the hyperlink points to.                                                                                                                         | `string`                                                      | `undefined` |
| `rel`      | `rel`      | Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types). | `string`                                                      | `undefined` |
| `size`     | `size`     | The button's size.                                                                                                                                                                     | `"large" \| "medium" \| "small"`                              | `'medium'`  |
| `target`   | `target`   | Specifies where to display the linked URL. Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.                                                                             | `string`                                                      | `undefined` |
| `type`     | `type`     | The type of the button.                                                                                                                                                                | `"button" \| "reset" \| "submit"`                             | `'button'`  |
| `variant`  | `variant`  | The different variants. The options are: `"default"`, `"primary"`, `"secondary"`, "danger", and `"text"`.                                                                              | `"danger" \| "default" \| "primary" \| "secondary" \| "text"` | `'default'` |


## Events

| Event      | Description                          | Type                |
| ---------- | ------------------------------------ | ------------------- |
| `wayBlur`  | Emitted when the button loses focus. | `CustomEvent<void>` |
| `wayFocus` | Emitted when the button has focus.   | `CustomEvent<void>` |


## CSS Custom Properties

| Name                   | Description                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `--background`         | Background of the button                                                                   |
| `--background-hover`   | Background of the button on hover                                                          |
| `--border-color`       | Border color of the button                                                                 |
| `--border-color-hover` | Border color of the button when hover                                                      |
| `--border-radius`      | Border radius of the button                                                                |
| `--border-style`       | Border style of the button                                                                 |
| `--border-width`       | Border width of the button                                                                 |
| `--color`              | Text color of the button                                                                   |
| `--color-hover`        | Text color of the button when hover                                                        |
| `--height`             | Height of the button                                                                       |
| `--padding-bottom`     | Bottom padding of the button                                                               |
| `--padding-end`        | Right padding of the button (will be left padding when we support right-to-left direction) |
| `--padding-start`      | Left padding of the button (will be right padding when we support right-to-left direction) |
| `--padding-top`        | Top padding of the button                                                                  |
| `--transition`         | Transition of the button                                                                   |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
