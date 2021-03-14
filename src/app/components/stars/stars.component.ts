import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

const starsTotal = 5;

@Component({
	selector: 'app-stars',
	templateUrl: './stars.component.html',
	styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnChanges {
	@Input() vote: number = 0;
	@Input() canEdit: boolean = false;
	@Output() voteChanged = new EventEmitter();

	icons: IconDefinition[] = [];
	stellinaPiena = faStar;
	mezzaStellina = faStarHalfAlt;
	stellinaVuota = faStarEmpty;

	constructor() { }

	ngOnChanges(): void {
		this.icons = [];
		for (var i = 1; i <= starsTotal; i++) {
			if (this.vote >= i) {
				this.icons.push(this.stellinaPiena);
			} else if (this.vote >= (i - 0.5)) {
				this.icons.push(this.mezzaStellina);
			} else {
				this.icons.push(this.stellinaVuota);
			}
		}
	}

	setVote(vote: number, event: Event) {
		event.stopPropagation();

		if (this.canEdit) {
			this.voteChanged.emit(vote);
		}
	}
}
