# way-button



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                   | Type      | Default     |
| --------------- | --------------- | --------------------------------------------- | --------- | ----------- |
| `checked`       | `checked`       | Draws the checkbox in a checked state.        | `boolean` | `false`     |
| `disabled`      | `disabled`      | Disables the checkbox.                        | `boolean` | `false`     |
| `indeterminate` | `indeterminate` | Draws the checkbox in an indeterminate state. | `boolean` | `false`     |
| `name`          | `name`          | The checkbox's name attribute.                | `string`  | `undefined` |
| `required`      | `required`      | Makes the checkbox a required field.          | `boolean` | `false`     |
| `value`         | `value`         | The checkbox's value attribute.               | `string`  | `undefined` |


## Events

| Event       | Description                            | Type                |
| ----------- | -------------------------------------- | ------------------- |
| `wayBlur`   | Emitted when the checkbox loses focus. | `CustomEvent<void>` |
| `wayChange` | Emitted when the checkbox loses focus. | `CustomEvent<void>` |
| `wayFocus`  | Emitted when the checkbox has focus.   | `CustomEvent<void>` |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the checkbox.

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Sets focus on the checkbox.

#### Returns

Type: `Promise<void>`




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
