import { newE2EPage } from '@stencil/core/testing';

describe('gr-radio-group', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`<gr-radio-group></gr-radio-group>`);

    const element = await page.find('gr-radio-group');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit gr-change on value change', async () => {
    const page = await newE2EPage({
      html: `
        <gr-radio-group value="1">
          <gr-radio value="1">Option 1</gr-radio>
          <gr-radio value="2">Option 2</gr-radio>
        </gr-radio-group>
      `,
    });
    const radioGroup = await page.find('gr-radio-group');
    const secondRadio = await page.find('gr-radio[value="2"]');
    const grChange = await radioGroup.spyOnEvent('gr-change');

    await secondRadio.click();

    expect(grChange).toHaveReceivedEventTimes(1);

    const value = await radioGroup.getProperty('value');
    expect(value).toBe('2');
  });

  it('should apply correct class when horizontal is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-radio-group horizontal></gr-radio-group>');

    const shadowFieldset = await page.find('gr-radio-group >>> fieldset');

    expect(shadowFieldset).toHaveClass('radio-group-horizontal');
  });

  it('should render an hidden input', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gr-radio-group name="test" value="3"></gr-radio-group>
    `);

    const hiddenInput = await page.find('input[type="hidden"][name="test"][value="3"]');
    expect(hiddenInput).not.toBeNull();
  });
});
