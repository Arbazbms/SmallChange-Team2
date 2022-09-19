import Navigate from "cypress/support/navigate.po"

describe('', ()=>{

   let np:Navigate;
   
    beforeEach(()=>{
        np = new Navigate();
       
    })

   it('should get title of car-list page', ()=>{
    np.navigateReport();
   
    //np.goToReportpage();
    np.checkReportpage()
    //fp.clickOnBacktoLoginPage();
    //fp.clickLogin();
   })  



})