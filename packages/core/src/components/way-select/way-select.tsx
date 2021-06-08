import { Component, h, Element, State, Prop, Watch, Event, EventEmitter, Method } from '@stencil/core';
import FormControl from '../../functional-components/form-control/form-control';
import { getTextContent, hasSlot } from '../../utils/slot';
import { renderHiddenInput } from '../../utils/utils';

let id = 0;

/**
 * @slot - The select's options in the form of menu items.
 * @slot label - The select's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the select.
 */
@Component({
  tag: 'way-select',
  styleUrl: 'way-select.scss',
  shadow: true,
})
export class WaySelect {
  box: HTMLElement;
  dropdown: HTMLWayDropdownElement;
  input: HTMLInputElement;
  inputId = `select-${++id}`;
  labelId = `select-label-${id}`;
  helpTextId = `select-help-text-${id}`;
  menu: HTMLWayMenuElement;
  resizeObserver: ResizeObserver;

  @Element() el: HTMLWaySelectElement;

  @State() hasFocus = false;
  @State() hasHelpTextSlot = false;
  @State() hasLabelSlot = false;
  @State() isOpen = false;
  @State() items = [];
  @State() displayLabel = '';
  @State() displayTags = [];

  /** Set to true to enable multiselect. */
  @Prop() multiple = false;

  /**
   * The maximum number of tags to show when `multiple` is true. After the maximum, "+n" will be shown to indicate the
   * number of additional items that are selected. Set to -1 to remove the limit.
   */
  @Prop() maxTagsVisible = 3;

  /** Set to true to disable the select control. */
  @Prop() disabled = false;

  /** The select's name. */
  @Prop() name = '';

  /** The select's placeholder text. */
  @Prop() placeholder = '';

  /** The select's size. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
   * `overflow: auto|scroll`.
   */
  @Prop() hoist = false;

  /** The value of the control. This will be a string or an array depending on `multiple`. */
  @Prop({ mutable: true }) value: string | Array<string> = '';

  /** Set to true to draw a pill-style select with rounded edges. */
  @Prop() pill = false;

  /** The select's label. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** The select's help text. Alternatively, you can use the help-text slot. */
  @Prop() helpText = '';

  /** The select's required attribute. */
  @Prop() required = false;

  /** Set to true to add a clear button when the select is populated. */
  @Prop() clearable = false;

  /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
  @Prop({ mutable: true }) invalid = false;

  @Watch('disabled')
  handleDisabledChange() {
    if (this.disabled && this.isOpen) {
      this.dropdown.hide();
    }
  }

  @Watch('helpText')
  @Watch('label')
  handleLabelChange() {
    this.handleSlotChange();
  }

  @Watch('multiple')
  handleMultipleChange() {
    // Cast to array | string based on `this.multiple`
    const value = this.getValueAsArray();
    this.value = this.multiple ? value : value[0] || '';
    this.syncItemsFromValue();
  }

  @Watch('value')
  handleValueChange() {
    this.syncItemsFromValue();
    this.wayChange.emit();
  }

  /** Emitted when the control's value changes. */
  @Event({ eventName: 'wayChange' }) wayChange: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event({ eventName: 'wayFocus' }) wayFocus: EventEmitter;

