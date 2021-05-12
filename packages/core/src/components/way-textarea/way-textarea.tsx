import { Component, Host, h, Prop, Element, Event, EventEmitter, State } from '@stencil/core';
import { inheritAttributes } from '../../utils/utils';
@Component({
  tag: 'way-textarea',
  styleUrl: 'way-textarea.scss',
  shadow: true,
})
export class WayTextarea {
  private inheritedAttributes: { [k: string]: any } = {};

  @Element() el!: HTMLElement;

  /**
   * The state of the textarea's value attribute.
   */
  @State() value: string;

  /**
   * Specifies what type of textarea to use.
   */
  @Prop() type: string | undefined;

  /**
   * The textarea's name attribute.
   */
  @Prop({ reflect: true }) name: string | undefined;

  /**
   * If `true`, the user cannot interact with the textarea.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Specifies how many characters are allowed.
   */
  @Prop() maxlength: number;

  /**
   * The textarea's label. Alternatively, you can use the label slot.
   */
  @Prop() label: string | undefined;

 /**
   * Specifies how many textarea rows to use.
   */
  @Prop() rows: number | undefined;

 /**
   * If `true`, the textarea should autofocus.
   */
  @Prop({ reflect: true }) autofocus = false;


  /**
   * Emitted when the textarea has focus.
   */
  @Event() wayFocus!: EventEmitter<void>;

  /**
   * Emitted when the textarea loses focus.
   */
  @Event() wayBlur!: EventEmitter<void>;

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
  }

  private onFocus = () => {
    this.wayFocus.emit();
  }

  private onBlur = () => {
    this.wayBlur.emit();
  }

  handleChange(event) {
    this.value = event.target.value;
  }

  render() {
    const { type, name, disabled, rows, maxlength, autofocus, inheritedAttributes } = this;
    const attrs = {
      type,
      name,
      disabled,
      rows,
      maxlength,
      autofocus,
    }

    return (
      <Host
        aria-disabled={disabled ? 'true' : null}
        class={{
        }}
      >
        {this.label ? (
          <label
            class={{
              label: true,
            }}
            htmlFor={this.name}
          >
            { this.label }
          </label>
        ) : null }

        <textarea
          {...attrs}
          id={this.name}
          value={this.value}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          disabled={disabled}
          rows={rows}
          maxlength={maxlength}
          autofocus={autofocus}
          {...inheritedAttributes}
          onInput={(event) => this.handleChange(event)}
          class={{
            textarea: true,

            // States
            'textarea-disabled': disabled,
          }}
        />
      </Host>
    );
  }
}
