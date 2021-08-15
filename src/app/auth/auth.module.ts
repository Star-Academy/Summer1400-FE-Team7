import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { FloatingLabelDirective } from '../directives/floating-label.directive';
import { ShowPasswordDirective } from '../directives/show-password.directive';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AuthAnimationDirective } from '../directives/auth-animation.directive';

@NgModule({
  declarations: [
    AuthComponent,
    FloatingLabelDirective,
    ShowPasswordDirective,
    LoginFormComponent,
    SignupFormComponent,
    AuthAnimationDirective,
  ],
  exports: [],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class AuthModule {}
