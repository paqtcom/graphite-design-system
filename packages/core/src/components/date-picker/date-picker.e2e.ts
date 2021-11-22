import { newE2EPage } from '@stencil/core/testing';

describe('date-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-date-picker></gr-date-picker>');

    const element = await page.find('gr-date-picker');
    expect(element).toHaveClass('hydrated');
  });
});
