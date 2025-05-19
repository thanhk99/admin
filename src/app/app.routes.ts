import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    { path: 'login' , component: LoginComponent},
    { path : '' , component: HomeComponent },
    { path: 'users' , component: UsersComponent},
    { path: 'users/:id', component: UsersComponent },
    {path : 'add-users', component: AddUsersComponent},
    {path: 'game', component: GameComponent},

];
