import { newE2EPage } from '@stencil/core/testing';

describe('gr-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-dropdown></gr-dropdown>');

    const element = await page.find('gr-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
