import { Component, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'gr-tab-panel',
  styleUrl: 'tab-panel.scss',
  shadow: true
})
export class TabPanel {
  @Element() el: HTMLGrTabPanelElement;

  @Prop({ reflect: true }) name = '';

  @Prop({ reflect: true }) active: boolean = false;

  render() {
    const { active } = this;

    this.el.style.display = this.active ? 'block' : 'none';

    return (
      <div part="base" class="tab-panel" role="tabpanel" aria-hidden={active ? 'false' : 'true'}>
        <slot></slot>
      </div>
    )
  }
}
