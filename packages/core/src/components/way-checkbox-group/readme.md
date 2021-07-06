# way-checkbox-group



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                                                                      | Type      | Default        |
| --------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------- | --------- | -------------- |
| `allowEmptySelection` | `allow-empty-selection` | If `true`, the checkboxs can be deselected.                                                                      | `boolean` | `false`        |
| `label`               | `label`                 | The checkbox group label. Required for proper accessibility. Alternatively, you can use the label slot.          | `string`  | `''`           |
| `name`                | `name`                  | The name of the control, which is submitted with the form data.                                                  | `string`  | `this.inputId` |
| `noFieldset`          | `no-fieldset`           | Hides the fieldset and legend that surrounds the checkbox group. The label will still be read by screen readers. | `boolean` | `false`        |
| `value`               | `value`                 | the value of the checkbox group.                                                                                 | `any`     | `undefined`    |


## Events

| Event        | Description                         | Type                                             |
| ------------ | ----------------------------------- | ------------------------------------------------ |
| `way-change` | Emitted when the value has changed. | `CustomEvent<WayCheckboxGroupChangeEventDetail>` |


## CSS Custom Properties

| Name                         | Description                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| `--border-color`             | Border color of the fieldset                                                                 |
| `--border-radius`            | Border radius of the fieldset                                                                |
| `--label-color`              | Color of the label                                                                           |
| `--label-padding-end`        | Right padding of the label (will be left padding when we support right-to-left direction)    |
| `--label-padding-start`      | Left padding of the label (will be right padding when we support right-to-left direction)    |
| `--margin-between-checkboxs` | Margin between the way-checkbox children                                                     |
| `--padding-bottom`           | Bottom padding of the fieldset                                                               |
| `--padding-end`              | Right padding of the fieldset (will be left padding when we support right-to-left direction) |
| `--padding-start`            | Left padding of the fieldset (will be right padding when we support right-to-left direction) |
| `--padding-top`              | Top padding of the fieldset                                                                  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
