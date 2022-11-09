import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { ClientService } from 'src/app/services/client.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})

export class LoginFormComponent implements OnInit {
  EmailErrorTextmsg: string =
    'Invalid Email ';
  passwordErrorTextmsg: string =
    'Invalid Password- Must contain between 6 and 24 letters, numbers, underscores or hyphens ';

  loginErrorMsg = ''
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: Router, private clientService: ClientService) {

    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          
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

  get email() {
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password')
  }

  
  onSubmit() {
    var clientId = ''
    console.log(this.loginForm.value);
    if( this.loginForm.value.email === '' && this.loginForm.value.password === ''){
      this.loginErrorMsg = "Please Fill Email and Password"
      return
    }
    
    var ciphertext = CryptoJS.HmacMD5(this.loginForm.value.password, 'secret key 123').toString();
    console.log("ENCRYPTED PASSWORD",ciphertext)
    this.clientService.postClientToAuthenticateCredentialsl(new Login(this.loginForm.value.email,ciphertext)).subscribe((res1)=>{
      if(res1 === null){
        this.loginErrorMsg = 'Invalid Email and Password'
        this.route.navigate(['login'])
      }else{

      console.log("res form postClientToAuth***", res1);
      let clientId = res1.clientId;
      console.log("fetched clientID:: ", clientId);
      alert("Login Success!!")
      localStorage.setItem('client', clientId)
      this.loginForm.reset()
      this.route.navigate(['portfolio'])
    }
    
      //  var user:Boolean = res.find((a:any)=>{
      //   console.log(a)
      //    if(a.email === this.loginForm.value.email && a.password === this.loginForm.value.password){
      //       clientId = a.clientId;
      //       console.log("ClientId: ", clientId)
      //       return(a.email === this.loginForm.value.email && a.password === this.loginForm.value.password)
      //    }
      // });
      // console.log(user)
      // if(user){
      //   alert("Login Success!!")
      //   localStorage.setItem('client', clientId)
      //   this.loginForm.reset()
      
      //   this.route.navigate(['portfolio'])
      // }else{
      //   this.loginErrorMsg = 'Invalid Email and Password'
      //   this.route.navigate(['login'])
      // }
    }, err=>{
      // alert("something went wrong")
      console.log("something went wrong***")
    })
  }
}
