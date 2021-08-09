# gr-tag

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                              | Type                                                        | Default     |
| ----------- | ----------- | -------------------------------------------------------- | ----------------------------------------------------------- | ----------- |
| `clearable` | `clearable` | Set to true to make the tag clearable.                   | `boolean`                                                   | `false`     |
| `pill`      | `pill`      | Set to true to draw a pill-style tag with rounded edges. | `boolean`                                                   | `false`     |
| `size`      | `size`      | The tag's size.                                          | `"large" \| "medium" \| "small"`                            | `'medium'`  |
| `type`      | `type`      | The tag's type.                                          | `"danger" \| "info" \| "primary" \| "success" \| "warning"` | `'primary'` |


## Events

| Event      | Description                                 | Type                |
| ---------- | ------------------------------------------- | ------------------- |
| `gr-clear` | Emitted when the clear button is activated. | `CustomEvent<void>` |


## Slots

| Slot | Description        |
| ---- | ------------------ |
|      | The tag's content. |


## CSS Custom Properties

| Name                   | Description                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `--background-color`   | Background color of the tag                                                             |
| `--border-color`       | Border color of the tag                                                                 |
| `--border-radius`      | Border radius of the tag                                                                |
| `--border-style`       | Border style of the tag                                                                 |
| `--border-width`       | Border width of the tag                                                                 |
| `--clear-color`        | Color of the clear icon                                                                 |
| `--clear-color-hover`  | Color of the clear icon on hover                                                        |
| `--clear-margin-left`  | Margin left of the clear icon                                                           |
| `--clear-margin-right` | Margin right of the clear icon                                                          |
| `--color`              | Text color of the tag                                                                   |
| `--font-size`          | Font size of the tag                                                                    |
| `--height`             | Height of the tag                                                                       |
| `--line-height`        | Line height of the tag                                                                  |
| `--padding-bottom`     | Bottom padding of the tag                                                               |
| `--padding-end`        | Right padding of the tag (will be left padding when we support right-to-left direction) |
| `--padding-start`      | Left padding of the tag (will be right padding when we support right-to-left direction) |
| `--padding-top`        | Top padding of the tag                                                                  |


## Dependencies

### Used by

 - [gr-select](../select)

### Depends on

- [gr-button](../button)

### Graph
```mermaid
graph TD;
  gr-tag --> gr-button
  gr-button --> gr-spinner
  gr-select --> gr-tag
  style gr-tag fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