  /** Emitted when the control loses focus. */
  @Event({ eventName: 'wayBlur' }) wayBlur: EventEmitter;

  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleMenuHide = this.handleMenuHide.bind(this);
    this.handleMenuShow = this.handleMenuShow.bind(this);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleTagInteraction = this.handleTagInteraction.bind(this);

    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }

  componentWillLoad() {
    this.handleSlotChange();
  }

  componentDidLoad() {
    this.resizeObserver = new ResizeObserver(() => this.resizeMenu());
    this.reportDuplicateItemValues();

    // We need to do an initial sync after the component has rendered, so this will suppress the re-render warning
    requestAnimationFrame(() => this.syncItemsFromValue());
  }

  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  @Method()
  async reportValidity() {
    return this.input.reportValidity();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  @Method()
  async setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  getItemLabel(item: HTMLWayMenuItemElement) {
    const slot = item.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement;
    return getTextContent(slot);
  }

  getItems() {
    return [...this.el.querySelectorAll('way-menu-item')];
  }

  getValueAsArray() {
    return Array.isArray(this.value) ? this.value : [this.value];
  }

  handleBlur() {
    this.hasFocus = false;
    this.wayBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.wayFocus.emit();
  }

  handleClearClick(event: MouseEvent) {
    event.stopPropagation();
    this.value = this.multiple ? [] : '';
    this.syncItemsFromValue();
  }

  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const items = this.getItems();
    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    // Ignore key presses on tags
    if (target.tagName.toLowerCase() === 'way-tag') {
      return;
    }

    // Tabbing out of the control closes it
    if (event.key === 'Tab') {
      if (this.isOpen) {
        this.dropdown.hide();
      }
      return;
    }

    // Up/down opens the menu
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();

      // Show the menu if it's not already open
      if (!this.isOpen) {
        this.dropdown.show();
      }

      // Focus on a menu item
      if (event.key === 'ArrowDown' && firstItem) {
        firstItem.setFocus();
        return;
      }

      if (event.key === 'ArrowUp' && lastItem) {
        lastItem.setFocus();
        return;
      }
    }

    // All other keys open the menu and initiate type to select
    if (!this.isOpen) {
      event.stopPropagation();
      event.preventDefault();
      this.dropdown.show();
      this.menu.typeToSelect(event.key);
    }
  }

  handleLabelClick() {
    this.box.focus();
  }

  handleMenuSelect(event: CustomEvent) {
    const item = event.detail.item;

    if (this.multiple) {
      this.value = this.value.includes(item.value)
        ? (this.value as []).filter(v => v !== item.value)
        : [...this.value, item.value];
    } else {
      this.value = item.value;
    }

    this.syncItemsFromValue();
  }

  handleMenuShow(event: CustomEvent) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.resizeMenu();
    this.resizeObserver.observe(this.el);
    this.isOpen = true;
  }

  handleMenuHide() {
    this.resizeObserver.unobserve(this.el);
    this.isOpen = false;
  }

  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasLabelSlot = hasSlot(this.el, 'label');
    this.syncItemsFromValue();
    this.reportDuplicateItemValues();
  }

  handleTagInteraction(event: KeyboardEvent | MouseEvent) {
    // Don't toggle the menu when a tag's clear button is activated
    const path = event.composedPath() as Array<EventTarget>;
    const clearButton = path.find(el => {
      if (el instanceof HTMLElement) {
        const element = el as HTMLElement;
        return element.classList.contains('tag-clear');
      }
    });

    if (clearButton) {
      event.stopPropagation();
    }
  }

  reportDuplicateItemValues() {
    const items = this.getItems();

    // Report duplicate values since they can break selection logic
    const duplicateValues = items.map(item => item.value).filter((e, i, a) => a.indexOf(e) !== i);
    if (duplicateValues.length) {
      throw new Error('Duplicate value found on <way-menu-item> in <way-select>: "' + duplicateValues.join('", "') + '"');
    }
  }

  resizeMenu() {
    this.menu.style.width = `${this.box.clientWidth}px`;
  }

  syncItemsFromValue() {
    const items = this.getItems();
    const value = this.getValueAsArray();

    // Sync checked states
    items.map(item => (item.checked = value.includes(item.value)));

    // Sync display label
    if (this.multiple) {
      const checkedItems = [];
      value.map(val => items.map(item => (item.value === val ? checkedItems.push(item) : null)));

      this.displayTags = checkedItems.map(item => {
        return (
          <way-tag
            type="info"
            size={this.size}
            pill={this.pill}
            clearable
            onClick={this.handleTagInteraction}
            onKeyDown={this.handleTagInteraction}
            onWayClear={event => {
              event.stopPropagation();
              if (!this.disabled) {
                item.checked = false;
                this.syncValueFromItems();
              }
            }}
          >
            {this.getItemLabel(item)}
          </way-tag>
        );
      });

      if (this.maxTagsVisible > 0 && this.displayTags.length > this.maxTagsVisible) {
        const total = this.displayTags.length;
        this.displayLabel = '';
        this.displayTags = this.displayTags.slice(0, this.maxTagsVisible);
        this.displayTags.push(
          <way-tag type="info" size={this.size} pill={this.pill}>
            +{total - this.maxTagsVisible}
          </way-tag>
        );
      }
    } else {
      const checkedItem = items.filter(item => item.value === value[0])[0];
      this.displayLabel = checkedItem ? this.getItemLabel(checkedItem) : '';
      this.displayTags = [];
    }
  }

  syncValueFromItems() {
    const items = this.getItems();
    const checkedItems = items.filter(item => item.checked);
    const checkedValues = checkedItems.map(item => item.value);

    if (this.multiple) {
      this.value = (this.value as []).filter(val => checkedValues.includes(val));
    } else {
      this.value = checkedValues.length > 0 ? checkedValues[0] : '';
    }
  }

  render() {
    const hasSelection = this.multiple ? this.value.length > 0 : this.value !== '';

    renderHiddenInput(this.el, this.name, parseValue(this.value), this.disabled);

    return (
      <FormControl
        inputId={this.inputId}
        label={this.label}
        labelId={this.labelId}
        hasLabelSlot={this.hasLabelSlot}
        helpTextId={this.helpTextId}
        helpText={this.helpText}
        hasHelpTextSlot={this.hasHelpTextSlot}
        size={this.size}
        onLabelClick={this.handleLabelClick}
      >
        <way-dropdown
          ref={el => (this.dropdown = el)}
          hoist={this.hoist}
          closeOnSelect={!this.multiple}
          containingElement={this.el}
          class={{
            select: true,
            'select-open': this.isOpen,
            'select-empty': this.value?.length === 0,
            'select-focused': this.hasFocus,
            'select-clearable': this.clearable,
            'select-disabled': this.disabled,
            'select-multiple': this.multiple,
            'select-has-tags': this.multiple && hasSelection,
            'select-placeholder-visible': this.displayLabel === '',
            [`select-${this.size}`]: true,
            'select-pill': this.pill,
            'select-invalid': this.invalid
          }}
          onWayShow={this.handleMenuShow}
          onWayHide={this.handleMenuHide}
        >
          <div
            slot="trigger"
            ref={el => (this.box = el)}
            id={this.inputId}
            class="select-box"
            role="combobox"
            aria-labelledby={this.labelId}
            aria-describedby={this.helpTextId}
            aria-haspopup="true"
            aria-expanded={this.isOpen ? 'true' : 'false'}
            tabIndex={this.disabled ? -1 : 0}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onKeyDown={this.handleKeyDown}
          >
            <div class="select-label">
              {this.displayTags.length ? (
                <span class="select-tags">
                  {this.displayTags}
                </span>
              ) : (
                this.displayLabel || this.placeholder
              )}
            </div>

            {this.clearable && hasSelection && (
              <way-button
                variant="plain"
                size="small"
                class="select-clear"
                onClick={this.handleClearClick}
                tabindex="-1"
              >
                <svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close Circle</title><path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M320 320L192 192M192 320l128-128'/></svg>
              </way-button>
            )}

            <span class="caret">
              <svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
            </span>

            {/*
              The hidden input tricks the browser's built-in validation so it works as expected. We use an input instead
              of a select because, otherwise, iOS will show a list of options during validation.
            */}
            <input
              ref={el => (this.input = el)}
              class="select-hidden-select"
              aria-hidden="true"
              required={this.required}
              value={hasSelection ? '1' : ''}
              tabIndex={-1}
            />
          </div>

          <way-menu ref={el => (this.menu = el)} class="select-menu" onWaySelect={this.handleMenuSelect}>
            <slot onSlotchange={this.handleSlotChange} />
          </way-menu>
        </way-dropdown>
      </FormControl>
    );
  }
}

const parseValue = (value: any) => {
  if (value == null) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.join(',');
  }

  return value.toString();
};
