import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  amountUser: number = 0;
  amountIncom : number = 0;
  users:any =[]
  constructor(
    private adminService : AdminService
  ){}
  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(
      (data:any)=>{
        this.users = data
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }
  getAtmUser(id:any) : any{
    let balance
    this.adminService.getAtmUser(id).subscribe(
      (data:any)=>{
        balance=data.balance
      }
    )
    return balance
  }
}
