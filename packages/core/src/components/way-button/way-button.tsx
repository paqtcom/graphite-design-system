import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'way-button',
  styleUrl: 'way-button.css',
  shadow: true,
})
export class WayButton {
  /**
   * Set to `"outline"` for a transparent button with a border, or to `"solid"`.
   * The default style is `"solid"`.
   */
  @Prop({ reflectToAttr: true, mutable: true }) fill?: 'outline' | 'solid';

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
    const { rel, target, href } = this;
    const attrs = {
      href,
      rel,
      target,
    };

    let fill = this.fill;
    if (fill === undefined) {
      fill = 'solid';
    }

    return (
      <Host
        class={{
          [`button-${fill}`]: true,
        }}
      >
        <a {...attrs} class="button-native">
          <span class="button-inner">
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
          </span>
        </a>
      </Host>
    );
  }
}
