import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Actor } from '../../models/actor';
import { ActorService } from '../../services/actor.service';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/genre';
import { Film } from '../../models/film';
import { Router } from '@angular/router';

@Component({
	selector: 'app-film-add',
	templateUrl: './film-add.component.html',
	styleUrls: ['./film-add.component.scss']
})
export class FilmAddComponent implements OnInit {
	actors: Actor[] = [];
	genres: Genre[] = [];
	pippo = console;
	film: Film = {
		id: 0,
		title: '',
		description: '',
		plot: '',
		director: '',
		duration: '',
		release_year: 0,
		cover_url: '',
		tags: '',
		created_by: 0,
		stars: 0,
		actors: [],
		genres: [],
		votes: [],
		vote: 0,	
		showFilmMenu: false,
		showMore: false
	}

	constructor(
		private router: Router,
		public filmService: FilmService,
		private actoService: ActorService,
		private genreService: GenreService
	) { }

	ngOnInit() {
		this.resetFilm();

		// Get actors list
		this.actoService.getActors().subscribe(actors => {
			this.actors = actors;

			// Dopo aver preso la lista degli attori, metto selected = true solo a quelli presenti dentro il film
			this.actors.map(x => {
				x.selected = false;
				return x;
			});

			// Metto gli attori in ordine alfabetico
			this.actors.sort((a, b) => {
				let nameA = (a.firstname + ' ' + a.lastname).toUpperCase();
				let nameB = (b.firstname + ' ' + b.lastname).toUpperCase();
				if (nameA < nameB) {
					return -1;
				}

				if (nameA > nameB) {
					return 1;
				}

				return 0;
			});
		});

		// Get genres list
		this.genreService.getGenres().subscribe(genres => {
			this.genres = genres;

			// Dopo aver preso la lista dei generi, metto selected = true solo a quelli presenti dentro il film
			this.genres.map(x => {
				x.selected = false;
				return x;
			});

			// Metto i generi in ordine alfabetico
			this.genres.sort((a, b) => {
				let nameA = a.name.toUpperCase();
				let nameB = b.name.toUpperCase();
				if (nameA < nameB) {
					return -1;
				}

				if (nameA > nameB) {
					return 1;
				}

				return 0;
			});
		});
	}

	resetFilm(): void {
		this.film = {
			id: 0,
			title: '',
			description: '',
			plot: '',
			director: '',
			duration: '',
			release_year: 0,
			cover_url: '',
			tags: '',
			created_by: 0,
			stars: 0,
			actors: [],
			genres: [],
			votes: [],
			vote: 0,	
			showFilmMenu: false,
			showMore: false
		}
	}

	addFilm() {
		// Inserisco attori e generi prima di inviare il film al servizio
		this.film.actors = this.actors.filter(x => x.selected);
		this.film.genres = this.genres.filter(x => x.selected);

		// Invio il film al servizio e se il risultato ha success = true allora torno alla lista film
		this.filmService.addFilm(this.film).subscribe(response => {
			if (response.success) {
				this.router.navigate(['films']);
			}
		})
	}
}
