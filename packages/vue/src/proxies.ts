/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer } from './vue-component-lib/utils';

import type { JSX } from '@w2wds/core/components';

import { WayButton as WayButtonCmp } from '@w2wds/core/components/way-button.js';
import { WayDropdown as WayDropdownCmp } from '@w2wds/core/components/way-dropdown.js';
import { WayMenu as WayMenuCmp } from '@w2wds/core/components/way-menu.js';
import { WayMenuDivider as WayMenuDividerCmp } from '@w2wds/core/components/way-menu-divider.js';
import { WayMenuItem as WayMenuItemCmp } from '@w2wds/core/components/way-menu-item.js';
import { WayMenuLabel as WayMenuLabelCmp } from '@w2wds/core/components/way-menu-label.js';
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
  'required',
  'clearable',
  'invalid',
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

