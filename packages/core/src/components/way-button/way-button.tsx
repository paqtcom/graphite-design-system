import { Component, Host, h, Prop } from '@stencil/core';
@Component({
  tag: 'way-button',
  styleUrl: 'way-button.scss',
  shadow: true,
})
export class WayButton {

  /**
   * The different variants.
   * The options are: `"default"`, `"primary"`, `"secondary"` and `"text"`.
   */
  @Prop({ reflect: true }) variant?: 'default' | 'primary' | 'secondary' | 'text' = 'default';

  /**
   * The button's size.
   */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

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

  render() {
    const { rel, target, href, variant, size } = this;
    const TagType = href === undefined ? 'button' : 'a' as any;
    const attrs = {
      href,
      rel,
      target,
    };

    return (
      <Host
        class={{
          [`button-${variant}`]: true,
          [`button-${size}`]: true,
          'button-circle': this.circle,
        }}
      >
        <TagType
          {...attrs}
          class="button-native"
          part="native"
        >
          <span class="button-inner">
            <slot name="icon-only"></slot>
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
          </span>
        </TagType>
      </Host>
    );
  }
}
