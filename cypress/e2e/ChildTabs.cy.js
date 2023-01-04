describe('ChildTabs',()=>{
    it('Approach1',()=>{

        cy.visit('https://the-internet.herokuapp.com/windows')

        cy.get('.example a').invoke('removeAttr','target').click()

        cy.url().should('include','windows/new')

        cy.go('back')
    })

    it.only('Approach2 - works when domain is same for parent and child',()=>{

        cy.visit('https://the-internet.herokuapp.com/windows')

        cy.get('.example a').then((locator)=>{
           let childUrl= locator.prop('href')
           cy.visit(childUrl)
        })

        cy.url().should('include','windows/new')

        cy.go('back')
    })
})