import {DebugElement} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {LoginFormComponent} from './login-form.component';

describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;
    let debug: DebugElement;
    let element: HTMLElement;
    let loginForm: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginFormComponent],
            imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(LoginFormComponent);

                component = fixture.componentInstance;

                debug = fixture.debugElement.query(By.css('form'));
                // element = debug.nativeElement;
            });

        fixture.detectChanges();
    });

    // beforeEach(() => {
    //     fixture = TestBed.createComponent(LoginFormComponent);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    // });

    const MOCK_USER_VALID = [
        {
            email: 'Parsa@gmail.com',
            password: 'Parsa123',
        },
        {
            email: 'Parsa@gmail',
            password: 'Min5a',
        },
        {
            email: 'pa@pa',
            password: '12345a',
        },
    ];

    const MOCK_USER_UNVALID = [
        {
            email: 'ParsA',
            password: 'Parsa123',
        },
        {
            email: 'Parsa@gmail',
            password: '',
        },
        {
            email: 'pa ar@asd',
            password: '12345a',
        },
        {
            email: 'paar$gmail.com',
            password: '12345a',
        },
    ];

    it('TEST_1: should have rendered LOGIN form', async () => {
        expect(debug.query(By.css('h2')).nativeElement.innerText).toBe('ورود');
    });

    it('TEST_2: should initial values be empty', async () => {
        const user = component.loginForm.value;
        expect(user.email === '' && user.password === '').toBeTruthy();
    });

    it('TEST_3: testing form inputs validation', () => {
        let form = component.loginForm;

        for (let user of MOCK_USER_VALID) {
            form.controls['email'].setValue(user.email);
            form.controls['password'].setValue(user.password);
            expect(form.valid).toBeTruthy();
        }

        for (let user of MOCK_USER_UNVALID) {
            form.controls['email'].setValue(user.email);
            form.controls['password'].setValue(user.password);
            expect(form.valid).toBeFalsy();
        }
    });
});
