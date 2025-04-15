import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  fullName: string = '';
  userId: number = 0;
  tk: string = '';
  mk: string = '';
  money: number = 0;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.adminService.getAtmUser(this.userId).subscribe(
      (data: any) => {
        this.money = data.balance;
        console.log('API trả về:', data);
      },
      (error: any) => {
        console.error('Error fetching ATM user data:', error);
      }
    );
    this.adminService.getInfoUser(this.userId).subscribe(
      (data: any) => {
        this.fullName = data.fullname;
        this.tk = data.tk;
        this.mk = data.mk;

        console.log('API trả về:', data);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
