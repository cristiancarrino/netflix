import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faBars, faTimes, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	//Icons 
	faBars = faBars;
	faTimes = faTimes;
	faUserTimes = faUserTimes;

	title = 'Netflix';
	hideLogin: boolean = true;

	username: string = '';
	password: string = '';
	rememberMe: boolean = false;

	constructor(
		public userService: UserService,
		public menuService: MenuService
	) { }

	ngOnInit(): void {
		this.userService.getLoggedUser();
	}

	openMenu(): void {
    	this.menuService.openMenu();
	}

	closeMenu(): void {
    	this.menuService.closeMenu();
	}

	login() {
		this.userService.login(this.username, this.password, this.rememberMe).subscribe(
			() => {
				this.hideLogin = this.userService.loggedUser != null;
			}
		);
	}

	logout() {
		this.userService.logout();
		this.hideLogin = true;
	}
}
