import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

describe('AUTH PAGE login form', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuthComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({
                            name: 'register',
                        }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should fill __AUTH__ REGISTER form', () => {
        console.log(component);
        expect(component.isLoginPage).toBeFalsy();
    });
});

describe('AUTH PAGE register form', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuthComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({
                            name: 'login',
                        }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should fill __AUTH__ LOGIN form', () => {
        console.log(component);
        expect(component.isLoginPage).toBeTruthy();
    });
});
