import { Component, h, Prop, Event, EventEmitter, Element, State, Watch, Method } from '@stencil/core';
import { DuetDatePicker } from '@duetds/date-picker/custom-element';
import { DaysOfWeek } from '../../enums';
import { localization } from './date-localization';
import dateAdapter from './date-adapter';
import { DateDisabledPredicate, GrDatePickerChangeEvent, GrDatePickerDirection } from '../../interface';
import { DuetDatePickerChangeEvent } from '@duetds/date-picker/dist/types/components/duet-date-picker/duet-date-picker';
import { renderHiddenInput } from '../../utils/helpers';
import FormControl from '../../functional-components/form-control/form-control';
import { hasSlot } from '../../utils/slot';

let id = 0;

if (typeof customElements !== 'undefined' && !customElements.get('duet-date-picker')) {
  customElements.define('duet-date-picker', DuetDatePicker);
}

@Component({
  tag: 'gr-date-picker',
  styleUrl: 'date-picker.scss',
  shadow: true,
})
export class DatePicker {
  private inputId = `date-picker-${++id}`;
  private labelId = `date-picker-label-${id}`;
  private helpTextId = `date-picker-help-text-${id}`;
  private invalidTextId = `date-picker-invalid-text-${id}`;
  private duetDatePicker: HTMLDuetDatePickerElement;

  @Element() el: HTMLGrDatePickerElement;

  @State() hasHelpTextSlot = false;
  @State() hasInvalidTextSlot = false;
  @State() hasLabelSlot = false;

  /**
   * Name of the date picker input.
   */
  @Prop() name: string = '';

  /** The date picker input's placeholder text. */
  @Prop() placeholder = '';

  /**
   * Makes the date picker input component disabled. This prevents users from being able to
   * interact with the input, and conveys its inactive state to assistive technologies.
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Forces the opening direction of the calendar modal to be always left or right.
   * This setting can be useful when the input is smaller than the opening date picker
   * would be as by default the picker always opens towards right.
   */
  @Prop() direction: GrDatePickerDirection = 'right';

  /**
   * Date value. Must be in IS0-8601 format: YYYY-MM-DD.
   */
  @Prop({ reflect: true, mutable: true }) value: string = '';

  /**
   * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the max property.
   */
  @Prop() min: string = '';

  /**
   * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the min property.
   */
  @Prop() max: string = '';

  /**
   * Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.
   * Default is Monday.
   */
  @Prop() firstDayOfWeek: DaysOfWeek = DaysOfWeek.Monday;

  /**
   * Controls which days are disabled and therefore disallowed.
   * For example, this can be used to disallow selection of weekends.
   */
  @Prop() isDateDisabled: DateDisabledPredicate = () => false;

  /** The date picker's label. Alternatively, you can use the label slot. */
  @Prop() label = '';

  /** Set to true to display a required indicator, adds an asterisk to label */
  @Prop() requiredIndicator = false;

  /** The date picker's help text. Alternatively, you can use the help-text slot. */
  @Prop() helpText = '';

  /** The date picker's invalid text. Alternatively, you can use the invalid-text slot. */
  @Prop() invalidText = '';

  /** Set to true to indicate this field is invalid. Will display the invalid text instead of the help text */
  @Prop({ reflect: true }) invalid = false;

  @Watch('helpText')
  @Watch('invalidText')
  @Watch('label')
  handleLabelChange() {
    this.handleSlotChange();
  }

  /** Emitted when a date is selected. */
  @Event({ eventName: 'gr-change' }) grChange!: EventEmitter<GrDatePickerChangeEvent>;

  /** Emitted when the date picker input gains focus. */
  @Event({ eventName: 'gr-focus' }) grFocus!: EventEmitter<void>;

  /** Emitted when the date picker input loses focus. */
  @Event({ eventName: 'gr-blur' }) grBlur!: EventEmitter<void>;

  /** Emitted when the panel opens. */
  @Event({ eventName: 'gr-open' }) grOpen!: EventEmitter<void>;

  /** Emitted when the panel closes. */
  @Event({ eventName: 'gr-close' }) grClose!: EventEmitter<void>;

  connectedCallback() {
    this.handleDuetChange = this.handleDuetChange.bind(this);
    this.handleDuetFocus = this.handleDuetFocus.bind(this);
    this.handleDuetBlur = this.handleDuetBlur.bind(this);
    this.handleDuetOpen = this.handleDuetOpen.bind(this);
    this.handleDuetClose = this.handleDuetClose.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);

    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }

  componentWillLoad() {
    this.handleSlotChange();
  }

  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }

  /**
   * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
   */
  @Method()
  async setFocus() {
    return this.duetDatePicker.setFocus();
  }

  /**
   * Show the calendar modal, moving focus to the calendar inside.
   */
  @Method()
  async show() {
    this.duetDatePicker.show();
  }

  /**
   * Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
   * returning to the date picker's button. Default is true.
   */
  @Method()
  async hide(moveFocusToButton = true) {
    this.duetDatePicker.hide(moveFocusToButton);
  }

  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
    this.hasLabelSlot = hasSlot(this.el, 'label');
  }

  handleLabelClick() {
    this.duetDatePicker.setFocus();
  }

  handleDuetChange(event: CustomEvent<DuetDatePickerChangeEvent>) {
    event.stopPropagation();

    this.value = event.detail.value;

    this.grChange.emit({
      component: 'gr-date-picker',
      value: event.detail.value,
      valueAsDate: event.detail.valueAsDate,
    });
  }

  handleDuetFocus(event: CustomEvent) {
    event.stopPropagation();

    this.grFocus.emit();
  }

  handleDuetBlur(event: CustomEvent) {
    event.stopPropagation();

    this.grBlur.emit();
  }

  handleDuetOpen(event: CustomEvent) {
    event.stopPropagation();

    this.grOpen.emit();
  }

  handleDuetClose(event: CustomEvent) {
    event.stopPropagation();

    this.grClose.emit();
  }

  render() {
    renderHiddenInput(this.el, this.name, this.value, this.disabled);

    const helpText = this.helpText ? this.helpText : localization.helpText;

    return (
      <FormControl
        inputId={this.inputId}
        label={this.label}
        labelId={this.labelId}
        hasLabelSlot={this.hasLabelSlot}
        helpTextId={this.helpTextId}
        helpText={helpText}
        hasHelpTextSlot={this.hasHelpTextSlot}
        invalidTextId={this.invalidTextId}
        invalidText={this.invalidText}
        invalid={this.invalid}
        size="medium"
        hasInvalidTextSlot={this.hasInvalidTextSlot}
        onLabelClick={this.handleLabelClick}
        requiredIndicator={this.requiredIndicator}
      >
        <duet-date-picker
          ref={el => (this.duetDatePicker = el)}
          name={this.name}
          disabled={this.disabled}
          direction={this.direction}
          value={this.value}
          min={this.min}
          max={this.max}
          firstDayOfWeek={this.firstDayOfWeek}
          localization={{ ...localization, placeholder: this.placeholder }}
          dateAdapter={dateAdapter}
          isDateDisabled={this.isDateDisabled}
          onDuetChange={this.handleDuetChange}
          onDuetFocus={this.handleDuetFocus}
          onDuetBlur={this.handleDuetBlur}
          onDuetOpen={this.handleDuetOpen}
          onDuetClose={this.handleDuetClose}
          class={{
            'date-picker-disabled': this.disabled,
            'date-picker-invalid': this.invalid,
          }}
        ></duet-date-picker>
      </FormControl>
    );
  }
}
