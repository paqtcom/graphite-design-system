import { newE2EPage } from '@stencil/core/testing';

describe('way-checkbox', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-checkbox></way-checkbox>');

    const element = await page.find('way-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
