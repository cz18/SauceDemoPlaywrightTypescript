import { Browser, Page, chromium, expect } from "@playwright/test";

async function globalSetup() {
    const browser: Browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    // await expect(page.getByText('Swag Labs')).toBeVisible();
    // await page.getByPlaceholder('Username').fill('standard_user');
    // await page.getByPlaceholder('Password').fill('secret_sauce');
    // await page.locator('text=Login').dblclick({force:true});
    // await expect(page.getByText('Products')).toContainText('Products');

    await page.context().storageState({path:"./LoginAuth.json"});

    await browser.close();

    
}

export default globalSetup;