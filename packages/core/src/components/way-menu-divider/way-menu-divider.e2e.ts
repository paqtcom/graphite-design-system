import { newE2EPage } from '@stencil/core/testing';

describe('way-menu-divider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-menu-divider></way-menu-divider>');

    const element = await page.find('way-menu-divider');
    expect(element).toHaveClass('hydrated');
  });
});
