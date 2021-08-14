// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//
// @Component({
//   selector: 'app-input',
//   templateUrl: './input.component.html',
//   styleUrls: ['./input.component.scss']
// })
// export class InputComponent implements OnInit {
//   @Input() inputProps:any;
//   @Output() inputModelChange = new EventEmitter<string>();
//   @Input() text:string = "";
//   constructor() {}
//
//   ngOnInit(): void {
//   }
//
// }
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `  <input type="text" [(ngModel)]="inputModel" (ngModelChange)="inputModelChange.emit(inputModel)"/>`,
  styleUrls: ['./app-input.component.scss']
})
export class InputComponent {
  @Input() inputModel: string | undefined;
  @Output() inputModelChange = new EventEmitter<string>();
}
