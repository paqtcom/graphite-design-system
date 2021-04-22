import { Component, Host, h, Prop, Element, Event, State, Watch, EventEmitter } from '@stencil/core';

let id = 0;

/**
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot icon-only - Should be used on an icon in a checkbox that has no text.
 * @slot start - Content is placed to the left of the checkbox text (will be to the right when we support right-to-left direction)
 * @slot end - Content is placed to the right of the checkbox text (will be to the left when we support right-to-left direction)
 */
@Component({
  tag: 'gra-checkbox',
  styleUrl: 'gra-checkbox.scss',
  shadow: true,
})
export class GraCheckbox {
  private inputId = `checkbox-${++id}`;
  private labelId = `checkbox-label-${id}`;

  @State() private hasFocus = false;

  @Element() input: HTMLElement;

  /** The checkbox's name attribute. */
  @Prop() name: string;

  /** The checkbox's value attribute. */
  @Prop() value: string;

  /**
   * The input's label. Alternatively, you can use the label slot.
   */
  @Prop() label: string | undefined;

  /** Disables the checkbox. */
  @Prop({ reflect: true }) disabled = false;

  /** Makes the checkbox a required field. */
  @Prop({ reflect: true }) required = false;

  /** Draws the checkbox in a checked state. */
  @Prop({ reflect: true }) checked = false;

  /**
   * Emitted when the checkbox has focus.
   */
  @Event() graFocus!: EventEmitter<void>;

  /**
   * Emitted when the checkbox loses focus.
   */
  @Event() graBlur!: EventEmitter<void>;

  /**
   * Emitted when the checkbox loses focus.
   */
  @Event() graChange!: EventEmitter<void>;

  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }

  /** Sets focus on the checkbox. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the checkbox. */
  blur() {
    this.input.blur();
  }

    handleClick() {
    this.checked = !this.checked;
  }

  handleBlur() {
    this.hasFocus = false;
    this.graBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.graFocus.emit();
  }

  handleLabelMouseDown(event: MouseEvent) {
    // Prevent clicks on the label from briefly blurring the input
    event.preventDefault();
    this.input.focus();
  }

  @Watch('checked')
  handleStateChange() {
    // this.input.checked = this.checked;
    this.graChange.emit();
  }

  render() {
    <Host>
      <label
        part="base"
        class={{
          checkbox: true,

          // States
          'checkbox--checked': this.checked,
          'checkbox--disabled': this.disabled,
          'checkbox--focused': this.hasFocus,
        }}
        htmlFor={this.inputId}
        onClick={this.handleLabelMouseDown}
      >
        <span part="control" class="checkbox__control">
          {this.checked ? (
            <span part="checked-icon" class="checkbox__icon">
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
          ) : '' }
          {!this.checked ? (
            <span part="indeterminate-icon" class="checkbox__icon">
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
          ) : '' }

          <input
            id={this.inputId}
            type="checkbox"
            name={this.name}
            value={this.value}
            checked={this.checked ? true : null}
            disabled={this.disabled ? true : null}
            required={this.required ? true : null}
            role="checkbox"
            aria-checked={this.checked ? 'true' : 'false'}
            aria-labelledby={this.labelId}
            onClick={this.handleClick}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
        </span>
        <span part="label" id={this.labelId} class="checkbox__label">
          <slot></slot>
        </span>
      </label>
    </Host>
  }
}