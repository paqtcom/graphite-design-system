import { Component, Host, h } from '@stencil/core';
import { DuetDatePicker } from '@duetds/date-picker/custom-element';

if (typeof customElements !== 'undefined' && !customElements.get('duet-date-picker')) {
  customElements.define('duet-date-picker', DuetDatePicker);
}

@Component({
  tag: 'gr-date-picker',
  styleUrl: 'date-picker.scss',
  shadow: true,
})
export class DatePicker {
  render() {
    return (
      <Host>
        <duet-date-picker></duet-date-picker>
      </Host>
    );
  }
}
