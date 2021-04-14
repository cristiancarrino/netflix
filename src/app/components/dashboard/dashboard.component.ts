import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film.service';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faEllipsisV, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	// Icons
	faClock = faClock;
	faSearch = faSearch;
	faEllipsisV = faEllipsisV;
	faPlusCircle = faPlusCircle;

	lastFilms: Film[] = [];
	topFilms: Film[] = [];
	selectedFilm: Film | null = null;
	loadingFilms: boolean = true;

	constructor(
		public userService: UserService,
		private filmService: FilmService
	) { }

	ngOnInit() {
		this.filmService.getFilms().subscribe(response => {
			this.lastFilms = this.filmService.getLastFilms(response);
			this.topFilms = this.filmService.getTopFilms(response);
			this.loadingFilms = false;
		});
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
