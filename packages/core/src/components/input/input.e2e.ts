import { newE2EPage } from '@stencil/core/testing';

describe('gr-input', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-input></gr-input>');

    const element = await page.find('gr-input');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit gr-focus when gaining focus', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-input></gr-input>');

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

  it('should be disabled when disabled is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-input disabled></gr-input>');

    const input = await page.find('gr-input');

    const grFocus = await input.spyOnEvent('gr-focus');
    const shadowInput = await page.find('gr-input >>> input');
    const shadowDiv = await page.find('gr-input >>> div.input');

    expect(shadowInput).toHaveAttribute('disabled');
    expect(shadowDiv).toHaveClass('input-disabled');

    await input.click();

    expect(grFocus).toHaveReceivedEventTimes(0);
  });

  it('should apply correct class when pill is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-input pill></gr-input>');

    const shadowDiv = await page.find('gr-input >>> div.input');

    expect(shadowDiv).toHaveClass('input-pill');
  });

  it('should emit events when typing into input', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-input></gr-input>');

    const input = await page.find('gr-input');
    const shadowInput = await page.find('gr-input >>> input');

    const grInput = await input.spyOnEvent('gr-input');
    const grChange = await input.spyOnEvent('gr-change');

    await shadowInput.type('typing');
    await page.waitForChanges();

    expect(grInput).toHaveReceivedEventTimes(6);
    expect(grChange).toHaveReceivedEvent();
  });

  it('should render an hidden input', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gr-input name="test" value="3"></gr-input>
    `);

    const hiddenInput = await page.find('input[type="hidden"][name="test"][value="3"]');
    expect(hiddenInput).not.toBeNull();
  });
});
