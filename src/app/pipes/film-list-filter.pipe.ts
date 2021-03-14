import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../models/film';

@Pipe({
	name: 'filmListFilter'
})
export class FilmListFilterPipe implements PipeTransform {
	transform(value: Film[], ...args: string[]): Film[] {
		let search = args[0].toLowerCase();
		let searchField = args[1];

		if (search.length > 2) {
			switch (searchField) {
				case 'title':
					return value.filter(x => x.title.toLowerCase().indexOf(search) > -1);
				case 'genre':
					return value.filter(x => x.genres.map(y => y.name).join().toLowerCase().indexOf(search) > -1);
				case 'actor':
					return value.filter(x => x.actors.map(y => y.firstname + ' ' + y.lastname).join().toLowerCase().indexOf(search) > -1);
				case 'director':
					return value.filter(x => x.director ? x.director.toLowerCase().indexOf(search) > -1 : false);
				case 'tags':
					return value.filter(x => x.tags ? x.tags.toLowerCase().indexOf(search) > -1 : false);
			}
		}
		
		return value;
	}
}
