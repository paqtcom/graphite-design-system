import { Component, Host, h, Element, State, Prop, Event, EventEmitter, Method } from '@stencil/core';
import { addEventListener, inheritAttributes, removeEventListener } from '../../utils/helpers';

let id = 0;

/**
 * @slot - The radio's label.
 */
@Component({
  tag: 'gr-radio',
  styleUrl: 'radio.scss',
  shadow: true,
})
export class Radio {
  private inputId = `radio-${++id}`;
  private labelId = `radio-label-${id}`;
  private input: HTMLInputElement;
  private radioGroup: HTMLGrRadioGroupElement | null = null;
  private inheritedAttributes: { [k: string]: any } = {};

  @Element() el: HTMLGrRadioElement;

  @State() hasFocus = false;

  /** The radio's value attribute. */
  @Prop({ mutable: true, reflect: true }) value: string;

  /** Set to true to disable the radio. */
  @Prop() disabled = false;

  /** Set to true to draw the radio in a checked state. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** The radio's alignment attribute. */
  @Prop({ reflect: true }) alignment: 'top' | 'center' | 'bottom' = 'center';

  /**
   * The tabindex of the radio button.
   * @internal
   */
  @State() buttonTabindex = -1;

  /** Emitted when the control loses focus. */
  @Event({ eventName: 'gr-blur' }) grBlur: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event({ eventName: 'gr-focus' }) grFocus: EventEmitter;

  /** @internal */
  @Method()
  async setButtonTabindex(value: number) {
    this.buttonTabindex = value;
  }

  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

    if (this.value === undefined) {
      this.value = this.inputId;
    }
    const radioGroup = (this.radioGroup = this.el.closest('gr-radio-group'));
    if (radioGroup) {
      this.updateState();
      addEventListener(radioGroup, 'gr-change', this.updateState);
    }
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
  }

  disconnectedCallback() {
    const radioGroup = this.radioGroup;
    if (radioGroup) {
      removeEventListener(radioGroup, 'gr-change', this.updateState);

      // Needed for the Vue wrappers
      removeEventListener(radioGroup, 'v-gr-change', this.updateState);
      this.radioGroup = null;
    }
  }

  /** Sets focus on the radio. */
  @Method()
  async setFocus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the radio. */
  @Method()
  async removeFocus() {
    this.input.blur();
  }

  private updateState = () => {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this.value;
    }
  };

  handleBlur() {
    this.hasFocus = false;
    this.grBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.grFocus.emit();
  }

  render() {
    const ariaLabelAttributes = this.inheritedAttributes['aria-label']
      ? { 'aria-label': this.inheritedAttributes['aria-label'] }
      : { 'aria-labelledby': this.labelId };

    return (
      <Host
        class={{
          'radio-disabled': this.disabled,
        }}
        tabindex={this.buttonTabindex}
        role="radio"
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        aria-checked={`${this.checked}`}
        aria-hidden={this.disabled ? 'true' : null}
        {...ariaLabelAttributes}
      >
        <label
          class={{
            'radio': true,
            'radio-checked': this.checked,
            'radio-disabled': this.disabled,
            'radio-focused': this.hasFocus,
            [`radio-${this.alignment}`]: true,
          }}
          htmlFor={this.inputId}
        >
          <span class="radio-control">
            <span class="radio-icon">
              <svg role="img" aria-hidden="true" viewBox="0 0 16 16">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g fill="currentColor">
                    <circle cx="8" cy="8" r="3.42857143"></circle>
                  </g>
                </g>
              </svg>
            </span>

            <input
              ref={el => (this.input = el)}
              id={this.inputId}
              type="radio"
              value={this.value}
              checked={this.checked}
              disabled={this.disabled}
              tabindex="-1"
            />
          </span>

          <span id={this.labelId} class="radio-label">
            <slot />
          </span>
        </label>
      </Host>
    );
  }
}
