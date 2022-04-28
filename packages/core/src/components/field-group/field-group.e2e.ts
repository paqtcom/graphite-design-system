import { newE2EPage } from '@stencil/core/testing';

describe('gr-field-group', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`<gr-field-group></gr-field-group>`);

    const element = await page.find('gr-field-group');
    expect(element).toHaveClass('hydrated');
  });

  it('should apply correct class when horizontal is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-field-group horizontal></gr-field-group>');

    const shadowFieldSet = await page.find('gr-field-group >>> fieldset');

    expect(shadowFieldSet).toHaveClass('field-group-horizontal');
  });

  it('should hide fieldset legend by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-field-group></gr-field-group>');

    const shadowFieldSet = await page.find('gr-field-group >>> fieldset');
    const shadowLegend = await page.find('gr-field-group >>> legend');

    expect(shadowFieldSet).not.toHaveClass('field-group-has-label');

    const ariaHidden = shadowLegend.getAttribute('aria-hidden');
    expect(ariaHidden).toBe('true');
  });

  it('should show fieldset legend when label is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-field-group label="example-label"></gr-field-group>');

    const shadowFieldSet = await page.find('gr-field-group >>> fieldset');
    const shadowLegend = await page.find('gr-field-group >>> legend');

    expect(shadowFieldSet).toHaveClass('field-group-has-label');

    const ariaHidden = shadowLegend.getAttribute('aria-hidden');
    expect(ariaHidden).toBe('false');
  });
});
