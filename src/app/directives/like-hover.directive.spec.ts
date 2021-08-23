import {LikeHoverDirective} from './like-hover.directive';
import {ElementRef, Renderer2} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
    template: `<img
        class="fav-icon"
        appLikeHover
        (click)="onFavoriteClick()"
        [src]="'../../../../assets/images/like.svg'"
        alt=""
    />`,
})
class TestHoverEffectComponent {}

describe('LikeHoverDirective', () => {
    let component: TestHoverEffectComponent;
    let fixture: ComponentFixture<TestHoverEffectComponent>;
    let debug: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHoverEffectComponent, LikeHoverDirective],
        });
        fixture = TestBed.createComponent(TestHoverEffectComponent);
        component = fixture.componentInstance;
        debug = fixture.debugElement.query(By.css('img'));
    });

    it('should create an instance', () => {
        let el!: ElementRef;
        let renderer!: Renderer2;
        const directive = new LikeHoverDirective(el, renderer);
        expect(directive).toBeTruthy();
    });

    it('should hover effect work', () => {
        debug.triggerEventHandler('mouseover', null);
        fixture.detectChanges();
        expect(debug.styles.transform).toBe('scale(1.2)');

        debug.triggerEventHandler('mouseout', null);
        fixture.detectChanges();
        expect(debug.styles.transform).toBe('scale(1)');
    });
});
