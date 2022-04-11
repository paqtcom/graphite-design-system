import { newE2EPage } from '@stencil/core/testing';

describe('date-picker', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-date-picker></gr-date-picker>');

    const element = await page.find('gr-date-picker');
    expect(element).not.toBeNull();
  });

  it('should emit gr-focus when gaining focus', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-date-picker></gr-date-picker>');

    const datepicker = await page.find('gr-date-picker');
    const grFocus = await datepicker.spyOnEvent('gr-focus');

    await datepicker.click();

    expect(grFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit gr-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <gr-date-picker></gr-date-picker>
        <button>Native Button</button>
      `,
    });

    const datepicker = await page.find('gr-date-picker');
    const nativeButton = await page.find('button');
    const grBlur = await datepicker.spyOnEvent('gr-blur');

    await datepicker.click();
    await nativeButton.click();

    expect(grBlur).toHaveReceivedEventTimes(1);
  });

  it('should render an hidden input', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gr-date-picker name="test" value="2022-04-11"></gr-date-picker>
    `);

    const hiddenInput = await page.find('input[type="hidden"][name="test"][value="2022-04-11"]');
    expect(hiddenInput).not.toBeNull();
  });
});
