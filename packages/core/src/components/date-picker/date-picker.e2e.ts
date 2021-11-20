import { newE2EPage } from '@stencil/core/testing';

describe('date-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<date-picker></date-picker>');

    const element = await page.find('date-picker');
    expect(element).toHaveClass('hydrated');
  });
});
