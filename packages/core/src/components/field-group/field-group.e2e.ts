import { newE2EPage } from '@stencil/core/testing';

describe('gr-field-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`<gr-field-group></gr-field-group>`);

    const element = await page.find('gr-field-group');
    expect(element).toHaveClass('hydrated');
  });
});
