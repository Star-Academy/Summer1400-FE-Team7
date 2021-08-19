import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

import {SignupFormComponent} from './signup-form.component';

describe('SignupFormComponent', () => {
    let component: SignupFormComponent;
    let fixture: ComponentFixture<SignupFormComponent>;
    let debug: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SignupFormComponent],
            imports: [BrowserModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(SignupFormComponent);

                component = fixture.componentInstance;

                debug = fixture.debugElement.query(By.css('form'));
            });

        fixture.detectChanges();
    });

    const MOCK_USER_VALID = [
        {
            email: 'Parsa@gmail.com',
            password: 'Parsa123',
            confirmPasswrod: 'Parsa123',
        },
        {
            email: 'Parsa@gmail',
            password: 'Min5a',
            confirmPasswrod: 'Min5a',
        },
        {
            email: 'pa@pa',
            password: '12345a',
            confirmPasswrod: '12345a',
        },
    ];

    const MOCK_USER_UNVALID = [
        {
            email: 'ParsA',
            password: 'Parsa123',
            confirmPassword: 'Parsa123',
        },
        {
            email: 'Parsa@gmail',
            password: '',
            confirmPassword: 'Parsa123',
        },
        {
            email: 'pa ar@asd',
            password: 'Parsa123',
            confirmPassword: '',
        },
        {
            email: 'paar$gmail.com',
            password: '12345a',
            confirmPassword: '',
        },
        {
            email: 'paar.gmail.com',
            password: 'Parsa123',
            confirmPassword: 'parsa123',
        },
        {
            email: 'paar$gmail.com',
            password: 'Parsa123',
            confirmPassword: 'Parsa123',
        },
    ];

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have rendered register form', async () => {
        expect(debug.query(By.css('h2')).nativeElement.innerText).toBe('ثبت‌نام');
    });

    it('should initial values be empty', async () => {
        console.log(component);
        const user = component.signupForm.value;
        console.log(component.signupForm.value);
        expect(user.email === '' && user.password === '' && user.confirmPassword === '').toBeTruthy();
    });

    it('testing form inputs validation(correct values)', () => {
        let form = component.signupForm;

        for (let user of MOCK_USER_VALID) {
            form.controls['email'].setValue(user.email);
            form.controls['password'].setValue(user.password);
            form.controls['confirmPassword'].setValue(user.confirmPasswrod);
            expect(form.valid).toBeTruthy();
        }
    });

    it('testing form inputs validation(incorrect values)', () => {
        let form = component.signupForm;

        for (let user of MOCK_USER_UNVALID) {
            form.controls['email'].setValue(user.email);
            form.controls['confirmPassword'].setValue(user.confirmPassword);
            expect(form.valid).toBeFalsy();
        }
    });
});
