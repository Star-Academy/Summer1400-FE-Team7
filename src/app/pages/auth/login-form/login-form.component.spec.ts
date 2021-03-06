import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {LoginFormComponent} from './login-form.component';

const MOCK_USER_VALID = [
    {
        email: 'Parsa@gmail.com',
        password: 'abc123',
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

const MOCK_USER_INVALID = [
    {
        email: 'ParsA',
        password: 'abc123',
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
describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;
    let debug: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginFormComponent],
            imports: [BrowserModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(LoginFormComponent);
                component = fixture.componentInstance;
                debug = fixture.debugElement.query(By.css('form'));
            });

        fixture.detectChanges();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have rendered login form', async () => {
        expect(debug.query(By.css('h2')).nativeElement.innerText).toBe('ورود');
    });

    it('should initial values be empty', async () => {
        const user = component.loginForm.value;
        expect(user.email === '' && user.password === '').toBeTruthy();
    });

    it('testing form inputs validation(correct values)', () => {
        let form = component.loginForm;

        for (let user of MOCK_USER_VALID) {
            form.controls['email'].setValue(user.email);
            form.controls['password'].setValue(user.password);
            expect(form.valid).toBeTruthy();
        }
    });

    it('testing form inputs validation(incorrect values)', () => {
        let form = component.loginForm;

        for (let user of MOCK_USER_INVALID) {
            form.controls['email'].setValue(user.email);
            form.controls['password'].setValue(user.password);
            expect(form.valid).toBeFalsy();
        }
    });

    it('create new account link onclick should call createAccountClick()', async () => {
        let fixture = TestBed.createComponent(LoginFormComponent);
        let app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        spyOn(app, 'createAccountClick');
        compiled.querySelector('#create-new-account').click();
        expect(app.createAccountClick).toHaveBeenCalled();
    });

    it('createAccountClick() should emit onCreateAccountClick', async () => {
        let fixture = TestBed.createComponent(LoginFormComponent);
        let app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        spyOn(app.onCreateAccountClick, 'emit');
        app.createAccountClick();
        expect(app.onCreateAccountClick.emit).toHaveBeenCalled();
    });
});
