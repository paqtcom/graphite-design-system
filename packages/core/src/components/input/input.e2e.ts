import { newE2EPage } from '@stencil/core/testing';

describe('gr-input', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-input></gr-input>');

    const element = await page.find('gr-input');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit gr-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <gr-input></gr-input>
      `,
    });
    const input = await page.find('gr-input');
    const grFocus = await input.spyOnEvent('gr-focus');

    await input.click();

    expect(grFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit gr-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <gr-input></gr-input>
        <button>Native Button</button>
      `,
    });
    const input = await page.find('gr-input');
    const nativeButton = await page.find('button');
    const grBlur = await input.spyOnEvent('gr-blur');

    await input.click();
    await nativeButton.click();

    expect(grBlur).toHaveReceivedEventTimes(1);
  });
});
