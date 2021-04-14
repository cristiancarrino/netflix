import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faEllipsisV, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';

@Component({
	selector: 'app-films',
	templateUrl: './film-list.component.html',
	styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {
	// Icons
	faClock = faClock;
	faSearch = faSearch;
	faEllipsisV = faEllipsisV;
	faPlusCircle = faPlusCircle;

	films: Film[] = [];
	selectedFilm: Film | null = null;
	search: string = '';
	openSearchField: boolean = false;
	searchField: string = 'title';
	loadingFilms: boolean = false;

	constructor(
		public userService: UserService,
		private filmService: FilmService
	) { }

	ngOnInit() {
		this.filmService.getFilms().subscribe(response => {
			this.films = response;
			console.log(response);

			this.shuffle(this.films);
			this.loadingFilms = false;
		});
	}

	shuffle(array: any[]) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	setSearchField(searchField: string) {
		this.searchField = searchField;
		this.openSearchField = false;
	}

	setVote(film: Film, vote: number) {
		film.vote = vote;
		this.filmService.editFilm(film).subscribe(response => console.log(response))
	}

	remove(film: Film): void {
		this.filmService.removeFilm(film).subscribe(() => this.ngOnInit());
	}

	showPlot(film: Film, event: Event) {
		event.preventDefault();
		this.selectedFilm = film;
	}

	hidePlot() {
		this.selectedFilm = null;
	}
}
