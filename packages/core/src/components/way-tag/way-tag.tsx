import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'way-tag',
  styleUrl: 'way-tag.scss',
  shadow: true,
})
export class WayTag {
  /** The tag's type. */
  @Prop({ reflect: true }) type: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';

  /** The tag's size. */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Set to true to draw a pill-style tag with rounded edges. */
  @Prop({ reflect: true }) pill = false;

  /** Set to true to make the tag clearable. */
  @Prop({ reflect: true }) clearable = false;

  /** Emitted when the clear button is activated. */
  @Event({ eventName: 'wayClear' }) wayClear: EventEmitter;

  connectedCallback() {
    this.handleClearClick = this.handleClearClick.bind(this);
  }

  handleClearClick() {
    this.wayClear.emit();
  }

  render() {
    return (
      <Host>
        <span
          class={{
            'tag': true,
            [`tag-${this.type}`]: true,
            [`tag-${this.size}`]: true,
            'tag-pill': this.pill,
            'tag-clearable': this.clearable
          }}
        >
          <slot></slot>

          {this.clearable && (
            <way-button
              variant="plain"
              size="small"
              class="tag-clear"
              onClick={this.handleClearClick}
              tabindex="-1"
            >
              <svg slot="icon-only" xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M368 368L144 144M368 144L144 368'/></svg>
            </way-button>
          )}
        </span>
      </Host>
    );
  }
}
