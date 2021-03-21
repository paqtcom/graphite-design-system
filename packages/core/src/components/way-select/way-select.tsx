import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'way-select',
  styleUrl: 'way-select.scss',
  shadow: true,
})
export class WaySelect {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
