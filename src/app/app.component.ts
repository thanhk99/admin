import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { SideLeftComponent } from './shared/side-left/side-left.component';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,SideLeftComponent,LoginComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private router: Router
  ){}
  title = 'admin';
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
