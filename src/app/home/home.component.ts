import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [NgFor, NgxPaginationModule, CommonModule, NgIf, FormsModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 5; // Số lượng giao dịch mỗi trang
  totalPages: number = 1;
  paginatedData:  { id: number, fullname: string, email: string, datetime: string }[] = [];
  users: { id: number, fullname: string, email: string, datetime: string }[] = []
  rotuer: any;
  amountIncome: number = 0;
  amountUser: number = 0;
  http: any;

  constructor(
    private adminService: AdminService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  isActive: boolean[] = []; // Define the active state array
  isEditing: boolean[] = []; // Define the editing state array
  showMenu: boolean[] = []; // Define the menu visibility array

  ngOnInit(): void {
    this.users.forEach(user => {
      this.isEditing[user.id] = false;
    });
    
    if(isPlatformBrowser(this.platformId)){   
      this.adminService.getFullUser().subscribe(
        (data: any) => {
          console.log('API trả về:', data);
  
          // Gán chính xác mảng users
          this.users = Array.isArray(data) ? data : data.users;
  
          // Nếu vẫn không chắc chắn:
          // this.users = Array.isArray(data.users) ? data.users : [data.users];
        }
      );
    } 
  }

  goToUser(id: number) {
    this.router.navigate(['/users', id]);
    console.log("Id duoc gui di :", id);
  }


  getAtmUser(id: any): any {
    let balance
    this.adminService.getAtmUser(id).subscribe(
      (data: any) => {
        balance = data.balance
      }
    )
    return balance
  }

  toggleMenu(index: number): void {
    this.showMenu[index] = !this.showMenu[index];
  }

  editItem(index: number): void {
    this.isEditing[index] = true;
  }


  deleteItem(index: number): void {
    const user = this.users[index].id;
    console.log('Xoá người dùng:', user);

    if (!user || !user) {
      alert('Người dùng không hợp lệ.');
      return;
    }

    if (confirm(`Bạn chắc chắn muốn xoá người dùng ID ${user}?`)) {
      this.adminService.deleteUser(user).subscribe(
        (res) => {
          console.log('Xoá thành công:', res);
          this.users.splice(index, 1); // Cập nhật UI
        },
        (err) => {
          console.error('Xảy ra lỗi khi xoá:', err);
          alert('Không thể xoá người dùng!');
        }
      );
    }
  }


  saveItem(index: number): void {
    const id = this.users[index].id;
    const user = this.users.find(user => user.id === id);
    if (!user) return;
    console.log('Gửi lên server:', {
      id: user.id,
      fullname: user.fullname,
      email: user.email
    });
    

    // Gửi object user trực tiếp (gồm id, fullname, email)
    this.adminService.updateUser(
      user.id,
      user.fullname,
      user.email
    ).subscribe(
      (response: any) => {
        console.log('Cập nhật thành công:', response);
        alert('Cập nhật thành công!');
        this.isEditing[id] = false;
      },
      (error: any) => {
        console.error('Lỗi khi cập nhật:', error);
        alert('Không thể lưu thay đổi. Vui lòng thử lại!');
      }
    );
  }


  cancelEdit(index: number): void {
    this.isEditing[index] = false;
  }

  // updatePagination() {
  //   this.showMenu = new Array(this.users.length).fill(false);
  //   this.isActive = new Array(this.users.length).fill(false);
  //   this.isEditing = new Array(this.users.length).fill(false);

  //   this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   this.paginatedData = this.users.slice(startIndex, endIndex);
  // }
  // previousPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.updatePagination();
  //   }
  // }

  // // Chuyển sang trang tiếp theo
  // nextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.updatePagination();
  //   }
  // }
}
