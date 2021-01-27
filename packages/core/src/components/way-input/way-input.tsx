import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'way-input',
  styleUrl: 'way-input.css',
  shadow: true,
})
export class Wayinput {
  /**
   * Specifies what type of input to use.
   */
  @Prop() type: string | undefined;

  /**
   * Specifies what if input is disabled.
   */
  @Prop() disabled: boolean;

  /** Set to true to make the input readonly. */
  @Prop({ reflect: true }) readonly = false;

  /**
   * Specifies what if label and input must be inline.
   */
  @Prop() inline: boolean;

  /** The input's size. */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The input's name attribute. */
  @Prop({ reflect: true }) name: string | undefined;

  /** The input's label. Alternatively, you can use the label slot. */
  @Prop() label: string | undefined;

  @State() value: string;

  handleChange(event) {
    this.value = event.target.value;

    // let error = this.error;
    // if (event.target.validity.typeMismatch) {
    //   error = true;
    // }
  }

  render() {
    const { type, name, readonly, disabled } = this;
    const attrs = {
      type,
      name,
      readonly,
      disabled,
    }

    return (
      <Host>
        <div
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
            onInput={(event) => this.handleChange(event)}
            class={{
              input: true,

              // States
              'input-disabled': this.disabled,

              // Sizes
              'input-small': this.size === 'small',
              'input-large': this.size === 'large',
            }}
          />
        </div>
      </Host>
    );
  }
}
