/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer } from './vue-component-lib/utils';

import type { JSX } from '@w2wds/core/components';

import { WayButton as WayButtonCmp } from '@w2wds/core/components/way-button.js';
import { WayDropdown as WayDropdownCmp } from '@w2wds/core/components/way-dropdown.js';
import { WayInput as WayInputCmp } from '@w2wds/core/components/way-input.js';
import { WayMenu as WayMenuCmp } from '@w2wds/core/components/way-menu.js';
import { WayMenuDivider as WayMenuDividerCmp } from '@w2wds/core/components/way-menu-divider.js';
import { WayMenuItem as WayMenuItemCmp } from '@w2wds/core/components/way-menu-item.js';
import { WayMenuLabel as WayMenuLabelCmp } from '@w2wds/core/components/way-menu-label.js';
import { WayRadio as WayRadioCmp } from '@w2wds/core/components/way-radio.js';
import { WayRadioGroup as WayRadioGroupCmp } from '@w2wds/core/components/way-radio-group.js';
import { WaySelect as WaySelectCmp } from '@w2wds/core/components/way-select.js';
import { WayTag as WayTagCmp } from '@w2wds/core/components/way-tag.js';


export const WayButton = /*@__PURE__*/ defineContainer<JSX.WayButton>('way-button', WayButtonCmp, [
  'variant',
  'disabled',
  'size',
  'caret',
  'pill',
  'expand',
  'circle',
  'href',
  'target',
  'rel',
  'type',
  'way-focus',
  'way-blur'
]);


export const WayDropdown = /*@__PURE__*/ defineContainer<JSX.WayDropdown>('way-dropdown', WayDropdownCmp, [
  'open',
  'placement',
  'closeOnSelect',
  'containingElement',
  'distance',
  'skidding',
  'hoist',
  'way-show',
  'way-after-show',
  'way-hide',
  'way-after-hide'
]);


export const WayInput = /*@__PURE__*/ defineContainer<JSX.WayInput>('way-input', WayInputCmp, [
  'value',
  'type',
  'pill',
  'disabled',
  'name',
  'placeholder',
  'size',
  'label',
  'helpText',
  'invalidText',
  'invalid',
  'inputmode',
  'way-change',
  'way-focus',
  'way-blur'
],
'value', 'v-way-change', 'way-change');


export const WayMenu = /*@__PURE__*/ defineContainer<JSX.WayMenu>('way-menu', WayMenuCmp, [
  'way-select'
]);


export const WayMenuDivider = /*@__PURE__*/ defineContainer<JSX.WayMenuDivider>('way-menu-divider', WayMenuDividerCmp);


export const WayMenuItem = /*@__PURE__*/ defineContainer<JSX.WayMenuItem>('way-menu-item', WayMenuItemCmp, [
  'checked',
  'value',
  'disabled'
]);


export const WayMenuLabel = /*@__PURE__*/ defineContainer<JSX.WayMenuLabel>('way-menu-label', WayMenuLabelCmp);


export const WayRadio = /*@__PURE__*/ defineContainer<JSX.WayRadio>('way-radio', WayRadioCmp, [
  'value',
  'disabled',
  'checked',
  'way-blur',
  'way-focus'
]);


export const WayRadioGroup = /*@__PURE__*/ defineContainer<JSX.WayRadioGroup>('way-radio-group', WayRadioGroupCmp, [
  'allowEmptySelection',
  'label',
  'invalidText',
  'invalid',
  'noFieldset',
  'name',
  'value',
  'way-change'
],
'value', 'v-way-change', 'way-change');


export const WaySelect = /*@__PURE__*/ defineContainer<JSX.WaySelect>('way-select', WaySelectCmp, [
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
  'helpText',
  'invalidText',
  'invalid',
  'clearable',
  'way-change',
  'way-focus',
  'way-blur'
],
'value', 'v-way-change', 'way-change');


export const WayTag = /*@__PURE__*/ defineContainer<JSX.WayTag>('way-tag', WayTagCmp, [
  'type',
  'size',
  'pill',
  'clearable',
  'way-clear'
]);


export const WayTextarea = /*@__PURE__*/ defineContainer<JSX.WayTextarea>('way-textarea', [
  'type',
  'name',
  'disabled',
  'maxlength',
  'label',
  'rows',
  'autofocus',
  'wayFocus',
  'wayBlur'
]);

