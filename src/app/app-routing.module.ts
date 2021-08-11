import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './auth/form/form.component';
import {LandingComponent} from "./landing/landing/landing.component";

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'auth', component:FormComponent  },

];

@NgModule({
  // imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
