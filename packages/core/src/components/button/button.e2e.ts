import { newE2EPage } from '@stencil/core/testing';

describe('gr-button', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button></gr-button>');

    const element = await page.find('gr-button');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit gr-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <gr-button>Button</gr-button>
      `,
    });
    const button = await page.find('gr-button');
    const grFocus = await button.spyOnEvent('gr-focus');

    await button.click();

    expect(grFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit gr-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <gr-button>Button</gr-button>
        <button>Native Button</button>
      `,
    });
    const button = await page.find('gr-button');
    const nativeButton = await page.find('button');
    const grBlur = await button.spyOnEvent('gr-blur');

    await button.click();
    await nativeButton.click();

    expect(grBlur).toHaveReceivedEventTimes(1);
  });
});
