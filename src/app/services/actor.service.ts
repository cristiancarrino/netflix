import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Actor } from '../models/actor';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ActorService {
	actors: Actor[] | null = null;
	selectedActor: Actor | null = null;
	newActor: Actor = {
		id: 0,
		firstname: '',
		lastname: '',
		birthdate: new Date(),
		created_by: 0,
		selected: false,
		films: []
	};

	getActors(): Observable<Actor[]> {
		if (this.actors) {
			return of(this.actors);
		} else {
			return this.http.get<Actor[]>(environment.hostApi + '/actor/read.php').pipe(
				tap(response => this.actors = response),
			);
		}
	}

	addActor(): void {
		if (this.actors) {
			this.actors.push(this.newActor);
			this.localStorage.store('actors', this.actors);
	
			// Reset newActor
			this.newActor = {
				id: 0,
				firstname: '',
				lastname: '',
				birthdate: new Date(),
				created_by: 0,
				selected: false,
				films: []
			};
		}
	}

	editActor(): void {
		this.localStorage.store('actors', this.actors);
		this.selectedActor = null;
	}

	constructor(
		private localStorage: LocalStorageService,
		private http: HttpClient
	) { }
}
