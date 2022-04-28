import { newE2EPage } from '@stencil/core/testing';

describe('gr-tag', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-tag></gr-tag>');

    const element = await page.find('gr-tag');
    expect(element).toHaveClass('hydrated');
  });

  it('should be clearable', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-tag clearable></gr-tag>');

    const tag = await page.find('gr-tag');
    const grClear = await tag.spyOnEvent('gr-clear');

    expect(tag).toHaveClass('tag-clearable');

    const shadowGrButton = await page.find('gr-tag >>> gr-button');
    expect(shadowGrButton).not.toBeNull();

    shadowGrButton.click();
    await page.waitForChanges();

    expect(grClear).toHaveReceivedEventTimes(1);
  });

  it('should apply correct class when pill is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<gr-tag pill></gr-tag>');

    const tag = await page.find('gr-tag');

    expect(tag).toHaveClass('tag-pill');
  });
});
