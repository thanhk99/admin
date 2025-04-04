import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(
    private adminService:AdminService,
  ){}
  fullname:any
  ngOnInit(): void {
    this.fullname=this.adminService.getCookiedName()
  }

}
