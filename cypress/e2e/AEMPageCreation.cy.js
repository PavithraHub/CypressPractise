///<reference types='cypress'/>

describe('Create a page in AEM',()=>{

    it('Login',()=>{

        cy.visit('http://localhost:4502/libs/granite/core/content/login.html?')

        cy.get('#username').type('admin')
        cy.get('#password').type('admin')

        cy.get('#submit-button').click()

        

    })
})