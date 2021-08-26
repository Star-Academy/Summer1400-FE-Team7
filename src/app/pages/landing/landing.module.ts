import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from './landing.component';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [LandingComponent, MainComponent, HeaderComponent],
    imports: [CommonModule, RouterModule],
    bootstrap: [LandingComponent],
})
export class LandingModule {}
