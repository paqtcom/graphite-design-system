# way-select



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                                                                                                                                                                    | Type                             | Default    |
| ---------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------- |
| `clearable`      | `clearable`        | Set to true to add a clear button when the select is populated.                                                                                                                                | `boolean`                        | `false`    |
| `disabled`       | `disabled`         | Set to true to disable the select control.                                                                                                                                                     | `boolean`                        | `false`    |
| `helpText`       | `help-text`        | The select's help text. Alternatively, you can use the help-text slot.                                                                                                                         | `string`                         | `''`       |
| `hoist`          | `hoist`            | Enable this option to prevent the panel from being clipped when the component is placed inside a container with `overflow: auto\|scroll`.                                                      | `boolean`                        | `false`    |
| `invalid`        | `invalid`          | This will be true when the control is in an invalid state. Validity is determined by the `required` prop.                                                                                      | `boolean`                        | `false`    |
| `label`          | `label`            | The select's label. Alternatively, you can use the label slot.                                                                                                                                 | `string`                         | `''`       |
| `maxTagsVisible` | `max-tags-visible` | The maximum number of tags to show when `multiple` is true. After the maximum, "+n" will be shown to indicate the number of additional items that are selected. Set to -1 to remove the limit. | `number`                         | `3`        |
| `multiple`       | `multiple`         | Set to true to enable multiselect.                                                                                                                                                             | `boolean`                        | `false`    |
| `name`           | `name`             | The select's name.                                                                                                                                                                             | `string`                         | `''`       |
| `pill`           | `pill`             | Set to true to draw a pill-style select with rounded edges.                                                                                                                                    | `boolean`                        | `false`    |
| `placeholder`    | `placeholder`      | The select's placeholder text.                                                                                                                                                                 | `string`                         | `''`       |
| `required`       | `required`         | The select's required attribute.                                                                                                                                                               | `boolean`                        | `false`    |
| `size`           | `size`             | The select's size.                                                                                                                                                                             | `"large" \| "medium" \| "small"` | `'medium'` |
| `value`          | `value`            | The value of the control. This will be a string or an array depending on `multiple`.                                                                                                           | `string \| string[]`             | `''`       |


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
|               | The select's options in the form of menu items.                |
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


## Dependencies

### Depends on

- [way-tag](../way-tag)
- [way-dropdown](../way-dropdown)
- [way-button](../way-button)
- [way-menu](../way-menu)

### Graph
```mermaid
graph TD;
  way-select --> way-tag
  way-select --> way-dropdown
  way-select --> way-button
  way-select --> way-menu
  way-tag --> way-button
  style way-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
