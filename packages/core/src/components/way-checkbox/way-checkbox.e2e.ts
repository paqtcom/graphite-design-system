import { newE2EPage } from '@stencil/core/testing';

describe('way-checkbox', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-checkbox></way-checkbox>');

    const element = await page.find('way-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit way-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <way-checkbox>Checkbox</way-checkbox>
      `,
    });
    const checkbox = await page.find('way-checkbox');
    const wayFocus = await checkbox.spyOnEvent('way-focus');

    await checkbox.click();

    expect(wayFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit way-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <way-checkbox>Checkbox</way-checkbox>
        <button>Native Button</button>
      `,
    });
    const checkbox = await page.find('way-checkbox');
    const nativeButton = await page.find('button');
    const wayBlur = await checkbox.spyOnEvent('way-blur');

    await checkbox.click();
    await nativeButton.click();

    expect(wayBlur).toHaveReceivedEventTimes(1);
  });
});
