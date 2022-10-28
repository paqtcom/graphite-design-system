import { newE2EPage } from '@stencil/core/testing';

describe('gr-button', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button></gr-button>');

    const element = await page.find('gr-button');
    expect(element).not.toBeNull();
  });

  it('should use button element by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button></gr-button>');

    const shadowButton = await page.find('gr-button >>> button');
    expect(shadowButton).toHaveClass('button-native');
  });

  it('should use anchor element when href is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button href="https://example.org"></gr-button>');

    const shadowAnchor = await page.find('gr-button >>> a');
    expect(shadowAnchor).toHaveClass('button-native');

    expect(shadowAnchor).toHaveAttribute('href');

    const href = await shadowAnchor.getAttribute('href');
    expect(href).toBe('https://example.org');
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

  it('should be disabled when disabled is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button disabled></gr-button>');

    const button = await page.find('gr-button');

    expect(button).toHaveClass('button-disabled');
    expect(button).toHaveAttribute('aria-disabled');

    const grFocus = await button.spyOnEvent('gr-focus');
    const shadowButton = await page.find('gr-button >>> button');

    expect(shadowButton).toHaveAttribute('disabled');

    await button.click();

    expect(grFocus).toHaveReceivedEventTimes(0);
  });

  it('should render a spinner when loading is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button loading></gr-button>');

    const button = await page.find('gr-button');

    expect(button).toHaveClass('button-loading');

    const spinner = await page.find('gr-button >>> gr-spinner');

    expect(spinner).not.toBeNull();
  });

  it('should render a caret svg when caret is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button caret></gr-button>');

    const button = await page.find('gr-button');

    expect(button).toHaveClass('button-caret');

    const svg = await page.find('gr-button >>> .caret svg');

    expect(svg).not.toBeNull();
  });

  it('should apply correct class when circle is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button circle></gr-button>');

    const button = await page.find('gr-button');

    expect(button).toHaveClass('button-circle');
  });

  it('should apply correct class when pill is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button pill></gr-button>');

    const button = await page.find('gr-button');

    expect(button).toHaveClass('button-pill');
  });

  it('should apply correct class when pill is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button pill></gr-button>');

    const button = await page.find('gr-button');

    expect(button).toHaveClass('button-pill');
  });

  it('should apply correct class when variant is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button variant="primary"></gr-button>');

    const button = await page.find('gr-button');

    expect(button).toHaveClass('button-primary');
  });

  it('should apply correct class when size is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button size="small"></gr-button>');

    const button = await page.find('gr-button');

    expect(button).toHaveClass('button-small');
  });

  it('should apply correct class when expand is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button expand="block"></gr-button>');

    const button = await page.find('gr-button');

    expect(button).toHaveClass('button-block');
  });

  it('should inherit aria-label, title, and tabindex', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-button aria-label="aria" title="example" tabindex="-1"></gr-button>');

    const shadowButton = await page.find('gr-button >>> button');

    expect(shadowButton).toHaveAttribute('aria-label');
    expect(shadowButton).toHaveAttribute('title');
    expect(shadowButton).toHaveAttribute('tabindex');
  });
});
