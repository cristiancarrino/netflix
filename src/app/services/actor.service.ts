import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Actor } from '../models/actor';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  actors: Actor[];
  selectedActor: Actor;
  newActor: Actor = {
    firstname: '',
    lastname: ''
  };

  getActors(): Observable<Actor[]> {
    if (this.actors) {
      return of(this.actors);
    } else {
      return this.http.get<Actor[]>(CONFIG.hostApi + '/actor/read.php').pipe(
        tap(response => this.actors = response),
      );
    }
  }

  addActor(): void {
    this.actors.push(this.newActor);
    this.localStorage.store('actors', this.actors);

    // Reset newActor
    this.newActor = {
      firstname: '',
      lastname: ''
    };
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
