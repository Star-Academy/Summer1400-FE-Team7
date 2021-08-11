import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    LandingComponent,
    MainComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  bootstrap:[LandingComponent]
})
export class LandingModule { }
