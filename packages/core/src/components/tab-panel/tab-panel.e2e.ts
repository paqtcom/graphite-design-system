import { newE2EPage } from '@stencil/core/testing';

describe('gr-tab-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-tab-panel></gr-tab-panel>');

    const element = await page.find('gr-tab-panel');
    expect(element).toHaveClass('hydrated');
  });
});
