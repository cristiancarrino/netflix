import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GenreService {
	genres: Genre[] | null = null
	selectedGenre: Genre | null = null;
	newGenre: Genre = {
		id: 0,
		name: '',
		created_by: 0,
		selected: false,
		films: []
	};

	constructor(
		private http: HttpClient,
		private userService: UserService
	) { }

	getGenres(): Observable<Genre[]> {
		if (this.genres) {
			return of(this.genres);
		} else {
			return this.http.get<Genre[]>(environment.hostApi + '/genre/read.php').pipe(
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
