import { Component, Method, Element, Event, EventEmitter, Listen, State, Prop, Watch, h } from '@stencil/core';
import { IFormElementData } from '../../types/form';
import Fragment from '../way-fragment/way-fragment';
import { ISelectOption, ISelectConfig } from '../../types/select';

@Component({
  tag: 'way-autosuggest',
  styleUrl: 'way-autosuggest.scss',
  shadow: true,
})
export class W2wSelect {
  private optionListEl?: HTMLInputElement;
  private inputEl?: HTMLInputElement;
  @Element() el: HTMLElement;

  @Prop() options?: Array<ISelectOption> = [];
  @Prop() config?: ISelectConfig = {};
  @Prop() validation?: (value: any) => string[];
  @Prop() value?: string | Array<{ label: string; value: any }>;
  // used for w2w-form
  @Prop() name?: string;

  @State() inputValue: string = '';
  @State() hasFocus = false;
  @State() filteredOptions: Array<ISelectOption> = this.options;
  @State() localSelected = [];
  @State() localConfig: ISelectConfig = {
    selectedText: 'selected',
    maxTagWidth: '10rem',
    tagColor: 'green',
    ...this.config,
  };
  @State() highlightIndex: number = 0;

  // use until clicking outside works
  @State() scrollPos: number = 0;

  @Method()
  async getValue() {
    return this.localSelected;
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
      // todo: .scrollIntoView();
      return;
    }

    if (event.key === 'ArrowDown') {
      this.highlightIndex < this.filteredOptions.length -1 ? this.highlightIndex++ : this.filteredOptions.length;
      // todo: .scrollIntoView();
      return;
    }

    if (event.key === 'Enter' && this.hasFocus) {
      this.filteredOptions[this.highlightIndex] && this.optionSelectedListener(this.filteredOptions[this.highlightIndex]);
    }
  }
  /**
   * Strip attribute that aren't needed.
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

  @Event({ bubbles: true }) wayChange: EventEmitter<IFormElementData>;
  private valueSelectedHandler() {
    this.wayChange.emit({
      name: this.name,
      value: this.cleanData(),
      errors: this.validationErrors(),
    });
  }

  @Watch('options')
  private updateOptions() {
    if(!this.options || this.options.length < 1) return;
    this.filteredOptions = [...this.options].filter(option => option.label.indexOf(this.inputValue) !== -1);
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
   * @param {ISelectOption} option
   */
  private optionSelectedListener(option: ISelectOption) {
    if (!this.localConfig.multi) {
      this.localSelected = [option];
      this.unFocus();
    } else if (!option.selected) {
      this.localSelected.push(option);
    } else {
      this.localSelected = this.localSelected.filter(selected => selected.value !== option.value);
    }
    this.updateOptions();
  }

  /**
   * Listener when user removes a tag.
   * @param {ISelectOption} option
   */
  private removeTagListener(option) {
    if (!this.localSelected) return;

    this.localSelected = this.localSelected.filter(selectedOption => selectedOption.value != option.value);
    this.updateOptions();
  }

  // What kind of event is this? I can't use InputEvent type
  private handleOnInput = evt => {
    this.hasFocus = true;
    this.inputValue = evt.target.value;
    this.updateOptions();
  };

  private validationErrors(): string[] {
    return this.validation ? this.validation(this.localSelected) : [];
  }

  private calcMinInputWidth(): string {
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
    if (!this.localSelected) {
      return null;
    } else if (this.localSelected.length < this.localConfig.maxTags + 1) {
      return (
        <Fragment>
          {this.localSelected.length > 0 &&
            this.localSelected.map(tag => (
              <div title={tag.label} onClick={() => this.removeTagListener(tag)} class="tag" style={{ backgroundColor: this.config.tagColor }}>
                <span>{tag.label}</span>
              </div>
            ))}
        </Fragment>
      );
    } else {
      const text = `${this.localSelected.length} ${this.localConfig.selectedText}`;
      return (
        <div class="tag tag--counter" title={text} style={{ backgroundColor: this.config.tagColor }}>
          <span>{text}</span>
        </div>
      );
    }
  }

  componentWillLoad() {
    this.localSelected = typeof this.value === 'string' ? JSON.parse(this.value) : this.value;
    this.updateOptions();
  }

  render() {
    return (
      <div class={{ 'w2w-select': true, 'w2w-select--has-error': this.validationErrors().length > 0 }} onClick={() => this.inputEl && this.inputEl.focus()}>
        <div class={{ 'w2w-select__input-container': true, 'w2w-select__input-container--show': this.localConfig.multi }}>
          {this.renderTags()}
          <input
            ref={el => (this.inputEl = el as HTMLInputElement)}
            class="w2w-select__input"
            style={{ minWidth: this.calcMinInputWidth() }}
            type="text"
            onInput={this.handleOnInput}
            onClick={() => this.focus()}
            value={this.inputValue}
            onFocus={() => this.focus()}
          />
        </div>
        <div class={{ 'w2w-select__option-list': true, 'w2w-select__option-list--has-focus': this.hasFocus }} ref={el => (this.optionListEl = el as HTMLInputElement)}>
          {this.filteredOptions.length < 1 && <p>No options available</p>}
          {this.filteredOptions.length > 0 &&
            this.filteredOptions.map((option, i) => (
              <div onClick={() => this.optionSelectedListener(option)} class={{ 'w2w-select__option': true, 'w2w-select__option--selected': option.selected, 'w2w-select__option--highlighted': i === this.highlightIndex }}>
                {option.label}
              </div>
            ))}
        </div>
      </div>
    );
  }
}
