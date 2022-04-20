import { Component, h, Prop, Element, State, Event, EventEmitter } from '@stencil/core';

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

  @Prop({ reflect: true }) disabled: boolean = false;

  /** Emitted when the control gains focus. */
  @Event({ eventName: 'gr-focus' }) grFocus!: EventEmitter<void>;

  /** Emitted when the control loses focus. */
  @Event({ eventName: 'gr-blur' }) grBlur!: EventEmitter<void>;

  render() {
    const { active, disabled } = this;

    return (
      <div
        part="base"
        class={{
          tab: true,
          'tab--active': active,
          'tab--disabled': disabled
        }}
        role="tab"
        aria-disabled={disabled ? 'true' : null}
        aria-selected={active ? 'true' : 'false'}
        tabindex={disabled || !active ? '-1' : '0'}
      >
        <slot></slot>
      </div>
    )
  }
}
