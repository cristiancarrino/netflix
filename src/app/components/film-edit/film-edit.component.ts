import { Component, OnInit } from '@angular/core';
import { Actor } from '../../models/actor';
import { Genre } from '../../models/genre';
import { FilmService } from '../../services/film.service';
import { ActorService } from '../../services/actor.service';
import { GenreService } from '../../services/genre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../models/film';

@Component({
	selector: 'app-film-edit',
	templateUrl: './film-edit.component.html',
	styleUrls: ['./film-edit.component.scss']
})
export class FilmEditComponent implements OnInit {
	actors: Actor[] = [];
	genres: Genre[] = [];
	film: Film | undefined;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public filmService: FilmService,
		private actoService: ActorService,
		private genreService: GenreService
	) { }

	ngOnInit() {
		const id = +(this.route.snapshot.paramMap.get('id') ?? 0);
		this.filmService.getFilms().subscribe(films => {
			// Get the film by id in the url
			this.film = films.find(x => x.id == id);
			console.log(this.film);

			// Get actors list
			this.actoService.getActors().subscribe(actors => {
				this.actors = actors;

				// Dopo aver preso la lista degli attori, metto selected = true solo a quelli presenti dentro il film
				this.actors.forEach(x => {
					x.selected = this.film ? this.film.actors.find(y => x.id == y.id) != null : false;
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
					x.selected = this.film ? this.film.genres.find(y => x.id == y.id) != null : false;
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

		});
	}

	editFilm() {
		if (this.film) {
			// Inserisco attori e generi prima di inviare il film al servizio
			this.film.actors = this.actors.filter(x => x.selected);
			this.film.genres = this.genres.filter(x => x.selected);

			// Invio il film al servizio e se il risultato ha success = true allora torno alla lista film
			this.filmService.editFilm(this.film).subscribe(response => {
				if (response.success) {
					this.router.navigate(['films/list']);
				}
			})
		}
	}
}
