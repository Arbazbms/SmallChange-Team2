import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})

export class LoginFormComponent implements OnInit {
  usernameErrorTextmsg: string =
    'Invalid Username- Must contain between 3 and 18 letters, numbers, underscores or hyphens ';
  passwordErrorTextmsg: string =
    'Invalid Password- Must contain between 6 and 24 letters, numbers, underscores or hyphens ';
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, ) {

    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(18),
          Validators.pattern("^[a-zA-Z0-9_\-]{3,18}$")
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          Validators.pattern("^[a-zA-Z0-9_\-]{3,18}$")
        ],
      ],
    });
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
