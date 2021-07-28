import { Component, Host, h, Prop, Event, EventEmitter, Watch, Element, Listen, State } from '@stencil/core';
import { hasSlot } from '../../utils/slot';
import { renderHiddenInput } from '../../utils/helpers';
import { WayRadioGroupChangeEventDetail } from './way-radio-group-interface';

let id = 0;

/**
 * @slot - The default slot where radio controls are placed.
 * @slot label - The radio group label. Required for proper accessibility. Alternatively, you can use the label prop.
 * @slot invalid-text - Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop.
 */
@Component({
  tag: 'way-radio-group',
  styleUrl: 'way-radio-group.scss',
  shadow: true,
})
export class WayRadioGroup {
  private inputId = `radio-group-${id++}`;
  private invalidTextId = `radio-group-invalid-text-${id}`;

  @Element() el!: HTMLElement;

  @State() hasInvalidTextSlot = false;

  /** If `true`, the radios can be deselected. */
  @Prop() allowEmptySelection = false;

  /** The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** The radio group's invalid text. Alternatively, you can use the invalid-text slot. */
  @Prop() invalidText = '';

  /** Set to true to indicate this field is invalid. Will display the invalid text instead of the help text */
  @Prop({ reflect: true }) invalid = false;

  /** Hides the fieldset and legend that surrounds the radio group. The label will still be read by screen readers. */
  @Prop({ reflect: true }) noFieldset = false;

  /** The name of the control, which is submitted with the form data. */
  @Prop() name: string = this.inputId;

  /** the value of the radio group. */
  @Prop({ mutable: true }) value?: any | null;

  @Watch('value')
  valueChanged(value: any | undefined) {
    this.setRadioTabindex(value);

    this.wayChange.emit({ value });
  }

  @Watch('invalidText')
  @Watch('label')
  handleLabelChange() {
    this.handleSlotChange();
  }

  /** Emitted when the value has changed. */
  @Event({ eventName: 'way-change' }) wayChange!: EventEmitter<WayRadioGroupChangeEventDetail>;

  componentDidLoad() {
    this.setRadioTabindex(this.value);
  }

  handleSlotChange() {
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
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

  private getRadios(): HTMLWayRadioElement[] {
    return Array.from(this.el.querySelectorAll('way-radio'));
  }

  private onClick = (ev: Event) => {
    ev.preventDefault();

    const selectedRadio = ev.target && (ev.target as HTMLElement).closest('way-radio');
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

        // Prevent browsers from jumping
        // to the bottom of the screen
        ev.preventDefault();
      }

      // If hitting arrow up or arrow left, move to the previous radio
      // If we're on the first radio, move to the last radio
      if (['ArrowUp', 'ArrowLeft'].includes(ev.code)) {
        next = index === 0 ? radios[radios.length - 1] : radios[index - 1];

        // Prevent browsers from jumping
        // to the bottom of the screen
        ev.preventDefault();
      }

      if (next && radios.includes(next)) {
        next.setFocus(ev);
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

  render() {
    renderHiddenInput(this.el, this.name, this.value, false);

    const hasInvalidText = this.invalidText ? true : this.hasInvalidTextSlot;
    const showInvalidText = this.invalid ? true : false;

    return (
      <Host onClick={this.onClick} role="radiogroup" aria-invalid={this.invalid}>
        <fieldset
          class={{
            'radio-group': true,
            'radio-group-no-fieldset': this.noFieldset,
            'radio-group-invalid': this.invalid,
            'radio-group-has-invalid-text': hasInvalidText,
          }}
        >
          <legend class="radio-group-label">
            <slot name="label">{this.label}</slot>
          </legend>
          <slot></slot>
          {showInvalidText && (
            <div id={this.invalidTextId} class="invalid-text" aria-hidden={hasInvalidText ? 'false' : 'true'}>
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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
