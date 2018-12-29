import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RtmService, Message } from '../rtm.service';

@Component({
	selector: 'app-chatroom',
	templateUrl: './chatroom.component.html',
	styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {

	@ViewChildren('msgList') msgList: QueryList<ElementRef>;

	template = [
		'{"json":"template"}',
		'{"add":1,"sub":2}',
		'数据模板，可以任意定制',
	];

	toUID = 10002;
	message: string;

	isSending: boolean;

	submit() {

		if (!this.toUID || !this.message || this.isSending) {
			return;
		}
		this.isSending = true;

		console.log('test', this.toUID, this.message);

		this.rs.sendMessage(this.toUID, this.message, () => {
			this.isSending = false;
		});
		this.message = '';

		this.scroll();
	}

	applyTemplate(i) {
		console.log('template', i);
		this.message = this.template[i];
	}

	recv(data: any) {
		this.scroll();
	}

	scroll() {
		const o = this.msgList.first.nativeElement;
		o.scrollTop = o.scrollHeight;
	}

	constructor(public rs: RtmService, private router: Router, private routerInfo: ActivatedRoute) {
		this.rs.setCallback((data: any) => {
			this.recv(data);
		});
	}

	ngOnInit() {

		// this.fill();

		const uid = +this.routerInfo.snapshot.params['id'];
		if (uid < 1) {
			this.router.navigate(['/login']);
		}
		this.rs.start(uid);
	}

	fill() {
		for (let i = 0; i < 100; i++) {
			this.rs.history.push({
				isSend: Math.random() < 0.5,
				uid: Math.floor(Math.random() * 1000000),
				msg: i + ' 填充数据 ' + Math.random() + ' ' + Date.now(),
			} as Message);
			this.rs.historyClean();
		}
	}

	keydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && e.ctrlKey) {
			e.preventDefault();
			this.submit();
		}
	}
}
