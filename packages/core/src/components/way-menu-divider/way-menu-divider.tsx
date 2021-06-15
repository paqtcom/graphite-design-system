import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'way-menu-divider',
  styleUrl: 'way-menu-divider.scss',
  shadow: true,
})
export class WayMenuDivider {
  render() {
    return (
      <Host>
        <div class="menu-divider" role="separator" aria-hidden="true" />
      </Host>
    );
  }
}
