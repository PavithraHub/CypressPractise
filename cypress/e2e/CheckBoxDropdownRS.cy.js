describe('checkbox',()=>{
    it.skip('checkbox',()=>{

        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/#')

        cy.get('#checkBoxOption1').check()
        cy.get('#checkBoxOption1').should('be.checked').and('have.value','option1')

        //to check multiple check boxes
        cy.get("input[type='checkbox']").check(['option2','option3'])
    })

    it.skip('static dropdown',()=>{

        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/#')

        //can directly call select tag name inside get or using any attribute

        //cy.get('select').select('option2')

        cy.get('#dropdown-class-example').select('Option1').should('have.value','option1')
    })

    it.skip('dropdown without select',()=>{

        cy.visit('https://www.dummyticket.com/dummy-ticket-for-visa-application/')

        cy.get('#select2-billing_country-container').click()
        
        //typing country in text box and keying enter
        cy.get('.select2-search__field').type('india').type('{enter}')

        cy.get('#select2-billing_country-container').should('have.text','India')

    })

    it.skip('Autosuggest dropdown',()=>{

        cy.visit('https://www.wikipedia.org/')
        cy.get('#searchInput').type('delhi')
        
        //getting the locator which has all results
         //and clicking on the result which contains Delhi university
        cy.get('.suggestion-text h3').contains('Delhi University').click()
         
        //asserting if the url now contains delhi university
        cy.url().should('contain','/Delhi_University')

    })

    it('Dynamic dropdown',()=>{

        cy.visit('https://www.google.com/')

        cy.get('.gLFyf').type('cypress automation')

        cy.wait(3000)
        
        //getting the locator which has all results
         //and clicking on the result which contains Delhi university
        cy.get('.wM6W7d span').each(($el,index,$list)=>{

            if($el.text()=='cypress automation training')
            {
                cy.wrap($el).click()
            }
        })
         
        //asserting if the new page search text area now contains cypress automation training
        cy.get('.gLFyf').should('have.value','cypress automation training')

    })


})