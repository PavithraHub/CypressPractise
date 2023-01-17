///<reference types='cypress'/>

describe('Create a page in AEM',()=>{

    let data
    before(()=>{
        cy.log("Inside before each")
        cy.fixture("AEM.json").then((userdata)=>{
            data=userdata;
            cy.log('$$$$ DATA COPIED $$$$')
        })
    })

    beforeEach(function(){
        
        cy.visit('http://localhost:4502/libs/granite/core/content/login.html?')

        cy.get('#username').type(data.username)
        cy.get('#password').type(data.password)

        cy.get('#submit-button').click()
    })

    it('Create a page',()=>{

        //let parentUrl = 'http://localhost:4502/sites.html/content/we-retail/language-masters/en'
        cy.visit('http://localhost:4502/sites.html/content/we-retail/language-masters/en')

        //cy.get('.foundation-collection-item-thumbnail[src*="en/user"]').click()

        cy.contains('Create').click()
        cy.contains('Page').click()
        cy.wait(3000)
        cy.contains(data.pagetemplate).click()
        cy.contains('Next').click()

        //keying title to the page template
        let childPage = 'new-hero-page'
        cy.get('#coral-id-20').type(childPage)
        cy.get('.is-selected > coral-panel-content > .foundation-layout-inline2 > .coral3-Button--primary').click()

        //cy.contains('Open').click()

        let newUrl ='http://localhost:4502/editor.html/content/we-retail/language-masters/en'+'/'+childPage+'.html'
        cy.log(newUrl)
        cy.visit(newUrl)
    })

    it('Adding a component based on Switch',()=>{
        //cy.visit('http://localhost:4502/editor.html/content/we-retail/language-masters/en/new-hero-page.html')
        /*
        //clicking on drag data components
        cy.get('div[data-text="Drag components here"]').click()
        //clicking + button in parsys
        cy.get('[title="Insert component"]').click()
        //entering component
        cy.get('input[placeholder="Enter Keyword"]').type(text{enter}')
        cy.get('.coral3-SelectList-group .coral3-SelectList-item').as('componentList')
        cy.wait(4000)
        cy.get('@componentList').each(($componentName)=>{
            if($componentName.text()==='Text'){
                
                cy.wrap($componentName).as('component')
                cy.get('@component').click()
                cy.wait(2000)
            }
        }) */


        cy.visit('http://localhost:4502/editor.html/content/we-retail/language-masters/en/new-hero-page.html')
        cy.log(data.componentName)
        switch(data.componentName)
        {
            case "Title":
                cy.log('****Title component is added****')
                cy.addComponent('Title') 
                break

            case "Text":
                cy.log('****Text component is added****')
                cy.addComponent('Text') 
                break  
        }

      })

    /*it('Editing Title component',()=>{
        cy.visit('http://localhost:4502/editor.html/content/we-retail/language-masters/en/new-hero-page.html')
        cy.get('div[title="Title"]').click()

        cy.get('button[title="Configure"]').click()

        cy.get('.coral-FixedColumn-column >.coral-Form-fieldwrapper .coral-Form-field.coral3-Textfield')
        .type('Test Title')
        cy.get('.coral-Form-field.core-title-sizes-default.coral3-Select .coral3-Button').click()
        cy.get('.coral3-Select-overlay.is-open .coral3-SelectList.coral3-Select-selectList .coral3-SelectList-item').select('H2')

        //cy.get('#coral-id-511').type('/content/we-retail/language-masters/en')
        cy.xpath('//label[text()="Link"]/following-sibling::foundation-autocomplete').type('/content/we-retail/language-masters/en')

        cy.get('button[title="Done"]').click()
    })*/

    it.skip('Title Publish page',()=>{

        cy.visit('http://localhost:4502/content/we-retail/language-masters/en/new-hero-page.html?wcmmode=disabled')
        cy.log(data.h1.fontweight)
        cy.log(data.h1.textalign)

        //validating h1 values from fixture file
        cy.get('.cmp-title__text').should('have.css','font-weight', data.h1.fontweight)
        cy.get('.cmp-title__text').should('have.css','text-align', data.h1.textalign)
        cy.get('.cmp-title__text').should('have.css','color', data.h1.color)
        cy.get('.cmp-title__text').should('have.css','font-size', data.h1.fontsize)
        //cy.get('.cmp-title__text').should('have.css','font-family', 'Helvetica Neue')
    })

    it('Text author page',()=>{

        let abort = false
        cy.visit('http://localhost:4502/editor.html/content/we-retail/language-masters/en/new-hero-page.html')

        cy.get('div[title="Text"]').click()

        cy.get('button[data-action="CONFIGURE"]').click()

       // cy.get('button[icon*="fullScreen"]').click()

        cy.get('.cq-RichText-editable').click()

        //cy.xpath('//button[@title="Paragraph formats"]//coral-icon[@icon="chevronDown" and @xpath="1"]').click()

        //selecting Heading 2 from options
        cy.get('.is-selected > coral-button-label').click()
        cy.get('[data-type="dialogFullScreen"] > .coral3-Popover > .coral3-Popover-content > coral-popover-content > .coral3-BasicList >button').as('options').each(($options,index)=>{
            //cy.log($options.text())
            cy.get($options).find('.coral3-BasicList-item-outerContainer .coral3-BasicList-item-contentContainer .coral3-BasicList-item-content').then($presentOption=>{
                if(($presentOption).text()==='Heading 2')
                {
                    cy.wrap($options).click();
                    abort = true
                    return false;
                }
        
            })
        
        //if (abort) return false

        })
        //choosing and clicking tick button to close text component
        cy.get('div[data-cq-richtext-editable="true"]').type("Sample text")

        cy.get('.cq-dialog-submit coral-icon[icon="check"]').click()
    })

    it('Text publish page',()=>{

        cy.visit('http://localhost:4502/content/we-retail/language-masters/en/new-hero-page.html?wcmmode=disabled')
        cy.log(data.h2.fontweight)
        //cy.log(data.h2.textalign)

        //validating whether .cmp-text class has h2 tag as child
        cy.get('.cmp-text:first-child').should('have.descendants','h2')
        //validating h2 value from fixture file - either using children() or directly with h2 tag
        cy.get('.cmp-text h2').should('have.css','font-weight', data.h2.fontweight)
        cy.get('.cmp-text').children().should('have.css','line-height', data.h2.lineheight)
        cy.get('.cmp-text h2').should('have.css','color', data.h2.color)
        cy.get('.cmp-text').children().should('have.css','font-size', data.h2.fontsize)
    })

    
})