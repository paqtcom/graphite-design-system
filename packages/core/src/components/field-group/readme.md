# gr-field-group



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                                                   | Type      | Default |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `horizontal` | `horizontal`  | Render the fields horizontal instead of vertical                                                              | `boolean` | `false` |
| `label`      | `label`       | The field group label. Recommended for proper accessibility. Alternatively, you can use the label slot.       | `string`  | `''`    |
| `noFieldset` | `no-fieldset` | Hides the fieldset and legend that surrounds the field group. The label will still be read by screen readers. | `boolean` | `false` |


## Slots

| Slot      | Description                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------- |
|           | The default slot where fields are placed.                                                               |
| `"label"` | The field group label. Recommended for proper accessibility. Alternatively, you can use the label prop. |


## CSS Custom Properties

| Name                                 | Description                                                                                  |
| ------------------------------------ | -------------------------------------------------------------------------------------------- |
| `--border-color`                     | Border color of the fieldset                                                                 |
| `--border-radius`                    | Border radius of the fieldset                                                                |
| `--label-color`                      | Color of the label                                                                           |
| `--label-padding-end`                | Right padding of the label (will be left padding when we support right-to-left direction)    |
| `--label-padding-start`              | Left padding of the label (will be right padding when we support right-to-left direction)    |
| `--margin-between-fields`            | Margin between the children                                                                  |
| `--margin-between-fields-horizontal` | Margin between the children when layout is horizontal                                        |
| `--padding-bottom`                   | Bottom padding of the fieldset                                                               |
| `--padding-end`                      | Right padding of the fieldset (will be left padding when we support right-to-left direction) |
| `--padding-start`                    | Left padding of the fieldset (will be right padding when we support right-to-left direction) |
| `--padding-top`                      | Top padding of the fieldset                                                                  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
