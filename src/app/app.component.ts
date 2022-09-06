import { Component, OnInit } from '@angular/core';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private api: ClientService){}
  title = 'SmallChange-Team2';

  ngOnInit(){
    this.api.getUsers().subscribe(data => console.log("FETCHED FROM FAKE SERVER", data))
    this.api.postUser();
  }

}
