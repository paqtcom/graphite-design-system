# way-input



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                           | Type                                                                                  | Default     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------- |
| `disabled`    | `disabled`     | Set to true to disable the input control.                                                             | `boolean`                                                                             | `false`     |
| `helpText`    | `help-text`    | The input's help text. Alternatively, you can use the help-text slot.                                 | `string`                                                                              | `''`        |
| `inputmode`   | `inputmode`    | The input's inputmode attribute.                                                                      | `"decimal" \| "email" \| "none" \| "numeric" \| "search" \| "tel" \| "text" \| "url"` | `undefined` |
| `invalid`     | `invalid`      | Set to true to indicate this field is invalid. Will display the invalid text instead of the help text | `boolean`                                                                             | `false`     |
| `invalidText` | `invalid-text` | The input's invalid text. Alternatively, you can use the invalid-text slot.                           | `string`                                                                              | `''`        |
| `label`       | `label`        | The inputs's label. Alternatively, you can use the label slot.                                        | `string`                                                                              | `''`        |
| `name`        | `name`         | The input's name.                                                                                     | `string`                                                                              | `''`        |
| `pill`        | `pill`         | Set to true to draw a pill-style input with rounded edges.                                            | `boolean`                                                                             | `false`     |
| `placeholder` | `placeholder`  | The input's placeholder text.                                                                         | `string`                                                                              | `''`        |
| `size`        | `size`         | The input's size.                                                                                     | `"large" \| "medium" \| "small"`                                                      | `'medium'`  |
| `type`        | `type`         | Specifies what type of input to use.                                                                  | `"email" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "url"`           | `'text'`    |
| `value`       | `value`        | The input's value attribute.                                                                          | `string`                                                                              | `''`        |


## Events

| Event        | Description                               | Type               |
| ------------ | ----------------------------------------- | ------------------ |
| `way-blur`   | Emitted when the control loses focus.     | `CustomEvent<any>` |
| `way-change` | Emitted when the control's value changes. | `CustomEvent<any>` |
| `way-focus`  | Emitted when the control gains focus.     | `CustomEvent<any>` |


## Slots

| Slot             | Description                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| `"help-text"`    | Help text that describes how to use the input.                                                      |
| `"invalid-text"` | Invalid text that describes how to use the input. Alternatively, you can use the invalid-text prop. |
| `"label"`        | The input's label. Alternatively, you can use the label prop.                                       |


## CSS Custom Properties

| Name                               | Description                                                                               |
| ---------------------------------- | ----------------------------------------------------------------------------------------- |
| `--background-color`               | Background color of the input                                                             |
| `--background-color-focus`         | Background color of the input on focus                                                    |
| `--background-color-hover`         | Background color of the input on hover                                                    |
| `--background-color-invalid`       | Background color of the input when invalid                                                |
| `--background-color-invalid-hover` | Background color of the input when invalid on focus                                       |
| `--border-color`                   | Border color of the input                                                                 |
| `--border-color-focus`             | Border color of the input on focus                                                        |
| `--border-color-hover`             | Border color of the input on hover                                                        |
| `--border-color-invalid`           | Border color of the input when invalid                                                    |
| `--border-color-invalid-hover`     | Border color of the input when invalid on focus                                           |
| `--border-radius`                  | Border radius of the input                                                                |
| `--color`                          | Text color of the input                                                                   |
| `--focus-ring`                     | The focus ring style to use when the input receives focus, a `box-shadow` property.       |
| `--font-size`                      | Font size of the input                                                                    |
| `--font-weight`                    | Font weight of the input                                                                  |
| `--label-margin-end`               | Right margin of the label (will be left margin when we support right-to-left direction)   |
| `--label-margin-start`             | Left margin of the label (will be right margin when we support right-to-left direction)   |
| `--min-height`                     | Minimum height of the input                                                               |
| `--padding-end`                    | Right padding of the input (will be left padding when we support right-to-left direction) |
| `--padding-start`                  | Left padding of the input (will be right padding when we support right-to-left direction) |
| `--placeholder-color`              | Text color of the placeholder                                                             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
