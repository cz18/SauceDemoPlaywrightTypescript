import {expect, test} from "@playwright/test";
import LoginPage from "./pages/login.page";
import ProductsPage from "./pages/products.page";
import CheckOutInfoPage from "./pages/checkoutinfo.page";
import Add2CartPage from "./pages/add2cart.page";


test.only('Login to Sauce Demo with valid credentials', async({page}) =>{
    // const lp = new LoginPage(page);
    // const pp = new ProductsPage(page);
    
    // lp.verifyPageTitle();
    // lp.enterValidCredentials();
    // lp.clickLoginBtn();
    // pp.verifyPageTitle();

    //hp.gotoSauceDemo();
    //await login.loginToSauceDemo();
    await page.goto('https://www.saucedemo.com/');

    try{
        await expect(page.getByText('Swag Labs')).toBeVisible();
    }catch(error){
        console.log("An error occured", error);
    }
    
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('text=Login').dblclick({force:true});
    
    try{
        await expect(page.getByText('Products')).toContainText('Products');
    }catch(error){
        console.log("An error occured", error);
    }
    await page.locator('[id:"login-button]').dblclick;
    
    //page.pause();

});

test.only('Login to Sauce Demo with invalid credentials', async({page}) =>{
    // const hp = new HomePage(page);
    //const lp = new LoginPage(page);

    // hp.gotoSauceDemo();
    //lp.loginToSauceDemo();
    // lp.verifyPageTitle();
    // lp.clickLoginBtn();
    // lp.validateInvalidCredentials();
    await page.goto('https://www.saucedemo.com/');

    await expect(page.getByText('Swag Labs')).toBeVisible();
    await page.locator('text=Login').dblclick({force:true});
    await expect(page.getByTestId('error')).toContainText('Epic sadface: Username is required');
    await page.pause(); 


});

test.only('Login to Sauce Demo with invalid username only', async({page}) =>{
    // const lp = new LoginPage(page);

    // lp.verifyPageTitle();
    // lp.enterInValidUserName();
    // lp.clickLoginBtn();
    // lp.validateInvalidUserNamePassword();

    // hp.gotoSauceDemo();
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await page.getByPlaceholder('Username').fill('standard_userXXXXX');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('text=Login').dblclick({force:true});
    await expect(page.getByTestId('error')).toContainText('Epic sadface: Username and password do not match any user in this service');
    await page.pause();

});

test.only('Login to Sauce Demo with invalid password only', async({page}) =>{
    // const lp = new LoginPage(page);
    

    // lp.verifyPageTitle();
    // lp.enterInValidPassword();
    // lp.clickLoginBtn();
    // lp.validateInvalidUserNamePassword();

    // hp.gotoSauceDemo();
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauceXXXXXXX');
    await page.locator('text=Login').dblclick({force:true});
    await expect(page.getByTestId('error')).toContainText('Epic sadface: Username and password do not match any user in this service');
    await page.pause();
    await page.close();

});

test.only('Sorting the price from high to low', async({page}) =>{
    // const hp = new HomePage(page);
    // const lp = new LoginPage(page);
    // const pp = new ProductsPage(page);

    // lp.verifyPageTitle();
    // lp.enterValidCredentials();
    // lp.clickLoginBtn();
    //pp.sortProductsFromHiLo();

    // hp.gotoSauceDemo();
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('text=Login').dblclick({force:true});
    await expect(page.getByText('Products')).toContainText('Products');
    await page.getByTestId("product-sort-container").selectOption({label:'Price (high to low)'});
    await expect(page.getByTestId("product-sort-container")).toContainText('Price (high to low)');
    //page.pause();
    await page.close();

});

test.only('Complete the purchase for 2 items which has $15.99 price.', async({page}) =>{
    // const hp = new HomePage(page);
    // const lp = new LoginPage(page);
    // const pp = new ProductsPage(page);
    // const ci = new CheckOutInfoPage(page);
    // const ac = new Add2CartPage(page);
    
    // hp.gotoSauceDemo();
    // lp.verifyPageTitle();
    // lp.enterValidCredentials();
    // lp.clickLoginBtn();
    // pp.verifyPageTitle();
    await page.goto('https://www.saucedemo.com/');
    // pp.selecting2itemsProducts();
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('text=Login').dblclick({force:true});
    await expect(page.getByText('Products')).toContainText('Products');
        
    const add2cartbtn_all = await page.locator("//div[@class='pricebar']/button");
    const prices = await page.getByTestId('inventory-item-price');

    for(let i=0; i<await add2cartbtn_all.count();){
        //console.log(await add2cartbtn_all.nth(i).textContent());
        const target_price = await prices.nth(i).textContent();
        if(target_price?.includes('$15.99')){
            await add2cartbtn_all.nth(i).click();
        }
        i++;
    }

    // ac.clickCheckOut();
    await page.locator("//div[@id='shopping_cart_container']//a[1]").click({force:true});
    await page.goto('https://www.saucedemo.com/cart.html');
    await page.locator('button#checkout').click({force:true});


    // ci.fillUpCheckOutInfo();
    await page.locator('#first-name').fill('Czar');
    await page.locator('#last-name').fill('Sor');
    await page.locator('#postal-code').fill('10400');
    await page.locator('#continue').click({force:true});

    // ci.verifyCheckoutOverview();
    await expect(page.getByTestId('title')).toContainText('Checkout: Overview');
    await expect(page.getByTestId('subtotal-label')).toContainText('Item total: $31.98');
    
    // ci.validateCompleteCheckout();
    await page.locator('#finish').click({force:true});
    await expect(page.getByTestId('title')).toContainText('Checkout: Complete!');
    await expect(page.getByTestId('complete-header')).toContainText('Thank you for your order!');
    await expect(page.getByTestId('complete-text')).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
       
    //page.pause();
    await page.close();

});

test.only('Validate the locked_out_user', async({page}) =>{
    // const lp = new LoginPage(page);

    // lp.verifyPageTitle();
    // lp.enterLockedOutUser();
    // lp.clickLoginBtn();
    // lp.validateLockedOutUser();
    // hp.gotoSauceDemo();
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('text=Login').dblclick({force:true});
    await expect(page.getByTestId('error')).toContainText('Epic sadface: Sorry, this user has been locked out.');
    await page.pause();
    await page.close();

});