import { Component, h, Prop, Element, State, Watch } from '@stencil/core';
import { hasSlot } from '../../utils/slot';

/**
 * @slot - The default slot where fields are placed.
 * @slot label - The field group label. Recommended for proper accessibility. Alternatively, you can use the label prop.
 */
@Component({
  tag: 'gr-field-group',
  styleUrl: 'field-group.scss',
  shadow: true,
})
export class FieldGroup {
  @Element() el!: HTMLElement;

  @State() hasLabelSlot = false;

  /** The field group label. Recommended for proper accessibility. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** Render the fields horizontal instead of vertical */
  @Prop({ reflect: true }) horizontal = false;

  @Watch('label')
  handleLabelChange() {
    this.handleSlotChange();
  }

  connectedCallback() {
    this.handleSlotChange = this.handleSlotChange.bind(this);

    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }

  componentWillLoad() {
    this.handleSlotChange();
  }

  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }

  handleSlotChange() {
    this.hasLabelSlot = hasSlot(this.el, 'label');
  }

  render() {
    const hasLabel = this.label ? true : this.hasLabelSlot;

    return (
      <fieldset
        class={{
          'field-group': true,
          'field-group-horizontal': this.horizontal,
          'field-group-has-label': hasLabel,
        }}
      >
        <legend class="field-group-label" aria-hidden={hasLabel ? 'false' : 'true'}>
          <slot name="label">{this.label}</slot>
        </legend>
        <div class="content">
          <slot></slot>
        </div>
      </fieldset>
    );
  }
}
