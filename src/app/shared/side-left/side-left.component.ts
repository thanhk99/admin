import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-side-left',
  imports: [],
  templateUrl: './side-left.component.html',
  styleUrl: './side-left.component.css'
})
export class SideLeftComponent {
  constructor(
    private router:Router,
    private cookieService: CookieService
  ){}

  UsersPage(){
    this.router.navigate(['/users'])
  }
  DashboardPage(){
    this.router.navigate(['/'])
  }
  logout(){
    localStorage.clear()
    this.cookieService.deleteAll()
    this.router.navigate(["/login"])
  }
}
