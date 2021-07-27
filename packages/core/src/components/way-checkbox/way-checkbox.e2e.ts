import { newE2EPage } from '@stencil/core/testing';

describe('way-checkbox', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-checkbox></way-checkbox>');

    const element = await page.find('way-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit wayFocus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <way-checkbox>Checkbox</way-checkbox>
      `
    });
    const checkbox = await page.find('way-checkbox');
    const wayFocus = await checkbox.spyOnEvent('wayFocus');

    await checkbox.click();

    expect(wayFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit wayBlur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <way-checkbox>Checkbox</way-checkbox>
      `
    });
    const checkbox = await page.find('way-checkbox');
    const wayBlur = await checkbox.spyOnEvent('wayBlur');

    await checkbox.click();

    expect(wayBlur).toHaveReceivedEventTimes(1);
  });
});
