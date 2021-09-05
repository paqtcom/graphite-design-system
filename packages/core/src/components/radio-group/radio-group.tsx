import { Component, h, Prop, Event, EventEmitter, Watch, Element, Listen, State, Host } from '@stencil/core';
import { renderHiddenInput } from '../../utils/helpers';
import { hasSlot } from '../../utils/slot';
import { RadioGroupChangeEventDetail } from './radio-group-interface';

let id = 0;

/**
 * @slot - The default slot where radio controls are placed.
 * @slot label - The radio group label. Required for proper accessibility. Alternatively, you can use the label prop.
 * @slot invalid-text - Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop.
 */
@Component({
  tag: 'gr-radio-group',
  styleUrl: 'radio-group.scss',
  shadow: true,
})
export class RadioGroup {
  private inputId = `radio-group-${id++}`;
  private invalidTextId = `radio-group-invalid-text-${id++}`;

  @Element() el!: HTMLElement;

  @State() hasLabelSlot = false;
  @State() hasInvalidTextSlot = false;

  /** If `true`, the radios can be deselected. */
  @Prop() allowEmptySelection = false;

  /** The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** Set to true to display a required indicator, adds an asterisk to label */
  @Prop() requiredIndicator = false;

  /** The radio group's invalid text. Alternatively, you can use the invalid-text slot. */
  @Prop() invalidText = '';

  /** Set to true to indicate this field is invalid. Will display the invalid text. */
  @Prop({ reflect: true }) invalid = false;

  /** Render the radios horizontal instead of vertical */
  @Prop({ reflect: true }) horizontal = false;

  /** The name of the control, which is submitted with the form data. */
  @Prop() name: string = this.inputId;

  /** the value of the radio group. */
  @Prop({ mutable: true }) value?: any | null;

  @Watch('value')
  valueChanged(value: any | undefined) {
    this.setRadioTabindex(value);

    this.grChange.emit({ value });
  }

  @Watch('label')
  @Watch('invalidText')
  handleLabelChange() {
    this.handleSlotChange();
  }

  /** Emitted when the value has changed. */
  @Event({ eventName: 'gr-change' }) grChange!: EventEmitter<RadioGroupChangeEventDetail>;

  connectedCallback() {
    this.handleSlotChange = this.handleSlotChange.bind(this);

    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }

  componentWillLoad() {
    this.handleSlotChange();
  }

  componentDidLoad() {
    this.setRadioTabindex(this.value);
  }

  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }

  private setRadioTabindex = (value: any | undefined) => {
    const radios = this.getRadios();

    // Get the first radio that is not disabled and the checked one
    const first = radios.find(radio => !radio.disabled);
    const checked = radios.find(radio => radio.value === value && !radio.disabled);

    if (!first && !checked) {
      return;
    }

    // If an enabled checked radio exists, set it to be the focusable radio
    // otherwise we default to focus the first radio
    const focusable = checked || first;

    for (const radio of radios) {
      const tabindex = radio === focusable ? 0 : -1;
      radio.setButtonTabindex(tabindex);
    }
  };

  private getRadios(): HTMLGrRadioElement[] {
    return Array.from(this.el.querySelectorAll('gr-radio'));
  }

  private onClick = (ev: Event) => {
    ev.preventDefault();

    const selectedRadio = ev.target && (ev.target as HTMLElement).closest('gr-radio');
    if (selectedRadio) {
      const currentValue = this.value;
      const newValue = selectedRadio.value;
      if (newValue !== currentValue) {
        this.value = newValue;
      } else if (this.allowEmptySelection) {
        this.value = undefined;
      }
    }
  };

  @Listen('keydown', { target: 'document' })
  onKeydown(ev: any) {
    if (ev.target && !this.el.contains(ev.target)) {
      return;
    }

    // Get all radios inside of the radio group and then
    // filter out disabled radios since we need to skip those
    const radios = this.getRadios().filter(radio => !radio.disabled);

    // Only move the radio if the current focus is in the radio group
    if (ev.target && radios.includes(ev.target)) {
      const index = radios.findIndex(radio => radio === ev.target);
      const current = radios[index];

      let next;

      // If hitting arrow down or arrow right, move to the next radio
      // If we're on the last radio, move to the first radio
      if (['ArrowDown', 'ArrowRight'].includes(ev.code)) {
        next = index === radios.length - 1 ? radios[0] : radios[index + 1];
      }

      // If hitting arrow up or arrow left, move to the previous radio
      // If we're on the first radio, move to the last radio
      if (['ArrowUp', 'ArrowLeft'].includes(ev.code)) {
        next = index === 0 ? radios[radios.length - 1] : radios[index - 1];
      }

      if (next && radios.includes(next)) {
        next.setFocus(ev);
        this.value = next.value;
      }

      // Update the radio group value when a user presses the
      // space bar on top of a selected radio
      if (['Space'].includes(ev.code)) {
        this.value = this.allowEmptySelection && this.value !== undefined ? undefined : current.value;

        // Prevent browsers from jumping
        // to the bottom of the screen
        ev.preventDefault();
      }
    }
  }

  handleSlotChange() {
    this.hasLabelSlot = hasSlot(this.el, 'label');
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
  }

  render() {
    renderHiddenInput(this.el, this.name, this.value, false);

    const hasLabel = this.label ? true : this.hasLabelSlot;
    const hasInvalidText = this.invalidText ? true : this.hasInvalidTextSlot;
    const showInvalidText = this.invalid ? true : false;

    return (
      <Host onClick={this.onClick}>
        <fieldset
          class={{
            'radio-group': true,
            'radio-group-horizontal': this.horizontal,
            'radio-group-invalid': this.invalid,
            'radio-group-has-label': hasLabel,
            'radio-group-has-invalid-text': hasInvalidText,
          }}
          role="radiogroup"
          aria-invalid={this.invalid}
          aria-required={this.requiredIndicator ? 'true' : 'false'}
          aria-describedby={this.invalid ? this.invalidTextId : ''}
        >
          <legend class="radio-group-label" aria-hidden={hasLabel ? 'false' : 'true'}>
            <slot name="label">{this.label}</slot>
            {this.requiredIndicator && (
              <span class="asterisk">
                <svg role="img" aria-hidden="true" viewBox="0 0 1200 1200">
                  <path
                    fill="currentColor"
                    d="M489.838 29.354v443.603L68.032 335.894 0 545.285l421.829 137.086-260.743 358.876 178.219 129.398L600.048 811.84l260.673 358.806 178.146-129.398-260.766-358.783L1200 545.379l-68.032-209.403-421.899 137.07V29.443H489.84l-.002-.089z"
                  />
                </svg>
              </span>
            )}
          </legend>
          <slot></slot>
          {showInvalidText && (
            <div
              id={this.invalidTextId}
              class="radio-group-invalid-text"
              aria-hidden={hasInvalidText ? 'false' : 'true'}
            >
              <div class="icon">
                <svg role="img" aria-hidden="true" viewBox="0 0 512 512">
                  <title>Alert Circle</title>
                  <path
                    d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm0,319.91a20,20,0,1,1,20-20A20,20,0,0,1,256,367.91Zm21.72-201.15-5.74,122a16,16,0,0,1-32,0l-5.74-121.94v-.05a21.74,21.74,0,1,1,43.44,0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div class="text">
                <slot name="invalid-text">{this.invalidText}</slot>
              </div>
            </div>
          )}
        </fieldset>
      </Host>
    );
  }
}
