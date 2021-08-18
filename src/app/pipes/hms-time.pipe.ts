import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hmsTime'
})
export class HmsTimePipe implements PipeTransform {

  transform(value: number|undefined, ...args: unknown[]): unknown {
    if(value!== undefined)
      return this.convertHMS(value)
    else return "0:0";

  }

  private convertHMS = (value:number) => {
    const sec =  parseInt(String(value));
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    let sHours:string=""+hours
    let sMinutes:string=""+minutes
    let sSeconds:string=""+seconds
    if (hours < 10) sHours = "0" + hours;
    if (minutes < 10) sMinutes = "0" + minutes;
    if (seconds < 10) sSeconds = "0" + seconds;
    if (hours > 0) return sHours + ":" + sMinutes + ":" + sSeconds;
    else return sMinutes + ":" + sSeconds; // Return is  MM : SS
  };
}
