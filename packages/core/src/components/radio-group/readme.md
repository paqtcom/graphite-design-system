# way-radio-group



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                                                          | Type      | Default        |
| --------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------- | --------- | -------------- |
| `allowEmptySelection` | `allow-empty-selection` | If `true`, the radios can be deselected.                                                             | `boolean` | `false`        |
| `horizontal`          | `horizontal`            | Render the radios horizontal instead of vertical                                                     | `boolean` | `false`        |
| `invalid`             | `invalid`               | Set to true to indicate this field is invalid.                                                       | `boolean` | `false`        |
| `label`               | `label`                 | The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. | `string`  | `''`           |
| `name`                | `name`                  | The name of the control, which is submitted with the form data.                                      | `string`  | `this.inputId` |
| `value`               | `value`                 | the value of the radio group.                                                                        | `any`     | `undefined`    |


## Events

| Event       | Description                         | Type                                       |
| ----------- | ----------------------------------- | ------------------------------------------ |
| `gr-change` | Emitted when the value has changed. | `CustomEvent<RadioGroupChangeEventDetail>` |


## Slots

| Slot      | Description                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------- |
|           | The default slot where radio controls are placed.                                                    |
| `"label"` | The radio group label. Required for proper accessibility. Alternatively, you can use the label prop. |


## CSS Custom Properties

| Name                                 | Description                                                    |
| ------------------------------------ | -------------------------------------------------------------- |
| `--margin-between-radios`            | Margin between the gr-radio children                           |
| `--margin-between-radios-horizontal` | Margin between the gr-radio children when layout is horizontal |
| `--radio-label-color-invalid`        | Color of the radio label's when invalid                        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
