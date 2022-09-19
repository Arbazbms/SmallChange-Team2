export default class LoginPage {
    navigate() {
        cy.visit("/login");
    }
    addUserName(name:string){
        cy.get('#username').type(name)
      }
    addPassword(pass1:string){
        cy.get('#password').type(pass1)
      }
    clickSubmit(){
        cy.get('button').contains('Submit').click()
    }
   
}