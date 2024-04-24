import { Page, expect } from "@playwright/test";

export default class CheckOutInfoPage{
    page: Page;

    constructor(page:Page){
        this.page = page;
    }

    txtFirstName = () => this.page.locator('#first-name');
    txtLastName = () => this.page.locator('#last-name');
    txtPostalCode = () => this.page.locator('#postal-code');
    btnContinue = () => this.page.locator('#continue');
    sectionName = () => this.page.getByTestId('title');
    labelSubTotal = () => this.page.getByTestId('subtotal-label');
    btnFinish = () => this.page.locator('#finish');
    sectionNameCheckOutComplete = () => this.page.getByTestId('title');
    msgCompleteHeader = () => this.page.getByTestId('complete-header');
    txtCompleteMsg = () => this.page.getByTestId('complete-text');


    

    public async fillUpCheckOutInfo(){
        await this.txtFirstName().fill('Czar');
        await this.txtLastName().fill('Sor');
        await this.txtPostalCode().fill('10400');
        await this.btnContinue().click({force:true});        

    }

    public async verifyCheckoutOverview(){
        await expect(this.sectionName()).toContainText('Checkout: Overview');
        await expect(this.labelSubTotal()).toContainText('Item total: $31.98');
    }

    public async validateCompleteCheckout(){
        await expect(this.sectionNameCheckOutComplete()).toContainText('Checkout: Complete!');
        await expect(this.msgCompleteHeader()).toContainText('Thank you for your order!');
        await expect(this.txtCompleteMsg()).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        
    }



}