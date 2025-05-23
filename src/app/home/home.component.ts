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
  users: {
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
    this.getSumLoseT();
    this.getSumWinT();
    this.getSumLose();
    this.getSumWin();
    
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
      this.adminService.isDelete(user).subscribe(
        (res : any) => {
          console.log('Xoá thành công:', res);
          alert('Xoá thành công!');
          
        },
        (err : any) => {
          console.error('Xảy ra lỗi khi xoá:', err);
          alert('Không thể xoá người dùng!');
        }
      );
    }
  }
  activeItem(index: number): void {
    const user = this.users[index].id;
    console.log('Kích hoạt người dùng:', user);
    if (!user || !user) {
      alert('Người dùng không hợp lệ.');
      return;
    }
    if (confirm(`Bạn chắc chắn muốn kích hoạt người dùng ID ${user}?`)) {
      this.adminService.isActive(user).subscribe(
        (res : any) => {
          console.log('Kích hoạt thành công:', res);
          alert('Kích hoạt thành công!');
        },
        (err : any) => {
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
