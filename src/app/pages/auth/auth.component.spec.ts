import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {AuthComponent} from './auth.component';
import {of} from 'rxjs';

describe('AuthComponent', () => {
    let fixture:ComponentFixture<any>;
    let app:any;
    beforeEach(()=>{
        TestBed.configureTestingModule({
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
        });
        fixture = TestBed.createComponent(AuthComponent);
        app =fixture.debugElement.componentInstance;


    });
    it(' pageNavigation should change the state',  ()=> {
        app.pageNavigation('login');
        expect(app.currentBgState).toEqual(app.BG_ANIMATION.TYPE2)
    });
    it(' pageNavigation should call prepareBgAnimation',  ()=> {
        spyOn(app,"prepareRegisterBgAnimation")
        app.pageNavigation('login');
        expect(app.prepareRegisterBgAnimation).toHaveBeenCalled();
    });
    it(' pageNavigation should call prepareBgAnimation',  ()=> {
        spyOn(app,"prepareLoginBgAnimation")
        app.pageNavigation('register');
        expect(app.prepareLoginBgAnimation).toHaveBeenCalled();
    });

    it(' pageNavigation should change the state',  ()=> {

        app.pageNavigation('register');
        expect(app.currentBgState).toEqual(app.BG_ANIMATION.TYPE4)
    });

    it(' pageNavigation should toggle the isLoginPage',  ()=> {
        let isLoginPage = app.isLoginPage;
        app.pageNavigation('');
        let isLoginPageAfterChange = app.isLoginPage;
        expect(isLoginPage).not.toEqual(isLoginPageAfterChange )
    });
    it(' ngOnInit should call subscribe on route.queryParams',  ()=> {
        let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
        spyOn(activatedRoute.queryParams,"subscribe");
        app.ngOnInit();
        expect(activatedRoute.queryParams.subscribe).toHaveBeenCalled();

    });

    it(' isLoginPage should be initialize true',  ()=> {
        let isLoginPage =app.isLoginPage;
        expect(isLoginPage).toBeTruthy()

    });
    it(' currentBgState should be initialize BG_ANIMATION.TYPE1',  ()=> {
        let currentBgState =app.currentBgState;
        expect(currentBgState).toEqual(app.BG_ANIMATION.TYPE1)

    });
    it(' BG_ANIMATION should not be null',  ()=> {
        let BG_ANIMATION =app.BG_ANIMATION;
        expect(BG_ANIMATION).not.toBeNull();

    });


    it('should create the app',  ()=> {
        expect(app).toBeTruthy();
    });

});



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
        expect(component.isLoginPage).toBeTruthy();
    });
});
