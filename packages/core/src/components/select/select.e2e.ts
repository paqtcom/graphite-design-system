import { newE2EPage } from '@stencil/core/testing';

describe('gr-select', () => {
  it('renders', async () => {
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
});
