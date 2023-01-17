///<reference types='cypress'/>

describe('Create a page in AEM', () => {

    let data
    before(() => {
        cy.log("Inside before each")
        cy.fixture("AEM.json").then((userdata) => {
            data = userdata;
            cy.log('$$$$ DATA COPIED $$$$')
        })
    })

    beforeEach(function () {

        cy.visit('http://localhost:4502/libs/granite/core/content/login.html?')

        cy.get('#username').type(data.username)
        cy.get('#password').type(data.password)

        cy.get('#submit-button').click()
    })

    it('Title Publish page', () => {

        cy.visit('http://localhost:4502/content/we-retail/language-masters/en/new-hero-page.html?wcmmode=disabled')


        //validating h1 values from fixture file
        cy.get('.cmp-title__text').then(($title) => {
            cy.readFile('cypress/fixtures/sampleAEM.json').then(data => {
                //data.componentName = $text.text()
                data.titleName = $title.text()
                cy.writeFile('cypress/fixtures/sampleAEM.json',data)
            })
        })

    })

    it('Text publish page', () => {

        cy.visit('http://localhost:4502/content/we-retail/language-masters/en/new-hero-page.html?wcmmode=disabled')

        //cy.log(data.h2.textalign)
        //cy.writeFile('FileWriteSample.txt',($text.title).concat('\n'),{flag: 'a+'})
        cy.get('.cmp-text').children().then(($text) => {
            cy.readFile('cypress/fixtures/sampleAEM.json').then(data => {
                //data.componentName = $text.text()
                data.textName = $text.text()

                //cy.writeFile('cypress/fixtures/sampleAEM.json',data)
                data.key = "new key " + $text.text()
                
                cy.writeFile('cypress/fixtures/sampleAEM.json',data)
                //cy.writeFile('cypress/fixtures/sampleAEM.json', JSON.stringify(data))

            })

        })

    })

    it('Adding array in json-Footer file write', () => {

        var footerVal = []

        cy.visit('http://localhost:4502/content/we-retail/language-masters/en/new-hero-page.html?wcmmode=disabled')



        cy.xpath('//footer//li[@class="cmp-navigation__item cmp-navigation__item--level-0"]/a').each(($list) => {

            cy.readFile('cypress/fixtures/sampleAEM.json').then(data => {
                
                footerVal.push($list.text())

                //cy.writeFile('FileWriteSample.txt',($list.text()).concat('\n'),{flag: 'a+'})

                data.footer = footerVal
                cy.writeFile('cypress/fixtures/sampleAEM.json',data)
                //cy.writeFile('cypress/fixtures/sampleAEM.json', JSON.stringify(data))
            })
        })
    })

    /*it('Adding an object in json', () => {

        var footerVal = []

        cy.visit('http://localhost:4502/content/we-retail/language-masters/en/new-hero-page.html?wcmmode=disabled')



        cy.xpath('//footer//li[@class="cmp-navigation__item cmp-navigation__item--level-0"]/a').each(($list) => {

            cy.readFile('cypress/fixtures/sampleAEM.json').then(data => {
                footerVal.push($list.text())

                //cy.writeFile('FileWriteSample.txt',($list.text()).concat('\n'),{flag: 'a+'})
                data.newfooter.h1 = footerVal
                cy.writeFile('cypress/fixtures/sampleAEM.json',data)
                //cy.writeFile('cypress/fixtures/sampleAEM.json', JSON.stringify(data))
            })
        })
    })*/


})


