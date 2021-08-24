import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Constants} from '../utils/constants';

const BASE_URL = 'https://songs.code-star.ir/';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    error = new Subject<string>();
    loading = new Subject<boolean>();
    complete = new Subject<boolean>();

    constructor(private http: HttpClient) {}

    login(user: {email: string; password: string}) {
        this.sendRequest('user/login', user).subscribe((data: {id: number; token: string}) => {
            this.initializeUser(data, user.email, false);
        });
    }

    signUp(user: {email: string; password: string}) {
        this.sendRequest('user/register', {...user, username: user.email.split('@')[0]}).subscribe(
            (data: {id: number; token: string}) => {
                this.initializeUser(data, user.email, true);
            }
        );
    }
    logoutUser() {
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('favId');
    }

    initializeUser(data: {id: number; token: string}, email: string, createFavorites: boolean) {
        localStorage.setItem('email', email);
        localStorage.setItem('id', String(data.id));
        localStorage.setItem('token', data.token);
        if (createFavorites) {
            const body = {
                token: data.token,
                name: Constants.FAVOURITE_SONGS,
            };
            this.sendRequest('playlist/create', body).subscribe((id: number) => {
                localStorage.setItem('favId', String(id));
                this.complete.next(true);
            });
        } else {
            this.complete.next(true);
        }
    }

      sendRequest(url: string, body?: object): Observable<any> {
        this.loading.next(true);
        return new Observable((observer) =>
            this.http
                .request<any>(body ? 'POST' : 'GET', `${BASE_URL}${url}`, {
                    body: body,
                    observe: 'body',
                })
                .subscribe(
                    (responseData) => {
                        this.loading.next(false);
                        this.error.next('');
                        observer.next(responseData);
                    },
                    (error) => {
                        this.loading.next(false);
                        this.error.next(error.error.message);

                        console.log(error.error.message);
                    },
                    () => {
                        this.loading.next(false);
                        this.error.next('');
                    }
                )
        );
    }
}
