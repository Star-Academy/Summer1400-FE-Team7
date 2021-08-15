import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../main-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() onCreateAcountClick = new EventEmitter<void>();

  _ERROR_MSG = {
    MSG_EMAIL_EMPTY: 'ایمیل نمی‌تواند خالی باشد',
    MSG_EMAIL_NOT_VALID: 'ایمیل وارد شده معتبر نیست',
    MSG_PASSWORD_EMPTY: 'رمزعبور نمی‌تواند خالی باشد',
  };

  @ViewChild('f', { static: false }) loginForm!: NgForm;
  loadingSubscription: Subscription = new Subscription();
  errorSubscription: Subscription = new Subscription();
  completeSubscription: Subscription = new Subscription();

  loading = false;
  error = '';

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
      }
    );
    this.completeSubscription = this.authService.complete.subscribe(
      (complete: boolean) => {
        if (complete){
          this.loginForm.reset()
        }

      }
    );
  }

  onSubmit() {
    if (!this.loginForm.valid) return;
    this.user.email = this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;
    this.authService.login(this.user);

  }


  ngDestroy() {
    this.loadingSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.completeSubscription.unsubscribe();
  }

  createAcountClick() {
    this.onCreateAcountClick.emit();
  }
}
