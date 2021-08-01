import { newE2EPage } from '@stencil/core/testing';

describe('gr-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-menu></gr-menu>');

    const element = await page.find('gr-menu');
    expect(element).toHaveClass('hydrated');
  });
});
