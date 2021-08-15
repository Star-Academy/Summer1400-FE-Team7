import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

const BASE_URL = 'https://songs.code-star.ir/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  error = new Subject<string>();
  loading = new Subject<boolean>();
  complete = new Subject<boolean>();


  constructor(private http: HttpClient) {
  }

  login(user: { email: string; password: string }) {
    this.sendRequest("user/login", user).subscribe((data)=>{
      console.log(data)
    })
  }

  signUp(user: { email: string; password: string }) {
    this.sendRequest("user/register", {...user, username: user.email.split("@")[0]})
  }


  private sendRequest(url: string, body?: object): Observable<any> {

    this.loading.next(true);
    return new Observable((observer)=> this.http
      .request<any>(body ? "POST" : "GET", `${BASE_URL}${url}`, {
        body: body,
        observe: 'body',
      })
      .subscribe(
        (responseData) => {
          this.loading.next(false);
          this.error.next('');
          console.log(responseData);
          observer.next(responseData)
        },
        (error) => {
          this.loading.next(false);
          this.error.next(error.error.message);
          this.complete.next(false);

          console.log(error.error.message);

        },
        () => {
          this.loading.next(false);
          this.complete.next(true);
          this.error.next("");
        }
      ))


  }
}
