import { Injectable } from '@angular/core';
import * as rtm from 'rtm-fpnn-webjs-sdk';

export interface Message {
	isSend: boolean;
	uid: number;
	msg: string;
}

@Injectable({
	providedIn: 'root',
})
export class RtmService {

	uid: number;

	timeOut = 5000;

	client: rtm.RTMClient;

	midAI = 0;

	isStart = false;

	history: Message[] = [];

	cb: (data: any) => void;

	async getToken() {

		const rt = await fetch('/api/token?uid=' + this.uid);

		const ab = await rt.arrayBuffer();

		const token = String.fromCharCode.apply(null, new Uint8Array(ab.slice(0, 32)));

		console.log('token =', token);

		this.client = new rtm.RTMClient({
			dispatch: 'rtm-nx-front.ifunplus.cn:13325',
			uid: new rtm.RTMConfig.Int64(this.uid),
			token,
			autoReconnect: false,
			connectionTimeout: 10 * 1000,
			pid: 11000020,
			ssl: true,
			proxyEndpoint: 'rtm-nx-front.ifunplus.cn:13556',
		});
	}

	onError(err) {
		console.error('rtm error:', err);
		// this.client = null;
	}

	onClose() {
		console.log('rtm closed');
		this.client = null;
	}

	onLogin(data) {
		console.log('rtm login', data);
	}

	async start(i) {

		if (this.uid) {
			return;
		}

		this.uid = i;
		await this.getToken();
		this.client.on('error', (err) => {
			this.onError(err);
		});
		this.client.on('close', (err) => {
			this.onClose();
		});
		this.client.on('login', (data) => {
			this.onLogin(data);
		});

		const pushName = rtm.RTMConfig.SERVER_PUSH.recvMessage;
		this.client.processor.on(pushName, (data) => {
			this.onReceive(data);
		});

		this.client.login();
	}

	setCallback(cb: (data: any) => void) {
		this.cb = cb;
	}

	onReceive(data) {
		// console.log('\n[PUSH] :\n', data);

		this.history.push(<Message>{
			isSend: false,
			uid: +data.from,
			msg: data.msg,
		});

		if (this.cb) {
			this.cb(data);
		}
	}

	sendMessage(uid: number, msg: string, cb ?: (err, data) => void) {
		if (!this.client) {
			return;
		}

		this.client.sendMessage(
			new rtm.RTMConfig.Int64(uid),
			8,
			msg,
			'',
			0,
			this.timeOut,
			cb,
		);

		this.history.push(<Message>{
			isSend: true,
			uid,
			msg,
		});
	}

	historyClean() {
		while (this.history.length > 1000) {
			this.history.pop();
		}
	}

	constructor() {
	}
}
