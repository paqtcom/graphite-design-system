# way-button



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                   | Type                   | Default     |
| --------------- | --------------- | --------------------------------------------- | ---------------------- | ----------- |
| `checked`       | `checked`       | Draws the checkbox in a checked state.        | `boolean`              | `false`     |
| `disabled`      | `disabled`      | Disables the checkbox.                        | `boolean`              | `false`     |
| `indeterminate` | `indeterminate` | Draws the checkbox in an indeterminate state. | `boolean`              | `false`     |
| `name`          | `name`          | The checkbox's name attribute.                | `string`               | `undefined` |
| `required`      | `required`      | Makes the checkbox a required field.          | `boolean`              | `false`     |
| `value`         | `value`         | The checkbox's value attribute.               | `string`               | `undefined` |
| `variant`       | `variant`       | The checkbox variants.                        | `"circle" \| "square"` | `'square'`  |


## Events

| Event       | Description                           | Type                |
| ----------- | ------------------------------------- | ------------------- |
| `wayBlur`   | Emitted when the checkbox loses blur. | `CustomEvent<void>` |
| `wayChange` | Emitted when the checkbox changes.    | `CustomEvent<void>` |


## Slots

| Slot          | Description                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
|               | Content is placed between the named slots if provided without a slot.                                             |
| `"end"`       | Content is placed to the right of the checkbox text (will be to the left when we support right-to-left direction) |
| `"icon-only"` | Should be used on an icon in a checkbox that has no text.                                                         |
| `"start"`     | Content is placed to the left of the checkbox text (will be to the right when we support right-to-left direction) |


## Shadow Parts

| Part                   | Description |
| ---------------------- | ----------- |
| `"base"`               |             |
| `"checked-icon"`       |             |
| `"control"`            |             |
| `"indeterminate-icon"` |             |
| `"label"`              |             |


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
