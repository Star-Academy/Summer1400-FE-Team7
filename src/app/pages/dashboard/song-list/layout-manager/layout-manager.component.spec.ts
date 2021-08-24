import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutManagerComponent} from './layout-manager.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('LayoutManagerComponent', () => {
    let component: LayoutManagerComponent;
    let fixture: ComponentFixture<LayoutManagerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LayoutManagerComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit layoutChangeHandler ', () => {
        fixture.detectChanges();
        spyOn(component.chooseLayout, 'emit');
        component.layoutChangeHandler({target: 123});
        expect(component.chooseLayout.emit).toHaveBeenCalled();
    });

    it('should call layoutChangeHandler', async () => {
        let fixture = TestBed.createComponent(LayoutManagerComponent);
        let app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        spyOn(app, 'layoutChangeHandler');
        fixture.debugElement.query(By.css('#list-view')).triggerEventHandler('change', {});
        expect(app.layoutChangeHandler).toHaveBeenCalled();
    });

    it('should call layoutChangeHandler', async () => {
        let fixture = TestBed.createComponent(LayoutManagerComponent);
        let app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        spyOn(app, 'layoutChangeHandler');
        fixture.debugElement.query(By.css('#list-compact-view')).triggerEventHandler('change', {});
        expect(app.layoutChangeHandler).toHaveBeenCalled();
    });

    it('should call layoutChangeHandler', async () => {
        let fixture = TestBed.createComponent(LayoutManagerComponent);
        let app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        spyOn(app, 'layoutChangeHandler');
        fixture.debugElement.query(By.css('#grid-view')).triggerEventHandler('change', {});
        expect(app.layoutChangeHandler).toHaveBeenCalled();
    });
});
