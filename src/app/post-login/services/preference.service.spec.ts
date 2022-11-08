import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import {HttpTestingController,HttpClientTestingModule} from '@angular/common/http/testing'
import { PreferenceService } from './preference.service';
import { Preference } from 'src/app/models/preference';
import { HttpErrorResponse } from '@angular/common/http';

describe('PreferenceService', () => {
  let service: PreferenceService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PreferenceService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  //Testing POST Prefernce !! chk toEqual(expected)
  it('should POST PREFERENCE', inject([PreferenceService], fakeAsync((service: PreferenceService) => { 
      const expected = new Preference("166","Education","Average","40001-60000","0-5 years");
      service.savePreferences(expected).subscribe(); 
      const req = httpTestingController.expectOne('http://localhost:3000/preferences'); 
      // Assert that the request is a POST.
      expect(req.request.method).toEqual('POST'); 
      // Assert that it was called with the right data 
      // expect(req.request.body).toEqual(expected); 
      // Respond with empty data. 
      req.flush(null);
      // Assert that there are no outstanding requests.
      httpTestingController.verify();
      tick(); 
  })));


  // Testing getPreferenceById
  it('should return one preference By Id', inject([PreferenceService], fakeAsync((service: PreferenceService) => { 
    let pref: any = {
      clientId: '',
      investmentPurpose: '',
      riskTolerance: '',
      incomeCategory: '',
      lengthOfInvestment: ''
    }; 
    let testPref:Preference=
      {
      "clientId": "C101",
      "investmentPurpose": "Education",
      "riskTolerance": "AGGRESSIVE",
      "incomeCategory": "20001-40000",
      "lengthOfInvestment": "0-5"
      }
  
      service.getPreferenceById("C101").subscribe(data => pref = data); 
      const req = httpTestingController.expectOne('http://localhost:8080/api/preference/C101'); 
      // Assert that the request is a GET.
      expect(req.request.method).toEqual('GET');
      // Respond with mock data, causing Observable to resolve. 
      req.flush(testPref); 
      // Assert that there are no outstanding requests.
       httpTestingController.verify(); 
       // Cause all Observables to complete and check the results
        tick(); 
        expect(pref.investmentPurpose).toBe("Education");
      
      })));

      // test handleError function()
      // Testing Err handling from service.ts file
      it('should handle a 404 error ', inject([PreferenceService], fakeAsync((service: PreferenceService) => { 
        let errorResp: HttpErrorResponse;
        let errorReply: string = ''; 
        const errorHandlerSpy = spyOn(service, 'handleError').and.callThrough();
        service.getPreferenceById("C101").subscribe({next: () => fail('Should not succeed'), error: (e) => errorReply = e});
        const req = httpTestingController.expectOne(service.url+"/C101"); 
        // Assert that the request is a GET.
         expect(req.request.method).toEqual('GET');
        // Respond with error
        req.flush('Forced 404', { status: 404, statusText: 'Not Found' }); 
        // Assert that there are no outstanding requests.
        httpTestingController.verify(); // Cause all Observables to complete and check the results 
        tick(); 
        expect(errorReply).toBe( 'Unable to contact service; please try again later.');
        expect(errorHandlerSpy).toHaveBeenCalled(); 
        errorResp = errorHandlerSpy.calls.argsFor(0)[0];
        expect(errorResp.status).toBe(404); 
            
        })));


});
