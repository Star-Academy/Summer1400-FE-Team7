import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module';
import {LandingModule} from './landing/landing.module';
import { InputComponent } from './components/input/input.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    LandingModule,
    FormsModule
  ],
  providers: [],
  exports: [
    InputComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
