import { newE2EPage } from '@stencil/core/testing';

describe('gr-radio', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-radio></gr-radio>');

    const element = await page.find('gr-radio');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit gr-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <gr-radio>Radio</gr-radio>
      `,
    });
    const radio = await page.find('gr-radio');
    const grFocus = await radio.spyOnEvent('gr-focus');

    await radio.click();

    expect(grFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit gr-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <gr-radio>Radio</gr-radio>
        <button>Native Button</button>
      `,
    });
    const radio = await page.find('gr-radio');
    const nativeButton = await page.find('button');
    const grBlur = await radio.spyOnEvent('gr-blur');

    await radio.click();
    await nativeButton.click();

    expect(grBlur).toHaveReceivedEventTimes(1);
  });
});
