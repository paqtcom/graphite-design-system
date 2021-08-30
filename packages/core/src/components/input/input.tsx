import { Component, h, Element, Prop, Watch, Event, EventEmitter, State, Method } from '@stencil/core';
import FormControl from '../../functional-components/form-control/form-control';
import { AutocompleteTypes, TextFieldTypes } from '../../interface';
import { hasSlot } from '../../utils/slot';
import { debounceEvent, inheritAttributes, renderHiddenInput } from '../../utils/helpers';

let id = 0;

/**
 * @slot label - The input's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the input.
 * @slot invalid-text - Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop.
 */
@Component({
  tag: 'gr-input',
  styleUrl: 'input.scss',
  shadow: true,
})
export class Input {
  private input: HTMLInputElement;
  private inputId = `input-${++id}`;
  private labelId = `input-label-${id}`;
  private helpTextId = `input-help-text-${id}`;
  private invalidTextId = `input-invalid-text-${id}`;
  private inheritedAttributes: { [k: string]: any } = {};

  @Element() el!: HTMLGrInputElement;

  @State() hasFocus = false;
  @State() hasHelpTextSlot = false;
  @State() hasInvalidTextSlot = false;
  @State() hasLabelSlot = false;
  @State() isPasswordVisible = false;

  /** The input's value attribute. */
  @Prop({ mutable: true, reflect: true }) value: string = '';

  /** The type of control to display. The default type is text. */
  @Prop({ reflect: true }) type: TextFieldTypes = 'text';

  /** Set to true to draw a pill-style input with rounded edges. */
  @Prop() pill = false;

  /** Set to true to disable the input control. */
  @Prop() disabled = false;

  /** The input's name. */
  @Prop({ reflect: true }) name = '';

  /** The input's placeholder text. */
  @Prop() placeholder = '';

  /** The input's size. */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The inputs's label. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** Set to true to display a required indicator, adds an asterisk to label */
  @Prop() requiredIndicator = false;

  /** The input's help text. Alternatively, you can use the help-text slot. */
  @Prop() helpText = '';

  /** The input's invalid text. Alternatively, you can use the invalid-text slot. */
  @Prop() invalidText = '';

  /** Set to true to indicate this field is invalid. Will display the invalid text instead of the help text */
  @Prop({ reflect: true }) invalid = false;

  /** Set to true to add a clear button when the input is populated. */
  @Prop() clearable = false;

  /** The input's inputmode attribute. */
  @Prop() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** If `true`, the user cannot modify the value. */
  @Prop({ reflect: true }) readonly = false;

  /** If `true`, the element will have its spelling and grammar checked. */
  @Prop() spellcheck = false;

  /**
   * The minimum value, which must not be greater than its maximum (max attribute) value.
   */
  @Prop() min?: string;

  /**
   * The maximum value, which must not be less than its minimum (min attribute) value.
   */
  @Prop() max?: string;

  /**
   * Works with the min and max attributes to limit the increments at which a value can be set.
   * Possible values are: `"any"` or a positive floating point number.
   */
  @Prop() step?: string;

  /**
   * A hint to the browser for which enter key to display.
   * Possible values: `"enter"`, `"done"`, `"go"`, `"next"`,
   * `"previous"`, `"search"`, and `"send"`.
   */
  @Prop() enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

  /**
   * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
   * Available options: `"off"`, `"none"`, `"on"`, `"sentences"`, `"words"`, `"characters"`.
   */
  @Prop() autocapitalize = 'off';

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: AutocompleteTypes = 'off';

  /**
   * Whether auto correction should be enabled when the user is entering/editing the text value.
   */
  @Prop() autocorrect: 'on' | 'off' = 'off';

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  @Prop() autofocus = false;

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `gr-change` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0;

  /**
   * Set to true to add a password toggle button for password inputs.
   */
  @Prop() togglePassword = false;

  @Watch('debounce')
  protected debounceChanged() {
    this.grChange = debounceEvent(this.grChange, this.debounce);
  }

  @Watch('helpText')
  @Watch('invalidText')
  @Watch('label')
  handleLabelChange() {
    this.handleSlotChange();
  }

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged() {
    this.grChange.emit();
  }

  /** Emitted when the control's value changes. */
  @Event({ eventName: 'gr-change' }) grChange: EventEmitter<void>;

  /** Emitted when the clear button is activated. */
  @Event({ eventName: 'gr-clear' }) grClear: EventEmitter<void>;

  /** Emitted when the control receives input. */
  @Event({ eventName: 'gr-input' }) grInput: EventEmitter<void>;

  /** Emitted when the control gains focus. */
  @Event({ eventName: 'gr-focus' }) grFocus: EventEmitter<void>;

