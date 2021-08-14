import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error = new Subject<string>();
  loading = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  login(user: { email: string; password: string }) {
    this.loading.next(true)
    this.http
      .post<{ name: string }>(
        'https://songs.code-star.ir/user/login',
        user,
        {
          observe: 'body'
        }
      )
      .subscribe(
        responseData => {
          this.loading.next(false);
          console.log(responseData);
          this.error.next('');
        },
        error => {
          this.loading.next(false);
          this.error.next(error.error.message);
          // console.log(error.error.message);

        }
      );
  }


}
