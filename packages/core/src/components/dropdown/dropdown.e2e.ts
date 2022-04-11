import { newE2EPage } from '@stencil/core/testing';

describe('gr-dropdown', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-dropdown></gr-dropdown>');

    const element = await page.find('gr-dropdown');
    expect(element).toHaveClass('hydrated');
  });

  it('should show panel when clicking on trigger and hide the panel when clicked outside', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <button>Native button</button>
      <gr-dropdown placement="right-start">
        <gr-button slot="trigger" caret>Dropdown</gr-button>
        <gr-menu>
          <gr-menu-item>Dropdown Item 1</gr-menu-item>
          <gr-menu-item>Dropdown Item 2</gr-menu-item>
          <gr-menu-item>Dropdown Item 3</gr-menu-item>
          <gr-menu-divider></gr-menu-divider>
          <gr-menu-item checked>Checked</gr-menu-item>
          <gr-menu-item disabled>Disabled</gr-menu-item>
          <gr-menu-divider></gr-menu-divider>
          <gr-menu-item>
            Prefix
            <ion-icon slot="start" name="gift-outline" aria-hidden="true"></ion-icon>
          </gr-menu-item>
          <gr-menu-item>
            Suffix Icon
            <ion-icon slot="end" name="heart-outline" aria-hidden="true"></ion-icon>
          </gr-menu-item>
        </gr-menu>
      </gr-dropdown>
    `);

    const dropdown = await page.find('gr-dropdown');
    const trigger = await page.find('gr-button');
    const nativeButton = await page.find('button');

    const grShow = await dropdown.spyOnEvent('gr-show');
    const grAfterShow = await dropdown.spyOnEvent('gr-show');

    const grHide = await dropdown.spyOnEvent('gr-hide');
    const grAfterHide = await dropdown.spyOnEvent('gr-hide');

    expect(dropdown).not.toHaveClass('dropdown-open');

    trigger.click();
    await page.waitForChanges();

    expect(dropdown).toHaveClass('dropdown-open');

    expect(grShow).toHaveReceivedEventTimes(1);
    expect(grAfterShow).toHaveReceivedEventTimes(1);

    nativeButton.click();
    await page.waitForChanges();

    expect(dropdown).not.toHaveClass('dropdown-open');

    expect(grHide).toHaveReceivedEventTimes(1);
    expect(grAfterHide).toHaveReceivedEventTimes(1);
  });
});
