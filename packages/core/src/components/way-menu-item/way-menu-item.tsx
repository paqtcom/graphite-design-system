import { Component, Method, Prop, State, h, Host, Element } from '@stencil/core';

/**
 * @slot - The menu item's label.
 * @slot start - Content is placed to the left of the menu item's label (will be to the right when we support right-to-left direction)
 * @slot end - Content is placed to the right of the menu item's label (will be to the left when we support right-to-left direction)
 */
@Component({
  tag: 'way-menu-item',
  styleUrl: 'way-menu-item.scss',
  shadow: true
})
export class WayMenuItem {
  @Element() el!: HTMLElement;

  @State() hasFocus = false;

  /** Set to true to draw the item in a checked state. */
  @Prop({ reflect: true }) checked = false;

  /** A unique value to store in the menu item. This can be used as a way to identify menu items when selected. */
  @Prop({ reflect: true }) value = '';

  /** Set to true to draw the menu item in a disabled state. */
  @Prop({ reflect: true }) disabled = false;

  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  /** Sets focus on the button. */
  @Method()
  async setFocus(options?: FocusOptions) {
    this.el.focus(options);
  }

  /** Removes focus from the button. */
  @Method()
  async removeFocus() {
    this.el.blur();
  }

  handleBlur() {
    this.hasFocus = false;
  }

  handleFocus() {
    this.hasFocus = true;
  }

  handleMouseEnter() {
    this.setFocus();
  }

  handleMouseLeave() {
    this.removeFocus();
  }

  render() {
    return (
      <Host
        class={{
          'menu-item-checked': this.checked,
          'menu-item-disabled': this.disabled,
          'menu-item-focused': this.hasFocus
        }}
        role="menuitem"
        aria-disabled={this.disabled ? 'true' : 'false'}
        aria-checked={this.checked ? 'true' : 'false'}
        tabIndex={!this.disabled ? 0 : null}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <span class="checkmark">
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' aria-hidden="true"><title>Checkmark</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M416 128L192 384l-96-96'/></svg>
        </span>

        <span class="start">
          <slot name="start"></slot>
        </span>

        <span class="label">
          <slot></slot>
        </span>

        <span class="end">
          <slot name="end"></slot>
        </span>
      </Host>
    );
  }
}
