import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './pages/auth/auth.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LandingComponent} from './pages/landing/landing.component';

const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'auth', component: AuthComponent},
    {path: 'dashboard', component: DashboardComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
