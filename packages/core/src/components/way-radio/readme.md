# way-radio



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                       | Type      | Default     |
| ---------- | ---------- | ------------------------------------------------- | --------- | ----------- |
| `checked`  | `checked`  | Set to true to draw the radio in a checked state. | `boolean` | `false`     |
| `disabled` | `disabled` | Set to true to disable the radio.                 | `boolean` | `false`     |
| `name`     | `name`     | The radio's name attribute.                       | `string`  | `undefined` |
| `value`    | `value`    | The radio's value attribute.                      | `string`  | `undefined` |


## Events

| Event       | Description                                       | Type               |
| ----------- | ------------------------------------------------- | ------------------ |
| `wayBlur`   | Emitted when the control loses focus.             | `CustomEvent<any>` |
| `wayChange` | Emitted when the control's checked state changes. | `CustomEvent<any>` |
| `wayFocus`  | Emitted when the control gains focus.             | `CustomEvent<any>` |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the radio.

#### Returns

Type: `Promise<void>`



### `setFocus(options?: FocusOptions) => Promise<void>`

Sets focus on the radio.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
