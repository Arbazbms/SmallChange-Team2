import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Client } from 'src/app/models/client.model';
import { Identification } from 'src/app/models/identification.model';
import { ClientService } from 'src/app/services/client.service';
import { passwordMustMatch } from './confirmed.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  passworderror=false
passwordErrorTextmsg: string =
  'Invalid Password- Must contain between 6 and 24 letters, numbers, underscores or hyphens ';
registerForm: FormGroup;
private idValidators = [
  Validators.maxLength(250),
  Validators.minLength(5),
  Validators.required
  
];
constructor(private formBuilder: FormBuilder, private clientservice:ClientService) {

  this.registerForm = this.formBuilder.group({
    emailid:['',[
    Validators.required,
    Validators.pattern( /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
  ]
    ],
    username:['',
    Validators.required
    ],
    country:['',
    Validators.required
    ],
    postal:['',
    [Validators.pattern('^[0-9]{6}$'), Validators.required]
    ],
    dob:['',
    Validators.required
    ],
    idtype:['',Validators.required],
    idval:['',this.idValidators],
    password1: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
        Validators.pattern("^[a-zA-Z0-9_\-]{3,18}$")
      ],
      // this.emailValidators
    ],
    password2: [
      '',
        Validators.required,
        // this.confirmpassword
      
    ],
  },{validators: [passwordMustMatch]});
}

ngOnInit(): void {


}

get emailid() {
  return this.registerForm.get('emailid');
}
get username() {
  return this.registerForm.get('username');
}
get country() {
  return this.registerForm.get('country');
}
get postal() {
  return this.registerForm.get('postal');
}
get dob() {
  return this.registerForm.get('dob');
}
get idtype(){
  return this.registerForm.get('idtype')
}
get idval(){
  return this.registerForm.get('idval')
}
get password1(){
  return this.registerForm.get('password1')
}

get password2(){
  return this.registerForm.get('password2')
}

// get passwordMatchError() {
//   return (
//     this.registerForm.getError('mismatch')&&
//     this.registerForm.get('password2')?.touched &&
//     this.registerForm.get('password2')?.dirty
  
//   );
// }

onSubmit() {
var formvalues=this.registerForm.value
var id=Math.floor(Math.random() * 10);
var identity= new Identification(formvalues.idtype,formvalues.idval)
var client_to_be_added=new Client(
  id,"h31",
  formvalues.emailid,
  formvalues.DOB,
  formvalues.country,
  formvalues.postal,
  formvalues.password1,
  identity
)
this.clientservice.addClient(client_to_be_added)
}
updateValueAndValidity(){

    if(String(this.registerForm.get('idtype')?.value)=='Adhaar') {
      this.registerForm.get('idval')?.setValidators(this.idValidators.concat(Validators.pattern('^[0-9]{12}$')))
    }
    else if(String(this.registerForm.get('idtype')?.value)=='PAN') {
      this.registerForm.get('idval')?.setValidators(this.idValidators.concat(Validators.pattern('^[0-9]{11}$')))
    }
    else if(String(this.registerForm.get('idtype')?.value)=='Passport') {
      this.registerForm.get('idval')?.setValidators(this.idValidators.concat(Validators.pattern('^(?!0{3,20})[a-zA-Z0-9]{3,20}$')))
    }
    else if(String(this.registerForm.get('idtype')?.value)=='SSN') {
      this.registerForm.get('idval')?.setValidators(this.idValidators.concat(Validators.pattern(/.+@.+\..+/)))
    }
    else {
      this.registerForm.get('idval')?.setValidators(this.idValidators);
    }

  
}
}