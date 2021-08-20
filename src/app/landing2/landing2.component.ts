import {Component, HostListener, OnInit} from '@angular/core';

@Component({
    selector: 'app-landing2',
    templateUrl: './landing2.component.html',
    styleUrls: ['./landing2.component.scss'],
})
export class Landing2Component implements OnInit {
    constructor() {}

    isfirstSection: boolean = true;

    ngOnInit(): void {}
    onScroll(event: any) {
        if (event.target.scrollTop === 0) {
            this.isfirstSection = true;
        } else {
            this.isfirstSection = false;
        }
    }
}
