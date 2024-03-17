const { test, expect } = require('@playwright/test');
import { ProductsPage } from '../page-objects/ProductsPage';
import { Nevigation } from '../page-objects/Nevigation';
import { Checkout } from '../page-objects/Checkout';
import { LoginPage } from '../page-objects/LoginPage';
import { RegisterPage } from '../page-objects/RegisterPage';
import { v4 as uuidv4 } from 'uuid';
import {DeliveryDetails} from '../page-objects/DeliveryDetails.js';
import { deliveryDetails as userAddress} from './../data/deliveryDetails.js';
import { PaymentPage } from '../page-objects/PaymentPage.js';
import { paymentDetails } from '../data/paymentDetails.js';


test("new user full end to end test journey", async ({page}) =>{

    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    await productsPage.sortByCheapest()
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)
    const nevigation = new Nevigation(page)
    await nevigation.goToCheckout()

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()

    const loginPage =  new LoginPage(page)
    await loginPage.moveToSignUp()

    const registerPage = new RegisterPage(page)
    const email = uuidv4() + "@gmail.com"
    const password = uuidv4()
    await registerPage. signUpAsNewUser(email, password)

    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userAddress)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(paymentDetails)
    await paymentPage.completePayment()

})