import { Component, h, Element, Prop } from '@stencil/core';
// import { autoIncrement  } from '../../utils/AutoIncrement';

// let id = 0;

@Component({
  tag: 'gr-tab-panel',
  styleUrl: 'tab-panel.scss',
  shadow: true
})
export class TabPanel {
  // private tab: HTMLGrTabElement;
  // private readonly attrId = autoIncrement();
  // private readonly componentId = `gr-tab-panel-${this.attrId}`;

  @Element() el: HTMLGrTabPanelElement;

  @Prop({ reflect: true }) name = '';

  @Prop({ reflect: true }) active: boolean = false;

  render() {
    const { active } = this;
    // this.id = this.id.length > 0 ? this.id : this.componentId;
    this.el.style.display = this.active ? 'block' : 'none';

    return (
      <div part="base" class="tab-panel" role="tabpanel" aria-hidden={active ? 'false' : 'true'}>
        <slot></slot>
      </div>
    )
  }
}