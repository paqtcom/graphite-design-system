import { Component, Host, h, Prop, Element, Event, EventEmitter, Method, State } from '@stencil/core';

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

  /**
   * Emitted when the button has focus.
   */
  @Event({ eventName: 'gr-focus' }) grFocus!: EventEmitter<void>;

  /**
   * Emitted when the button loses focus.
   */
  @Event({ eventName: 'gr-blur' }) grBlur!: EventEmitter<void>;

  connectedCallback() {
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
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

  onBlur() {
    this.hasFocus = false;
    this.grBlur.emit();
  }

  onFocus() {
    this.hasFocus = true;
    this.grFocus.emit();
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
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        slot="nav"
      >
        <slot></slot>
      </Host>
    )
  }
}
