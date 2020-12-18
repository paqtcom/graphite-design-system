import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'way-input',
  styleUrl: 'way-input.css',
  shadow: true,
})
export class Wayinput {

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   */
  @Prop() type: string | undefined;

  @State() value: string;


  handleChange(event) {
    this.value = event.target.value;
  }

  render() {
    const { type } = this;
    const attrs = {
      type,
    };

    return (
      <Host>
        <slot class="label" name="label"></slot>
        <input {...attrs} value={this.value} onInput={(event) => this.handleChange(event)} />
      </Host>
    );
  }
}
