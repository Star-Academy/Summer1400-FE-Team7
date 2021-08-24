import {ShowPasswordDirective} from './show-password.directive';
import {ElementRef, Renderer2} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
    template: `<input
            type="password"
            title="رمز عبور باید دارای حداقل ۵ کاراکتر،یک حرف و یک عدد باشد"
            id="signup-password-input"
            pattern="^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{5,}$"
            required
            autocomplete="off"
            name="password"
        />

        <label for="signup-password-input"> رمز عبور </label>
        <img src="../../assets/images/show-password.svg" alt="" class="show-pass-cta" appShowPassword />`,
})
class TestShowPasswordEffectComponent {}

describe('ShowPasswordDirective', () => {
    let component: TestShowPasswordEffectComponent;
    let fixture: ComponentFixture<TestShowPasswordEffectComponent>;
    let showPassToggle: DebugElement;
    let input: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestShowPasswordEffectComponent, ShowPasswordDirective],
        });
        fixture = TestBed.createComponent(TestShowPasswordEffectComponent);
        component = fixture.componentInstance;
        input = fixture.debugElement.query(By.css('input'));
        showPassToggle = fixture.debugElement.query(By.css('img'));
    });

    it('should create an instance', () => {
        let el!: ElementRef;
        let renderer!: Renderer2;
        const directive = new ShowPasswordDirective(el, renderer);
        expect(directive).toBeTruthy();
    });

    it('should toggle showPassword', () => {
        showPassToggle.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(input.nativeNode.type).toBe('text');

        showPassToggle.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(input.nativeNode.type).toBe('password');
    });
});
