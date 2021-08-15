import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor() {}

  BG_ANIMATION = {
    TYPE1: 'bg-animation-1',
    TYPE2: 'bg-animation-2',
    TYPE3: 'bg-animation-3',
    TYPE4: 'bg-animation-4',
  };

  currentBgState = this.BG_ANIMATION.TYPE1;

  isLoginPage: boolean = true;

  ngOnInit(): void {}

  pageNavigation(currentState: string) {
    if (currentState === 'login') {
      this.currentBgState = this.BG_ANIMATION.TYPE2;

      setTimeout(() => {
        this.currentBgState = this.BG_ANIMATION.TYPE3;
      }, 400);
    } else {
      this.currentBgState = this.BG_ANIMATION.TYPE4;
      setTimeout(() => {
        this.currentBgState = this.BG_ANIMATION.TYPE1;
      }, 400);
    }
    this.isLoginPage = !this.isLoginPage;
  }
}
