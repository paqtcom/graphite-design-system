/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer } from './vue-component-lib/utils';

import type { JSX } from '@graphiteds/core/components';

import { defineCustomElement as defineGrButton } from '@graphiteds/core/components/gr-button.js';
import { defineCustomElement as defineGrCheckbox } from '@graphiteds/core/components/gr-checkbox.js';
import { defineCustomElement as defineGrDatePicker } from '@graphiteds/core/components/gr-date-picker.js';
import { defineCustomElement as defineGrDropdown } from '@graphiteds/core/components/gr-dropdown.js';
import { defineCustomElement as defineGrFieldGroup } from '@graphiteds/core/components/gr-field-group.js';
import { defineCustomElement as defineGrInput } from '@graphiteds/core/components/gr-input.js';
import { defineCustomElement as defineGrMenu } from '@graphiteds/core/components/gr-menu.js';
import { defineCustomElement as defineGrMenuDivider } from '@graphiteds/core/components/gr-menu-divider.js';
import { defineCustomElement as defineGrMenuItem } from '@graphiteds/core/components/gr-menu-item.js';
import { defineCustomElement as defineGrMenuLabel } from '@graphiteds/core/components/gr-menu-label.js';
import { defineCustomElement as defineGrRadio } from '@graphiteds/core/components/gr-radio.js';
import { defineCustomElement as defineGrRadioGroup } from '@graphiteds/core/components/gr-radio-group.js';
import { defineCustomElement as defineGrSelect } from '@graphiteds/core/components/gr-select.js';
import { defineCustomElement as defineGrSpinner } from '@graphiteds/core/components/gr-spinner.js';
import { defineCustomElement as defineGrTab } from '@graphiteds/core/components/gr-tab.js';
import { defineCustomElement as defineGrTabGroup } from '@graphiteds/core/components/gr-tab-group.js';
import { defineCustomElement as defineGrTabPanel } from '@graphiteds/core/components/gr-tab-panel.js';
import { defineCustomElement as defineGrTag } from '@graphiteds/core/components/gr-tag.js';
import { defineCustomElement as defineGrTextarea } from '@graphiteds/core/components/gr-textarea.js';


export const GrButton = /*@__PURE__*/ defineContainer<JSX.GrButton>('gr-button', defineGrButton, [
  'variant',
  'disabled',
  'loading',
  'size',
  'caret',
  'pill',
  'expand',
  'circle',
  'href',
  'target',
  'rel',
  'type',
  'gr-focus',
  'gr-blur'
]);


export const GrCheckbox = /*@__PURE__*/ defineContainer<JSX.GrCheckbox>('gr-checkbox', defineGrCheckbox, [
  'value',
  'disabled',
  'name',
  'checked',
  'indeterminate',
  'invalidText',
  'invalid',
  'alignment',
  'gr-blur',
  'gr-focus',
  'gr-change'
],
'checked', 'gr-change');


export const GrDatePicker = /*@__PURE__*/ defineContainer<JSX.GrDatePicker>('gr-date-picker', defineGrDatePicker, [
  'name',
  'placeholder',
  'disabled',
  'direction',
  'value',
  'min',
  'max',
  'firstDayOfWeek',
  'isDateDisabled',
  'label',
  'requiredIndicator',
  'helpText',
  'invalidText',
  'invalid',
  'localization',
  'gr-change',
  'gr-focus',
  'gr-blur',
  'gr-open',
  'gr-close'
],
'value', 'gr-change');


export const GrDropdown = /*@__PURE__*/ defineContainer<JSX.GrDropdown>('gr-dropdown', defineGrDropdown, [
  'open',
  'placement',
  'closeOnSelect',
  'containingElement',
  'distance',
  'skidding',
  'hoist',
  'gr-show',
  'gr-after-show',
  'gr-hide',
  'gr-after-hide'
]);


export const GrFieldGroup = /*@__PURE__*/ defineContainer<JSX.GrFieldGroup>('gr-field-group', defineGrFieldGroup, [
  'label',
  'horizontal'
]);


