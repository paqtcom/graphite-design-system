import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'way-menu-label',
  styleUrl: 'way-menu-label.scss',
  shadow: true,
})
export class WayMenuLabel {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
