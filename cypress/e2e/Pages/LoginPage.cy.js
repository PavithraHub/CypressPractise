

export class LoginPage{

    //getting the locators in variables

    login_textbox_username = '[name="username"]'
    login_textbox_password = '[name="password"]'
    login_submit_button='[type="submit"]'
    
    enterUserName(username){
        cy.get(this.login_textbox_username).type(username)
    }

    enterPassword(pwd){
        cy.get(this.login_textbox_password).type(pwd)
    }

    clickSubmit(){
        cy.get(this.login_submit_button).click()
    }
}