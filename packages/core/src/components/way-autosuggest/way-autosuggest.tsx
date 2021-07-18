import { Component, Element, Event, EventEmitter, Listen, State, Prop, Watch, h } from '@stencil/core';
import { renderInputOutsideShadowRoot } from '@/utils/utils';
import { WayAutosuggestChangeEventDetail, WayAutosuggestOption } from './way-autosuggest-interface';
import FormControl from '@/functional-components/form-control/form-control';
import { hasSlot } from '@/utils/slot';

let id = 0;

@Component({
  tag: 'way-autosuggest',
  styleUrl: 'way-autosuggest.scss',
  shadow: true,
})
export class WayAutoselect {
  optionListEl?: HTMLInputElement;
  inputEl?: HTMLInputElement;
  inputId = `autosuggest-${++id}`;
  labelId = `autosuggest-label-${id}`;
  helpTextId = `autosuggest-help-text-${id}`;

  @Element() el!: HTMLWayAutosuggestElement;

  @Prop() name: string;

  /**
   * An array of WayAutosuggestOption. Which is an object with at least a `label:string` and a `value: string | number`.
   * The value has to be of type string or number because it needs to be able to be rendered in the hidden input.
   */
  @Prop() options?: Array<WayAutosuggestOption> = [];

  /** The autosuggest's placeholder text. */
  @Prop() placeholder?: string;

  /** The autosuggest's size. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  @Prop() validation?: (value: any) => string[];

  /**
   * With a valueSelector you can decide which property should be placed in the hidden input.
   * The return values will be a comma separated string.
   * When given a string, the autosuggest will search for the top level properties.
   */
  @Prop() valueSelector: string | ((item: unknown, index: number) => string[]);

  @Prop() value?: string | Array<{ label: string; value: any }>;

  /**
   * When selected tags are greater than maxTags, they will be grouped in one tag with a counter.
   * Text is configurable in the `selectedText` attribute
   */
  @Prop() maxTags = 3;

  /**
   * Enable or disable deleting tags by backspace key
   *
   * Important: `backspaceDelete` will be disabled when maxTags is reached.
   */
  @Prop() backspaceDelete = true;

  /**
   * Being able to select multiple values
   */
  @Prop() multiple = true;

  /**
   * The text which shows when tags are grouped due to maxTags reached.
   *
   * Related to the `maxTags` attribute
   */
  @Prop() selectedText = 'selected';

  /** The autosuggest's label. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** The autosuggest's help text. Alternatively, you can use the help-text slot. */
  @Prop() helpText = '';

  @State() filteredOptions: Array<WayAutosuggestOption> = this.options;
  @State() hasFocus = false;
  @State() inputValue: string = '';
  @State() localSelected = [];
  @State() highlightIndex: number = 0;
  @State() hasHelpTextSlot = false;
  @State() hasLabelSlot = false;

  // FIXME: Use until clicking outside works
  @State() scrollPosition: number = 0;

  @Watch('helpText')
  @Watch('label')
  handleLabelChange() {
    this.handleSlotChange();
  }

  @Listen('click', { target: 'window' })
  handleOutsideClick(event: MouseEvent) {
    // if this component has a parent component, e.target is parent instead of this.
    // Therefore we cannot check for this.el !== e.target
    // Instead do this:
    const path = event.composedPath() as Array<EventTarget>;
    if (!path.includes(this.el)) {
      this.unFocus();
    }
  }

