import { newE2EPage } from '@stencil/core/testing';

describe('way-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-dropdown></way-dropdown>');

    const element = await page.find('way-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
