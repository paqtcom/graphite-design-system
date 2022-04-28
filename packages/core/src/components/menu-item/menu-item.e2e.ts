import { newE2EPage } from '@stencil/core/testing';

describe('gr-menu-item', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-menu-item></gr-menu-item>');

    const element = await page.find('gr-menu-item');
    expect(element).toHaveClass('hydrated');
  });

  it('should apply correct class when checked is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-menu-item checked></gr-menu-item>');

    const menuItem = await page.find('gr-menu-item');

    expect(menuItem).toHaveClass('menu-item-checked');
  });

  it('should apply correct class when disabled is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-menu-item disabled></gr-menu-item>');

    const menuItem = await page.find('gr-menu-item');

    expect(menuItem).toHaveClass('menu-item-disabled');
  });

  it('should apply correct class when focused', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-menu-item></gr-menu-item>');

    const menuItem = await page.find('gr-menu-item');

    menuItem.focus();
    await page.waitForChanges();

    expect(menuItem).toHaveClass('menu-item-focused');
  });

  it('should have a tabindex of 0 when not disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-menu-item></gr-menu-item>');

    const menuItem = await page.find('gr-menu-item');

    expect(menuItem).toHaveAttribute('tabIndex');

    const tabIndex = menuItem.getAttribute('tabIndex');
    expect(tabIndex).toBe('0');
  });

  it('should have not have a tabindex when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-menu-item disabled></gr-menu-item>');

    const menuItem = await page.find('gr-menu-item');

    expect(menuItem).not.toHaveAttribute('tabIndex');
  });
});
