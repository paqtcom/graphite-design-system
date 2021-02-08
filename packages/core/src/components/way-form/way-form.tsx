import { Component, Method, Event, EventEmitter, Element, h, State } from '@stencil/core';
import { IFormElement, IFormElementData } from '../../types/form';

@Component({
  tag: 'way-form',
  shadow: true,
})
export class WayForm {
  @Element() el: HTMLElement;
  @State() formState = {};

  @Method()
  async getValue() {
    return this.formState;
  }

  @Event({ bubbles: true }) valueChange: EventEmitter<object>;
  inputChange = async (data: IFormElementData) => {
    this.formState = {
      ...this.formState,
      [`${data.name}`]: {
        value: data.value,
        errors: data.errors,
      },
    };

    this.valueChange.emit(this.formState);
  };

  componentWillLoad() {
    /**
     * Inject callback fn to detect input changes
     */
    this.el.childNodes.forEach(async (element: IFormElement) => {
      if (element['form'] === true) {
        element.addEventListener('valueChange', (e: CustomEvent) => this.inputChange(e.detail));
      }
    });
  }

  render() {
    return (
      <form class="w2w-form">
        <slot />
      </form>
    );
  }
}
