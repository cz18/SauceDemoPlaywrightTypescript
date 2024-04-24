import { Page } from "@playwright/test";

export default class Add2CartPage{
    page: Page;

    constructor(page:Page){
        this.page = page;
    }

    //Locators
    btnCheckOut = () => this.page.locator('button#checkout');


    //Methods

    public async clickCheckOut(){
        await this.btnCheckOut().click({force:true});
    }

}

