import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
	user = {
		username: this.userService.loggedUser?.username,
		password: this.userService.loggedUser?.password,
		firstname: this.userService.loggedUser?.firstname,
		lastname: this.userService.loggedUser?.lastname,
		photo_url: this.userService.loggedUser?.photo_url,
		birthdate: this.userService.loggedUser?.birthdate
	};

	constructor(
		private userService: UserService,
		private router: Router
	) { }

	ngOnInit(): void {
	}

	editUser () {		
		this.userService.editUser(this.user).subscribe(response => {
			if (response) {
				this.router.navigate(['/dashboard']);
			}
		});
	}

}
