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

  /** Set to true to display a required indicator, adds an asterisk to label */
  @Prop() requiredIndicator = false;

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
        <legend
          class="field-group-label"
          aria-hidden={hasLabel ? 'false' : 'true'}
          aria-required={this.requiredIndicator ? 'true' : 'false'}
        >
          <slot name="label">{this.label}</slot>
          {this.requiredIndicator && (
            <div class="asterisk">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path
                  fill="currentColor"
                  d="M 17.699219 17 L 23.898438 25.398438 L 21.5 27 L 16 18.300781 L 10.5 27 L 8.199219 25.398438 L 14.398438 17 L 5.101563 14.601563 L 6 12 L 15.101563 15.199219 L 14.5 5 L 17.5 5 L 17 15.199219 L 26 12 L 26.800781 14.699219 Z"
                />
              </svg>
            </div>
          )}
        </legend>
        <slot></slot>
      </fieldset>
    );
  }
}
