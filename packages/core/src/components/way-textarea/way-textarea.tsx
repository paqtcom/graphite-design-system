import { Component, Host, h, Prop, Element, Event, EventEmitter, State } from '@stencil/core';
import { inheritAttributes } from '../../utils/utils';
@Component({
  tag: 'way-textarea',
  styleUrl: 'way-textarea.scss',
  shadow: true,
})
export class WayTextarea {
  private inheritedAttributes: { [k: string]: any } = {};

  @Element() el!: HTMLElement;

  /**
   * The state of the textarea's value attribute.
   */
  @State() value: string;

  /**
   * Specifies what type of textarea to use.
   */
  @Prop() type: string | undefined;

  /**
   * The textarea's name attribute.
   */
  @Prop({ reflect: true }) name: string | undefined;

  /**
   * If `true`, the user cannot interact with the textarea.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Specifies what if label and textarea must be inline.
   */
  @Prop() inline: boolean;

  /**
   * The textarea's size.
   */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * The textarea's label. Alternatively, you can use the label slot.
   */
  @Prop() label: string | undefined;


  /**
   * Emitted when the textarea has focus.
   */
  @Event() wayFocus!: EventEmitter<void>;

  /**
   * Emitted when the textarea loses focus.
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
          'textarea-inline': this.inline,
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

        <textarea
          {...attrs}
          id={this.name}
          value={this.value}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          disabled={disabled}
          {...inheritedAttributes}
          onInput={(event) => this.handleChange(event)}
          class={{
            textarea: true,

            // States
            'textarea-disabled': disabled,

            // Sizes
            'textarea-small': this.size === 'small',
            'textarea-large': this.size === 'large',
          }}
        />
      </Host>
    );
  }
}
