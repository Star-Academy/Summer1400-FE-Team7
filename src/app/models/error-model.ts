export class ErrorModel{
  message:string="";
  component:string="";
  constructor(message:string,component:string){
    this.message = message;
    this.component = component;
  }
}
