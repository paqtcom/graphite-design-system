import { Component, h, Prop, Watch } from '@stencil/core';
// import { autoIncrement  } from '../../utils/AutoIncrement';
import { scrollIntoView } from '../../utils/scroll';
import { emit } from '../../utils/event';
// import type GrTabPanel from '../tab-panel/tab-panel';
// import type GrTab from '../tab/tab';

// let id = 0;

@Component({
  tag: 'gr-tab-group',
  styleUrl: 'tab-group.scss',
  shadow: true
})
export class Tab {
  // private tab: HTMLGrTabElement;
  // private readonly attrId = autoIncrement();
  // private readonly componentId = `gr-tab-panel-${this.attrId}`;

  private tabGroup: HTMLElement;
  private body: HTMLElement;
  private nav: HTMLElement;
  private indicator: HTMLElement;
  private resizeObserver: ResizeObserver;
  private mutationObserver: MutationObserver;
  private tabs = [];
  private panels = [];

  @Prop() placement: 'top' | 'bottom' | 'start' | 'end' = 'top';

  connectedCallback() {
    // super.connectedCallback();

    this.resizeObserver = new ResizeObserver(() => {
      this.preventIndicatorTransition();
      this.repositionIndicator();
    });

    this.mutationObserver = new MutationObserver(mutations => {
      // Update aria labels when the DOM changes
      if (mutations.some(m => !['aria-labelledby', 'aria-controls'].includes(m.attributeName!))) {
        setTimeout(() => this.setAriaLabels());
      }

      // Sync tabs when disabled states change
      if (mutations.some(m => m.attributeName === 'disabled')) {
        this.syncTabsAndPanels();
      }
    });

    this.updateComplete.then(() => {
      this.syncTabsAndPanels();
      this.mutationObserver.observe(this, { attributes: true, childList: true, subtree: true });
      this.resizeObserver.observe(this.nav);

      // Set initial tab state when the tabs first become visible
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].intersectionRatio > 0) {
          this.setAriaLabels();
          this.setActiveTab(this.getActiveTab() ?? this.tabs[0], { emitEvents: false });
          observer.unobserve(entries[0].target);
        }
      });
      intersectionObserver.observe(this.tabGroup);
    });
  }

  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.resizeObserver.unobserve(this.nav);
  }

  /** Shows the specified tab panel. */
  show(panel: string) {
    const tab = this.tabs.find(el => el.panel === panel);

    if (tab) {
      this.setActiveTab(tab, { scrollBehavior: 'smooth' });
    }
  }

  getAllTabs(includeDisabled = false) {
    const slot = this.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="nav"]')!;

    return [...(slot.assignedElements() as SlTab[])].filter(el => {
      return includeDisabled
        ? el.tagName.toLowerCase() === 'gr-tab'
        : el.tagName.toLowerCase() === 'gr-tab' && !el.disabled;
    });
  }

  getAllPanels() {
    const slot = this.body.querySelector('slot')!;
    return [...slot.assignedElements()].filter(el => el.tagName.toLowerCase() === 'gr-tab-panel') as [GrTabPanel];
  }

  getActiveTab() {
    return this.tabs.find(el => el.active);
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest('gr-tab');
    const tabGroup = tab?.closest('gr-tab-group');

    // Ensure the target tab is in this tab group
    if (tabGroup !== this) {
      return;
    }

    if (tab !== null) {
      this.setActiveTab(tab, { scrollBehavior: 'smooth' });
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest('gr-tab');
    const tabGroup = tab?.closest('gr-tab-group');

    // Ensure the target tab is in this tab group
    if (tabGroup !== this) {
      return;
    }

    // Activate a tab
    if (['Enter', ' '].includes(event.key)) {
      if (tab !== null) {
        this.setActiveTab(tab, { scrollBehavior: 'smooth' });
        event.preventDefault();
      }
    }

    // Move focus left or right
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      const activeEl = document.activeElement;

      if (activeEl?.tagName.toLowerCase() === 'gr-tab') {
        let index = this.tabs.indexOf(activeEl as Tab);

        if (event.key === 'Home') {
          index = 0;
        } else if (event.key === 'End') {
          index = this.tabs.length - 1;
        } else if (
          (['top', 'bottom'].includes(this.placement) && event.key === 'ArrowLeft') ||
          (['start', 'end'].includes(this.placement) && event.key === 'ArrowUp')
        ) {
          index--;
        } else if (
          (['top', 'bottom'].includes(this.placement) && event.key === 'ArrowRight') ||
          (['start', 'end'].includes(this.placement) && event.key === 'ArrowDown')
        ) {
          index++;
        }

        if (index < 0) {
          index = this.tabs.length - 1;
        }

        if (index > this.tabs.length - 1) {
          index = 0;
        }

        this.tabs[index].focus({ preventScroll: true });

        this.setActiveTab(this.tabs[index], { scrollBehavior: 'smooth' });

        if (['top', 'bottom'].includes(this.placement)) {
          scrollIntoView(this.tabs[index], this.nav, 'horizontal');
        }

        event.preventDefault();
      }
    }
  }

  handleScrollToStart() {
    this.nav.scroll({
      left: this.nav.scrollLeft - this.nav.clientWidth,
      behavior: 'smooth'
    });
  }

  handleScrollToEnd() {
    this.nav.scroll({
      left: this.nav.scrollLeft + this.nav.clientWidth,
      behavior: 'smooth'
    });
  }

  setActiveTab(tab: Tab, options?: { emitEvents?: boolean; scrollBehavior?: 'auto' | 'smooth' }) {
    options = {
      emitEvents: true,
      scrollBehavior: 'auto',
      ...options
    };

    if (tab !== this.activeTab && !tab.disabled) {
      const previousTab = this.activeTab;
      this.activeTab = tab;

      // Sync active tab and panel
      this.tabs.map(el => (el.active = el === this.activeTab));
      this.panels.map(el => (el.active = el.name === this.activeTab?.panel));
      this.syncIndicator();

      if (['top', 'bottom'].includes(this.placement)) {
        scrollIntoView(this.activeTab, this.nav, 'horizontal', options.scrollBehavior);
      }

      // Emit events
      if (options.emitEvents) {
        if (previousTab) {
          emit(this, 'gr-tab-hide', { detail: { name: previousTab.panel } });
        }

        emit(this, 'gr-tab-show', { detail: { name: this.activeTab.panel } });
      }
    }
  }

  setAriaLabels() {
    // Link each tab with its corresponding panel
    this.tabs.forEach(tab => {
      const panel = this.panels.find(el => el.name === tab.panel);
      if (panel) {
        tab.setAttribute('aria-controls', panel.getAttribute('id')!);
        panel.setAttribute('aria-labelledby', tab.getAttribute('id')!);
      }
    });
  }

  @Watch('placement')
  syncIndicator() {
    const tab = this.getActiveTab();

    if (tab) {
      this.indicator.style.display = 'block';
      this.repositionIndicator();
    } else {
      this.indicator.style.display = 'none';
    }
  }

  repositionIndicator() {
    const currentTab = this.getActiveTab();

    if (!currentTab) {
      return;
    }

    const width = currentTab.clientWidth;
    const height = currentTab.clientHeight;

    // We can't used offsetLeft/offsetTop here due to a shadow parent issue where neither can getBoundingClientRect
    // because it provides invalid values for animating elements: https://bugs.chromium.org/p/chromium/issues/detail?id=920069
    const allTabs = this.getAllTabs(true);
    const precedingTabs = allTabs.slice(0, allTabs.indexOf(currentTab));
    const offset = precedingTabs.reduce(
      (previous, current) => ({
        left: previous.left + current.clientWidth,
        top: previous.top + current.clientHeight
      }),
      { left: 0, top: 0 }
    );

    switch (this.placement) {
      case 'top':
      case 'bottom':
        this.indicator.style.width = `${width}px`;
        this.indicator.style.height = 'auto';
        this.indicator.style.transform = `translateX(${offset.left}px)`;
        break;

      case 'start':
      case 'end':
        this.indicator.style.width = 'auto';
        this.indicator.style.height = `${height}px`;
        this.indicator.style.transform = `translateY(${offset.top}px)`;
        break;
    }
  }

  // In some orientations, when the component is resized, the indicator's position will change causing it to animate
  // while you resize. Calling this method will prevent the transition from running on resize, which feels more natural.
  preventIndicatorTransition() {
    const transitionValue = this.indicator.style.transition;
    this.indicator.style.transition = 'none';

    requestAnimationFrame(() => {
      this.indicator.style.transition = transitionValue;
    });
  }

  // This stores tabs and panels so we can refer to a cache instead of calling querySelectorAll() multiple times.
  syncTabsAndPanels() {
    this.tabs = this.getAllTabs();
    this.panels = this.getAllPanels();
    this.syncIndicator();
  }

  render() {
    const { placement } = this;
    // this.id = this.id.length > 0 ? this.id : this.componentId;
    // this.style.display = this.active ? 'block' : 'none';

    return (
      <div
        part="base"
        class={{
          'tab-group': true,
          'tab-group--top': placement === 'top',
          'tab-group--bottom': placement === 'bottom',
          'tab-group--start': placement === 'start',
          'tab-group--end': placement === 'end',
        }}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" onSlotchange={this.syncTabsAndPanels}></slot>
            </div>
          </div>
        </div>
        <div part="body" class="tab-group__body">
          <slot onSlotchange={this.syncTabsAndPanels}></slot>
        </div>
      </div>
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gr-tab-panel': HTMLGrTabPanelElement;
  }
}