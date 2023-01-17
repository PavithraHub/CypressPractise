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

    it('Title Publish page',()=>{

        cy.visit('http://localhost:4502/content/we-retail/language-masters/en/new-hero-page.html?wcmmode=disabled')


        //validating h1 values from fixture file
        cy.get('.cmp-title__text').then(($title)=>{
            cy.writeFile('FileWriteSample.txt',$title.text().concat('\n'))
        })
        
    })

    it('Text publish page',()=>{

        cy.visit('http://localhost:4502/content/we-retail/language-masters/en/new-hero-page.html?wcmmode=disabled')
        
        //cy.log(data.h2.textalign)
        //cy.writeFile('FileWriteSample.txt',($text.text()).concat('\n'),{flag: 'a+'})
        cy.get('.cmp-text').children().then(($text)=>{
  
            cy.writeFile('FileWriteSample.txt',($text.text()).concat('\n'),{flag: 'a+'})
   

            
            
        })
        
    })

    it('Footer file write',()=>{

        cy.visit('http://localhost:4502/content/we-retail/language-masters/en/new-hero-page.html?wcmmode=disabled')
        
        

        cy.xpath('//footer//li[@class="cmp-navigation__item cmp-navigation__item--level-0"]/a').each(($list)=>{

       
           
            cy.writeFile('FileWriteSample.txt',($list.text()).concat('\n'),{flag: 'a+'})
            
        })
    })
    
})     
    




