import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { FilmService } from 'src/app/services/film.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	lastFilms: Film[] = [];
	topFilms: Film[] = [];

	constructor(
		private filmService: FilmService
	) { }

	ngOnInit() {
		this.filmService.getFilms().subscribe(response => {
			console.log(response);
			this.lastFilms = this.filmService.getLastFilms(response);
			console.log('Gli ultimi 4 film:', this.lastFilms);

			this.topFilms = this.filmService.getTopFilms(response);
			console.log('I 3 film più votati:', this.topFilms);
		});
	}
}
