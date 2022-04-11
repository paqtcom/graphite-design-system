import { newE2EPage } from '@stencil/core/testing';

describe('gr-checkbox', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-checkbox></gr-checkbox>');

    const element = await page.find('gr-checkbox');
    expect(element).not.toBeNull();
  });

  it('should emit gr-focus when gaining focus', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-checkbox></gr-checkbox>');

    const checkbox = await page.find('gr-checkbox');
    const grFocus = await checkbox.spyOnEvent('gr-focus');

    await checkbox.click();

    expect(grFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit gr-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <gr-checkbox></gr-checkbox>
        <button>Native Button</button>
      `,
    });

    const checkbox = await page.find('gr-checkbox');
    const nativeButton = await page.find('button');
    const grBlur = await checkbox.spyOnEvent('gr-blur');

    await checkbox.click();
    await nativeButton.click();

    expect(grBlur).toHaveReceivedEventTimes(1);
  });

  it('should become checked and unchecked when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-checkbox></gr-checkbox>');

    const grChange = await page.spyOnEvent('gr-change');
    const checkbox = await page.find('gr-checkbox');
    const label = await page.find('gr-checkbox >>> label');

    expect(checkbox).not.toHaveAttribute('checked');
    expect(label).not.toHaveClass('checkbox-checked');

    checkbox.click();
    await page.waitForChanges();

    expect(checkbox).toHaveAttribute('checked');
    expect(label).toHaveClass('checkbox-checked');

    checkbox.click();
    await page.waitForChanges();

    expect(checkbox).not.toHaveAttribute('checked');
    expect(label).not.toHaveClass('checkbox-checked');

    expect(grChange).toHaveReceivedEventTimes(2);
  });

  it('should become checked when set through property', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-checkbox></gr-checkbox>');

    const grChange = await page.spyOnEvent('gr-change');
    const checkbox = await page.find('gr-checkbox');
    const label = await page.find('gr-checkbox >>> label');

    expect(checkbox).not.toHaveAttribute('checked');
    expect(label).not.toHaveClass('checkbox-checked');

    checkbox.setProperty('checked', true);
    await page.waitForChanges();

    expect(checkbox).toHaveAttribute('checked');
    expect(label).toHaveClass('checkbox-checked');
    expect(grChange).toHaveReceivedEventTimes(1);
  });

  it('should render indeterminate and when clicked become checked', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-checkbox indeterminate></gr-checkbox>');

    const grChange = await page.spyOnEvent('gr-change');
    const checkbox = await page.find('gr-checkbox');
    const label = await page.find('gr-checkbox >>> label');

    expect(label).toHaveClass('checkbox-indeterminate');

    checkbox.click();
    await page.waitForChanges();

    expect(checkbox).not.toHaveAttribute('indeterminate');
    expect(label).not.toHaveClass('checkbox-indeterminate');

    expect(checkbox).toHaveAttribute('checked');
    expect(label).toHaveClass('checkbox-checked');
    expect(grChange).toHaveReceivedEvent();
  });

  it('should be disabled when disabled is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-checkbox disabled></gr-checkbox>');

    const checkbox = await page.find('gr-checkbox');

    expect(checkbox).toHaveClass('checkbox-disabled');

    const grFocus = await checkbox.spyOnEvent('gr-focus');
    const shadowInput = await page.find('gr-checkbox >>> input');

    expect(shadowInput).toHaveAttribute('disabled');

    await checkbox.click();

    expect(grFocus).toHaveReceivedEventTimes(0);
    expect(checkbox).not.toHaveAttribute('checked');
  });

  it('should inherit aria-label', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-checkbox aria-label="aria"></gr-checkbox>');

    const shadowInput = await page.find('gr-checkbox >>> input');

    expect(shadowInput).toHaveAttribute('aria-label');
  });

  it('should render an hidden input', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <gr-checkbox name="test" value="3" checked></gr-checkbox>
    `);

    const hiddenInput = await page.find('input[type="hidden"][name="test"][value="3"]');
    expect(hiddenInput).not.toBeNull();
  });
});
