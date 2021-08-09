# gr-menu-item

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                               | Type      | Default |
| ---------- | ---------- | --------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `checked`  | `checked`  | Set to true to draw the item in a checked state.                                                          | `boolean` | `false` |
| `disabled` | `disabled` | Set to true to draw the menu item in a disabled state.                                                    | `boolean` | `false` |
| `value`    | `value`    | A unique value to store in the menu item. This can be used as a way to identify menu items when selected. | `string`  | `''`    |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the menu item.

#### Returns

Type: `Promise<void>`



### `setFocus(options?: FocusOptions) => Promise<void>`

Sets focus on the menu item.

#### Returns

Type: `Promise<void>`




## Slots

| Slot      | Description                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------- |
|           | The menu item's label.                                                                                                |
| `"end"`   | Content is placed to the right of the menu item's label (will be to the left when we support right-to-left direction) |
| `"start"` | Content is placed to the left of the menu item's label (will be to the right when we support right-to-left direction) |


## CSS Custom Properties

| Name                         | Description                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| `--background-color`         | Background color of the menu item                                                             |
| `--background-color-focused` | Background color of the menu item when focused                                                |
| `--color`                    | Text color of the menu item                                                                   |
| `--color-disabled`           | Text color of the menu item when disabled                                                     |
| `--color-focused`            | Text color of the menu item when focused                                                      |
| `--line-height`              | Line height of the menu item                                                                  |
| `--padding-bottom`           | Bottom padding of the menu item                                                               |
| `--padding-end`              | Right padding of the menu item (will be left padding when we support right-to-left direction) |
| `--padding-start`            | Left padding of the menu item (will be right padding when we support right-to-left direction) |
| `--padding-top`              | Top padding of the menu item                                                                  |
| `--transition`               | Transition of the menu item                                                                   |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
