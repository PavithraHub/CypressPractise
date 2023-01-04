describe("csslocator",()=>{

    it("csslocatortest",()=>{

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")

        cy.get('.search-keyword').type("pe")
        cy.get('.search-button').click()
        
        cy.get('.product').should('have.length',2)
    })
})