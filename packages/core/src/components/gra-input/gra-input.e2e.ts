import { newE2EPage } from '@stencil/core/testing';

describe('gra-input', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gra-input></gra-input>');

    const element = await page.find('gra-input');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit graFocus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <gra-input></gra-input>
      `
    });
    const input = await page.find('gra-input');
    const graFocus = await input.spyOnEvent('graFocus');

    await input.click();

    expect(graFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit wayBlur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <gra-input></gra-input>
        <button>Native Button</button>
      `
    });
    const input = await page.find('gra-input');
    const nativeButton = await page.find('button');
    const wayBlur = await input.spyOnEvent('wayBlur');

    await input.click();
    await nativeButton.click();

    expect(wayBlur).toHaveReceivedEventTimes(1);
  });
});
