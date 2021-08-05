const { test, expect } = require('@playwright/test');

test('Checks that duckduckGo page can be opened', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  const isLogoVisible = await page.isVisible('#logo_homepage_link');
  expect(isLogoVisible).toBe(true);
});

test('Checks that results are correct', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.fill('#search_form_input_homepage', "Test");
  await page.click('#search_button_homepage');
  const rezutatasTextContent = await page.textContent('#r1-0');
  console.log(rezutatasTextContent);
  expect(rezutatasTextContent).toContain('Test');
});

test('Checks microsoft word cheat sheet', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.fill('#search_form_input_homepage', "microsoft word cheat sheet");
  await page.click('#search_button_homepage');
  const cheatSheetTab = await page.textContent('a.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');
  const cheatHeaderMicrosoftWord = await page.textContent('h3.c-base__title');
  console.log(cheatSheetTab);
  console.log(cheatHeaderMicrosoftWord);
  expect(cheatSheetTab).toContain("Cheat Sheet");
  expect(cheatHeaderMicrosoftWord).toContain("Microsoft Word 2010");
});
/*
test('Checks if shorten Wikipedia link works', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.fill('#search_form_input_homepage', "shorten www.wikipedia.com");
  await page.click('#search_button_homepage');
  const shortenUrl = await page.textContent('#shorten-url');
  await page.goto(shortenUrl);
  const webUrl = page.url();
  expect(WebUrl).toBe('https://www.wikipedia.org/');
});
*/

test('panda', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.waitForSelector("#search_form_input_homepage");
  await page.fill('#search_form_input_homepage', "intitle:panda");
  await page.click("#search_button_homepage", { force: true });
  await page.waitForNavigation();
  const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
  console.log(results);
  results.forEach(result => {
    expect(result.toLowerCase()).toContain("panda");
  });
});

const passwordsLengths2 = ['7', '65'];
    passwordsLengths2.forEach(passwordLength => {
    test(`Does not generate chracters long password`, async ({ page }) => {
        await page.goto('https://duckduckgo.com');
        await page.waitForSelector("#search_form_input_homepage");
        await page.fill('#search_form_input_homepage', ("password " + passwordLength));
        await page.click("#search_button_homepage");
        const isPasswordVisible = await page.isVisible(".c-base__title");
        expect(isPasswordVisible).toBe(false);
    });
  });