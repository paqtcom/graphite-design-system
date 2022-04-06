import { Component, h, Prop, Element, State, Event, EventEmitter } from '@stencil/core';
// import { autoIncrement  } from '../../utils/AutoIncrement';

// let id = 0;

@Component({
  tag: 'gr-tab',
  styleUrl: 'tab.scss',
  shadow: true
})
export class Tab {
  // private tab: HTMLGrTabElement;
  // private readonly attrId = autoIncrement();
  // private readonly componentId = `gr-tab-${this.attrId}`;

  @Element() el!: HTMLElement;

  @State() hasFocus = false;
  
  /** The name of the tab panel the tab will control. The panel must be located in the same tab group. */
  @Prop({ reflect: true }) panel = '';

  @Prop({ reflect: true }) active: boolean = false;

  @Prop({ reflect: true }) closable: boolean = false;

  @Prop({ reflect: true }) disabled: boolean = false;

  /** Emitted when the control gains focus. */
  @Event({ eventName: 'gr-focus' }) grFocus!: EventEmitter<void>;

  /** Emitted when the control loses focus. */
  @Event({ eventName: 'gr-blur' }) grBlur!: EventEmitter<void>;

    /** Sets focus on the select. */
  // @Method()
  // async setFocus(options: FocusOptions) {
  //   this.hasFocus = true;
  //   this.grFocus.emit();
  //   this.tab.focus(options);
  // }

  // private onBlur = () => {
  //   this.grBlur.emit();
  // };

  render() {
    const { active, disabled } = this;
    // this.id = this.id.length > 0 ? this.id : this.componentId;

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
