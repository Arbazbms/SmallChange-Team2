import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
loginForm: FormGroup;

constructor(private formBuilder: FormBuilder, ) {

  this.loginForm = this.formBuilder.group({
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
        confirmpassword
      ],
    ],
  });
}
function confirmpassword(params:type) {
  
}

ngOnInit(): void {}

get username() {
  return this.loginForm.get('username');
}

get password(){
  return this.loginForm.get('password')
}

onSubmit() {
  console.log(this.loginForm.value);
}
}