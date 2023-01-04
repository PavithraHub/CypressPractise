describe("assertions",()=>{
    it("Implicit assertions",()=>{

        cy.visit("https://google.com")

        cy.url().should('include','google')
        cy.url().should('eq',"https://www.google.com/")
        cy.url().should('contain','goo')

        //instead of getting url again and again can chain the should method by just getting url once
        cy.url().should('include','google')
        .should('eq',"https://www.google.com/")
        .should('contain','goo')

        //instead of writing should again and again, can use'and'
        cy.url().should('include','google')
        .and('eq',"https://www.google.com/")
        .and('contain','goo')

        //using negative assertions
        cy.url().should('not.include','gogle')
        .and('not.eq',"http://www.google.com/")
        .and('not.contain','gooo')

        //checking title of the webpage
        cy.title().should("include",'Goo').and('eq','Google')

        //checking logo element is visible or not
        cy.get('.lnXdpd').should('be.visible').and('exist')

        //to check the value given in a text box
        cy.get('.gLFyf').type("automation cypress")

        cy.get('.gLFyf').should('contain.value','cypress')


        
    })

    it('explicit assertions',()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get("input[placeholder='Username']").type('Admin')
        cy.get("input[placeholder='Password']").type('admin123')

        cy.get("button[type='submit']").click()

        let expName='123'
       cy.get('.oxd-userdropdown-name').then((x)=>{
            let actualName=x.text()

            //BDD type
            //expect(actualName).to.equal(expName)
            expect(actualName).to.not.equal(expName)

            //TDD type

       })
        

    })
})