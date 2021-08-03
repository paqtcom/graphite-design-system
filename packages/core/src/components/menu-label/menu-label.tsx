import { Component, Host, h } from '@stencil/core';

/**
 * @slot - The menu label's content.
 */
@Component({
  tag: 'gr-menu-label',
  styleUrl: 'menu-label.scss',
  shadow: true,
})
export class MenuLabel {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
