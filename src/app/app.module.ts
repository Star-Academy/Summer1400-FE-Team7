import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {LandingModule} from './landing/landing.module';
import {DashboardModule} from './dashboard/dashboard.module';
import { Landing2Component } from './landing2/landing2.component';

@NgModule({
    declarations: [AppComponent, Landing2Component],
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
