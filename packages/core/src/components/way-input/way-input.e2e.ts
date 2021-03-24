import { newE2EPage } from '@stencil/core/testing';

describe('way-input', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-input></way-input>');

    const element = await page.find('way-input');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit wayFocus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <way-input></way-input>
      `
    });
    const input = await page.find('way-input');
    const wayFocus = await input.spyOnEvent('wayFocus');

    await input.click();

    expect(wayFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit wayBlur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <way-input></way-input>
        <button>Native Button</button>
      `
    });
    const input = await page.find('way-input');
    const nativeButton = await page.find('button');
    const wayBlur = await input.spyOnEvent('wayBlur');

    await input.click();
    await nativeButton.click();

    expect(wayBlur).toHaveReceivedEventTimes(1);
  });
});
