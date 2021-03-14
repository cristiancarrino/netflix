import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Genre } from '../models/genre';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { Actor } from '../models/actor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  genres: Genre[];
  selectedGenre: Genre;
  newGenre: Genre = {
    name: ''
  };
  
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getGenres(): Observable<Genre[]> {
    if (this.genres) {
      return of(this.genres);
    } else {
      return this.http.get<Genre[]>(CONFIG.hostApi + '/genre/read.php').pipe(
        tap(response => this.genres = response),
      );
    }
  }

  addGenre(): void {
    // this.genres.push(this.newGenre);
    // this.localStorage.store('genres', this.genres);

    // // Reset newGenre
    // this.newGenre = {
    //   name: ''
    // };
  }

  editGenre(): void {
    // this.localStorage.store('genres', this.genres);
    // this.selectedGenre = null;
  }
}
