import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import {
  GrButton
} from "@graphiteds/vue";

it('should render my component', async () => {
  const variant = 'primary';
  const page = await newSpecPage({
    components: [GrButton],
    template: () => (<gr-button variant={variant}></gr-button>),
  });
  expect(page.root).toEqualHtml(`
    <gr-button class="button-primary button-medium hydrated" variant="primary" size="medium"></gr-button>
  `);
});