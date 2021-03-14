import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	loggedUser: User | null = null;

	constructor(
		private http: HttpClient,
		private localStorage: LocalStorageService
	) { }

	login(username: string, password: string, rememberMe: boolean): Observable<User | null> {
		return this.http.post<User | null>(environment.hostApi + '/user/login.php', {
			"username": username,
			"password": password
		})
		.pipe(
			tap(response => {
				this.loggedUser = response;

				if (rememberMe) {
					this.localStorage.store('loggedUser', this.loggedUser);
				}
			}),
			catchError(error => {
				alert(error.status + ': ' + error.error);
				return of(null);
			})
		);
	}

	getLoggedUser(): User | null {
		this.loggedUser = this.localStorage.retrieve('loggedUser');
		return this.loggedUser
	}

	logout(): void {
		this.loggedUser = null;
		this.localStorage.clear('loggedUser');
	}
}
