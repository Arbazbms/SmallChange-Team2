import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LinksComponent } from './navbar/links/links.component';
import { PostLoginRoutingModule } from '../post-login/post-login-routing.module';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    LinksComponent
  ],
  imports: [
    CommonModule,
    PostLoginRoutingModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    LinksComponent
  ]
})
export class BasicModule { }
