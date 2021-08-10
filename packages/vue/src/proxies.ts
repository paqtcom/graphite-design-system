/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer } from './vue-component-lib/utils';

import type { JSX } from '@graphiteds/core/components';

import { GrButton as GrButtonCmp } from '@graphiteds/core/components/gr-button.js';
import { GrCheckbox as GrCheckboxCmp } from '@graphiteds/core/components/gr-checkbox.js';
import { GrDropdown as GrDropdownCmp } from '@graphiteds/core/components/gr-dropdown.js';
import { GrFieldGroup as GrFieldGroupCmp } from '@graphiteds/core/components/gr-field-group.js';
import { GrInput as GrInputCmp } from '@graphiteds/core/components/gr-input.js';
import { GrMenu as GrMenuCmp } from '@graphiteds/core/components/gr-menu.js';
import { GrMenuDivider as GrMenuDividerCmp } from '@graphiteds/core/components/gr-menu-divider.js';
import { GrMenuItem as GrMenuItemCmp } from '@graphiteds/core/components/gr-menu-item.js';
import { GrMenuLabel as GrMenuLabelCmp } from '@graphiteds/core/components/gr-menu-label.js';
import { GrRadio as GrRadioCmp } from '@graphiteds/core/components/gr-radio.js';
import { GrRadioGroup as GrRadioGroupCmp } from '@graphiteds/core/components/gr-radio-group.js';
import { GrSelect as GrSelectCmp } from '@graphiteds/core/components/gr-select.js';
import { GrSpinner as GrSpinnerCmp } from '@graphiteds/core/components/gr-spinner.js';
import { GrTag as GrTagCmp } from '@graphiteds/core/components/gr-tag.js';
import { GrTextarea as GrTextareaCmp } from '@graphiteds/core/components/gr-textarea.js';


export const GrButton = /*@__PURE__*/ defineContainer<JSX.GrButton>('gr-button', GrButtonCmp, [
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


export const GrCheckbox = /*@__PURE__*/ defineContainer<JSX.GrCheckbox>('gr-checkbox', GrCheckboxCmp, [
  'value',
  'disabled',
  'name',
  'checked',
  'indeterminate',
  'invalidText',
  'invalid',
  'gr-blur',
  'gr-focus',
  'gr-change'
],
'checked', 'v-gr-change', 'gr-change');


export const GrDropdown = /*@__PURE__*/ defineContainer<JSX.GrDropdown>('gr-dropdown', GrDropdownCmp, [
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


export const GrFieldGroup = /*@__PURE__*/ defineContainer<JSX.GrFieldGroup>('gr-field-group', GrFieldGroupCmp, [
  'label',
  'horizontal'
]);


export const GrInput = /*@__PURE__*/ defineContainer<JSX.GrInput>('gr-input', GrInputCmp, [
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
  'spellcheck',
  'min',
  'max',
  'step',
  'enterkeyhint',
  'autocapitalize',
  'autocomplete',
  'autocorrect',
  'autofocus',
  'debounce',
  'gr-change',
  'gr-clear',
  'gr-input',
  'gr-focus',
  'gr-blur'
],
'value', 'v-gr-change', 'gr-change');


export const GrMenu = /*@__PURE__*/ defineContainer<JSX.GrMenu>('gr-menu', GrMenuCmp, [
  'gr-select'
]);


export const GrMenuDivider = /*@__PURE__*/ defineContainer<JSX.GrMenuDivider>('gr-menu-divider', GrMenuDividerCmp);


export const GrMenuItem = /*@__PURE__*/ defineContainer<JSX.GrMenuItem>('gr-menu-item', GrMenuItemCmp, [
  'checked',
  'value',
  'disabled'
]);


export const GrMenuLabel = /*@__PURE__*/ defineContainer<JSX.GrMenuLabel>('gr-menu-label', GrMenuLabelCmp);


export const GrRadio = /*@__PURE__*/ defineContainer<JSX.GrRadio>('gr-radio', GrRadioCmp, [
  'value',
  'disabled',
  'checked',
  'gr-blur',
  'gr-focus'
]);


export const GrRadioGroup = /*@__PURE__*/ defineContainer<JSX.GrRadioGroup>('gr-radio-group', GrRadioGroupCmp, [
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
'value', 'v-gr-change', 'gr-change');


export const GrSelect = /*@__PURE__*/ defineContainer<JSX.GrSelect>('gr-select', GrSelectCmp, [
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
'value', 'v-gr-change', 'gr-change');


export const GrSpinner = /*@__PURE__*/ defineContainer<JSX.GrSpinner>('gr-spinner', GrSpinnerCmp);


export const GrTag = /*@__PURE__*/ defineContainer<JSX.GrTag>('gr-tag', GrTagCmp, [
  'type',
  'size',
  'pill',
  'clearable',
  'gr-clear'
]);


export const GrTextarea = /*@__PURE__*/ defineContainer<JSX.GrTextarea>('gr-textarea', GrTextareaCmp, [
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
'value', 'v-gr-change', 'gr-change');

