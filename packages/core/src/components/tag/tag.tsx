import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

/**
 * @slot - The tag's content.
 */
@Component({
  tag: 'gr-tag',
  styleUrl: 'tag.scss',
  shadow: true,
})
export class Tag {
  /** The tag's type. */
  @Prop({ reflect: true }) type: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';

  /** The tag's size. */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Set to true to draw a pill-style tag with rounded edges. */
  @Prop({ reflect: true }) pill = false;

  /** Set to true to make the tag clearable. */
  @Prop({ reflect: true }) clearable = false;

  /** Set to true to make the tag truncated. */
  @Prop({ reflect: true }) truncate = false;

  /** The tag's title. */
  @Prop({ reflect: true }) title = '';

  /** Emitted when the clear button is activated. */
  @Event({ eventName: 'gr-clear' }) grClear: EventEmitter<void>;

  connectedCallback() {
    this.handleClearClick = this.handleClearClick.bind(this);
  }

  handleClearClick() {
    this.grClear.emit();
  }

  render() {
    return (
      <Host
        class={{
          [`tag-${this.type}`]: true,
          [`tag-${this.size}`]: true,
          'tag-pill': this.pill,
          'tag-clearable': this.clearable,
        }}
      >
        <span class="tag">
          <span class={{ 'tag-truncate': this.truncate }} title={this.title}>
            <slot></slot>
          </span>

          {this.clearable && (
            <gr-button
              variant="plain"
              size={this.size}
              class="tag-clear"
              aria-label="clear"
              onClick={this.handleClearClick}
            >
              <svg slot="icon-only" role="img" aria-hidden="true" viewBox="0 0 512 512">
                <title>Close</title>
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M368 368L144 144M368 144L144 368"
                />
              </svg>
            </gr-button>
          )}
        </span>
      </Host>
    );
  }
}
