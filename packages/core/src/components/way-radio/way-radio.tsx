import { Component, Host, h, Element, State, Prop, Event, EventEmitter, Method } from '@stencil/core';
import { addEventListener, removeEventListener } from '../../utils/utils';

let id = 0;

/**
 * @slot - The radio's label.
 */
@Component({
  tag: 'way-radio',
  styleUrl: 'way-radio.scss',
  shadow: true,
})
export class WayRadio {
  private inputId = `radio-${++id}`;
  private labelId = `radio-label-${id}`;
  private input: HTMLInputElement;
  private radioGroup: HTMLWayRadioGroupElement | null = null;

  @Element() el: HTMLWayRadioElement;

  @State() hasFocus = false;

  /** The radio's value attribute. */
  @Prop() value: string;

  /** Set to true to disable the radio. */
  @Prop() disabled = false;

  /** Set to true to draw the radio in a checked state. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /**
   * The tabindex of the radio button.
   * @internal
   */
  @State() buttonTabindex = -1;

  /** Emitted when the control loses focus. */
  @Event({ eventName: 'way-blur' }) wayBlur: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event({ eventName: 'way-focus' }) wayFocus: EventEmitter;

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
    const radioGroup = (this.radioGroup = this.el.closest('way-radio-group'));
    if (radioGroup) {
      this.updateState();
      addEventListener(radioGroup, 'way-change', this.updateState);

      // Needed for the Vue wrappers
      addEventListener(radioGroup, 'v-way-change', this.updateState);
    }
  }

  disconnectedCallback() {
    const radioGroup = this.radioGroup;
    if (radioGroup) {
      removeEventListener(radioGroup, 'way-change', this.updateState);

      // Needed for the Vue wrappers
      removeEventListener(radioGroup, 'v-way-change', this.updateState);
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
    this.wayBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.wayFocus.emit();
  }

  render() {
    return (
      <Host
        class={{
          'radio-disabled': this.disabled,
        }}
      >
        <label
          class={{
            'radio': true,
            'radio-checked': this.checked,
            'radio-disabled': this.disabled,
            'radio-focused': this.hasFocus,
          }}
          htmlFor={this.inputId}
        >
          <span class="radio-control">
            <span class="radio-icon">
              <svg viewBox="0 0 16 16">
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
              role="radio"
              aria-checked={this.checked ? 'true' : 'false'}
              aria-labelledby={this.labelId}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
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
