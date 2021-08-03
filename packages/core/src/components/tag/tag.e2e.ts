import { newE2EPage } from '@stencil/core/testing';

describe('gr-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-tag></gr-tag>');

    const element = await page.find('gr-tag');
    expect(element).toHaveClass('hydrated');
  });
});
