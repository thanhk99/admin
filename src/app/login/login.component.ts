import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor (
    private router: Router,
    private adminService : AdminService,
  ){}
  Account ="";
  Password ="";
  isLogin : boolean=false;
  ngLogin() {
    this.adminService.login(this.Account,this.Password).subscribe(
      (data:any)=>{
        this.adminService.setCookieID(data.id)
        this.adminService.setCookiedName(data.fullname)
        this.adminService.setToken(data.token)
        this.router.navigate(['/']);
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }
  ngOnInit(): void {
    if(this.adminService.getCookieID() !==''){
      this.router.navigate(['/'])
    }

  }
}