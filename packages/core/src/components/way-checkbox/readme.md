# way-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                          | Type                             | Default     |
| ---------- | ---------- | ---------------------------------------------------- | -------------------------------- | ----------- |
| `checked`  | `checked`  | Set to true to draw the checkbox in a checked state. | `boolean`                        | `false`     |
| `disabled` | `disabled` | Set to true to disable the checkbox.                 | `boolean`                        | `false`     |
| `size`     | `size`     | The checkbox icon size.                              | `"large" \| "medium" \| "small"` | `'medium'`  |
| `value`    | `value`    | The checkbox's value attribute.                      | `string`                         | `undefined` |
| `variant`  | `variant`  | The checkbox variants.                               | `"circle" \| "square"`           | `'square'`  |


## Events

| Event       | Description                           | Type               |
| ----------- | ------------------------------------- | ------------------ |
| `way-blur`  | Emitted when the control loses focus. | `CustomEvent<any>` |
| `way-focus` | Emitted when the control gains focus. | `CustomEvent<any>` |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the checkbox.

#### Returns

Type: `Promise<void>`



### `setFocus(options?: FocusOptions) => Promise<void>`

Sets focus on the checkbox.

#### Returns

Type: `Promise<void>`




## CSS Custom Properties

| Name                   | Description                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `--background`         | Background of the checkbox                                                                   |
| `--background-hover`   | Background of the checkbox on hover                                                          |
| `--border-color`       | Border color of the checkbox                                                                 |
| `--border-color-hover` | Border color of the checkbox when hover                                                      |
| `--border-radius`      | Border radius of the checkbox                                                                |
| `--border-style`       | Border style of the checkbox                                                                 |
| `--border-width`       | Border width of the checkbox                                                                 |
| `--color`              | Text color of the checkbox                                                                   |
| `--color-hover`        | Text color of the checkbox when hover                                                        |
| `--height`             | Height of the checkbox                                                                       |
| `--padding-bottom`     | Bottom padding of the checkbox                                                               |
| `--padding-end`        | Right padding of the checkbox (will be left padding when we support right-to-left direction) |
| `--padding-start`      | Left padding of the checkbox (will be right padding when we support right-to-left direction) |
| `--padding-top`        | Top padding of the checkbox                                                                  |
| `--transition`         | Transition of the checkbox                                                                   |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
