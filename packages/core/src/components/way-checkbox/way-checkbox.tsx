import { Component, Host, h, Element, State, Prop, Event, EventEmitter, Method } from '@stencil/core';
import { addEventListener, removeEventListener } from '../../utils/utils';

let id = 0;

/**
 * @slot - The checkboxes label.
 */
@Component({
  tag: 'way-checkbox',
  styleUrl: 'way-checkbox.scss',
  shadow: true,
})
export class WayCheckbox {
  private inputId = `checkbox-${++id}`;
  private labelId = `checkbox-label-${id}`;
  private input: HTMLInputElement;
  private checkboxGroup: HTMLWayCheckboxGroupElement | null = null;

  @Element() el: HTMLWayCheckboxElement;

  @State() hasFocus = false;

  /** The checkbox's value attribute. */
  @Prop() value: string;

  /** Set to true to disable the checkbox. */
  @Prop() disabled = false;

  /** Set to true to draw the checkbox in a checked state. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /**
   * The tabindex of the checkbox
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
    const checkboxGroup = (this.checkboxGroup = this.el.closest('way-checkbox-group'));
    if (checkboxGroup) {
      this.updateState();
      addEventListener(checkboxGroup, 'way-change', this.updateState);
    }
  }

   disconnectedCallback() {
    const checkboxGroup = this.checkboxGroup;
    if (checkboxGroup) {
      removeEventListener(checkboxGroup, 'way-change', this.updateState);
      this.checkboxGroup = null;
    }
  }

    /** Sets focus on the checkbox. */
  @Method()
  async setFocus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the checkbox. */
  @Method()
  async removeFocus() {
    this.input.blur();
  }

  private updateState = () => {
    if (this.checkboxGroup) {
      this.checked = this.checkboxGroup.value === this.value;
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
          'checkbox-disabled': this.disabled,
        }}
      >
        <label
          class={{
            'checkbox': true,
            'checkbox-checked': this.checked,
            'checkbox-disabled': this.disabled,
            'checkbox-focused': this.hasFocus,
          }}
          htmlFor={this.inputId}
        >
          <span class='checkbox-control'>
            <span class="checkbox-icon">
              <svg viewBox="0 0 16 16">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                  <g stroke="currentColor" stroke-width="2">
                    <g transform="translate(3.428571, 3.428571)">
                      <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
                      <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </span>

            <input
              ref={el => (this.input = el)}
              id={this.inputId}
              type="checkbox"
              value={this.value}
              checked={this.checked}
              disabled={this.disabled}
              role="checkbox"
              aria-checked={this.checked ? 'true' : 'false'}
              aria-labelledby={this.labelId}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
          </span>

          <span id={this.labelId} class="checkbox-label">
            <slot></slot>
          </span>
        </label>
      </Host>
    );
  }
}
