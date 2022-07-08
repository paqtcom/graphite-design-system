# gr-tab



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                      | Type      | Default |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------ | --------- | ------- |
| `active`   | `active`   |                                                                                                  | `boolean` | `false` |
| `disabled` | `disabled` | Set to true to draw the tab in a disabled state.                                                 | `boolean` | `false` |
| `panel`    | `panel`    | The name of the tab panel the tab will control. The panel must be located in the same tab group. | `string`  | `''`    |


## Events

| Event      | Description                          | Type                |
| ---------- | ------------------------------------ | ------------------- |
| `gr-blur`  | Emitted when the button loses focus. | `CustomEvent<void>` |
| `gr-focus` | Emitted when the button has focus.   | `CustomEvent<void>` |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the tab.

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Sets focus on the tab.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
