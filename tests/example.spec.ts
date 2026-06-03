import { test, expect, Locator } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test("Test input actions", async ({page}) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  //Check for name field readiness
  const nameField:Locator = page.locator("#name");
  await expect(nameField).toBeVisible();
  await expect(nameField).toBeEnabled();

  //Gather information of name field
  const nameFieldMaxLength: string | null = await nameField.getAttribute("maxlength");
  expect(nameFieldMaxLength).toBe("15");

  //Enter data
  const nameData = "Playwright";
  await nameField.fill(nameData);

  //Get data
  const nameFieldInputValue = await nameField.inputValue();
  console.log("Name field text content: " + await nameField.textContent());
  console.log("Name field input value: " + nameFieldInputValue);

  //Validate filled text
  expect(nameFieldInputValue).toBe(nameData);

  await page.waitForTimeout(5000);
});

test("Test radio buttons", async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  const maleRadio: Locator = await page.locator("input[name='gender'][value='male']");

  await expect(maleRadio).toBeVisible();
  await expect(maleRadio).toBeEnabled();

  //Check the radio
  await maleRadio.check();

  console.log("maleRadio.isChecked(): " + maleRadio.isChecked())
  expect(await maleRadio.isChecked()).toBe(true);
  await expect(maleRadio).toBeChecked();

});

test("Test Checkboxes", async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  
  const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];


  // //Select one checkbox
  const sundayCheckbox = page.getByLabel("Sunday");
  await sundayCheckbox.check();

  await page.waitForTimeout(2000);

  //Fetch locator for all checkboxes
  const checkboxes: Locator[] = days.map(value => page.getByLabel(value));
  expect(checkboxes.length).toBe(7);

  //Check all boxes
  for(const checkbox of checkboxes){
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }

  await page.waitForTimeout(2000);

  //Uncheck last 3 checkboxes
  for(const checkbox of checkboxes.slice(-3)){
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  }

  await page.waitForTimeout(2000);

  //Uncheck already checked and vice versa
  for(const checkbox of checkboxes){
    if(await checkbox.isChecked()){
      await checkbox.uncheck();
    }
    else{
      await checkbox.check();
    }
  }

  await page.waitForTimeout(2000);

  const indexes = [1,3,5,6];

  //Check the boxes with specific index
  for(const i of indexes){
    await checkboxes[i].check();
    await expect(checkboxes[i]).toBeChecked();
  }

  await page.waitForTimeout(2000);

  //Check if a specific checbox label needs to be unchecked
  const notMyDay = "FRIDAY";

  for(const day of days){
    if(day.toLowerCase() === notMyDay.toLowerCase()){
      const notMyDayLabel = page.getByLabel(day);
      await notMyDayLabel.uncheck();
      await expect(notMyDayLabel).not.toBeChecked();
    }
  }

    await page.waitForTimeout(5000);
  
});