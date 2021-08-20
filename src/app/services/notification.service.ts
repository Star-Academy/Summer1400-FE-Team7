import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {

    public notification = new Subject<{show:boolean,message: string,isError: boolean}>();
    private undo:Function = ()=>{}


    showNotification(message: string,isError: boolean,undo:()=>void) {
        this.notification.next({show:true, message, isError});
        this.undo=undo;
        setTimeout(()=>{
          this.closeNotification()

        },5000)
    }

  undoNotification( ) {
      this.undo();
    this.closeNotification()
  }

  closeNotification( ) {
        this.notification.next({show:false,message: "",isError:false});
    }



    constructor() {}
}
