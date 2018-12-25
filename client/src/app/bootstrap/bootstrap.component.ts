import { Component, OnInit } from '@angular/core';
import { RtmService } from '../rtm.service';

@Component({
	selector: 'app-root',
	templateUrl: './bootstrap.component.html',
	styleUrls: ['./bootstrap.component.scss']
})
export class BootstrapComponent implements OnInit {

	constructor(public rs: RtmService) {
	}

	ngOnInit() {
	}
}
