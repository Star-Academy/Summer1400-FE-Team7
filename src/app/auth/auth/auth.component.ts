import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  externalValue: string ="";
  inputProps:any={type: "text",}
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges():void{
    console.log(this.externalValue)
  }

}
