import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
    selector: 'app-placeholder',
    templateUrl: './placeholder.component.html',
    styleUrls: ['./placeholder.component.scss'],
})
export class PlaceholderComponent implements OnInit {
    constructor(private elementRef: ElementRef) {}

    placeholdersCount: number = 13;
    timeoutID!: any;
    currentValue: number = -45;
    isPlaceHolder: boolean = true;

    ngOnInit(): void {
        this.timeoutID = setInterval(() => {
            this.currentValue += 5;
            document.documentElement.style.setProperty('--placeholder-rotation', this.currentValue + 'deg');
        }, 40);
    }
}
