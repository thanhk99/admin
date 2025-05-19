import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-left',
  imports: [],
  templateUrl: './side-left.component.html',
  styleUrl: './side-left.component.css'
})
export class SideLeftComponent {
  constructor(
    private router:Router,
  ){}

  UsersPage(){
    this.router.navigate(['/users'])
  }
  DashboardPage(){
    this.router.navigate(['/'])
  }
  GamePage(){
    this.router.navigate(['/game'])
  }
}
