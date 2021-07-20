import { Component, Host, h, Element, Event, EventEmitter, Method } from '@stencil/core';
import { getTextContent } from '../../utils/slot';

/**
 * @slot - The menu's content, including menu items, menu dividers, and menu labels.
 */
@Component({
  tag: 'way-menu',
  styleUrl: 'way-menu.scss',
  shadow: true,
})
export class WayMenu {
  typeToSelectString = '';
  typeToSelectTimeout: any;

  menu: HTMLElement;

  /** Emitted when a menu item is selected. */
  @Event({ eventName: 'way-select' }) waySelect: EventEmitter<{ item: HTMLWayMenuItemElement }>;

  connectedCallback() {
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Initiates type-to-select logic, which automatically selects an option based on what the user is currently typing.
   * The key passed will be appended to the internal query and the selection will be updated. After a brief period, the
   * internal query is cleared automatically. This method is intended to be used with the keydown event. Useful for
   * enabling type-to-select when the menu doesn't have focus.
   */
  @Method()
  async typeToSelect(key: string) {
    clearTimeout(this.typeToSelectTimeout);
    this.typeToSelectTimeout = setTimeout(() => (this.typeToSelectString = ''), 750);
    this.typeToSelectString += key.toLowerCase();
    const items = this.getItems();
    for (const item of items) {
      const slot = item.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement;
      const label = getTextContent(slot).toLowerCase().trim();
      if (label.substring(0, this.typeToSelectString.length) === this.typeToSelectString) {
        item.setFocus();
        break;
      }
    }
  }

  getItems() {
    const slot = this.menu.querySelector('slot');
    return [...slot.assignedElements({ flatten: true })].filter(
      (el: any) => el.tagName.toLowerCase() === 'way-menu-item' && !el.disabled,
    ) as [HTMLWayMenuItemElement];
  }

  getActiveItem() {
    return this.getItems().find(i => i === document.activeElement);
  }

  setActiveItem(item: HTMLWayMenuItemElement) {
    item.setFocus();
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const item = target.closest('way-menu-item');

    if (item && !item.disabled) {
      this.waySelect.emit({ item });
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    // Make a selection when pressing enter
    if (event.key === 'Enter') {
      const item = this.getActiveItem();
      event.preventDefault();

      if (item) {
        this.waySelect.emit({ item });
      }
    }

    // Prevent scrolling when space is pressed
    if (event.key === ' ') {
      event.preventDefault();
    }

    // Move the selection when pressing down or up
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      const items = this.getItems();
      const selectedItem = this.getActiveItem();
      let index = items.indexOf(selectedItem);

      if (items.length) {
        event.preventDefault();

        if (event.key === 'ArrowDown') {
          index++;
        } else if (event.key === 'ArrowUp') {
          index--;
        } else if (event.key === 'Home') {
          index = 0;
        } else if (event.key === 'End') {
          index = items.length - 1;
        }

        if (index < 0) index = 0;
        if (index > items.length - 1) index = items.length - 1;

        this.setActiveItem(items[index]);

        return;
      }
    }

    this.typeToSelect(event.key);
  }

  render() {
    return (
      <div
        ref={el => (this.menu = el)}
        class="menu"
        role="menu"
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        <slot></slot>
      </div>
    );
  }
}
