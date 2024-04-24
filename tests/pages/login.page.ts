import { expect, Page } from "@playwright/test";

export default class LoginPage{
    page:Page;

    constructor(page: Page){
        this.page = page;
    }

    // public async navigateToSauceDemo(){
    //     await this.page.goto('https://www.saucedemo.com/');
    //     await this.page.waitForURL('**\/saucedemo.com');
    // }

    public loginToSauceDemo = async(): Promise<void> => { 
        await this.page.goto('https://www.saucedemo.com/');

    }

    // Locators

    titlePage = () => this.page.getByText('Swag Labs');
    txtboxUsername = () => this.page.getByPlaceholder('Username');
    txtboxPassword = () => this.page.getByPlaceholder('Password');
    btnLogin = () => this.page.locator('text=Login');    
    errorMsgUserName = () => this.page.getByTestId('error');

    public async verifyPageTitle(){
        await this.titlePage().isVisible();
    }

    public async enterValidCredentials(){
        await this.txtboxUsername().fill('standard_user');
        await this.txtboxPassword().fill('secret_sauce');
    }

    public async enterInValidUserName(){
        await this.txtboxUsername().fill('standard_userXXXX');
        await this.txtboxPassword().fill('secret_sauce');
    }

    public async enterInValidPassword(){
        await this.txtboxUsername().fill('standard_user');
        await this.txtboxPassword().fill('secret_sauceXXXXXX');
    }

    public async enterLockedOutUser(){
        await this.txtboxUsername().fill('locked_out_user');
        await this.txtboxPassword().fill('secret_sauce');
        
    }

    public async clickLoginBtn(){
        await this.btnLogin().click({force:true});
    }

    public async validateInvalidCredentials(){
        await expect(this.errorMsgUserName()).toContainText('Epic sadface: Username is required');
    }

    public async validateInvalidUserNamePassword(){
        await expect(this.errorMsgUserName()).toContainText('Epic sadface: Username and password do not match any user in this service');
    }

    public async validateLockedOutUser(){
        await expect(this.errorMsgUserName()).toContainText('Epic sadface: Sorry, this user has been locked out.');
    }


}