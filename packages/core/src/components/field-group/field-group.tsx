import { Component, Host, h, Prop, Element } from '@stencil/core';

/**
 * @slot - The default slot where fields are placed.
 * @slot label - The field group label. Required for proper accessibility. Alternatively, you can use the label prop.
 */
@Component({
  tag: 'gr-field-group',
  styleUrl: 'field-group.scss',
  shadow: true,
})
export class FieldGroup {
  @Element() el!: HTMLElement;

  /** The field group label. Required for proper accessibility. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** Hides the fieldset and legend that surrounds the field group. The label will still be read by screen readers. */
  @Prop({ reflect: true }) noFieldset = false;

  /** Render the fields horizontal instead of vertical */
  @Prop({ reflect: true }) horizontal = false;

  render() {
    return (
      <Host>
        <fieldset
          class={{
            'field-group': true,
            'field-group-no-fieldset': this.noFieldset,
            'field-group-horizontal': this.horizontal,
          }}
        >
          <legend class="field-group-label">
            <slot name="label">{this.label}</slot>
          </legend>
          <slot></slot>
        </fieldset>
      </Host>
    );
  }
}
