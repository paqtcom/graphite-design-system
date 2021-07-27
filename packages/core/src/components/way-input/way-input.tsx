import { Component, Host, h, Prop, Element, Event, EventEmitter, State } from '@stencil/core';
import { inheritAttributes } from '../../utils/utils';
@Component({
  tag: 'way-input',
  styleUrl: 'way-input.scss',
  shadow: true,
})
export class WayInput {
  private inheritedAttributes: { [k: string]: any } = {};

  @Element() el!: HTMLElement;

  /**
   * The state of the input's value attribute.
   */
  @State() value: string;

  /**
   * Specifies what type of input to use.
   */
  @Prop() type: string | undefined;

  /**
   * The input's name attribute.
   */
  @Prop({ reflect: true }) name: string | undefined;

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Specifies what if label and input must be inline.
   */
  @Prop() inline: boolean;

  /**
   * The input's size.
   */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * The input's label. Alternatively, you can use the label slot.
   */
  @Prop() label: string | undefined;


  /**
   * Emitted when the input has focus.
   */
  @Event() wayFocus!: EventEmitter<void>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() wayBlur!: EventEmitter<void>;

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
  }

  private onFocus = () => {
    this.wayFocus.emit();
  }

  private onBlur = () => {
    this.wayBlur.emit();
  }

  handleChange(event) {
    this.value = event.target.value;

    // let error = this.error;
    // if (event.target.validity.typeMismatch) {
    //   error = true;
    // }
  }

  render() {
    const { type, name, disabled, inheritedAttributes } = this;
    const attrs = {
      type,
      name,
      disabled,
    }

    return (
      <Host
        aria-disabled={disabled ? 'true' : null}
        class={{
          'input-inline': this.inline,
        }}
      >
        {this.label ? (
          <label
            class={{
              label: true,

              // Sizes
              'label-small': this.size === 'small',
              'label-large': this.size === 'large',
              'label-inline': this.inline,
            }}
            htmlFor={this.name}
          >
            { this.label }
          </label>
        ) : null }

        <input
          {...attrs}
          id={this.name}
          value={this.value}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          disabled={disabled}
          {...inheritedAttributes}
          onInput={(event) => this.handleChange(event)}
          class={{
            input: true,

            // States
            'input-disabled': disabled,

            // Sizes
            'input-small': this.size === 'small',
            'input-large': this.size === 'large',
          }}
        />
      </Host>
    );
  }
}
