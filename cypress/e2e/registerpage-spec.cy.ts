import RegisterPage from "cypress/support/registerpage.po";

describe('Register user', ()=>{

   let rp:RegisterPage;
   
    beforeEach(()=>{
        rp = new RegisterPage();
       
    })

   it('should register user', ()=>{
    cy.visit('/register')
    rp.getRegisterTitle()
       rp.addEmail('ranjithamva@gmail.com');
       rp.addUserName('Ranjitha');
       rp.addCountry('India')
       rp.addPostal('570004')
       rp.addIdentity('PAN')
       rp.addPan('ALWPG5809L')
      // rp.addDob('27/10/22')
       rp.addPassword('12128Ranj')
       rp.addPass2('12128Ranj')
       rp.clickAddUser()

    })  



})