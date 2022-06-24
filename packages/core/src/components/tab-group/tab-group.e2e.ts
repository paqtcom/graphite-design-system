import { newE2EPage } from '@stencil/core/testing';

describe('gr-tab-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-tab-group></gr-tab-group>');

    const element = await page.find('gr-tab-group');
    expect(element).not.toBeNull();
  });
});
