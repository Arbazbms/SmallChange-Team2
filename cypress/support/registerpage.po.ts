export default class RegisterPage{
getRegisterTitle(){
    cy.get('.headline').contains(' SIGN UP!!')
  }




  addEmail(email:string) {



   cy.get('#emailid').type(email);
  }



 addUserName(name:string){
    cy.get('#username').type(name)
  }



 addCountry(country:string){
    cy.get('#country').type(country)
  }



 addPostal(postal:string){
    cy.get('#postal').type(postal)
  }



 addIdentity(identity:string){
    //cy.get('#idtype').type(identity)
    cy.get('select').select('PAN').type(identity)
  }




  addPan(pan:string){
    cy.get('#idval').type(pan)
  }



 addDob(date:any){
    cy.get('#dob').type(date)
  }



 addPassword(pass1:string){
    cy.get('#pass1').type(pass1)
  }



 addPass2(pass2:string){
    cy.get('#pass2').type(pass2)
  }
    
     clickAddUser() {
      return cy.get('button').contains('Submit', {timeout: 15000}).click();
     }
    }