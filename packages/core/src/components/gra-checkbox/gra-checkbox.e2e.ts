import { newE2EPage } from '@stencil/core/testing';

describe('gra-button', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gra-button></gra-button>');

    const element = await page.find('gra-button');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit graFocus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <gra-button>Button</gra-button>
      `
    });
    const button = await page.find('gra-button');
    const graFocus = await button.spyOnEvent('graFocus');

    await button.click();

    expect(graFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit wayBlur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <gra-button>Button</gra-button>
        <button>Native Button</button>
      `
    });
    const button = await page.find('gra-button');
    const nativeButton = await page.find('button');
    const wayBlur = await button.spyOnEvent('wayBlur');

    await button.click();
    await nativeButton.click();

    expect(wayBlur).toHaveReceivedEventTimes(1);
  });
});
