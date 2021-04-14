import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class MenuService {
	menuIsOpen: boolean = false;
	showCloseButton: boolean = false;

	constructor() { }

	openMenu(): void {
		this.menuIsOpen = true;
		setTimeout(() => this.showCloseButton = true, 850);
	}

	closeMenu(): void {
		this.menuIsOpen = false;
		setTimeout(() => this.showCloseButton = false, 850);
	}
}
