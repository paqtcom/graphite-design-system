import { Component, Method, Element, Event, EventEmitter, Listen, State, Prop, Watch, h } from '@stencil/core';
import { IFormElementData } from '../../types/forms';
import Fragment from '../way-fragment/way-fragment';

export interface ISelectOption {
  label: string;
  value: any;
  selected?: boolean;
}

export interface IselectConfig {
  selectedText?: string;
  multi?: boolean;
  maxTagWidth?: string;
  maxTags?: number;
  tagColor?: string;
}

@Component({
  tag: 'way-select',
  styleUrl: 'way-select.scss',
  shadow: true,
})
export class W2wSelect {
  private optionListEl?: HTMLInputElement;
  private inputEl?: HTMLInputElement;
  @Element() el: HTMLElement;

  @Prop() options?: Array<ISelectOption> = [];
  @Prop() config?: IselectConfig = {};
  @Prop() validation?: (value: any) => string[];
  @Prop() value?: Array<{ label: string; value: any }>;
  // used for w2w-form
  @Prop() name?: string;
  @Prop() form?: boolean;

  @State() inputValue: string = '';
  @State() hasFocus = false;
  @State() filteredOptions: Array<ISelectOption> = this.options;
  @State() localSelected: Array<ISelectOption> = [];
  @State() localConfig: IselectConfig = {
    selectedText: 'selected',
    maxTagWidth: '10rem',
    tagColor: 'green',
    ...this.config,
  };

  // use until clicking outside works
  @State() scrollPos: number = 0;

  @Method()
  async getVal() {
    return this.localSelected;
  }

  @Listen('click', { target: 'window' })
  handleOutsideClick() {
    // if this component has a parent component, e.target is parent instead of this.
    // Therefore we cannot check for this.el !== e.target
    this.hasFocus = false;
  }

  /**
   * Strip attribute that aren't needed.
   */
  private cleanData(): any[] {
    return this.localSelected.map(({ selected, ...toKeepAttrs }) => toKeepAttrs);
  }

  // hack for the handleOutsideClick "bug"
  private delayedFocus() {
    setTimeout(() => {
      this.hasFocus = true;
      this.optionListEl.scrollTop = this.scrollPos;
    }, 0);
  }

  @Event({ bubbles: true }) valueChange: EventEmitter<IFormElementData>;
  private valueSelectedHandler() {
    this.valueChange.emit({
      name: this.name,
      value: this.cleanData(),
      errors: this.validationErrors(),
    });
  }

  @Watch('options')
  private updateOptions() {
    this.filteredOptions = [...this.options].filter(option => option.label.indexOf(this.inputValue) !== -1);
    this.markSelectedOptions();
    this.sortFilteredOptions();
    this.valueSelectedHandler();
  }

  private sortFilteredOptions() {
    this.filteredOptions = [...this.filteredOptions].sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }));
  }

  private markSelectedOptions() {
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
    } else if (!option.selected) {
      this.localSelected.push(option);
    } else {
      this.localSelected = this.localSelected.filter(selected => selected.value !== option.value);
    }
    this.delayedFocus();
    this.updateOptions();
  }

  /**
   * Listener when user removes a tag.
   * @param {ISelectOption} option
   */
  private removeTagListener(option) {
    this.localSelected = [...this.localSelected].filter(selectedOption => selectedOption.value != option.value);
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
    if (this.localSelected.length < this.localConfig.maxTags + 1) {
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
    this.localSelected = this.value;
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
            onClick={() => this.delayedFocus()}
            value={this.inputValue}
            onFocus={() => (this.hasFocus = true)}
          />
        </div>
        <div class={{ 'w2w-select__option-list': true, 'w2w-select__option-list--has-focus': this.hasFocus }} ref={el => (this.optionListEl = el as HTMLInputElement)}>
          {this.filteredOptions.length < 1 && <p>No options available</p>}
          {this.filteredOptions.length > 0 &&
            this.filteredOptions.map(option => (
              <div onClick={() => this.optionSelectedListener(option)} class={{ 'w2w-select__option': true, 'w2w-select__option--selected': option.selected }}>
                {option.label}
              </div>
            ))}
        </div>
      </div>
    );
  }
}
