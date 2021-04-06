import { Component, Host, Element, Event, EventEmitter, Listen, State, Prop, Watch, h } from '@stencil/core';
import { FormElementData } from '@/types/form';
import { WayAutosuggestOption, WayAutosuggestConfig } from '@/types/autosuggest';
import { renderInputOutsideShadowRoot } from '@/utils/utils';

@Component({
  tag: 'way-autosuggest',
  styleUrl: 'way-autosuggest.scss',
  shadow: true,
})
export class WayAutoselect {
  private optionListEl?: HTMLInputElement;
  private inputEl?: HTMLInputElement;
  @Element() el!: HTMLWayAutosuggestElement;

  @Prop() options?: Array<WayAutosuggestOption> = [];
  @Prop() config?: WayAutosuggestConfig = {};
  @Prop() validation?: (value: any) => string[];
  @Prop() valueSelector: string | ((item: unknown, index: number)=>string[]);
  @Prop() value?: string | Array<{ label: string; value: any }>;
  @Prop() name: string;
  @Prop() placeholder?: string;

  @State() inputValue: string = '';
  @State() hasFocus = false;
  @State() filteredOptions: Array<WayAutosuggestOption> = this.options;
  @State() localSelected = [];
  @State() localConfig: WayAutosuggestConfig = {
    selectedText: 'selected',
    maxTagWidth: '10rem',
    ...this.config,
  };
  @State() highlightIndex: number = 0;

  // use until clicking outside works
  @State() scrollPos: number = 0;

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
      this.highlightIndex < this.filteredOptions.length -1 ? this.highlightIndex++ : this.filteredOptions.length;
      this.setScrollPosition('down', this.highlightIndex);
      return;
    }

    if (event.key === 'Enter' && this.hasFocus) {
      this.filteredOptions[this.highlightIndex] && this.optionSelectedListener(this.filteredOptions[this.highlightIndex]);
    }

    // todo: when hitting backspace while !inputValue, remove last item from array localSelected
  }

  private renderHiddenInput() {
    // if a valueSelector callback function prop is given, return comma separated string instead of JSON
    if(this.localSelected && typeof this.valueSelector === 'function') {
      const commaSeparatedString = this.localSelected.map(this.valueSelector).join();
      renderInputOutsideShadowRoot(this.el.parentElement, this.name, commaSeparatedString);
    } else if(this.localSelected && typeof this.valueSelector === 'string') {
      const commaSeparatedString = this.localSelected.map((local) => local[`${this.valueSelector}`]).join();
      renderInputOutsideShadowRoot(this.el.parentElement, this.name, commaSeparatedString);
    } else {
      renderInputOutsideShadowRoot(this.el.parentElement, this.name, JSON.stringify(this.localSelected));
    }
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

    if(direction === 'down' && firstOption.offsetHeight * highlightIndex > bottom - marginOfError) {
      this.optionListEl.scrollTop += firstOption.offsetHeight;
      
    } else if (direction === 'up' && firstOption.offsetHeight * highlightIndex + 10 < top + marginOfError) {
      this.optionListEl.scrollTop -=firstOption.offsetHeight;
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

  @Event({ bubbles: true }) wayChange: EventEmitter<FormElementData>;

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
  private watchValue() {
    this.localSelected = typeof this.value === 'string' ? JSON.parse(this.value) : this.value;
    this.updateOptions();
  }

  @Watch('options')
  private updateOptions() {
    if (!this.options || this.options.length < 1) return;
    this.filteredOptions = [...this.options]
      .filter(option => 
        option.label.toLowerCase()
        // Take care of diacritical marks with normalize and replace:
        // https://thread.engineering/2018-08-29-searching-and-sorting-text-with-diacritical-marks-in-javascript/
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .indexOf(this.inputValue.toLowerCase()) !== -1
      );
      
    this.value = this.localSelected;
    this.markSelectedOptions();
    this.sortFilteredOptions();
    this.valueSelectedHandler();
  }

  private sortFilteredOptions() {
    this.filteredOptions = [...this.filteredOptions].sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }));
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
    if (!this.localConfig.multi) {
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
    const index = this.localSelected.findIndex((selectedOption)=> selectedOption.value === option.value);
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
    // No tags
    if (this.localSelected.length === 0) {
      return null;
    // If tags not exceeds maxTags
    } else if (this.localSelected.length < this.localConfig.maxTags + 1) {
      return (
        <this.Fragment>
          {this.localSelected.length > 0 &&
            this.localSelected.map(tag => (
              <div title={tag.label} onClick={() => this.removeTag(tag)} class="tag" style={{ backgroundColor: this.config.tagColor }}>
                <span>{tag.label}</span>
              </div>
            ))}
        </this.Fragment>
      );
      // If maxTags is not set or If tags exceed maxTags
    } else {
      const text = `${this.localSelected.length} ${this.localConfig.selectedText}`;
      return (
        <div class="tag counter" title={text} style={{ backgroundColor: this.config.tagColor }}>
          <span>{text}</span>
        </div>
      );
    }
  }

  /**
   * Used to render multiple HTMLElements without using a wrapper element.
   * In React JSX we can use '<> <div/><div/><div/> </>' but is not allowed in TS for StencilJS.
   * 
   * @param { any } _
   * @param { HTMLElement[] } children 
   * 
   * @returns HTMLElement[]
   */
  private Fragment = (_: any, children: HTMLElement[]): HTMLElement[] => [ ...children ];

  componentWillLoad() {
    if (this.value) {
      this.localSelected = typeof this.value === 'string' ? JSON.parse(this.value) : this.value;
    }
    this.updateOptions();
    this.renderHiddenInput();
  }

  render() {
    return (
      <Host>
        <div class={{ 'way-autosuggest': true, 'has-error': this.validationErrors().length > 0 }} onClick={() => this.inputEl && this.inputEl.focus()}>
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
          <div class={{ 'option-list': true, 'has-focus': this.hasFocus }} ref={el => (this.optionListEl = el as HTMLInputElement)}>
            {this.filteredOptions.length < 1 && <p>No options available</p>}
            {this.filteredOptions.length > 0 &&
              this.filteredOptions.map((option, i) => (
                <div onClick={() => this.optionSelectedListener(option)} class={{ 'option': true, 'option-selected': option.selected, 'option--highlighted': i === this.highlightIndex }}>
                  {option.label}
                </div>
              ))}
          </div>
        </div>
      </Host>
    );
  }
}
