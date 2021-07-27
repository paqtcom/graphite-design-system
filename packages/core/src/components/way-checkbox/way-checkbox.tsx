import { Component, Host, h, Element, State, Prop, Event, EventEmitter, Method, Watch } from '@stencil/core';
import { renderHiddenInput } from '../../utils/helpers';

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

  @Element() el: HTMLWayCheckboxElement;

  @State() hasFocus = false;

  /**
   * The checkbox's value attribute.
   */
  @Prop() value: string;

  /**
   * Set to true to disable the checkbox.
   */
  @Prop() disabled = false;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId;

  /** Set to true to draw the checkbox in a checked state. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** Set to true to draw the checkbox in an indeterminate state. */
  @Prop({ mutable: true, reflect: true }) indeterminate = false;

  /** Emitted when the control loses focus. */
  @Event({ eventName: 'way-blur' }) wayBlur: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event({ eventName: 'way-focus' }) wayFocus: EventEmitter;

  /** Emitted when the control's checked state changes. */
  @Event({ eventName: 'way-change' }) wayChange: EventEmitter;

  @Watch('checked')
  @Watch('indeterminate')
  handleCheckedChange() {
    this.input.checked = this.checked;
    this.input.indeterminate = this.indeterminate;
    this.wayChange.emit();
  }

  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  componentDidLoad() {
    this.input.indeterminate = this.indeterminate;
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

  handleClick() {
    this.checked = this.input.checked;
    this.indeterminate = false;
  }

  handleBlur() {
    this.hasFocus = false;
    this.wayBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.wayFocus.emit();
  }

  handleMouseDown(event: MouseEvent) {
    // Prevent clicks on the label from briefly blurring the input
    event.preventDefault();
    this.input.focus();
  }

  render() {
    renderHiddenInput(this.el, this.name, this.checked ? this.value : '', this.disabled);

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
            'checkbox-indeterminate': this.indeterminate,
          }}
          htmlFor={this.inputId}
          onMouseDown={this.handleMouseDown}
        >
          <span class="checkbox-control">
            {this.checked && (
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
            )}

            {!this.checked && this.indeterminate && (
              <span class="checkbox-icon">
                <svg viewBox="0 0 16 16">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                    <g stroke="currentColor" stroke-width="2">
                      <g transform="translate(2.285714, 6.857143)">
                        <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            )}

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
              onClick={this.handleClick}
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
