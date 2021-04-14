import { Component } from '@angular/core';
import { MenuService } from './services/menu.service';
import { UserService } from './services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(
		public userService: UserService,
		public menuService: MenuService
	) { }

	closeMenu(): void {
    	this.menuService.closeMenu();
	}
}
