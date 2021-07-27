import { Component, h, Element, Prop, Watch, Event, EventEmitter, State } from '@stencil/core';
import FormControl from '../../functional-components/form-control/form-control';
import { hasSlot } from '../../utils/slot';
import { renderHiddenInput } from '../../utils/utils';

let id = 0;

/**
 * @slot label - The input's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the input.
 * @slot invalid-text - Invalid text that describes how to use the input. Alternatively, you can use the invalid-text prop.
 */
@Component({
  tag: 'way-input',
  styleUrl: 'way-input.scss',
  shadow: true,
})
export class WayInput {
  input: HTMLInputElement;
  inputId = `input-${++id}`;
  labelId = `input-label-${id}`;
  helpTextId = `input-help-text-${id}`;
  invalidTextId = `input-invalid-text-${id}`;

  @Element() el!: HTMLWayInputElement;

  @State() hasFocus = false;
  @State() hasHelpTextSlot = false;
  @State() hasInvalidTextSlot = false;
  @State() hasLabelSlot = false;

  /** The input's value attribute. */
  @Prop({ mutable: true, reflect: true }) value: string = '';

  /** Specifies what type of input to use. */
  @Prop({ reflect: true }) type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' = 'text';

  /** Set to true to draw a pill-style input with rounded edges. */
  @Prop() pill = false;

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

  /** The input's invalid text. Alternatively, you can use the invalid-text slot. */
  @Prop() invalidText = '';

  /** Set to true to indicate this field is invalid. Will display the invalid text instead of the help text */
  @Prop({ reflect: true }) invalid = false;

  /** The input's inputmode attribute. */
  @Prop() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  @Watch('helpText')
  @Watch('invalidText')
  @Watch('label')
  handleLabelChange() {
    this.handleSlotChange();
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
    this.input.focus();
  }

  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasLabelSlot = hasSlot(this.el, 'label');
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
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
        invalidTextId={this.invalidTextId}
        invalidText={this.invalidText}
        invalid={this.invalid}
        hasInvalidTextSlot={this.hasInvalidTextSlot}
        size={this.size}
        onLabelClick={this.handleLabelClick}
      >
        <input
          ref={el => (this.input = el)}
          id={this.name}
          name={this.name}
          type={this.type}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          inputMode={this.inputmode}
          aria-labelledby={this.labelId}
          aria-describedby={this.invalid ? this.invalidTextId : this.helpTextId}
          aria-invalid={this.invalid ? 'true' : 'false'}
          onChange={this.handleChange}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          class={{
            'input': true,
            'input-pill': this.pill,
            'input-disabled': this.disabled,
            'input-invalid': this.invalid,
            'input-focused': this.hasFocus,
            [`input-${this.size}`]: true,
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
