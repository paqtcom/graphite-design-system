import { Component, Method, State, h } from '@stencil/core';
import { IFormElementData } from '../../types/form';

@Component({
  tag: 'my-container',
  shadow: true,
})
export class MyContainer {
  private formEl?: HTMLWayFormElement;

  @State() selectOptions: any[] = [
    { label: 'noot', value: 134 },
    { label: 'mies', value: 135 },
    { label: 'aap', value: 137 },
    { label: 'boom', value: 139 },
    { label: 'lamp', value: 140 },
    { label: 'stoel', value: 141 },
    { label: 'appel gebak met kaneel', value: 142 },
    { label: 'peer', value: 143 },
    { label: 'Dit is een hele lange zing yeehhh', value: 144 },
    { label: 'water', value: 145 },
    { label: 'regen', value: 147 },
    { label: 'zon', value: 148 },
    { label: 'koek', value: 149 },
    { label: 'pot', value: 99 },
  ];
  @State() selected: any[] = [];
  @State() formState: any = {};

  @Method()
  async getVal() {
    return await this.formEl.getVal();
  }

  updateSelected(e: { detail: IFormElementData }) {
    this.selected = [...e.detail.value];
  }

  selectValidation(val) {
    return val.length < 1 ? ['select at least one'] : [];
  }

  render() {
    return (
      <div>
        <h1>container</h1>
        <way-form ref={el => (this.formEl = el)} onValueChange={e => (this.formState = e.detail)}>
          <h3>the form</h3>
          <way-select
            name="mySelection"
            form={true} // important for way-form to interact with component
            options={this.selectOptions}
            onValueChange={e => this.updateSelected(e)}
            validation={this.selectValidation}
            value={[
              { label: 'noot', value: 134 },
              { label: 'mies', value: 135 },
            ]}
            config={{
              multi: true,
              maxTags: 6,
              selectedText: 'geselecteerd',
              tagColor: 'rgba(60, 170, 180, 1)',
            }}
          />
        </way-form>
        <hr />
        <h4>w2-select value:</h4>
        {this.selected.map(s => {
          return <div>{s.label}</div>;
        })}
        <hr />
        <h4>w2-form value:</h4>
        <code>
          {JSON.stringify(this.formState)}
        </code>
      </div>
    );
  }
}
