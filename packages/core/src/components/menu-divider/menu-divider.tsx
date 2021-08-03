import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'gr-menu-divider',
  styleUrl: 'menu-divider.scss',
  shadow: true,
})
export class MenuDivider {
  render() {
    return (
      <Host>
        <div class="menu-divider" role="separator" aria-hidden="true" />
      </Host>
    );
  }
}
