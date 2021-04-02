# way-input



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                   | Type                             | Default     |
| ---------- | ---------- | ------------------------------------------------------------- | -------------------------------- | ----------- |
| `disabled` | `disabled` | If `true`, the user cannot interact with the input.           | `boolean`                        | `false`     |
| `inline`   | `inline`   | Specifies what if label and input must be inline.             | `boolean`                        | `undefined` |
| `label`    | `label`    | The input's label. Alternatively, you can use the label slot. | `string`                         | `undefined` |
| `name`     | `name`     | The input's name attribute.                                   | `string`                         | `undefined` |
| `size`     | `size`     | The input's size.                                             | `"large" \| "medium" \| "small"` | `'medium'`  |
| `type`     | `type`     | Specifies what type of input to use.                          | `string`                         | `undefined` |


## Events

| Event      | Description                         | Type                |
| ---------- | ----------------------------------- | ------------------- |
| `wayBlur`  | Emitted when the input loses focus. | `CustomEvent<void>` |
| `wayFocus` | Emitted when the input has focus.   | `CustomEvent<void>` |


## CSS Custom Properties

| Name              | Description                |
| ----------------- | -------------------------- |
| `--border-color`  | Border color of the button |
| `--border-radius` | Border radius of the input |
| `--border-style`  | Border style of the button |
| `--border-width`  | Border width of the button |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
