import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  @Input() navlinks:String | undefined ;
  mystring:string='';
  constructor() { }

  ngOnInit(): void {
      if(this.navlinks)
      {
        this.mystring=this.capitalizeFirstLetter(String(this.navlinks))
      }
      
  }
   capitalizeFirstLetter(mystring:string) {
    return mystring.charAt(0).toUpperCase() + mystring.slice(1);
  }
}
