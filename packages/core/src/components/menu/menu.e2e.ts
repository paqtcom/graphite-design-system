import { newE2EPage } from '@stencil/core/testing';

describe('gr-menu', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-menu></gr-menu>');

    const element = await page.find('gr-menu');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit gr-select when a menu item is selected', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gr-menu>
        <gr-menu-item>Item 1</gr-menu-item>
      </gr-menu>
    `);

    const menu = await page.find('gr-menu');
    const menuItem = await page.find('gr-menu-item');
    const grSelect = await menu.spyOnEvent('gr-select');

    menuItem.click();
    await page.waitForChanges();

    expect(grSelect).toHaveReceivedEventTimes(1);
  });

  it('should not emit gr-select when a disabled menu item is selected', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gr-menu>
        <gr-menu-item disabled>Item 1</gr-menu-item>
      </gr-menu>
    `);

    const menu = await page.find('gr-menu');
    const menuItem = await page.find('gr-menu-item');
    const grSelect = await menu.spyOnEvent('gr-select');

    menuItem.click();
    await page.waitForChanges();

    expect(grSelect).toHaveReceivedEventTimes(0);
  });
});
