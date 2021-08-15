import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  @Output() onCreateAcountClick = new EventEmitter<void>();

  _ERROR_MSG = {
    MSG_PASSWORD_NOT_VALID:
      'رمز عبور باید دارای حداقل ۵ کاراکتر،یک حرف و یک عدد باشد',
    MSG_CONFIRM_PASSWORD_EPMTY: 'تکرار رمزعبور نمی‌تواند خالی باشد',
    MSG_PASSWORDS_NOT_MATCH: 'رمزعبور و تکرارش باید برابر باشند',
    MSG_EMAIL_EMPTY: 'ایمیل نمی‌تواند خالی باشد',
    MSG_EMAIL_NOT_VALID: 'ایمیل وارد شده معتبر نیست',
    MSG_PASSWORD_EMPTY: 'رمزعبور نمی‌تواند خالی باشد',
  };

  @ViewChild('f', { static: false }) signupForm!: NgForm;
  loadingSubscription: Subscription = new Subscription();
  errorSubscription: Subscription = new Subscription();

  loading = false;
  error = '';
  isPasswordsMatch = true;

  constructor(private authService: AuthService) {}

  user = {
    email: '',
    password: '',
  };

  ngOnInit(): void {
    this.loadingSubscription = this.authService.loading.subscribe(
      (loading: boolean) => {
        this.loading = loading;
      }
    );

    this.errorSubscription = this.authService.error.subscribe(
      (error: string) => {
        this.error = error;
        console.log(error);
      }
    );
  }

  onSubmit() {
    if (!this.signupForm.valid) return;
    if (
      this.signupForm.value.password !== this.signupForm.value.confirmPassword
    ) {
      this.isPasswordsMatch = false;
      return;
    }
    this.isPasswordsMatch = true;
    this.user.email = this.signupForm.value.email;
    this.user.password = this.signupForm.value.password;
    this.authService.login(this.user);
    this.signupForm.reset();
  }

  ngDestroy() {
    this.loadingSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  alreadyHaveAccountClick() {
    this.onCreateAcountClick.emit();
  }
}
