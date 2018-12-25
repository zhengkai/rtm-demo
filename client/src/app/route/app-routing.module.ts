import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BootstrapComponent } from '../bootstrap/bootstrap.component';
import { LoginComponent } from '../login/login.component';
import { ChatroomComponent } from '../chatroom/chatroom.component';

const routes: Routes = [
	{ path: 'chatroom/:id', component: ChatroomComponent },
	{ path: 'login', component: LoginComponent },
	{ path: '**', redirectTo: '/login' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
