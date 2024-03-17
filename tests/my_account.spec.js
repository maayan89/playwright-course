import { test } from "@playwright/test"
import { MyAccountPage } from "../page-objects/MyAccountPage"
import { getLoginToken } from "./../api-calls/getLoginToken.js"
import { adminDetails } from "../data/userDetails.js"

test("my account using cookie injection and mocking network request", async ({page}) => {
    // make a request to get login token
   const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)

   await page.route("**/api/user**", async(route, request) => {
         await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),

    })

   })

   console.warn({loginToken})
   // inject the login token into browser
    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await page.evaluate(([loginTokenIsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenIsideBrowserCode
  }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()

})