  /**
   * Listens to keydown events on whole document to open / close / select options.
   * In the future we want to be more dynamic and add / remove eventListener based on this.hasFocus.
   *
   * @param event
   */
  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.unFocus();
      return;
    }

    if (event.key === 'ArrowUp') {
      this.highlightIndex > 0 ? this.highlightIndex-- : 0;
      this.setScrollPosition('up', this.highlightIndex);
      return;
    }

    if (event.key === 'ArrowDown') {
      this.highlightIndex < this.filteredOptions.length - 1 ? this.highlightIndex++ : this.filteredOptions.length;
      this.setScrollPosition('down', this.highlightIndex);
      return;
    }

    if (event.key === 'Enter' && this.hasFocus) {
      this.filteredOptions[this.highlightIndex] &&
        this.optionSelectedListener(this.filteredOptions[this.highlightIndex]);
    }

    if (
      event.key === 'Backspace' &&
      this.backspaceDelete &&
      this.hasFocus &&
      !this.inputValue &&
      this.localSelected.length > 0 &&
      !this.maxTagsReached()
    ) {
      this.removeTag(this.localSelected[this.localSelected.length - 1]);
    }
  }

  private renderHiddenInput() {
    // if a valueSelector callback function prop is given, return comma separated string instead of JSON
    if (this.localSelected && typeof this.valueSelector === 'function') {
      const commaSeparatedString = this.localSelected.map(this.valueSelector).join();

      renderInputOutsideShadowRoot(this.el.parentElement, this.name, commaSeparatedString);
    } else if (this.localSelected && typeof this.valueSelector === 'string') {
      const commaSeparatedString = this.cleanData()
        .map(local => local[`${this.valueSelector}`])
        .join();

      renderInputOutsideShadowRoot(this.el.parentElement, this.name, commaSeparatedString);
    } else {
      renderInputOutsideShadowRoot(this.el.parentElement, this.name, JSON.stringify(this.cleanData()));
    }
  }

  private maxTagsReached(): boolean {
    return this.localSelected.length > this.maxTags;
  }

  /**
   * Determine if optionListEl has to scroll down or up, depending on the highlighted option.
   * @param direction
   * @param highlightIndex
   */
  private setScrollPosition(direction: string, highlightIndex: number) {
    const firstOption = this.optionListEl.querySelector('.option') as HTMLElement;
    const marginOfError = 10;

    if (!firstOption) return;

    const top = this.optionListEl.scrollTop;
    const bottom = this.optionListEl.scrollTop + this.optionListEl.offsetHeight;

    if (direction === 'down' && firstOption.offsetHeight * highlightIndex > bottom - marginOfError) {
      this.optionListEl.scrollTop += firstOption.offsetHeight;
    } else if (direction === 'up' && firstOption.offsetHeight * highlightIndex + 10 < top + marginOfError) {
      this.optionListEl.scrollTop -= firstOption.offsetHeight;
    }
  }
  /**
   * Strip the 'selected' attribute which has been added in this component to track state.
   * Todo: refactor because 'selected' might actually be a commonly used prop name.
   */
  private cleanData(): any[] {
    return this.localSelected && this.localSelected.map(({ selected, ...toKeepAttrs }) => toKeepAttrs);
  }

  private focus() {
    this.hasFocus = true;
  }

  private unFocus() {
    this.hasFocus = false;
    this.highlightIndex = 0;
    this.optionListEl.scrollTop = 0;
  }

  @Event({ eventName: 'way-change' }) wayChange: EventEmitter<WayAutosuggestChangeEventDetail>;

  private valueSelectedHandler() {
    this.renderHiddenInput();

    this.wayChange.emit({
      name: this.name,
      value: this.cleanData(),
      errors: this.validationErrors(),
    });
  }

  // When value is being changed from inside this component, the watch will also get triggered.
  // Starting to wonder if is the right decision to always keep the value prop updated with latest changes.
  @Watch('value')
  watchValue() {
    this.localSelected = typeof this.value === 'string' ? JSON.parse(this.value) : this.value;

    this.updateOptions();
  }

  @Watch('options')
  updateOptions() {
    if (!this.options || this.options.length < 1) return;

    this.filteredOptions = [...this.options].filter(
      option =>
        option.label
          .toLowerCase()
          // Take care of diacritical marks with normalize and replace:
          // https://thread.engineering/2018-08-29-searching-and-sorting-text-with-diacritical-marks-in-javascript/
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .indexOf(this.inputValue.toLowerCase()) !== -1,
    );

    this.value = this.localSelected;

    this.markSelectedOptions();
    this.sortFilteredOptions();
    this.valueSelectedHandler();
  }

  private sortFilteredOptions() {
    this.filteredOptions = [...this.filteredOptions].sort((a, b) =>
      a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }),
    );
  }

  private markSelectedOptions() {
    if (!this.localSelected) return;

    this.filteredOptions = this.filteredOptions.map(fOption => ({
      ...fOption,
      selected: !!this.localSelected.find(selected => selected.value === fOption.value),
    }));
  }

  /**
   * Listener when user adds an option.
   * @param {WayAutosuggestOption} option
   */
  private optionSelectedListener(option: WayAutosuggestOption) {
    if (!this.multiple) {
      this.localSelected = [option];
      this.updateOptions();
      this.unFocus();
    } else if (!option.selected) {
      this.localSelected.push(option);
      this.updateOptions();
    } else {
      this.removeTag(option);
    }

    this.value = this.localSelected;
  }

  /**
   * Listener when user clicks on a selected tag.
   * @param {WayAutosuggestOption} option
   */
  private removeTag(option) {
    if (!this.localSelected) return;

    // Cannot use simple Array.filter() because setting refference to new array will trigger @watch on value
    const index = this.localSelected.findIndex(selectedOption => selectedOption.value === option.value);

    this.localSelected.splice(index, 1);

    this.updateOptions();
  }

  private handleOnInput = (evt: InputEvent) => {
    const input = evt.target as HTMLInputElement;

    this.hasFocus = true;
    this.inputValue = input.value;

    this.updateOptions();
  };

  private validationErrors(): string[] {
    return this.validation ? this.validation(this.localSelected) : [];
  }

  private calculateMinimumInputWidth(): string {
    if (!this.inputEl) return '7em';

    const calculation = this.inputEl.value.length * 0.7;

    if (calculation < 7) {
      return '7em';
    } else if (calculation < 15) {
      return calculation + 'em';
    } else {
      return '99%';
    }
  }

  private renderTags() {
    if (this.localSelected.length === 0) {
      // No tags
      return null;
    } else if (!this.maxTagsReached()) {
      // If tags don't exceeds maxTags
      return this.localSelected.map(tag => (
        <div title={tag.label} onClick={() => this.removeTag(tag)} class="tag">
          <span>{tag.label}</span>
        </div>
      ));
    } else {
      // If tags exceed maxTags
      const text = `${this.localSelected.length} ${this.selectedText}`;

      return (
        <div class="tag counter" title={text}>
          <span>{text}</span>
        </div>
      );
    }
  }

  componentWillLoad() {
    if (this.value) {
      this.localSelected = typeof this.value === 'string' ? JSON.parse(this.value) : this.value;
    }

    this.updateOptions();
    this.renderHiddenInput();
    this.handleSlotChange();
  }

  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasLabelSlot = hasSlot(this.el, 'label');
  }

  connectedCallback() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);

    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }

  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }

  handleLabelClick() {
    // this.box.focus();
  }

  render() {
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
        <div
          class={{
            'way-autosuggest': true,
            'has-error': this.validationErrors().length > 0,
          }}
          onClick={() => this.inputEl && this.inputEl.focus()}
        >
          <div class="input-container">
            {this.renderTags()}
            <input
              ref={el => (this.inputEl = el as HTMLInputElement)}
              class="input"
              style={{ minWidth: this.calculateMinimumInputWidth() }}
              type="text"
              onInput={this.handleOnInput}
              onClick={() => this.focus()}
              value={this.inputValue}
              onFocus={() => this.focus()}
              placeholder={this.placeholder}
            />
          </div>

          <div
            class={{ 'option-list': true, 'has-focus': this.hasFocus }}
            ref={el => (this.optionListEl = el as HTMLInputElement)}
          >
            {this.filteredOptions.length < 1 && <p>No options available</p>}
            {this.filteredOptions.length > 0 &&
              this.filteredOptions.map((option, i) => (
                <div
                  onClick={() => this.optionSelectedListener(option)}
                  class={{
                    'option': true,
                    'option-selected': option.selected,
                    'option--highlighted': i === this.highlightIndex,
                  }}
                >
                  {option.label}
                </div>
              ))}
          </div>
        </div>
      </FormControl>
    );
  }
}
