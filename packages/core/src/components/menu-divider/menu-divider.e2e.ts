import { newE2EPage } from '@stencil/core/testing';

describe('gr-menu-divider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-menu-divider></gr-menu-divider>');

    const element = await page.find('gr-menu-divider');
    expect(element).toHaveClass('hydrated');
  });
});
