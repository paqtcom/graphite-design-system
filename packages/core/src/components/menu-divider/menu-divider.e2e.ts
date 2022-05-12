import { newE2EPage } from '@stencil/core/testing';

describe('gr-menu-divider', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-menu-divider></gr-menu-divider>');

    const element = await page.find('gr-menu-divider');
    expect(element).toHaveClass('hydrated');
  });

  it('should have aria-hidden and role=separator', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-menu-divider></gr-menu-divider>');

    const shadowElement = await page.find('gr-menu-divider >>> div.menu-divider');
    expect(shadowElement).toHaveAttribute('aria-hidden');
    expect(shadowElement).toHaveAttribute('role');

    const role = shadowElement.getAttribute('role');
    expect(role).toBe('separator');
  });
});
