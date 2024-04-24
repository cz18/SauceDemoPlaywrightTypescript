import { Page } from "@playwright/test";

export default class CommonMethods{
    page : Page

// Common Method Constructor
constructor(page:Page){
    this.page = page;
}

async clickElement(selector: string) {
    await this.page.click(selector);
}

}