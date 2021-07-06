import { newE2EPage } from '@stencil/core/testing';

describe('way-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-select></way-select>');

    const element = await page.find('way-select');
    expect(element).toHaveClass('hydrated');
  });
});
