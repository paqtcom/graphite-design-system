import { newE2EPage } from '@stencil/core/testing';

describe('gr-menu-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-menu-item></gr-menu-item>');

    const element = await page.find('gr-menu-item');
    expect(element).toHaveClass('hydrated');
  });
});