export const GrInput = /*@__PURE__*/ defineContainer<JSX.GrInput>('gr-input', defineGrInput, [
  'value',
  'type',
  'pill',
  'disabled',
  'name',
  'placeholder',
  'size',
  'label',
  'requiredIndicator',
  'helpText',
  'invalidText',
  'invalid',
  'clearable',
  'inputmode',
  'readonly',
  'maxlength',
  'spellcheck',
  'min',
  'max',
  'step',
  'pattern',
  'enterkeyhint',
  'autocapitalize',
  'autocomplete',
  'autocorrect',
  'autofocus',
  'debounce',
  'togglePassword',
  'hideAppearance',
  'gr-change',
  'gr-clear',
  'gr-input',
  'gr-focus',
  'gr-blur'
],
'value', 'gr-change');


export const GrMenu = /*@__PURE__*/ defineContainer<JSX.GrMenu>('gr-menu', defineGrMenu, [
  'gr-select'
]);


export const GrMenuDivider = /*@__PURE__*/ defineContainer<JSX.GrMenuDivider>('gr-menu-divider', defineGrMenuDivider);


export const GrMenuItem = /*@__PURE__*/ defineContainer<JSX.GrMenuItem>('gr-menu-item', defineGrMenuItem, [
  'checked',
  'value',
  'disabled'
]);


export const GrMenuLabel = /*@__PURE__*/ defineContainer<JSX.GrMenuLabel>('gr-menu-label', defineGrMenuLabel);


export const GrRadio = /*@__PURE__*/ defineContainer<JSX.GrRadio>('gr-radio', defineGrRadio, [
  'value',
  'disabled',
  'checked',
  'alignment',
  'gr-blur',
  'gr-focus'
]);


export const GrRadioGroup = /*@__PURE__*/ defineContainer<JSX.GrRadioGroup>('gr-radio-group', defineGrRadioGroup, [
  'allowEmptySelection',
  'label',
  'requiredIndicator',
  'invalidText',
  'invalid',
  'horizontal',
  'name',
  'value',
  'gr-change'
],
'value', 'gr-change');


export const GrSelect = /*@__PURE__*/ defineContainer<JSX.GrSelect>('gr-select', defineGrSelect, [
  'multiple',
  'maxTagsVisible',
  'disabled',
  'name',
  'placeholder',
  'size',
  'hoist',
  'value',
  'pill',
  'label',
  'requiredIndicator',
  'helpText',
  'invalidText',
  'invalid',
  'clearable',
  'gr-change',
  'gr-focus',
  'gr-blur'
],
'value', 'gr-change');


export const GrSpinner = /*@__PURE__*/ defineContainer<JSX.GrSpinner>('gr-spinner', defineGrSpinner);


export const GrTab = /*@__PURE__*/ defineContainer<JSX.GrTab>('gr-tab', defineGrTab, [
  'panel',
  'active',
  'disabled',
  'gr-focus',
  'gr-blur'
]);


export const GrTabGroup = /*@__PURE__*/ defineContainer<JSX.GrTabGroup>('gr-tab-group', defineGrTabGroup, [
  'placement',
  'tabSize',
  'routeNavigation'
]);


export const GrTabPanel = /*@__PURE__*/ defineContainer<JSX.GrTabPanel>('gr-tab-panel', defineGrTabPanel, [
  'name',
  'active'
]);


export const GrTag = /*@__PURE__*/ defineContainer<JSX.GrTag>('gr-tag', defineGrTag, [
  'type',
  'size',
  'pill',
  'clearable',
  'truncate',
  'title',
  'gr-clear'
]);


export const GrTextarea = /*@__PURE__*/ defineContainer<JSX.GrTextarea>('gr-textarea', defineGrTextarea, [
  'size',
  'name',
  'value',
  'label',
  'requiredIndicator',
  'helpText',
  'invalidText',
  'invalid',
  'placeholder',
  'rows',
  'resize',
  'disabled',
  'readonly',
  'maxlength',
  'inputmode',
  'spellcheck',
  'enterkeyhint',
  'autocapitalize',
  'autocorrect',
  'autofocus',
  'debounce',
  'gr-change',
  'gr-input',
  'gr-focus',
  'gr-blur'
],
'value', 'gr-change');

