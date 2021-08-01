import { Component, Host, h, Prop, Event, EventEmitter, Watch, Element, Listen } from '@stencil/core';
import { renderHiddenInput } from '../../utils/helpers';
import { RadioGroupChangeEventDetail } from './radio-group-interface';

let id = 0;

/**
 * @slot - The default slot where radio controls are placed.
 * @slot label - The radio group label. Required for proper accessibility. Alternatively, you can use the label prop.
 */
@Component({
  tag: 'gr-radio-group',
  styleUrl: 'radio-group.scss',
  shadow: true,
})
export class RadioGroup {
  private inputId = `radio-group-${id++}`;

  @Element() el!: HTMLElement;

  /** If `true`, the radios can be deselected. */
  @Prop() allowEmptySelection = false;

  /** The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** Set to true to indicate this field is invalid. */
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

    this.grChange.emit({ value });
  }

  /** Emitted when the value has changed. */
  @Event({ eventName: 'gr-change' }) grChange!: EventEmitter<RadioGroupChangeEventDetail>;

  componentDidLoad() {
    this.setRadioTabindex(this.value);
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

    return (
      <Host onClick={this.onClick} role="radiogroup" aria-invalid={this.invalid}>
        <fieldset
          class={{
            'radio-group': true,
            'radio-group-no-fieldset': this.noFieldset,
            'radio-group-invalid': this.invalid,
          }}
        >
          <legend class="radio-group-label">
            <slot name="label">{this.label}</slot>
          </legend>
          <slot></slot>
        </fieldset>
      </Host>
    );
  }
}
