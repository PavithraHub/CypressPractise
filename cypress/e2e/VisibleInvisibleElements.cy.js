describe('visibleInvisibleElements',()=>{
    it.skip('visibleInvisibleElements',()=>{

        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/#')

        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()

        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()

        cy.get('#displayed-text').should('be.visible')

    })

    it('radioButtons',()=>{

        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/#')

        cy.get('.radioButton').check().should('be.checked')
       
        cy.get('[value="radio2"]').check().should('be.checked')

    })
})