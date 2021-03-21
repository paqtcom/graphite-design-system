# way-menu-item



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                               | Type      | Default |
| ---------- | ---------- | --------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `checked`  | `checked`  | Set to true to draw the item in a checked state.                                                          | `boolean` | `false` |
| `disabled` | `disabled` | Set to true to draw the menu item in a disabled state.                                                    | `boolean` | `false` |
| `value`    | `value`    | A unique value to store in the menu item. This can be used as a way to identify menu items when selected. | `string`  | `''`    |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the button.

#### Returns

Type: `Promise<void>`



### `setFocus(options?: FocusOptions) => Promise<void>`

Sets focus on the button.

#### Returns

Type: `Promise<void>`




## Slots

| Slot      | Description                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------- |
|           | The menu item's label.                                                                                                |
| `"end"`   | Content is placed to the right of the menu item's label (will be to the left when we support right-to-left direction) |
| `"start"` | Content is placed to the left of the menu item's label (will be to the right when we support right-to-left direction) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
