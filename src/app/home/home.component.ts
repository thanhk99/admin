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
  paginatedData: { id: number, fullname: string, email: string, datetime: string }[] = [];
  users: {
    is_delete: any;
    isActive: boolean; id: number, fullname: string, email: string, datetime: string
  }[] = []
  rotuer: any;
  amountIncome: number = 0;
  amountUser: number = 0;
  http: any;
  winR: number = 0;
  loseR: number = 0;
  winT: number = 0;
  loseT: number = 0;
  isDeleted: { [key: number]: boolean } = {};


  constructor(
    private adminService: AdminService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  isActive: boolean[] = []; // Define the active state array
  isEditing: boolean[] = []; // Define the editing state array
  showMenu: boolean[] = []; // Define the menu visibility array
  ngOnInit(): void {
    // Khởi tạo isEditing cho từng user nếu users đã có sẵn
    this.users.forEach(user => {
      this.isEditing[user.id] = false;
    });

    this.getSumLoseT();
    this.getSumWinT();
    this.getSumLose();
    this.getSumWin();
    this.loadUsers();



  }
  loadUsers() {
    this.adminService.getFullUser().subscribe((users: any) => {
      this.users = users;
      this.syncDeleteStatus();
    });
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


  // Đồng bộ trạng thái xóa từ localStorage
  syncDeleteStatus() {
    if (isPlatformBrowser(this.platformId)) {
      const deletedUsers = JSON.parse(localStorage.getItem('deletedUsers') || '{}');
      this.isDeleted = deletedUsers;

      // Gán is_delete cho từng user
      this.users.forEach(user => {
        user.is_delete = this.isDeleted[user.id] || false;
      });
    }
  }

  deleteItem(index: number): void {
    const user = this.users[index];
    if (confirm(`Xoá user ${user.id}?`)) {
      this.adminService.isDelete(user.id).subscribe(() => {
        user.is_delete = true;
        this.isDeleted[user.id] = true;

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('deletedUsers', JSON.stringify(this.isDeleted));
        }
      });
    }
  }
  // In your activeItem method, update it like this:
  activeItem(index: number): void {
    const user = this.users[index];
    console.log('Kích hoạt người dùng:', user.id);
    if (!user || !user.id) {
      alert('Người dùng không hợp lệ.');
      return;
    }
    if (confirm(`Bạn chắc chắn muốn kích hoạt người dùng ID ${user.id}?`)) {
      this.adminService.isActive(user.id).subscribe(
        (res: any) => {
          console.log('Kích hoạt thành công:', res);
          this.isDeleted[user.id] = false; // Update isDeleted state
          user.is_delete = false; // Update user object
          alert('Kích hoạt thành công!');
          // No need to reload users, we're updating the state directly
        },
        (err: any) => {
          console.error('Xảy ra lỗi khi kích hoạt:', err);
          alert('Không thể kích hoạt người dùng!');
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

  getSumWin() {
    this.adminService.sumBetRengWin().subscribe(
      (data: any) => {
        this.winR = data;
        console.log('Tổng tiền thắng:', this.winR);
      },
      (error: any) => {
        console.error('Lỗi khi lấy tổng tiền thắng:', error);
      }
    );
  }
  getSumLose() {
    this.adminService.sumBetRengLose().subscribe(
      (data: any) => {
        this.loseR = data;
        console.log('Tổng tiền thua:', this.loseR);
      },
      (error: any) => {
        console.error('Lỗi khi lấy tổng tiền thua:', error);
      }
    );
  }
  getSumWinT() {
    this.adminService.sumBetTXWin().subscribe(
      (data: any) => {
        this.winT = data;
        console.log('Tổng tiền thắng:', this.winT);
      },
      (error: any) => {
        console.error('Lỗi khi lấy tổng tiền thắng:', error);
      }
    );
  }
  getSumLoseT() {
    this.adminService.sumBetTXLose().subscribe(
      (data: any) => {
        this.loseT = data;
        console.log('Tổng tiền thua:', this.loseT);
      },
      (error: any) => {
        console.error('Lỗi khi lấy tổng tiền thua:', error);
      }
    );
  }
}
