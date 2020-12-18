import { newE2EPage } from '@stencil/core/testing';

describe('way-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-button></way-button>');

    const element = await page.find('way-button');
    expect(element).toHaveClass('hydrated');
  });
});
