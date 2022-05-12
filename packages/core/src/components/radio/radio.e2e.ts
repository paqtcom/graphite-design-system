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

  it('should be checked when value is the same as value of the parent radio group', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gr-radio-group>
        <gr-radio value="33"></gr-radio>
      </gr-radio-group>
    `);

    const radioGroup = await page.find('gr-radio-group');
    const radio = await page.find('gr-radio');

    expect(radio).not.toHaveAttribute('checked');

    radioGroup.setProperty('value', '33');
    await page.waitForChanges();

    expect(radio).toHaveAttribute('checked');

    radioGroup.setProperty('value', '34');
    await page.waitForChanges();

    expect(radio).not.toHaveAttribute('checked');
  });

  it('should reflect correct tabindex', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-radio></gr-radio>');

    const radio = await page.find('gr-radio');

    expect(radio).toHaveAttribute('tabIndex');
    let tabIndex = radio.getAttribute('tabIndex');
    expect(tabIndex).toBe('-1');

    radio.callMethod('setButtonTabindex', '0');
    await page.waitForChanges();

    tabIndex = radio.getAttribute('tabIndex');
    expect(tabIndex).toBe('0');
  });
});
