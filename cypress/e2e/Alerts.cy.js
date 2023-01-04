describe('Alerts',()=>{
    it.skip('SimpleAlert',()=>{

        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        cy.get("button[onclick='jsAlert()']").click()
        //by default cypress handles alerts and takes ok but to get the text of alert, we have to use events

        cy.on('window:alert',(str)=>{

            //expect(str).to.equal('I am a JS Alert')
            assert.equal(str,'I am a JS Alert')
        })

        cy.get('#result').should('have.text','You successfully clicked an alert')
    })

    it.skip('ConfirmationAlert',()=>{

        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        cy.get("button[onclick='jsConfirm()']").click()
        //by default cypress handles alerts and takes ok but to get the text of alert, we have to use events

        cy.on('window:confirm',(str)=>{

            //expect(str).to.equal('I am a JS Confirm')
            assert.equal(str,'I am a JS Confirm')
        })

        cy.get('#result').should('have.text','You clicked: Ok')
    })

    it('ConfirmationAlert-click cancel',()=>{

        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        cy.get("button[onclick='jsConfirm()']").click()
        //by default cypress handles alerts and takes ok but to get the text of alert, we have to use events

        cy.on('window:confirm',(str)=>{

            //expect(str).to.equal('I am a JS Confirm')
            assert.equal(str,'I am a JS Confirm')
        })

        //to close alert using cancel button
        cy.on('window:confirm',()=>false)

        cy.get('#result').should('have.text','You clicked: Cancel')
    })

    it('Prompt Alert',()=>{

        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        cy.window().then((win)=>{
            cy.stub(win,'prompt').returns('Welcome')
        })

        cy.get("button[onclick='jsPrompt()']").click()
        //by default cypress handles alerts and takes ok but to get the text of alert, we have to use events

        cy.get('#result').should('have.text','You entered: Welcome')
    })

    it('Authentication Alert',()=>{

        //approach 1
        /*cy.visit('https://the-internet.herokuapp.com/basic_auth',{auth: 
                                                                    {username:'admin',
                                                                     password:'admin'
                                                                    }
                                                                })

        
        

        cy.get('.example p').should('have.contain','Congratulations!')*/

        //approach 2

        cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth')
        cy.get('.example p').should('have.contain','Congratulations!')
    })
})
