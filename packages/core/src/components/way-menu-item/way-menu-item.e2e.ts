import { newE2EPage } from '@stencil/core/testing';

describe('way-menu-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-menu-item></way-menu-item>');

    const element = await page.find('way-menu-item');
    expect(element).toHaveClass('hydrated');
  });
});
