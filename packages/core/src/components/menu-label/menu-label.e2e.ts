import { newE2EPage } from '@stencil/core/testing';

describe('gr-menu-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-menu-label></gr-menu-label>');

    const element = await page.find('gr-menu-label');
    expect(element).toHaveClass('hydrated');
  });
});
