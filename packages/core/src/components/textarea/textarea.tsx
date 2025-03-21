import { Component, h, Prop, Element, Event, EventEmitter, State, Watch, Method } from '@stencil/core';
import FormControl from '../../functional-components/form-control/form-control';
import { debounceEvent, inheritAttributes, renderHiddenInput } from '../../utils/helpers';
import { hasSlot } from '../../utils/slot';

let id = 0;

/**
 * @slot label - The textarea's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the textarea.
 * @slot invalid-text - Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop.
 */
@Component({
  tag: 'gr-textarea',
  styleUrl: 'textarea.scss',
  shadow: true,
})
export class Textarea {
  private inputId = `textarea-${++id}`;
  private labelId = `textarea-label-${id}`;
  private helpTextId = `textarea-help-text-${id}`;
  private invalidTextId = `textarea-invalid-text-${id}`;
  private textarea: HTMLTextAreaElement;
  private inheritedAttributes: { [k: string]: any } = {};

  @Element() el!: HTMLGrTextareaElement;

  @State() hasFocus = false;
  @State() hasHelpTextSlot = false;
  @State() hasInvalidTextSlot = false;
  @State() hasLabelSlot = false;

  /** The textarea's size. */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The textarea's name attribute. */
  @Prop({ reflect: true }) name = '';

  /** The textarea's value attribute. */
  @Prop({ mutable: true, reflect: true }) value = '';

  /** The textarea's label. Alternatively, you can use the label slot. */
  @Prop() label: string | undefined;

  /** Set to true to display a required indicator, adds an asterisk to label */
  @Prop() requiredIndicator = false;

  /** The textarea's help text. Alternatively, you can use the help-text slot. */
  @Prop() helpText = '';

  /** The input's invalid text. Alternatively, you can use the invalid-text slot. */
  @Prop() invalidText = '';

  /** Set to true to indicate this field is invalid. Will display the invalid text instead of the help text */
  @Prop({ reflect: true }) invalid = false;

  /** The textarea's placeholder text. */
  @Prop() placeholder: string;

  /** The number of rows to display by default. */
  @Prop() rows = 4;

  /** The number of max rows */
  @Prop() maxRows: number;

  /** Controls how the textarea can be resized. */
  @Prop() resize: 'none' | 'vertical' | 'auto' = 'vertical';

  /** Set to true to disable the textarea. */
  @Prop({ reflect: true }) disabled = false;

  /** If `true`, the user cannot modify the value. */
  @Prop({ reflect: true }) readonly = false;

  /** Specifies how many characters are allowed. */
  @Prop() maxlength: number;

  /** The textarea's inputmode attribute. */
  @Prop() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** If `true`, the element will have its spelling and grammar checked. */
  @Prop() spellcheck = false;

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

  @Watch('debounce')
  protected debounceChanged() {
    this.grChange = debounceEvent(this.grChange, this.debounce);
  }

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged() {
    const nativeInput = this.textarea;
    const value = this.value;
    if (nativeInput && nativeInput.value !== value) {
      nativeInput.value = value;
    }
    this.grChange.emit();
  }

  @Watch('helpText')
  @Watch('invalidText')
  @Watch('label')
  handleLabelChange() {
    this.handleSlotChange();
  }

  @Watch('rows')
  handleRowsChange() {
    this.setTextareaHeight();
  }

  /** Emitted when the textarea's value changes. */
  @Event({ eventName: 'gr-change' }) grChange: EventEmitter<void>;

  /** Emitted when the textarea receives input. */
  @Event({ eventName: 'gr-input' }) grInput: EventEmitter<void>;

  /** Emitted when the textarea has focus. */
  @Event({ eventName: 'gr-focus' }) grFocus!: EventEmitter<void>;

  /** Emitted when the textarea loses focus. */
  @Event({ eventName: 'gr-blur' }) grBlur!: EventEmitter<void>;

  connectedCallback() {
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);

    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);

    this.debounceChanged();
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title']);
  }

  /** Sets focus on the textarea. */
  @Method()
  async setFocus(options?: FocusOptions) {
    this.textarea.focus(options);
  }

  /** Removes focus fromt the textarea. */
  @Method()
  async removeFocus() {
    this.textarea.blur();
  }

  /** Selects all the text in the input. */
  @Method()
  async select() {
    return this.textarea.select();
  }

  /** Sets the start and end positions of the text selection (0-based). */
  @Method()
  async setSelectionRange(
    selectionStart: number,
    selectionEnd: number,
    selectionDirection: 'forward' | 'backward' | 'none' = 'none',
  ) {
    return this.textarea.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }

  /** Replaces a range of text with a new string. */
  @Method()
  async setRangeText(
    replacement: string,
    start: number,
    end: number,
    selectMode: 'select' | 'start' | 'end' | 'preserve' = 'preserve',
  ) {
    this.textarea.setRangeText(replacement, start, end, selectMode);

    if (this.value !== this.textarea.value) {
      this.value = this.textarea.value;
      this.setTextareaHeight();
      this.grChange.emit();
      this.grInput.emit();
    }
  }

  handleChange() {
    this.grChange.emit();
  }

  handleInput() {
    this.value = this.textarea.value;
    this.setTextareaHeight();
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

  handleLabelClick() {
    this.textarea.focus();
  }

  handleSlotChange() {
    this.hasLabelSlot = hasSlot(this.el, 'label');
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
  }

  setTextareaHeight() {
    this.textarea.style.maxHeight = 'auto';
    this.textarea.style.maxHeight = Math.round(this.textarea.scrollHeight * this.maxRows) + 'px';

    if (this.resize === 'auto') {
      this.textarea.style.height = 'auto';
      this.textarea.style.height = this.textarea.scrollHeight + 'px';
    } else {
      this.textarea.style.height = undefined;
    }
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
            'textarea': true,
            [`textarea-${this.size}`]: true,
            'textarea-disabled': this.disabled,
            'textarea-invalid': this.invalid,
            'textarea-focused': this.hasFocus,
            'textarea-empty': this.value?.length === 0,
            [`textarea-resize-${this.resize}`]: true,
          }}
        >
          <textarea
            ref={el => (this.textarea = el)}
            id={this.inputId}
            class="textarea-control"
            name={this.name}
            placeholder={this.placeholder}
            disabled={this.disabled}
            readOnly={this.readonly}
            rows={2}
            maxlength={this.maxlength}
            autoCapitalize={this.autocapitalize}
            autoCorrect={this.autocorrect}
            autoFocus={this.autofocus}
            enterKeyHint={this.enterkeyhint}
            inputMode={this.inputmode}
            value={this.value}
            spellcheck={this.spellcheck}
            aria-labelledby={this.labelId}
            aria-describedby={this.invalid ? this.invalidTextId : this.helpTextId}
            aria-invalid={this.invalid ? 'true' : 'false'}
            aria-required={this.requiredIndicator ? 'true' : 'false'}
            onChange={this.handleChange}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            {...this.inheritedAttributes}
          />
        </div>
      </FormControl>
    );
  }
}
