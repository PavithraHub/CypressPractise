import { LoginPage } from "./Pages/LoginPage.cy";

const loginpage = new LoginPage();

describe('Login tests', function () {


    it('POM Demo', () => {

        cy.visit('https://opensource-demo.orangehrmlive.com')

        loginpage.enterUserName('Admin')
        loginpage.enterPassword('admin123')

        loginpage.clickSubmit()
    })

})