const { test, expect } = require('@playwright/test');
import { Nevigation } from './Nevigation';
import { isDesktopViewport } from '../utils/isDesktopViewport';



export class ProductsPage{
    constructor (page) {
        this.page = page

        this.addButtons = page.locator('[data-qa="product-button"]')   
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')

    }

    visit = async () => {
        await this.page.goto("/")
    }
    
    addProductToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        const nevigation = new Nevigation(this.page)
        // only desktop viewport
        let basketCountBeforeAdding
        if (isDesktopViewport(this.page)){
            basketCountBeforeAdding = await nevigation.getBasketCount()

        }
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        // only desktop viewport
        if (isDesktopViewport(this.page)){
            const basketCountAfterAdding = await nevigation.getBasketCount()
            expect (basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)

        }
        
    }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitleBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitleAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitleAfterSorting).not.toEqual(productTitleBeforeSorting)
       


        

    }
}