import {Component, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Constants} from '../../../utils/constants';
import {ErrorMessages} from "../../../utils/error-messages";

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['../main-form.component.scss'],
})
export class SignupFormComponent implements   OnDestroy {
    @Output() onAlreadyHaveAccount = new EventEmitter<void>();

    readonly ERROR_MSG = ErrorMessages.REGISTER_ERROR_MSG ;

    @ViewChild('f', {static: false}) signupForm!: NgForm;
    loadingSubscription: Subscription = new Subscription();
    errorSubscription: Subscription = new Subscription();
    completeSubscription: Subscription = new Subscription();

    loading = false;
    error = '';
    isPasswordsMatch = true;

    constructor(private authService: AuthService, private router: Router) {
        this.loadingSubscription = this.authService.loading.subscribe((loading: boolean) => {
            this.loading = loading;
        });
        this.errorSubscription = this.authService.error.subscribe((error: string) => {
            this.error = error;
        });
        this.completeSubscription = this.authService.complete.subscribe((complete: boolean) => {
            if (complete) {
                this.completeRegister();
            }
        });
    }

    private completeRegister() {
        this.signupForm.reset();
        this.router.navigate(['/dashboard'], {queryParams: {playlist: Constants.ALL_SONGS}}).then();
    }

    user = {
        email: '',
        password: '',
    };


    onSubmit() {
        if (!this.signupForm.valid) return;
        if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
            this.isPasswordsMatch = false;
            return;
        }
        this.isPasswordsMatch = true;
        this.user.email = this.signupForm.value.email;
        this.user.password = this.signupForm.value.password;
        this.authService.signUp(this.user);
    }

    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
        this.completeSubscription.unsubscribe();
    }

    alreadyHaveAccountClick() {
        this.onAlreadyHaveAccount.emit();
    }
}
