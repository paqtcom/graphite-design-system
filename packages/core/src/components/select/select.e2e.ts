import { newE2EPage } from '@stencil/core/testing';

describe('gr-select', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gr-select></gr-select>
    `);

    const element = await page.find('gr-select');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit gr-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <gr-select></gr-select>
      `,
    });
    const select = await page.find('gr-select');
    const grFocus = await select.spyOnEvent('gr-focus');

    await select.click();

    expect(grFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit gr-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <gr-select>
          <gr-menu-item value="1">One</gr-menu-item>
        </gr-select>
        <button>Native Button</button>
      `,
    });
    const select = await page.find('gr-select');
    const menuItem = await page.find('gr-menu-item');
    const nativeButton = await page.find('button');
    const grBlur = await select.spyOnEvent('gr-blur');

    await select.click();
    await page.waitForChanges();
    await menuItem.click();
    await page.waitForChanges();
    await nativeButton.click();

    expect(grBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit gr-change when value changes', async () => {
    const page = await newE2EPage({
      html: `
        <gr-select value="1">
          <gr-menu-item value="1">Option one</gr-menu-item>
          <gr-menu-item value="2">Option two</gr-menu-item>
        </gr-select>
      `,
    });
    const select = await page.find('gr-select');
    const secondMenuItem = await page.find('gr-menu-item[value="2"]');
    const grChange = await select.spyOnEvent('gr-change');

    await select.click();
    await page.waitForChanges();
    await secondMenuItem.click();

    expect(grChange).toHaveReceivedEventTimes(1);

    const value = await select.getProperty('value');
    expect(value).toBe('2');
  });

  it('should render an hidden input', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gr-select name="test" value="3"></gr-select>
    `);

    const hiddenInput = await page.find('input[type="hidden"][name="test"][value="3"]');
    expect(hiddenInput).not.toBeNull();
  });

  it('should apply correct class when pill is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-select pill></gr-select>');

    const shadowDropdown = await page.find('gr-select >>> gr-dropdown');

    expect(shadowDropdown).toHaveClass('select-pill');
  });
});
