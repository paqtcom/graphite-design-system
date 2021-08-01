import { newE2EPage } from '@stencil/core/testing';

describe('gr-checkbox', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-checkbox></gr-checkbox>');

    const element = await page.find('gr-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
