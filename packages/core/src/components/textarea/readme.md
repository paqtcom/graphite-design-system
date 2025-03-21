# gr-textarea

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                                                                                                                                                                               | Type                                                                                  | Default      |
| ------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------ |
| `autocapitalize`    | `autocapitalize`     | Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user. Available options: `"off"`, `"none"`, `"on"`, `"sentences"`, `"words"`, `"characters"`. | `string`                                                                              | `'off'`      |
| `autocorrect`       | `autocorrect`        | Whether auto correction should be enabled when the user is entering/editing the text value.                                                                                                               | `"off" \| "on"`                                                                       | `'off'`      |
| `autofocus`         | `autofocus`          | This Boolean attribute lets you specify that a form control should have input focus when the page loads.                                                                                                  | `boolean`                                                                             | `false`      |
| `debounce`          | `debounce`           | Set the amount of time, in milliseconds, to wait to trigger the `gr-change` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.                                   | `number`                                                                              | `0`          |
| `disabled`          | `disabled`           | Set to true to disable the textarea.                                                                                                                                                                      | `boolean`                                                                             | `false`      |
| `enterkeyhint`      | `enterkeyhint`       | A hint to the browser for which enter key to display. Possible values: `"enter"`, `"done"`, `"go"`, `"next"`, `"previous"`, `"search"`, and `"send"`.                                                     | `"done" \| "enter" \| "go" \| "next" \| "previous" \| "search" \| "send"`             | `undefined`  |
| `helpText`          | `help-text`          | The textarea's help text. Alternatively, you can use the help-text slot.                                                                                                                                  | `string`                                                                              | `''`         |
| `inputmode`         | `inputmode`          | The textarea's inputmode attribute.                                                                                                                                                                       | `"decimal" \| "email" \| "none" \| "numeric" \| "search" \| "tel" \| "text" \| "url"` | `undefined`  |
| `invalid`           | `invalid`            | Set to true to indicate this field is invalid. Will display the invalid text instead of the help text                                                                                                     | `boolean`                                                                             | `false`      |
| `invalidText`       | `invalid-text`       | The input's invalid text. Alternatively, you can use the invalid-text slot.                                                                                                                               | `string`                                                                              | `''`         |
| `label`             | `label`              | The textarea's label. Alternatively, you can use the label slot.                                                                                                                                          | `string`                                                                              | `undefined`  |
| `maxRows`           | `max-rows`           | The number of max rows                                                                                                                                                                                    | `number`                                                                              | `undefined`  |
| `maxlength`         | `maxlength`          | Specifies how many characters are allowed.                                                                                                                                                                | `number`                                                                              | `undefined`  |
| `name`              | `name`               | The textarea's name attribute.                                                                                                                                                                            | `string`                                                                              | `''`         |
| `placeholder`       | `placeholder`        | The textarea's placeholder text.                                                                                                                                                                          | `string`                                                                              | `undefined`  |
| `readonly`          | `readonly`           | If `true`, the user cannot modify the value.                                                                                                                                                              | `boolean`                                                                             | `false`      |
| `requiredIndicator` | `required-indicator` | Set to true to display a required indicator, adds an asterisk to label                                                                                                                                    | `boolean`                                                                             | `false`      |
| `resize`            | `resize`             | Controls how the textarea can be resized.                                                                                                                                                                 | `"auto" \| "none" \| "vertical"`                                                      | `'vertical'` |
| `rows`              | `rows`               | The number of rows to display by default.                                                                                                                                                                 | `number`                                                                              | `4`          |
| `size`              | `size`               | The textarea's size.                                                                                                                                                                                      | `"large" \| "medium" \| "small"`                                                      | `'medium'`   |
| `spellcheck`        | `spellcheck`         | If `true`, the element will have its spelling and grammar checked.                                                                                                                                        | `boolean`                                                                             | `false`      |
| `value`             | `value`              | The textarea's value attribute.                                                                                                                                                                           | `string`                                                                              | `''`         |


## Events

| Event       | Description                                | Type                |
| ----------- | ------------------------------------------ | ------------------- |
| `gr-blur`   | Emitted when the textarea loses focus.     | `CustomEvent<void>` |
| `gr-change` | Emitted when the textarea's value changes. | `CustomEvent<void>` |
| `gr-focus`  | Emitted when the textarea has focus.       | `CustomEvent<void>` |
| `gr-input`  | Emitted when the textarea receives input.  | `CustomEvent<void>` |


## Methods

### `removeFocus() => Promise<void>`

Removes focus fromt the textarea.

#### Returns

Type: `Promise<void>`



### `select() => Promise<void>`

Selects all the text in the input.

#### Returns

Type: `Promise<void>`



### `setFocus(options?: FocusOptions) => Promise<void>`

Sets focus on the textarea.

#### Returns

Type: `Promise<void>`



### `setRangeText(replacement: string, start: number, end: number, selectMode?: 'select' | 'start' | 'end' | 'preserve') => Promise<void>`

Replaces a range of text with a new string.

#### Returns

Type: `Promise<void>`



### `setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none') => Promise<void>`

Sets the start and end positions of the text selection (0-based).

#### Returns

Type: `Promise<void>`




## Slots

| Slot             | Description                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| `"help-text"`    | Help text that describes how to use the textarea.                                                 |
| `"invalid-text"` | Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop. |
| `"label"`        | The textarea's label. Alternatively, you can use the label prop.                                  |


## CSS Custom Properties

| Name                               | Description                                                                                  |
| ---------------------------------- | -------------------------------------------------------------------------------------------- |
| `--background-color`               | Background color of the textarea                                                             |
| `--background-color-focus`         | Background color of the textarea on focus                                                    |
| `--background-color-hover`         | Background color of the textarea on hover                                                    |
| `--background-color-invalid`       | Background color of the textarea when invalid                                                |
| `--background-color-invalid-hover` | Background color of the textarea when invalid on focus                                       |
| `--border-color`                   | Border color of the textarea                                                                 |
| `--border-color-focus`             | Border color of the textarea on focus                                                        |
| `--border-color-hover`             | Border color of the textarea on hover                                                        |
| `--border-color-invalid`           | Border color of the textarea when invalid                                                    |
| `--border-color-invalid-hover`     | Border color of the textarea when invalid on focus                                           |
| `--border-radius`                  | Border radius of the textarea                                                                |
| `--color`                          | Text color of the textarea                                                                   |
| `--focus-ring`                     | The focus ring style to use when the textarea receives focus, a `box-shadow` property.       |
| `--font-size`                      | Font size of the textarea                                                                    |
| `--font-weight`                    | Font weight of the textarea                                                                  |
| `--min-height`                     | Minimum height of the textarea                                                               |
| `--padding-end`                    | Right padding of the textarea (will be left padding when we support right-to-left direction) |
| `--padding-start`                  | Left padding of the textarea (will be right padding when we support right-to-left direction) |
| `--placeholder-color`              | Text color of the placeholder                                                                |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
