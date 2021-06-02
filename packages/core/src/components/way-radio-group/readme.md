# way-radio-group



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                                                                   | Type      | Default        |
| --------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------- | --------- | -------------- |
| `allowEmptySelection` | `allow-empty-selection` | If `true`, the radios can be deselected.                                                                      | `boolean` | `false`        |
| `label`               | `label`                 | The radio group label. Required for proper accessibility. Alternatively, you can use the label slot.          | `string`  | `''`           |
| `name`                | `name`                  | The name of the control, which is submitted with the form data.                                               | `string`  | `this.inputId` |
| `noFieldset`          | `no-fieldset`           | Hides the fieldset and legend that surrounds the radio group. The label will still be read by screen readers. | `boolean` | `false`        |
| `value`               | `value`                 | the value of the radio group.                                                                                 | `any`     | `undefined`    |


## Events

| Event       | Description                         | Type                                          |
| ----------- | ----------------------------------- | --------------------------------------------- |
| `wayChange` | Emitted when the value has changed. | `CustomEvent<WayRadioGroupChangeEventDetail>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
