import { Component, h, Prop, Host, Event, Watch, State, EventEmitter } from '@stencil/core';

let id = 0;

/**
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot icon-only - Should be used on an icon in a checkbox that has no text.
 * @slot start - Content is placed to the left of the checkbox text (will be to the right when we support right-to-left direction)
 * @slot end - Content is placed to the right of the checkbox text (will be to the left when we support right-to-left direction)
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

  @State() hasFocus = false;

  /** The checkbox's name attribute. */
  @Prop() name: string;

  /** The checkbox's value attribute. */
  @Prop() value: string;

  /** Disables the checkbox. */
  @Prop({ reflect: true }) disabled = false;

  /** Makes the checkbox a required field. */
  @Prop({ reflect: true }) required = false;

  /** Draws the checkbox in a checked state. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** Draws the checkbox in an indeterminate state. */
  @Prop({ mutable: true, reflect: true }) indeterminate = false;

  /**
   * The checkbox variants.
   */
  @Prop({ reflect: true }) variant: 'circle' | 'square' = 'square';

  /**
   * The checkbox icon size.
   */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Emitted when the checkbox loses blur.
   */
  @Event() wayBlur!: EventEmitter<void>;

  /**
   * Emitted when the checkbox changes.
   */
  @Event() wayChange!: EventEmitter<void>;

  @Watch('checked')
  @Watch('indeterminate')
  handleCheckedChange() {
    this.input.checked = this.checked;
    this.input.indeterminate = this.indeterminate;
    this.wayChange.emit();
  }

  connectedCallback() {
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidLoad() {
    this.input.indeterminate = this.indeterminate;
  }

  handleClick() {
    this.checked = this.input.checked;
    this.indeterminate = this.input.indeterminate;
  }

  handleBlur() {
    this.hasFocus = false;
    this.wayBlur.emit();
  }

  render() {
    return (
      <Host>
        <label
          part="base"
          class={{
            checkbox: true,

            // States
            'checkbox--checked': this.checked,
            'checkbox--disabled': this.disabled,
            'checkbox--indeterminate': this.indeterminate
          }}
          htmlFor={this.inputId}
        >
          <span part="control" class={{
            checkbox__control: true,

            // Variant
            'checkbox__control-circle': this.variant === 'circle',
          }}>
            {this.checked && (
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
            )}

            {!this.checked && this.indeterminate && (
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
            )}

            <input
              ref={el => (this.input = el)}
              id={this.inputId}
              type="checkbox"
              name={this.name}
              value={this.value}
              checked={this.checked}
              disabled={this.disabled}
              required={this.required}
              role="checkbox"
              aria-checked={this.checked}
              aria-labelledby={this.labelId}
              onClick={this.handleClick}
              onBlur={this.handleBlur}
            />
          </span>

          <span part="label" id={this.labelId} class="checkbox__label">
            <slot></slot>
          </span>
        </label>
      </Host>
    );
  }
}
