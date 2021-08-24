import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private route: ActivatedRoute,) {}

  BG_ANIMATION = {
    TYPE1: 'bg-animation-1',
    TYPE2: 'bg-animation-2',
    TYPE3: 'bg-animation-3',
    TYPE4: 'bg-animation-4',
  };

  currentBgState = this.BG_ANIMATION.TYPE1;

  isLoginPage: boolean = true;

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if(params['name']==="register")
      {
        this.currentBgState = this.BG_ANIMATION.TYPE3;
        this.isLoginPage = false;
      }
    });
  }

  pageNavigation(currentState: string) {
    if (currentState === 'login') {
      this.currentBgState = this.BG_ANIMATION.TYPE2;
      this.prepareRegisterBgAnimation()
    } else {
      this.currentBgState = this.BG_ANIMATION.TYPE4;
      this.prepareLoginBgAnimation()
    }
    this.isLoginPage = !this.isLoginPage;
  }

  prepareRegisterBgAnimation(){
    setTimeout(() => {
      this.currentBgState = this.BG_ANIMATION.TYPE3;
    }, 400);
  }

  prepareLoginBgAnimation(){
    setTimeout(() => {
      this.currentBgState = this.BG_ANIMATION.TYPE1;
    }, 400);
  }
}
