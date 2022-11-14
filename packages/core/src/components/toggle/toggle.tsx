import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'gr-toggle',
})
export class Toggle {

  @State() checked: boolean = false;

  handleChange(evt) {
    this.checked = evt.target.checked;
  }

  render() {
    return (
      <input
        type='checkbox'
        checked={this.checked}
        onInput={(evt) => this.handleChange(evt)}
      />
    );
  }
}
