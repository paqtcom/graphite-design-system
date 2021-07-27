import { Component, h, Element, Prop, Watch, Event, EventEmitter, Method, State } from '@stencil/core';
import FormControl from '../../functional-components/form-control/form-control';
import { hasSlot } from '../../utils/slot';
import { renderHiddenInput } from '../../utils/utils';

let id = 0;

/**
 * @slot label - The select's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the select.
 */
@Component({
  tag: 'way-input',
  styleUrl: 'way-input.scss',
  shadow: true,
})
export class WayInput {
  box: HTMLElement;
  input: HTMLInputElement;
  inputId = `input-${++id}`;
  labelId = `input-label-${id}`;
  helpTextId = `input-help-text-${id}`;

  @Element() el!: HTMLWayInputElement;

  @State() hasFocus = false;
  @State() hasHelpTextSlot = false;
  @State() hasLabelSlot = false;
  @State() displayLabel = '';

  /** The input's value attribute. */
  @Prop({ mutable: true, reflect: true }) value: string = '';

  /**
   * Specifies what type of input to use.
   */
  @Prop({ reflect: true }) type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' = 'text';

  /** Set to true to disable the input control. */
  @Prop() disabled = false;

  /** The input's name. */
  @Prop({ reflect: true }) name = '';

  /** The input's placeholder text. */
  @Prop() placeholder = '';

  /**
   * The input's size.
   */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The inputs's label. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** The input's help text. Alternatively, you can use the help-text slot. */
  @Prop() helpText = '';

  /** The input's required attribute. */
  @Prop() required = false;

  /**
   * This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
   * and `required`.
   */
  @Prop({ mutable: true }) invalid = false;

  /** The input's inputmode attribute. */
  @Prop() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  @Watch('helpText')
  @Watch('label')
  handleLabelChange() {
    this.handleSlotChange();
  }

  @Watch('value')
  handleValueChange() {
    // In rare cases, the watcher may be called before render so we need to make sure the input exists
    this.invalid = this.input ? !this.input.checkValidity() : false;
  }

  /** Emitted when the control's value changes. */
  @Event({ eventName: 'way-change' }) wayChange: EventEmitter<void>;

  /** Emitted when the control gains focus. */
  @Event({ eventName: 'way-focus' }) wayFocus: EventEmitter<void>;

  /** Emitted when the control loses focus. */
  @Event({ eventName: 'way-blur' }) wayBlur: EventEmitter<void>;

  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);

    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }

  componentWillLoad() {
    this.handleSlotChange();
  }

  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  @Method()
  async reportValidity() {
    return this.input.reportValidity();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  @Method()
  async setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  handleChange() {
    this.value = this.input.value;
    this.wayChange.emit();
  }

  handleInput() {
    this.value = this.input.value;
    this.wayChange.emit();
  }

  handleBlur() {
    this.hasFocus = false;
    this.wayBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.wayFocus.emit();
  }

  handleLabelClick() {
    this.box.focus();
  }

  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasLabelSlot = hasSlot(this.el, 'label');
  }

  render() {
    renderHiddenInput(this.el, this.name, parseValue(this.value), this.disabled);

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
        onLabelClick={this.handleLabelClick}
      >
        <div class="input-label">{this.displayLabel}</div>

        <input
          ref={el => (this.input = el)}
          id={this.name}
          name={this.name}
          type={this.type}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          required={this.required}
          inputMode={this.inputmode}
          aria-labelledby={this.labelId}
          aria-describedby={this.helpTextId}
          aria-invalid={this.invalid ? 'true' : 'false'}
          onChange={this.handleChange}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          class={{
            'input': true,

            'input-placeholder-visible': this.displayLabel === '',

            // States
            'input-disabled': this.disabled,

            // Sizes
            'input-small': this.size === 'small',
            'input-large': this.size === 'large',
          }}
        />
      </FormControl>
    );
  }
}

const parseValue = (value: any) => {
  if (value == null) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.join(',');
  }

  return value.toString();
};
