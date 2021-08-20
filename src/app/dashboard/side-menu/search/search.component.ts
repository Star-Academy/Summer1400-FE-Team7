import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form: FormGroup = new FormGroup({
    searchText: new FormControl()
  });

  obs!: Subscription;

  constructor() { }

  ngOnInit() {
    this.obs=this.form.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(data => this.performSearch(data.searchText));
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }


  performSearch(searchText:string){
    console.log(searchText)
  }

}
