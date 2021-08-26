import {Component, ViewChild, Output, EventEmitter, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Constants} from 'src/app/utils/constants';
import {ErrorMessages} from "../../../utils/error-messages";

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['../main-form.component.scss'],
})
export class LoginFormComponent implements  OnDestroy {
    @Output() onCreateAccountClick = new EventEmitter<void>();

   readonly ERROR_MSG = ErrorMessages.LOGIN_ERROR_MSG;
    @ViewChild('f', {static: false}) loginForm!: NgForm;
    loadingSubscription: Subscription = new Subscription();
    errorSubscription: Subscription = new Subscription();
    completeSubscription: Subscription = new Subscription();

    loading = false;
    error = '';

    constructor(private authService: AuthService, private router: Router) {
        this.loadingSubscription = this.authService.loading.subscribe((loading: boolean) => {
            this.loading = loading;
        });

        this.errorSubscription = this.authService.error.subscribe((error: string) => {
            this.error = error;
        });
        this.completeSubscription = this.authService.complete.subscribe((complete: boolean) => {
            if (complete) {
                this.loginForm.reset();
                router.navigate(['/dashboard'], {queryParams: {playlist: Constants.ALL_SONGS}}).then();
            }
        });
    }

    user = {
        email: '',
        password: '',
    };


    onSubmit() {
        if (!this.loginForm.valid) return;
        this.user.email = this.loginForm.value.email;
        this.user.password = this.loginForm.value.password;
        this.authService.login(this.user);
    }

    ngOnDestroy(): void {
        this.loadingSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
        this.completeSubscription.unsubscribe();
    }

    createAccountClick() {
        this.onCreateAccountClick.emit();
    }
}
