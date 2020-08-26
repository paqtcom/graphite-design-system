import { newSpecPage } from '@stencil/core/testing';
import { WayButton } from '../way-button';

describe('way-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WayButton],
      html: `<way-button></way-button>`,
    });
    expect(page.root).toEqualHtml(`
      <way-button class="button-solid">
        <mock:shadow-root>
          <a class="button-native">
            <span class="button-inner">
              <slot name="start"></slot>
              <slot></slot>
              <slot name="end"></slot>
            </span>
          </a>
        </mock:shadow-root>
      </way-button>
    `);
  });

  it('renders with values', async () => {
    const page = await newSpecPage({
      components: [WayButton],
      html: `<way-button href="htts://www.way2web.nl" target="_blank">Website</way-button>`,
    });
    expect(page.root).toEqualHtml(`
      <way-button class="button-solid" href="htts://www.way2web.nl" target="_blank">
        <mock:shadow-root>
          <a class="button-native" href="htts://www.way2web.nl" target="_blank">
            <span class="button-inner">
              <slot name="start"></slot>
              <slot></slot>
              <slot name="end"></slot>
            </span>
          </a>
        </mock:shadow-root>
        Website
      </way-button>
    `);
  });
});
