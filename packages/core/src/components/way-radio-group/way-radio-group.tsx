import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'way-radio-group',
  styleUrl: 'way-radio-group.scss',
  shadow: true,
})
export class WayRadioGroup {
  /** The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** Hides the fieldset and legend that surrounds the radio group. The label will still be read by screen readers. */
  @Prop({ reflect: true }) noFieldset = false;

  render() {
    return (
      <Host>
        <fieldset
          part="base"
          class={{
            'radio-group': true,
            'radio-group-no-fieldset': this.noFieldset,
          }}
          role="radiogroup"
        >
          <legend part="label" class="radio-group-label">
            <slot name="label">{this.label}</slot>
          </legend>
          <slot></slot>
        </fieldset>
      </Host>
    );
  }
}
