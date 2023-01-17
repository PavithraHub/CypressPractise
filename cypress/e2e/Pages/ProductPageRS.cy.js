export class ProductPage{

    getCheckOutBtn(){
        return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link')
    }
}