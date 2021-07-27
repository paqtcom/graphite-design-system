import { newE2EPage } from '@stencil/core/testing';

describe('way-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <way-select></way-select>
    `);

    const element = await page.find('way-select');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit way-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <way-select></way-select>
      `,
    });
    const select = await page.find('way-select');
    const wayFocus = await select.spyOnEvent('way-focus');

    await select.click();

    expect(wayFocus).toHaveReceivedEventTimes(1);
  });
});
