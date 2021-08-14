import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @ViewChild('f', { static: false }) signupForm!: NgForm;

  test = 'hahahaha';

  _ERROR_MSG = {
    MSG_EMAIL_EMPTY: 'ایمیل نمی‌تواند خالی باشد',
    MSG_EMAIL_NOT_VALID: 'ایمیل وارد شده معتبر نیست',
    MSG_PASSWORD_EMPTY: 'رمزعبور نمی‌تواند خالی باشد',
    MSG_PASSWORD_NOT_VALID:
      'رمز عبور باید دارای حداقل ۵ کاراکتر،یک حرف و یک عدد باشد',
    MSG_CONFIRM_PASSWORD_EPMTY: 'تکرار رمزعبور نمی‌تواند خالی باشد',
    MSG_PASSWORDS_NOT_MATCH: 'رمزعبور و تکرارش باید برابر باشند',
    MSG_USER_ALREADY_EXIST: 'کاربر دیگری با این ایمیل موجود می‌باشد',
    MSG_UNSUCCESSFUL_REGISTER: 'ثبت‌نام ناموفق ',
    MSG_UNSUCCESSFUL_LOGIN: 'ایمیل یا رمز عبور صحیح نمی باشد',
  };

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.signupForm);
  }
}
