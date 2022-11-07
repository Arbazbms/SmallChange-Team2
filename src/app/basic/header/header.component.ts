import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/post-login/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) { }

  isLoggedIn: boolean = !!localStorage.getItem('client')

  ngOnInit(): void {


    this.isLoggedIn = this.authService.IsLoggedIn()

    if( this.authService.IsLoggedIn() ){

      console.log(true)
    }

  }

  


}
