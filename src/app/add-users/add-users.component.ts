import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-users',
  imports: [],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.css'
})
export class AddUsersComponent {
  @ViewChild('username') usernameRef!: ElementRef;
  @ViewChild('password') passwordRef!: ElementRef;
  @ViewChild('fullname') fullnameRef!: ElementRef;
  @ViewChild('email') emailRef!: ElementRef;
  @ViewChild('stk') stkRef!: ElementRef;
  @ViewChild('balance') balanceRef!: ElementRef;
  constructor(
    private elementRef: ElementRef, // Inject ElementRef to access the DOM
    private el: ElementRef, // Inject ElementRef to access the DOM
    private router: Router, // Inject Router for navigation
    private adminService: AdminService, // Inject AdminService for API calls
    // private toast: ToastrService // Inject ToastrService for notifications
  ) {
    // Constructor logic here
  }
  ngOnInit() {
    // Initialization logic here
  }
  AddUser() {
    const username = this.usernameRef.nativeElement.value;
    const password = this.passwordRef.nativeElement.value;
    const fullname = this.fullnameRef.nativeElement.value;
    const email = this.emailRef.nativeElement.value;
    // const stkRaw = this.stkRef.nativeElement.value;
    // const balance = this.balanceRef.nativeElement.value;
    
    // const stk = stkRaw.trim() === '' ? null : stkRaw;
    const tk = username;
    const mk = password;
    const role = 'user'; // Assuming the role is 'user' for all new users
    

    this.adminService.addUser(tk, mk, fullname, email , role).subscribe(
      (response: any) => {
        console.log('Thêm người dùng thành công:', response);
      //  this.toast.success('Thêm người dùng thành công!');
        alert('Thêm người dùng thành công!');
        // this.router.navigate(['/admin']);
        // const idPlayer = response.id; // Assuming the response contains the user ID
        // this.adminService.addAtmUser(idPlayer , stk , balance).subscribe(
        //   (response: any) => {
        //     console.log('Thêm thông tin ATM thành công:', response);
        //    // alert('Thêm thông tin ATM thành công!');

            
        //   },
        //   (error: any) => {
        //     //alert('Thêm thông tin ATM thất bại!');
        //     console.error('Lỗi khi thêm thông tin ATM:', error);
        //   }
        // );
      },
      (error: any) => {
        alert('Thêm người dùng thất bại!');
        console.error('Lỗi khi thêm người dùng:', error);
      }
    );
    

    console.log('Dữ liệu User:', { username, password, fullname, email });
  }
}


