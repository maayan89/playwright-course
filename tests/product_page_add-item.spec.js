
const { test, expect } = require('@playwright/test');
// import { ProductPage } from '../page-objects/ProductsPage';

test.skip("product page add to busket", async ({ page }) => {
    await page.goto("/")
    
    const addToBasketButton = page.locator('[data-qa="product-button"]').first()
    const basketCounter = page.locator('[data-qa="header-basket-count"]')
   
    await addToBasketButton.waitFor()
    await expect(addToBasketButton).toHaveText("Add to Basket")
    await expect(basketCounter).toHaveText("0")
   
    await addToBasketButton.click()

    await expect(addToBasketButton).toHaveText("Remove from Basket")
    await expect(basketCounter).toHaveText("1")    

})