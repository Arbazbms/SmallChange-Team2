import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './confirmed.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usernameErrorTextmsg: string =
  'Invalid Username- Must contain between 3 and 18 letters, numbers, underscores or hyphens ';
passwordErrorTextmsg: string =
  'Invalid Password- Must contain between 6 and 24 letters, numbers, underscores or hyphens ';
registerForm: FormGroup;

constructor(private formBuilder: FormBuilder, ) {

  this.registerForm = this.formBuilder.group({
    emailid:['',
    [Validators.required]
    ],
    username:['',
    [Validators.required]
    ],
    country:['',
    [Validators.required]
    ],
    postal:['',
    [Validators.required]
    ],
    dob:['',
    [Validators.required]
    ],
    identification:['',[Validators.required]],
    idval:['',[Validators.required]],
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
      [
        Validators.required,
        // this.confirmpassword
      ],
    ],
  },[CustomValidators.MatchValidator('password1', 'Password2')]);
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

get password1(){
  return this.registerForm.get('password1')
}

get password2(){
  return this.registerForm.get('password2')
}

get passwordMatchError() {
  return (
    this.registerForm.getError('mismatch')&&
    this.registerForm.get('password2')?.touched &&
    this.registerForm.get('password2')?.dirty
  
  );
}

onSubmit() {
  console.log(this.registerForm.value);
}

 confirmpassword(control: AbstractControl): {[key: string]: any} | null  {
 return{
  "confirmed":this.registerForm.get('password1')
 }

}
}