import { expect, Page } from "@playwright/test";

export default class ProductsPage{
    page:Page;

    constructor(page: Page){
        this.page = page;
    }

    // Locators

    titlePage = () => this.page.getByTestId('title');
    dropdownFilter = () => this.page.locator('select.product-sort-container');
    lnkAdd2Cart = () => this.page.getByTestId('shopping-cart-link');
        
    // Methods

    public async verifyPageTitle(){
        await expect(this.titlePage()).toBeVisible;
        //await this.page.waitForLoadState();
    }

    public async sortProductsFromHiLo(){
        //await this.dropdownFilter().click({force:true});
        await this.dropdownFilter().selectOption({value:'hilo'});
        await expect(this.dropdownFilter()).toContainText('Price (high to low)');
    }

    public async selecting2itemsProducts(){
        const prices = this.page.getByTestId('inventory-item-price');
        //const add2cartbtn = page.getByText('Add to cart').filter({hasText:'$15.99'});
        const add2cartbtn_all = this.page.locator("//div[@class='pricebar']/button");
        //let count = await prices.count();
        //console.log(await add2cartbtn.count());

        for(let i=0; i<await add2cartbtn_all.count();){
            //console.log(await add2cartbtn_all.nth(i).textContent());
            const target_price = await prices.nth(i).textContent();
            if(target_price?.includes('$15.99')){
                await add2cartbtn_all.nth(i).click();
            }
            i++;
        }
    }

    public async click2Add2Cart(){
        await this.lnkAdd2Cart().click({force:true});
    }

    





    //await page.getByTestId("product-sort-container").selectOption({label:'Price (high to low)'});
    //await expect(page.getByTestId("product-sort-container")).toContainText('Price (high to low)');
    

}