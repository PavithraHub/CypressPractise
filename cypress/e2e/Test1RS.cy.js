describe('My first test',function()
{
    it("My first test case",function()
        {

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")

        //getting a locator
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        // to select only the visible elements
        //cy.get('.product:visible').should('have.length',4)

        //get method - to find a element; find method - to find the subelements; should - assert

        cy.get('.products').find('.product').should('have.length',4)

        //find the second product and click on it  eq()- index

        cy.get('.products').as('ProdLocator')
        cy.get('@ProdLocator').find('.product').eq(2).contains('ADD TO CART').click().then(function(){

            console.log('abc')
        })

        //assert if logo element is present
        cy.get('.brand').should('have.text','GREENKART')

        //below prints in cy log
        cy.log(cy.get('.brand'))

        cy.get('.brand').then(function(logoText)
        {
            cy.log(logoText.text())
        })


        
    })
} )