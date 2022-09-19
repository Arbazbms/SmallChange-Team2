import FrontPage from "cypress/support/frontpag.po"

describe('front page', ()=>{

   let fp:FrontPage;
   
    beforeEach(()=>{
        fp = new FrontPage();
       
    })

   it('should get title of front page', ()=>{
    fp.navigate();
    fp.getTitle();
    fp.clickRegister();
    fp.checkRegisterPage();
    //fp.clickOnBacktoLoginPage();
    //fp.clickLogin();
   })  



})
