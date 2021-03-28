import { newE2EPage } from '@stencil/core/testing';

describe('way-menu-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-menu-label></way-menu-label>');

    const element = await page.find('way-menu-label');
    expect(element).toHaveClass('hydrated');
  });
});
