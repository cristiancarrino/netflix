import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faBars, faTimes, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	@Output() toggleSidebar = new EventEmitter();

	//Icons 
	faBars = faBars;
	faTimes = faTimes;
	faUserTimes = faUserTimes;

	title = 'Netflix';
	hideLogin: boolean = true;
	menuIsOpen: boolean = false;

	username: string = '';
	password: string = '';
	rememberMe: boolean = false;

	constructor(
		public userService: UserService
	) { }

	ngOnInit(): void {
		this.userService.getLoggedUser();
	}

	openMenu(): void {
		this.toggleSidebar.emit(true);
		setTimeout(() => this.menuIsOpen = true, 850);
	}

	closeMenu(): void {
		this.toggleSidebar.emit(false);
		setTimeout(() => this.menuIsOpen = false, 850);
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
