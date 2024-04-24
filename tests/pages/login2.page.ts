import { Expect, Page } from "@playwright/test";

export default class LoginPage2{
    page:Page;

    constructor(page:Page){
        this.page = page;
    }

    public async navi2SauceDemo(){
        await this.page.goto('https://www.saucedemo.com/');
    }

}