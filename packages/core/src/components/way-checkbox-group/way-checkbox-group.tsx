import { Component, Host, h, Prop, Event, EventEmitter, Watch, Element, Listen } from '@stencil/core';
import { renderHiddenInput } from '../../utils/utils';
import { WayCheckboxGroupChangeEventDetail } from './way-checkbox-group-interface';

let id = 0;

@Component({
  tag: 'way-checkbox-group',
  styleUrl: 'way-checkbox-group.scss',
  shadow: true,
})
export class WayCheckboxGroup {
  private inputId = `checkbox-group-${id++}`;

  @Element() el!: HTMLElement;

  /**
   * If `true`, the checkboxs can be deselected.
   */
  @Prop() allowEmptySelection = false;

  /** The checkbox group label. Required for proper accessibility. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** Hides the fieldset and legend that surrounds the checkbox group. The label will still be read by screen readers. */
  @Prop({ reflect: true }) noFieldset = false;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId;

  /**
   * the value of the checkbox group.
   */
  @Prop({ mutable: true }) value?: any | null;

  @Watch('value')
  valueChanged(value: any | undefined) {
    this.setCheckboxTabindex(value);

    this.wayChange.emit({ value });
  }

  /**
   * Emitted when the value has changed.
   */
  @Event({ eventName: 'way-change' }) wayChange!: EventEmitter<WayCheckboxGroupChangeEventDetail>;

  componentDidLoad() {
    this.setCheckboxTabindex(this.value);
  }

  private setCheckboxTabindex = (value: any | undefined) => {
    const checkboxes = this.getCheckboxes();

    // Get the first checkbox that is not disabled and the checked one
    const first = checkboxes.find(checkbox => !checkbox.disabled);
    const checked = checkboxes.find(checkbox => checkbox.value === value && !checkbox.disabled);

    if (!first && !checked) {
      return;
    }

    // If an enabled checked checkbox exists, set it to be the focusable checkbox
    // otherwise we default to focus the first checkbox
    const focusable = checked || first;

    for (const checkbox of checkboxes) {
      const tabindex = checkbox === focusable ? 0 : -1;
      checkbox.setButtonTabindex(tabindex);
    }
  };

  private getCheckboxes(): HTMLWayCheckboxElement[] {
    return Array.from(this.el.querySelectorAll('way-checkbox'));
  }

  private onClick = (ev: Event) => {
    ev.preventDefault();

    const selectedCheckbox = ev.target && (ev.target as HTMLElement).closest('way-checkbox');
    if (selectedCheckbox) {
      const currentValue = this.value;
      const newValue = selectedCheckbox.value;
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

    // Get all checkboxes inside of the checkbox group and then
    // filter out disabled checkboxes since we need to skip those
    const checkboxes = this.getCheckboxes().filter(checkbox => !checkbox.disabled);

    // Only move the checkbox if the current focus is in the checkbox group
    if (ev.target && checkboxes.includes(ev.target)) {
      const index = checkboxes.findIndex(checkbox => checkbox === ev.target);
      const current = checkboxes[index];

      let next;

      // If hitting arrow down or arrow right, move to the next checkbox
      // If we're on the last checkbox, move to the first checkbox
      if (['ArrowDown', 'ArrowRight'].includes(ev.code)) {
        next = index === checkboxes.length - 1 ? checkboxes[0] : checkboxes[index + 1];

        // Prevent browsers from jumping
        // to the bottom of the screen
        ev.preventDefault();
      }

      // If hitting arrow up or arrow left, move to the previous checkbox
      // If we're on the first checkbox, move to the last checkbox
      if (['ArrowUp', 'ArrowLeft'].includes(ev.code)) {
        next = index === 0 ? checkboxes[checkboxes.length - 1] : checkboxes[index - 1];

        // Prevent browsers from jumping
        // to the bottom of the screen
        ev.preventDefault();
      }

      if (next && checkboxes.includes(next)) {
        next.setFocus(ev);
      }

      // Update the checkbox group value when a user presses the
      // space bar on top of a selected checkbox
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
      <Host onClick={this.onClick} role="checkboxgroup">
        <fieldset
          class={{
            'checkbox-group': true,
            'checkbox-group-no-fieldset': this.noFieldset,
          }}
        >
          <legend class="checkbox-group-label">
            <slot name="label">{this.label}</slot>
          </legend>
          <slot></slot>
        </fieldset>
      </Host>
    );
  }
}
