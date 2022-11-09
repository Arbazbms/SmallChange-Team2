import LoginPage from "cypress/support/loginpage.po";
// import AppPage from "cypress/support/app.po";


let lp: LoginPage;
// let about: AboutPage;
beforeEach(() =>{
    lp = new LoginPage();
    // about = new AboutPage();
}
);
describe("it should enter login form and validate page",()=>{



    it('Visits the initial project page then to home page', () => {
        lp.navigate();
        lp.addUserName('Arbazcs@gmail.com')
        lp.addPassword('1111111')
        lp.clickSubmit()

        
      })
    })

