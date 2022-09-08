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
  usernameErrorTextmsg: string =
  'Invalid Username- Must contain between 3 and 18 letters, numbers, underscores or hyphens ';
passwordErrorTextmsg: string =
  'Invalid Password- Must contain between 6 and 24 letters, numbers, underscores or hyphens ';
registerForm: FormGroup;

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
    Validators.required
    ],
    dob:['',
    Validators.required
    ],
    idtype:['',Validators.required],
    idval:['',Validators.required],
    password1: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
        Validators.pattern("^[a-zA-Z0-9_\-]{3,18}$")
      ],
    ],
    password2: [
      '',
        Validators.required,
        // this.confirmpassword
      
    ],
  },{validators: passwordMustMatch});
}

ngOnInit(): void {}

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

}