  /** Emitted when the control loses focus. */
  @Event({ eventName: 'gr-blur' }) grBlur: EventEmitter<void>;

  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handlePasswordToggle = this.handlePasswordToggle.bind(this);

    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);

    this.debounceChanged();
  }

  componentWillLoad() {
    this.handleSlotChange();
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title']);
  }

  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }

  /** Sets focus on the input. */
  @Method()
  async setFocus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the input. */
  @Method()
  async removeFocus() {
    this.input.blur();
  }

  /** Selects all the text in the input. */
  @Method()
  async select() {
    return this.input.select();
  }

  /** Sets the start and end positions of the text selection (0-based). */
  @Method()
  async setSelectionRange(
    selectionStart: number,
    selectionEnd: number,
    selectionDirection: 'forward' | 'backward' | 'none' = 'none',
  ) {
    return this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }

  /** Replaces a range of text with a new string. */
  @Method()
  async setRangeText(
    replacement: string,
    start: number,
    end: number,
    selectMode: 'select' | 'start' | 'end' | 'preserve' = 'preserve',
  ) {
    this.input.setRangeText(replacement, start, end, selectMode);

    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.grChange.emit();
      this.grInput.emit();
    }
  }

  handleChange() {
    this.value = this.input.value;
    this.grChange.emit();
  }

  handleInput() {
    this.value = this.input.value;
    this.grInput.emit();
  }

  handleBlur() {
    this.hasFocus = false;
    this.grBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.grFocus.emit();
  }

  handleClearClick(event: MouseEvent) {
    this.value = '';
    this.grClear.emit();
    this.grInput.emit();
    this.grChange.emit();
    this.input.focus();

    event.stopPropagation();
  }

  handleLabelClick() {
    this.input.focus();
  }

  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasLabelSlot = hasSlot(this.el, 'label');
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
  }

  handlePasswordToggle() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  render() {
    renderHiddenInput(this.el, this.name, this.value, this.disabled);

    return (
      <FormControl
        inputId={this.inputId}
        label={this.label}
        labelId={this.labelId}
        hasLabelSlot={this.hasLabelSlot}
        helpTextId={this.helpTextId}
        helpText={this.helpText}
        hasHelpTextSlot={this.hasHelpTextSlot}
        invalidTextId={this.invalidTextId}
        invalidText={this.invalidText}
        invalid={this.invalid}
        hasInvalidTextSlot={this.hasInvalidTextSlot}
        size={this.size}
        onLabelClick={this.handleLabelClick}
        requiredIndicator={this.requiredIndicator}
      >
        <div
          class={{
            'input': true,
            'input-pill': this.pill,
            'input-disabled': this.disabled,
            'input-invalid': this.invalid,
            'input-focused': this.hasFocus,
            'input-empty': this.value?.length === 0,
            [`input-${this.size}`]: true,
          }}
        >
          <span class="start">
            <slot name="start" />
          </span>

          <input
            ref={el => (this.input = el)}
            id={this.name}
            name={this.name}
            type={this.type === 'password' && this.isPasswordVisible ? 'text' : this.type}
            placeholder={this.placeholder}
            disabled={this.disabled}
            readonly={this.readonly}
            autoCorrect={this.autocorrect}
            autoFocus={this.autofocus}
            enterKeyHint={this.enterkeyhint}
            inputMode={this.inputmode}
            min={this.min}
            max={this.max}
            step={this.step}
            value={this.value}
            autoCapitalize={this.autocapitalize}
            autoComplete={this.autocomplete}
            spellcheck={this.spellcheck}
            aria-labelledby={this.labelId}
            aria-describedby={this.invalid ? this.invalidTextId : this.helpTextId}
            aria-invalid={this.invalid ? 'true' : 'false'}
            aria-required={this.requiredIndicator ? 'true' : 'false'}
            onChange={this.handleChange}
            onInput={this.handleInput}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            class="input-control"
            {...this.inheritedAttributes}
          />

          {this.clearable && (
            <button class="input-clear" type="button" onClick={this.handleClearClick} tabindex="-1">
              <svg role="img" aria-hidden="true" viewBox="0 0 512 512">
                <title>Close Circle</title>
                <path
                  d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                  fill="none"
                  stroke="currentColor"
                  stroke-miterlimit="10"
                  stroke-width="32"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M320 320L192 192M192 320l128-128"
                />
              </svg>
            </button>
          )}

          {this.togglePassword && (
            <button class="input-password-toggle" type="button" onClick={this.handlePasswordToggle} tabindex="-1">
              {this.isPasswordVisible ? (
                <svg role="img" aria-hidden="true" viewBox="0 0 512 512">
                  <title>Eye Off</title>
                  <path d="M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM255.66 384c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zM490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z" />
                  <path d="M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zM165.78 233.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z" />
                </svg>
              ) : (
                <svg role="img" aria-hidden="true" viewBox="0 0 512 512">
                  <title>Eye</title>
                  <path
                    d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                  />
                  <circle
                    cx="256"
                    cy="256"
                    r="80"
                    fill="none"
                    stroke="currentColor"
                    stroke-miterlimit="10"
                    stroke-width="32"
                  />
                </svg>
              )}
            </button>
          )}

          <span class="end">
            <slot name="end" />
          </span>
        </div>
      </FormControl>
    );
  }
}
