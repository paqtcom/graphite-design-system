# way-input



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                | Type                                                                                  | Default     |
| ------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------- |
| `disabled`    | `disabled`    | Set to true to disable the input control.                                                                                  | `boolean`                                                                             | `false`     |
| `helpText`    | `help-text`   | The input's help text. Alternatively, you can use the help-text slot.                                                      | `string`                                                                              | `''`        |
| `inputmode`   | `inputmode`   | The input's inputmode attribute.                                                                                           | `"decimal" \| "email" \| "none" \| "numeric" \| "search" \| "tel" \| "text" \| "url"` | `undefined` |
| `invalid`     | `invalid`     | This will be true when the control is in an invalid state. Validity is determined by props such as `type`, and `required`. | `boolean`                                                                             | `false`     |
| `label`       | `label`       | The inputs's label. Alternatively, you can use the label slot.                                                             | `string`                                                                              | `''`        |
| `name`        | `name`        | The input's name.                                                                                                          | `string`                                                                              | `''`        |
| `placeholder` | `placeholder` | The input's placeholder text.                                                                                              | `string`                                                                              | `''`        |
| `required`    | `required`    | The input's required attribute.                                                                                            | `boolean`                                                                             | `false`     |
| `size`        | `size`        | The input's size.                                                                                                          | `"large" \| "medium" \| "small"`                                                      | `'medium'`  |
| `type`        | `type`        | Specifies what type of input to use.                                                                                       | `"email" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "url"`           | `'text'`    |
| `value`       | `value`       | The input's value attribute.                                                                                               | `string`                                                                              | `''`        |


## Events

| Event        | Description                               | Type               |
| ------------ | ----------------------------------------- | ------------------ |
| `way-blur`   | Emitted when the control loses focus.     | `CustomEvent<any>` |
| `way-change` | Emitted when the control's value changes. | `CustomEvent<any>` |
| `way-focus`  | Emitted when the control gains focus.     | `CustomEvent<any>` |


## Methods

### `reportValidity() => Promise<boolean>`

Checks for validity and shows the browser's validation message if the control is invalid.

#### Returns

Type: `Promise<boolean>`



### `setCustomValidity(message: string) => Promise<void>`

Sets a custom validation message. If `message` is not empty, the field will be considered invalid.

#### Returns

Type: `Promise<void>`




## Slots

| Slot          | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| `"help-text"` | Help text that describes how to use the select.                |
| `"label"`     | The select's label. Alternatively, you can use the label prop. |


## CSS Custom Properties

| Name                       | Description                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `--background-color`       | Background color of the select                                                               |
| `--background-color-hover` | Background color of the select on hover                                                      |
| `--border-color`           | Border color of the select                                                                   |
| `--border-color-hover`     | Border color of the select on hover                                                          |
| `--border-radius`          | Border radius of the select                                                                  |
| `--caret-margin-end`       | Right margin of the caret (will be left margin when we support right-to-left direction)      |
| `--clear-icon-margin-end`  | Right margin of the clear icon (will be left margin when we support right-to-left direction) |
| `--color`                  | Text color of the select                                                                     |
| `--font-size`              | Font size of the select                                                                      |
| `--font-weight`            | Font weight of the select                                                                    |
| `--label-margin-end`       | Right margin of the label (will be left margin when we support right-to-left direction)      |
| `--label-margin-start`     | Left margin of the label (will be right margin when we support right-to-left direction)      |
| `--min-height`             | Minimum height of the select                                                                 |
| `--placeholder-color`      | Text color of the placeholder                                                                |
| `--tags-margin-end`        | Right margin of the tags (will be left margin when we support right-to-left direction)       |
| `--tags-padding-bottom`    | Bottom padding of the tags                                                                   |
| `--tags-padding-top`       | Top padding of the tags                                                                      |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
