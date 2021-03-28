import { newE2EPage } from '@stencil/core/testing';

describe('way-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-tag></way-tag>');

    const element = await page.find('way-tag');
    expect(element).toHaveClass('hydrated');
  });
});
