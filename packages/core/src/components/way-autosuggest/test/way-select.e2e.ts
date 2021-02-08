import { newE2EPage } from '@stencil/core/testing';

describe('way-autosuggest', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-autosuggest name="test-select"></way-autosuggest>');

    const element = await page.find('way-autosuggest');
    expect(element).toHaveClass('hydrated');
  });
});
