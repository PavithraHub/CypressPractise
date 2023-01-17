// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
Cypress.Commands.add('selectProduct', (productName) => { 
        cy.get('.card-title a').each(($el,index,$list)=>{

            if($el.text()===(productName))
            {
                cy.log('inside if block')
                cy.get('.btn.btn-info').eq(index).click()
            }
        })
     })


     Cypress.Commands.add('addComponent', (componentName) => { 
        //clicking on drag data components
        cy.get('div[data-text="Drag components here"]').click()
        //clicking + button in parsys
        cy.get('[title="Insert component"]').click()
        //entering component
        cy.get('input[placeholder="Enter Keyword"]').type(componentName).type('{enter}')
        cy.get('.coral3-SelectList-group .coral3-SelectList-item').as('componentList')
        cy.wait(4000)
        cy.get('@componentList').each(($component)=>{
            if($component.text()===componentName){
                
                cy.wrap($component).as('component')
                cy.get('@component').click()
                cy.wait(2000)
            }
        })
     })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })