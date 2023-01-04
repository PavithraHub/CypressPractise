describe('AmazonSearch', () => {

    beforeEach(function () {
        cy.visit('https://www.amazon.in/')
        cy.get('#twotabsearchtextbox').type('Laptop').type('{enter}')

    })

    it('Check if images exists', () => {

        //to check if the result contains image

        cy.get('.a-section.aok-relative.s-image-fixed-height .s-image').should('be.visible')
    })

    it('Check if each image is loaded', () => {


        //to check if the images are loaded

        // cy.get('.s-image')
        // .should('be.visible')
        // .and('have.prop', 'naturalWidth')
        // .should('be.greaterThan', 0)

        cy.get('.a-section.aok-relative.s-image-fixed-height .s-image').each(($image) => {

            cy.wrap($image).should('be.visible')
                .and('have.prop', 'naturalWidth')
                .should('be.greaterThan', 0)
        })

    })

    it.only('Add product to cart', () => {
        //cy.get('h2 .a-link-normal .a-size-medium.a-color-base.a-text-normal').eq(0).parent().invoke('removeAttr','target').click()

        cy.get('h2 .a-link-normal .a-size-medium.a-color-base.a-text-normal').each(($title,index,$list)=>{
            if($title.text().includes('Lenovo IdeaPad Slim 3'))
             {
                 cy.log('*****Inside if block***')
                 cy.get('h2 .a-link-normal .a-size-medium.a-color-base.a-text-normal').eq(index).parent().invoke('removeAttr','target').click()
                 return false
            }

        })

        cy.get('#add-to-cart-button').click()

        cy.wait(5000)

        cy.get('#attachDisplayAddBaseAlert .a-size-medium-plus').should('contain.text','Added to Cart')
        
    })
})
