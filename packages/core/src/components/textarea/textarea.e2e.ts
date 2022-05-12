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

  it('should be disabled when disabled is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-textarea disabled></gr-textarea>');

    const textarea = await page.find('gr-textarea');

    const grFocus = await textarea.spyOnEvent('gr-focus');
    const shadowTextarea = await page.find('gr-textarea >>> textarea');
    const shadowDiv = await page.find('gr-textarea >>> div.textarea');

    expect(shadowTextarea).toHaveAttribute('disabled');
    expect(shadowDiv).toHaveClass('textarea-disabled');

    await textarea.click();

    expect(grFocus).toHaveReceivedEventTimes(0);
  });

  it('should emit events when typing into textarea', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-textarea></gr-textarea>');

    const textarea = await page.find('gr-textarea');
    const shadowTextarea = await page.find('gr-textarea >>> textarea');

    const grInput = await textarea.spyOnEvent('gr-input');
    const grChange = await textarea.spyOnEvent('gr-change');

    await shadowTextarea.type('typing');
    await page.waitForChanges();

    expect(grInput).toHaveReceivedEventTimes(6);
    expect(grChange).toHaveReceivedEvent();
  });

  it('should render an hidden input', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gr-textarea name="test" value="3"></gr-textarea>
    `);

    const hiddenInput = await page.find('input[type="hidden"][name="test"][value="3"]');
    expect(hiddenInput).not.toBeNull();
  });
});
