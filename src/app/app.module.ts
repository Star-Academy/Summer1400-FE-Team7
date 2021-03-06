import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './pages/auth/auth.module';
import {LandingModule} from './pages/landing/landing.module';
import {DashboardModule} from './pages/dashboard/dashboard.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        AuthModule,
        LandingModule,
        DashboardModule,
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
