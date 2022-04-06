import { Component, h, Prop } from '@stencil/core';
// import { autoIncrement  } from '../../utils/AutoIncrement';

// let id = 0;

@Component({
  tag: 'gr-tab-panel',
  styleUrl: 'tab-panel.scss',
  shadow: true
})
export class Tab {
  // private tab: HTMLGrTabElement;
  // private readonly attrId = autoIncrement();
  // private readonly componentId = `gr-tab-panel-${this.attrId}`;

  @Prop({ reflect: true }) name = '';

  @Prop({ reflect: true }) active: boolean = false;

  render() {
    const { active } = this;
    // this.id = this.id.length > 0 ? this.id : this.componentId;
    // this.style.display = this.active ? 'block' : 'none';

    return (
      <div part="base" class="tab-panel" role="tabpanel" aria-hidden={active ? 'false' : 'true'}>
        <slot></slot>
      </div>
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gr-tab-panel': HTMLGrTabPanelElement;
  }
}