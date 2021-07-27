import { Component, h, Prop, Element, Event, EventEmitter, State, Watch, Method } from '@stencil/core';
import FormControl from '../../functional-components/form-control/form-control';
import { hasSlot } from '../../utils/slot';

let id = 0;

/**
 * @slot label - The textarea's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the input.
 */
@Component({
  tag: 'way-textarea',
  styleUrl: 'way-textarea.scss',
  shadow: true,
})
export class WayTextarea {
  inputId = `textarea-${++id}`;
  labelId = `textarea-label-${id}`;
  helpTextId = `textarea-help-text-${id}`;
  resizeObserver: ResizeObserver;
  textarea: HTMLTextAreaElement;

  @Element() el!: HTMLWayTextareaElement;

  @State() hasFocus = false;
  @State() hasHelpTextSlot = false;
  @State() hasLabelSlot = false;

  /** The textarea's size. */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The textarea's name attribute. */
  @Prop({ reflect: true }) name = '';

  /** The textarea's value attribute. */
  @Prop({ mutable: true, reflect: true }) value = '';

  /** The textarea's label. Alternatively, you can use the label slot. */
  @Prop() label: string | undefined;

  /** The textarea's help text. Alternatively, you can use the help-text slot. */
  @Prop() helpText = '';

  /** The textarea's placeholder text. */
  @Prop() placeholder: string;

  /** The number of rows to display by default. */
  @Prop() rows = 4;

  /** Controls how the textarea can be resized. */
  @Prop() resize: 'none' | 'vertical' | 'auto' = 'vertical';

  /** Set to true to disable the textarea. */
  @Prop({ reflect: true }) disabled = false;

  /** Set to true for a readonly textarea. */
  @Prop({ reflect: true }) readonly = false;

  /** Specifies how many characters are allowed. */
  @Prop() maxlength: number;

  /** The textarea's inputmode attribute. */
  @Prop() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** Emitted when the textarea's value changes. */
  @Event({ eventName: 'way-change' }) wayChange: EventEmitter<void>;

  /** Emitted when the textarea receives input. */
  @Event({ eventName: 'way-input' }) wayInput: EventEmitter<void>;

  /** Emitted when the textarea has focus. */
  @Event({ eventName: 'way-focus' }) wayFocus!: EventEmitter<void>;

  /** Emitted when the textarea loses focus. */
  @Event({ eventName: 'way-blur' }) wayBlur!: EventEmitter<void>;

  @Watch('helpText')
  @Watch('label')
  handleLabelChange() {
    this.handleSlotChange();
  }

  @Watch('rows')
  handleRowsChange() {
    this.setTextareaHeight();
  }

  connectedCallback() {
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);

    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
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
      this.wayChange.emit();
      this.wayInput.emit();
    }
  }

  handleChange() {
    this.wayChange.emit();
  }

  handleInput() {
    this.value = this.textarea.value;
    this.setTextareaHeight();
    this.wayInput.emit();
  }

  handleBlur() {
    this.hasFocus = false;
    this.wayBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.wayFocus.emit();
  }

  handleSlotChange() {
    this.hasLabelSlot = hasSlot(this.el, 'label');
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
  }

  setTextareaHeight() {
    if (this.resize === 'auto') {
      this.textarea.style.height = 'auto';
      this.textarea.style.height = this.textarea.scrollHeight + 'px';
    } else {
      this.textarea.style.height = undefined;
    }
  }

  render() {
    return (
      <FormControl
        inputId={this.inputId}
        label={this.label}
        labelId={this.labelId}
        hasLabelSlot={this.hasLabelSlot}
        helpTextId={this.helpTextId}
        helpText={this.helpText}
        hasHelpTextSlot={this.hasHelpTextSlot}
        size={this.size}
      >
        <div
          class={{
            'textarea': true,
            [`textarea-${this.size}`]: true,
            'textarea-disabled': this.disabled,
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
            rows={this.rows}
            maxlength={this.maxlength}
            value={this.value}
            inputMode={this.inputmode}
            aria-labelledby={this.labelId}
            onChange={this.handleChange}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>
      </FormControl>
    );
  }
}
