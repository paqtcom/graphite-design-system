# gr-radio

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                       | Type      | Default     |
| ---------- | ---------- | ------------------------------------------------- | --------- | ----------- |
| `checked`  | `checked`  | Set to true to draw the radio in a checked state. | `boolean` | `false`     |
| `disabled` | `disabled` | Set to true to disable the radio.                 | `boolean` | `false`     |
| `value`    | `value`    | The radio's value attribute.                      | `string`  | `undefined` |


## Events

| Event      | Description                           | Type               |
| ---------- | ------------------------------------- | ------------------ |
| `gr-blur`  | Emitted when the control loses focus. | `CustomEvent<any>` |
| `gr-focus` | Emitted when the control gains focus. | `CustomEvent<any>` |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the radio.

#### Returns

Type: `Promise<void>`



### `setFocus(options?: FocusOptions) => Promise<void>`

Sets focus on the radio.

#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description        |
| ---- | ------------------ |
|      | The radio's label. |


## CSS Custom Properties

| Name                                       | Description                                           |
| ------------------------------------------ | ----------------------------------------------------- |
| `--control-background-color`               | Background color of the control                       |
| `--control-background-color-checked`       | Background color of the control when checked          |
| `--control-background-color-checked-focus` | Background color of the control when checked on focus |
| `--control-background-color-checked-hover` | Background color of the control when checked on hover |
| `--control-background-color-focus`         | Background color of the control on focus              |
| `--control-background-color-hover`         | Background color of the control on hover              |
| `--control-border-color`                   | Border color of the control                           |
| `--control-border-color-checked`           | Border color of the control when checked              |
| `--control-border-color-checked-focus`     | Border color of the control when checked on focus     |
| `--control-border-color-checked-hover`     | Border color of the control when checked on hover     |
| `--control-border-color-focus`             | Border color of the control on focus                  |
| `--control-border-color-hover`             | Border color of the control on hover                  |
| `--control-color-checked`                  | Color of the control when checked (the small circle)  |
| `--control-size`                           | Size of the control                                   |
| `--label-color`                            | Color of the label                                    |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
