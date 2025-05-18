import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { GameComponent } from './game/game.component';
import { AddUsersComponent } from './add-users/add-users.component';
export const routes: Routes = [
    { path: 'login' , component: LoginComponent},
    { path : '' , component: HomeComponent },
    { path: 'users' , component: UsersComponent},
    { path: 'users/:id', component: UsersComponent },
    { path: 'game', component: GameComponent },
    {path : 'add-users', component: AddUsersComponent},
];
