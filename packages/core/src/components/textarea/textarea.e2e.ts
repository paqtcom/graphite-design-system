import { newE2EPage } from '@stencil/core/testing';

describe('gr-textarea', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-textarea></gr-textarea>');

    const element = await page.find('gr-textarea');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit gr-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <gr-textarea></gr-textarea>
      `,
    });
    const textarea = await page.find('gr-textarea');
    const grFocus = await textarea.spyOnEvent('gr-focus');

    await textarea.click();

    expect(grFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit gr-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <gr-textarea></gr-textarea>
        <button>Native Button</button>
      `,
    });
    const textarea = await page.find('gr-textarea');
    const nativeButton = await page.find('button');
    const grBlur = await textarea.spyOnEvent('gr-blur');

    await textarea.click();
    await nativeButton.click();

    expect(grBlur).toHaveReceivedEventTimes(1);
  });
});
