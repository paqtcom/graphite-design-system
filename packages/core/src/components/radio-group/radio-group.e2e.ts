import { newE2EPage } from '@stencil/core/testing';

describe('gr-radio-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`<gr-radio-group></gr-radio-group>`);

    const element = await page.find('gr-radio-group');
    expect(element).toHaveClass('hydrated');
  });
});
