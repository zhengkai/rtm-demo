import { Component, OnInit } from '@angular/core';
import { RtmService } from '../rtm.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	uid: number;

	submit() {
		if (this.uid < 1) {
			return;
		}
		localStorage.setItem('rtm-uid', '' + this.uid);
		this.rs.start(this.uid);

		this.router.navigate(['/chatroom/' + this.uid]);
	}

	constructor(public rs: RtmService, private router: Router) {
		this.uid = +localStorage.getItem('rtm-uid') || null;
		if (!this.uid) {
			this.uid = Math.floor(Math.random() * 900000 + 100000);
		}
	}

	ngOnInit() {
	}
}
