import { newE2EPage } from '@stencil/core/testing';
import { expectFiles } from '@stencil/core/testing/testing-utils';
import { FormElementData } from '@/types/form';

describe('way-autosuggest', () => {
  const optionListOptions = [
    { label: 'Arthur Benjamin Dickinson', value: 1001 },
    { label: 'Benny Balotelli', value: 2 },
    { label: 'Eddy Masters', value: 451 },
    { label: 'Dennis Lei', value: 99 },
  ];

  async function getVisibleOptions(page) {
    return page.evaluate(async () => {
      const autoSuggest = document.querySelector('way-autosuggest');
      const optionList = autoSuggest.shadowRoot.querySelector('.option-list');
      return optionList.childNodes.length;
    });
  }
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-autosuggest name="test-select"></way-autosuggest>');

    const element = await page.find('way-autosuggest');
    expect(element).toHaveClass('hydrated');
  });

  it('should render a hidden input', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-autosuggest name="test-select"></way-autosuggest>');

    const hiddenInput = await page.find('input[name=test-select]');
    expect(hiddenInput).toBeTruthy()

  })

  it('should update hidden input with latest data', async () => {
    const page = await newE2EPage();
    await page.setContent('<way-autosuggest name="test-select"></way-autosuggest>');

    const hiddenInput = await page.find('input[name=test-select]');
    let inputValue;

    inputValue = await hiddenInput.getAttribute('value');
    expect(inputValue).toBe('');

    await page.$eval('way-autosuggest',
      (elm, optionListOptions) => {
        elm.options = optionListOptions;
      },
      optionListOptions
    );

    await page.waitForChanges();

    await page.$eval('way-autosuggest',
      (elm) => {
        elm.value = [{ label: 'name', value: 'Arthur' }];
      }
    );
    
    await page.waitForChanges();

    inputValue = await hiddenInput.getAttribute('value');
    expect(inputValue).not.toBe('');
    expect(JSON.parse(inputValue)[0].value).toBe('Arthur');
  })

  it('should show option list when focussed', async() => {
    const page = await newE2EPage();
    let optionList;
    await page.setContent('<way-autosuggest name="test-select"></way-autosuggest>');
    const input = await page.find('way-autosuggest >>> .input');
    optionList = await page.find('way-autosuggest >>> .option-list');
    expect(optionList).not.toHaveClass('has-focus');
    input.focus();
    // page.keyboard.type('China')
    await page.waitForChanges();
    expect(optionList).toHaveClass('has-focus');
  })

  it('should show all filtered options', async() => {
    const page = await newE2EPage();
    await page.setContent('<way-autosuggest name="test-select"></way-autosuggest>');

    await page.$eval('way-autosuggest',
      (elm, optionListOptions) => {
        elm.options = optionListOptions;
      },
      optionListOptions
    );

    await page.waitForChanges();
    const input = await page.find('way-autosuggest >>> .input');
    input.focus();
    await page.waitForChanges();
    let amountOfOptions;
    amountOfOptions = await getVisibleOptions(page);
    await page.waitForChanges();
    expect(amountOfOptions).toBe(4);
    page.keyboard.type('y')
    await page.waitForChanges();
    amountOfOptions = await getVisibleOptions(page);
    page.waitForChanges();

    expect(amountOfOptions).toBe(2);
  })
});
