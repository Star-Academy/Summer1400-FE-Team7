import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth/auth.component';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';
import {LandingComponent} from './landing/landing/landing.component';
import {Landing2Component} from './landing2/landing2.component';
import {Constants} from './utils/constants';

const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'landing', component: Landing2Component},
    {path: 'auth', component: AuthComponent},
    {path: 'dashboard', component: DashboardComponent},
];
//TODO page not found
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
