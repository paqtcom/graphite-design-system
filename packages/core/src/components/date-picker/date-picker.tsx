import { Component, Host, h, Prop } from '@stencil/core';
import { DuetDatePicker } from '@duetds/date-picker/custom-element';
import { DaysOfWeek } from '../../enums';
import { localization } from './date-localization';
import { DateDisabledPredicate, GrDatePickerDirection } from '../../interface';

if (typeof customElements !== 'undefined' && !customElements.get('duet-date-picker')) {
  customElements.define('duet-date-picker', DuetDatePicker);
}

@Component({
  tag: 'gr-date-picker',
  styleUrl: 'date-picker.scss',
  shadow: true,
})
export class DatePicker {
  /**
   * Name of the date picker input.
   */
  @Prop() name: string = 'date';

  /**
   * Makes the date picker input component disabled. This prevents users from being able to
   * interact with the input, and conveys its inactive state to assistive technologies.
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Forces the opening direction of the calendar modal to be always left or right.
   * This setting can be useful when the input is smaller than the opening date picker
   * would be as by default the picker always opens towards right.
   */
  @Prop() direction: GrDatePickerDirection = 'right';

  /**
   * Date value. Must be in IS0-8601 format: YYYY-MM-DD.
   */
  @Prop({ reflect: true, mutable: true }) value: string = '';

  /**
   * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the max property.
   */
  @Prop() min: string = '';

  /**
   * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the min property.
   */
  @Prop() max: string = '';

  /**
   * Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.
   * Default is Monday.
   */
  @Prop() firstDayOfWeek: DaysOfWeek = DaysOfWeek.Monday;

  /**
   * Controls which days are disabled and therefore disallowed.
   * For example, this can be used to disallow selection of weekends.
   */
  @Prop() isDateDisabled: DateDisabledPredicate = () => false;

  render() {
    return (
      <Host>
        <duet-date-picker
          name={this.name}
          disabled={this.disabled}
          direction={this.direction}
          value={this.value}
          min={this.min}
          max={this.max}
          firstDayOfWeek={this.firstDayOfWeek}
          localization={localization}
          isDateDisabled={this.isDateDisabled}
        ></duet-date-picker>
      </Host>
    );
  }
}
