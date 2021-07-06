import { newE2EPage } from '@stencil/core/testing';

describe('way-button', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-button></way-button>');

    const element = await page.find('way-button');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit way-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <way-button>Button</way-button>
      `,
    });
    const button = await page.find('way-button');
    const wayFocus = await button.spyOnEvent('way-focus');

    await button.click();

    expect(wayFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit way-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <way-button>Button</way-button>
        <button>Native Button</button>
      `,
    });
    const button = await page.find('way-button');
    const nativeButton = await page.find('button');
    const wayBlur = await button.spyOnEvent('way-blur');

    await button.click();
    await nativeButton.click();

    expect(wayBlur).toHaveReceivedEventTimes(1);
  });
});
