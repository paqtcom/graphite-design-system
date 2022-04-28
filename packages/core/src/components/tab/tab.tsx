import { Component, Method, Prop, State, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'gr-tab',
  styleUrl: 'tab.scss',
  shadow: true
})
export class Tab {
  @Element() el!: HTMLElement;

  @State() hasFocus = false;

  /** The name of the tab panel the tab will control. The panel must be located in the same tab group. */
  @Prop({ reflect: true }) panel = '';

  @Prop({ reflect: true }) active: boolean = false;

  /** Set to true to draw the tab in a disabled state. */
  @Prop({ reflect: true }) disabled: boolean = false;

  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  /** Sets focus on the tab. */
  @Method()
  async setFocus() {
    this.el.focus();
  }

  /** Removes focus from the tab. */
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

  render() {
    const { active, disabled } = this;

    return (
      <Host
        class={{
          tab: true,
          'tab-active': active,
          'tab-disabled': disabled,
          'tab-focused': this.hasFocus,
        }}
        role="tab"
        aria-disabled={disabled ? 'true' : 'false'}
        aria-selected={active ? 'true' : 'false'}
        tabIndex={disabled || !active ? 0 : null}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <slot></slot>
      </Host>
    )
  }
}
