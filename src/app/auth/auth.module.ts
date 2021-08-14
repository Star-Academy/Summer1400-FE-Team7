import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import {AppModule} from "../app.module";


@NgModule({
  declarations: [

    AuthComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    AppModule
  ],
})
export class AuthModule { }
