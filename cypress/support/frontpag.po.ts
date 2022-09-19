export default class fronpag{

    navigate(){
        cy.visit('/')
    }
    getTitle(){
        cy.get('h1').contains('SmallChange')
    }

   clickLogin() {
        cy.get('#login').contains('Login').click();
    }
    // checkLoginpage(){
    //     cy.get('.headline').contains('Login')
    // }
   clickRegister(){
        cy.get('#reg').contains('Register').click();
    }
    checkRegisterPage(){
        cy.get('.headline').contains('SIGN UP!!')
    }
    // clickOnBacktoLoginPage(){
    //     cy.get('a').contains("Already a User?  login").click();
    // }
    // checkLoginpage(){
    //     cy.get('.headline').contains('Login')
    // }

}
