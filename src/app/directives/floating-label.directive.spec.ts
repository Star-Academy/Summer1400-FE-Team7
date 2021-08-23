import {FloatingLabelDirective} from './floating-label.directive';
import {ElementRef, Renderer2} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
    template: `<input type="email" id="signup-email-input" required appFloatingLabel email name="email" />
        <label for="signup-email-input"> ایمیل </label>`,
})
class TestFloatingEffectComponent {}

const _FULL_LABEL = 'full-label';

describe('LikeHoverDirective', () => {
    let component: TestFloatingEffectComponent;
    let fixture: ComponentFixture<TestFloatingEffectComponent>;
    let debug: DebugElement;
    let input: DebugElement;
    let label: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestFloatingEffectComponent, FloatingLabelDirective],
        });
        fixture = TestBed.createComponent(TestFloatingEffectComponent);
        component = fixture.componentInstance;
        input = fixture.debugElement.query(By.css('input'));
        label = fixture.debugElement.query(By.css('label'));
    });

    it('should create an instance', () => {
        let el!: ElementRef;
        let renderer!: Renderer2;
        const directive = new FloatingLabelDirective(el, renderer);
        expect(directive).toBeTruthy();
    });

    it('should float label', () => {
        input.triggerEventHandler('focus', null);
        fixture.detectChanges();
        expect(label.nativeNode.classList).toContain(_FULL_LABEL);
    });

    it('should unFloat label', () => {
        input.triggerEventHandler('blur', null);
        fixture.detectChanges();
        expect(label.nativeNode.classList).not.toContain(_FULL_LABEL);
    });
});
