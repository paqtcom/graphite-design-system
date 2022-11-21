import { newE2EPage } from '@stencil/core/testing';

describe('gr-tab', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-tab></gr-tab>');

    const element = await page.find('gr-tab');
    expect(element).toHaveClass('hydrated');
  });
});
