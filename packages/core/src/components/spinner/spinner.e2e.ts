import { newE2EPage } from '@stencil/core/testing';

describe('gr-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-spinner></gr-spinner>');

    const element = await page.find('gr-spinner');
    expect(element).toHaveClass('hydrated');
  });
});
