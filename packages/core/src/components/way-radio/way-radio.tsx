import { Component, Host, h, Element, State, Prop, Watch, Event, EventEmitter, Method } from '@stencil/core';

let id = 0;

@Component({
  tag: 'way-radio',
  styleUrl: 'way-radio.scss',
  shadow: true,
})
export class WayRadio {
  inputId = `radio-${++id}`;
  labelId = `radio-label-${id}`;
  input: HTMLInputElement;

  @Element() el: HTMLWayRadioElement;

  @State() hasFocus = false;

  /** The radio's name attribute. */
  @Prop() name: string;

  /** The radio's value attribute. */
  @Prop() value: string;

  /** Set to true to disable the radio. */
  @Prop() disabled = false;

  /** Set to true to draw the radio in a checked state. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  @Watch('checked')
  handleCheckedChange() {
    if (this.checked) {
      this.getSiblingRadios().map(radio => (radio.checked = false));
    }
    this.input.checked = this.checked;
    this.wayChange.emit();
  }

  /** Emitted when the control loses focus. */
  @Event() wayBlur: EventEmitter;

  /** Emitted when the control's checked state changes. */
  @Event() wayChange: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event() wayFocus: EventEmitter;

  connectedCallback() {
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
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

  getAllRadios() {
    const radioGroup = this.el.closest('way-radio-group');

    // Radios must be part of a radio group
    if (!radioGroup) {
      return [];
    }

    return [...radioGroup.querySelectorAll('way-radio')].filter(
      (radio: HTMLWayRadioElement) => radio.name === this.name,
    ) as HTMLWayRadioElement[];
  }

  getSiblingRadios() {
    return this.getAllRadios().filter(radio => radio !== this.el) as HTMLWayRadioElement[];
  }

  handleClick() {
    this.checked = this.input.checked;
  }

  handleBlur() {
    this.hasFocus = false;
    this.wayBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.wayFocus.emit();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      const radios = this.getAllRadios().filter(radio => !radio.disabled);
      const incr = ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
      let index = radios.indexOf(this.el) + incr;
      if (index < 0) index = radios.length - 1;
      if (index > radios.length - 1) index = 0;

      this.getAllRadios().map(radio => (radio.checked = false));
      radios[index].setFocus();
      radios[index].checked = true;

      event.preventDefault();
    }
  }

  handleMouseDown(event: MouseEvent) {
    // Prevent clicks on the label from briefly blurring the input
    event.preventDefault();
    this.input.focus();
  }

  render() {
    return (
      <Host>
        <label
          class={{
            'radio': true,
            'radio-checked': this.checked,
            'radio-disabled': this.disabled,
            'radio-focused': this.hasFocus,
          }}
          htmlFor={this.inputId}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
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
              name={this.name}
              value={this.value}
              checked={this.checked}
              disabled={this.disabled}
              role="radio"
              aria-checked={this.checked ? 'true' : 'false'}
              aria-labelledby={this.labelId}
              onClick={this.handleClick}
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
