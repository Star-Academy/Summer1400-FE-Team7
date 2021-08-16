import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-layout-manager',
    templateUrl: './layout-manager.component.html',
    styleUrls: ['./layout-manager.component.scss'],
})
export class LayoutManagerComponent implements OnInit {
    constructor() {}
    @Output() chosedLayout = new EventEmitter<string>();

    ngOnInit(): void {}

    layoutChangeHandler(e: any) {
        this.chosedLayout.emit(e.target.id);
    }
}
