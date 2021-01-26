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

  /**
   * Specifies what if label and input must be inline.
   */
  @Prop() inline: boolean;

  @State() value: string;

  handleChange(event) {
    this.value = event.target.value;

    // let error = this.error;
    // if (event.target.validity.typeMismatch) {
    //   error = true;
    // }
  }

  render() {
    const { type, disabled } = this;
    const attrs = {
      type,
      disabled,
    }

    return (
      <Host>
        <div
          class={{
            'input-inline': this.inline,
          }}
        >
          <slot name="label"></slot>
          <input {...attrs} value={this.value} onInput={(event) => this.handleChange(event)} class={{ 'input-disabled': this.disabled }}/>
        </div>
      </Host>
    );
  }
}
