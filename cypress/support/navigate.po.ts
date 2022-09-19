export default class navigate{

    navigateReport(){
        cy.visit('/report')
    }
    // goToReportpage(){
    //     //cy.get('#mylink').contains('report').click();
    //     cy.get('a').contains('report').click()
    // }
    checkReportpage(){
        cy.get('h1').contains('Client Activity Report').click();
    }
    

}
