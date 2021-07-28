import { Component, Host, h, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { inheritAttributes } from '../../utils/helpers';

/**
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot icon-only - Should be used on an icon in a button that has no text.
 * @slot start - Content is placed to the left of the button text (will be to the right when we support right-to-left direction)
 * @slot end - Content is placed to the right of the button text (will be to the left when we support right-to-left direction)
 */
@Component({
  tag: 'way-button',
  styleUrl: 'way-button.scss',
  shadow: true,
})
export class WayButton {
  private inheritedAttributes: { [k: string]: any } = {};

  @Element() el!: HTMLElement;

  /**
   * The different variants.
   * The options are: `"default"`, `"primary"`, `"secondary"`, `"danger"`, and `"plain"`.
   */
  @Prop({ reflect: true }) variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'plain' = 'default';

  /**
   * If `true`, the user cannot interact with the button.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Set to true to draw the button in a loading state.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * The button's size.
   */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Set to true to draw the button with a caret for use with dropdowns, popovers, etc.
   */
  @Prop() caret = false;

  /**
   * Set to true to draw a pill-style button with rounded edges.
   */
  @Prop({ reflect: true }) pill = false;

  /**
   * Set to `"block"` for a full-width button or to `"full"` for a full-width button
   * without left and right borders.
   */
  @Prop({ reflect: true }) expand?: 'full' | 'block';

  /**
   * Set to true to draw a circle button.
   */
  @Prop({ reflect: true }) circle = false;

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   */
  @Prop() href: string | undefined;

  /**
   * Specifies where to display the linked URL.
   * Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
   */
  @Prop() target: string | undefined;

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop() rel: string | undefined;

  /**
   * The type of the button.
   */
  @Prop() type: 'submit' | 'reset' | 'button' = 'button';

  /**
   * Emitted when the button has focus.
   */
  @Event({ eventName: 'way-focus' }) wayFocus!: EventEmitter<void>;

  /**
   * Emitted when the button loses focus.
   */
  @Event({ eventName: 'way-blur' }) wayBlur!: EventEmitter<void>;

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
  }

  private handleClick = (ev: MouseEvent) => {
    if (this.type !== 'button') {
      // this button wants to specifically submit/reset a form
      // climb up the dom to see if we're in a <form>
      // and if so, then use JS to submit/reset it
      const form = this.el.closest('form');
      if (form) {
        ev.preventDefault();

        const fakeButton = document.createElement('button');
        fakeButton.type = this.type;
        fakeButton.style.display = 'none';
        form.appendChild(fakeButton);
        fakeButton.click();
        fakeButton.remove();
      }
    }
  };

  private onFocus = () => {
    this.wayFocus.emit();
  };

  private onBlur = () => {
    this.wayBlur.emit();
  };

  render() {
    const { rel, target, href, variant, size, expand, type, inheritedAttributes, disabled } = this;
    const TagType = href === undefined ? 'button' : ('a' as any);
    const attrs =
      TagType === 'button'
        ? { type }
        : {
            href,
            rel,
            target,
          };

    return (
      <Host
        onClick={this.handleClick}
        aria-disabled={disabled ? 'true' : null}
        class={{
          [`button-${variant}`]: true,
          [`button-${size}`]: true,
          [`button-${expand}`]: expand !== undefined,
          'button-caret': this.caret,
          'button-circle': this.circle,
          'button-pill': this.pill,
          'button-disabled': disabled,
          'button-loading': this.loading,
        }}
      >
        <TagType
          {...attrs}
          class="button-native"
          disabled={disabled}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...inheritedAttributes}
        >
          <span class="button-inner">
            <span class="button-icon-only">
              <slot name="icon-only"></slot>
            </span>
            <span class="button-start">
              <slot name="start"></slot>
            </span>
            <span class="button-label">
              <slot></slot>
            </span>
            <span class="button-end">
              <slot name="end"></slot>
            </span>
            {this.caret && (
              <span class="caret">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                  <title>Chevron Down</title>
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="48"
                    d="M112 184l144 144 144-144"
                  />
                </svg>
              </span>
            )}
          </span>

          {this.loading && <way-spinner />}
        </TagType>
      </Host>
    );
  }
}
