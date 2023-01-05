import {HomePage} from "./Pages/HomePageRS.cy"
describe('fixturePractise',()=>{

    //let userdata
    let userdata

    before(()=>{

        cy.log('******inside before block*********')

        cy.fixture("example.json").then((data)=>{

            userdata=data;
            cy.log('***data copied***')
     
        })
    })

    it('fixture and framework-RS',()=>{

        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        //cy.wait(5000)
        cy.get('input[name="name"]:nth-child(2)').type(userdata.name)
        //cy.wait(2000)
        cy.get('#exampleFormControlSelect1').select(userdata.gender)
    })

    it('RS-validating attribute properties',()=>{
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.get('input[name="name"]:nth-child(2)').type(userdata.name)
        //checking if the other textbox has same name value entered
        cy.get('input[name="name"]:nth-child(1)').should('have.value',userdata.name)

        //checking if radio button is disabled
        cy.get('#inlineRadio3').should('be.disabled')

        //checking if the attribute min-length is 2
        cy.get('input[name="name"]:nth-child(2)').should('have.attr','minlength','2')

        //other way for getting attribute

        //cy.get('input[name="name"]:nth-child(2)').invoke('attr','minlength').should('equal','2')

        cy.get('input[name="name"]:nth-child(2)').invoke('attr','minlength').then((attribute)=>{
            cy.log(attribute)
            expect(attribute).to.be.equal('2')
        })

        cy.get('.nav-item:nth-child(2) a').click()

        //logic to click add to cart for the product Blackberry

       /* cy.get('.card-title a').each(($el,index,$list)=>{

            if($el.text()=='Blackberry')
            {
                cy.get('.btn.btn-info').eq(index).click()
            }
        })*/

        //using custom command to implement above logic

        /*cy.selectProduct('Blackberry')
        cy.selectProduct('Nokia Edge')
        cy.log('Products added')*/

        //instead of adding product one after other, giving them in json file and add them in loop
        cy.log(userdata.product.length)
        cy.log(userdata.product)

        
        userdata.product.forEach(element => {
            cy.selectProduct(element)

        });

        // for(let i=0;i<userdata.product.length;i++)
        //     {
        //         cy.selectProduct(userdata.product).eq(i)
        //     }



    })

    it.only('validating full flow',()=>{
        cy.visit('https://rahulshettyacademy.com/angularpractice/')

        const homepage= new HomePage()

        homepage.getName().type(userdata.name)
        homepage.getName().should('have.attr','minlength','2')
        homepage.getGender().select(userdata.gender)
        homepage.getEntrepreneurRadioButton().should('be.disabled')
        homepage.getTwoWayBindingTextBox().should('have.value',userdata.name)

        homepage.getShopBtn().click()
        
    })
    
})