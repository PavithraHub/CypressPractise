export class HomePage{

    getName(){
        return cy.get('input[name="name"]:nth-child(2)')
    }

    getGender(){
        return cy.get('#exampleFormControlSelect1')
    }

    getTwoWayBindingTextBox(){
        return cy.get('input[name="name"]:nth-child(1)')
    }

    getEntrepreneurRadioButton(){
        return cy.get('#inlineRadio3')
    }

    getShopBtn(){
        return cy.get('.nav-item:nth-child(2) a')
    }

}