import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-landing2',
    templateUrl: './landing2.component.html',
    styleUrls: ['./landing2.component.scss'],
})
export class Landing2Component implements OnInit {
    constructor() {}

    isFirstSection: boolean = true;

    ngOnInit(): void {}
    onScroll(event: any) {
        this.isFirstSection = event.target.scrollTop === 0;
    }
}
