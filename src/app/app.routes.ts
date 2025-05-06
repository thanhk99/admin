import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
<<<<<<< HEAD
import { GameComponent } from './game/game.component';
=======
import { AddUsersComponent } from './add-users/add-users.component';
>>>>>>> c2ac9490675922d6a1217d7c48ee9f6690a624e0
export const routes: Routes = [
    { path: 'login' , component: LoginComponent},
    { path : '' , component: HomeComponent },
    { path: 'users' , component: UsersComponent},
    { path: 'users/:id', component: UsersComponent },
<<<<<<< HEAD
    { path: 'game', component: GameComponent },
=======
    {path : 'add-users', component: AddUsersComponent},
>>>>>>> c2ac9490675922d6a1217d7c48ee9f6690a624e0
];
