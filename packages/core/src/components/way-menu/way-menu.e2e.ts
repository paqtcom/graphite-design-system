import { newE2EPage } from '@stencil/core/testing';

describe('way-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-menu></way-menu>');

    const element = await page.find('way-menu');
    expect(element).toHaveClass('hydrated');
  });
});
