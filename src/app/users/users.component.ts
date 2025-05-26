import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-users',
  imports: [CommonModule, NgIf, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {


  showMenu: any;

  fullName: string = '';
  userId: number = 0;
  tk: string = '';
  mk: string = '';
  email: string = '';
  money: number = 0;
  isEditingAccount: boolean = false; // Biến để theo dõi trạng thái chỉnh sửa
  user: any;
  isEditingMoney: boolean = false; // Biến để theo dõi trạng thái chỉnh sửa tiền
  isEditing: boolean = false; // Biến để theo dõi trạng thái chỉnh sửa
  idPlayer: number = 0; // Biến để lưu id người dùng
  sumAlllost: number = 0; // Biến để lưu tổng tiền thua
  sumAllWin: number = 0; // Biến để lưu tổng tiền thắng
  sumRengWin: number = 0; // Biến để lưu tổng tiền thắng reng
  sumRengLose: number = 0; // Biến để lưu tổng tiền thua reng
  sumClWin: number = 0; // Biến để lưu tổng tiền thắng CL
  sumClLose: number = 0; // Biến để lưu tổng tiền thua CL
  sumUser: number = 0; // Biến để lưu tổng tiền của user
  isdelete: boolean = false; // Biến để theo dõi trạng thái xóa
  status: string = ''; // Biến để lưu trạng thái xóa
  isactive: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.adminService.getAtmUser(this.userId).subscribe(
      (data: any) => {
        this.money = data.balance;
        this.idPlayer = data.idPlayer;
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
        this.email = data.email;
        this.isdelete = data.isDelete;
        this.isactive = data.isActive;
        console.log('API trả về:', data);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
    // tinh tong ngdung

    this.adminService.getFullUser().subscribe(
      (data: any) => {
        this.sumUser += data.length - 1; // Cộng dồn số lượng người dùng - 1 admin
        console.log('API trả về:', data);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );

    this.sumAllLoseUser();
    this.sumAllWinUser();
    this.sumRengWinUser();
    this.sumRengLoseUser();
    this.sumClWinUser();
    this.sumClLoseUser();
  }
  addUser() {
    this.router.navigate(['/add-users']);
  }
  toggleEditing() {
    this.isEditing = !this.isEditing;
    this.isEditingMoney = false; // Tắt chế độ chỉnh sửa tài khoản khi mở chế độ chỉnh sửa

  }
  toggleEditingMn() {
    this.isEditingMoney = !this.isEditingMoney;
    this.isEditing = false; // Tắt chế độ chỉnh sửa tài khoản khi mở chế độ chỉnh sửa tiền
  }
  deleteUser(): void {
    if (confirm(`Bạn có chắc chắn muốn xóa user ${this.userId}?`)) {
      this.adminService.isDelete(this.userId).subscribe(
        (response) => {
          // Cập nhật trạng thái hiện tại
          this.isdelete = true;

          // Lấy danh sách users từ localStorage
          let users = JSON.parse(localStorage.getItem('users') || '[]');

          // Cập nhật trạng thái is_delete cho user tương ứng
          users = users.map((user: any) => {
            if (user.id === this.userId) {
              return { ...user, is_delete: true };
            }
            return user;
          });

          // Lưu lại vào localStorage
          localStorage.setItem('users', JSON.stringify(users));

          // Cập nhật danh sách đã xóa riêng (nếu cần)
          let deletedUsers = JSON.parse(localStorage.getItem('deletedUsers') || '{}');
          deletedUsers[this.userId] = true;
          localStorage.setItem('deletedUsers', JSON.stringify(deletedUsers));

          alert(`Đã xóa user ${this.userId} thành công!`);
        },
        (error) => {
          console.error('Lỗi khi xóa user:', error);
          alert('Có lỗi xảy ra khi xóa user!');
        }
      );
    }
  }
  resUser() {
    if (confirm(`Bạn có chắc chắn muốn khôi phục user ${this.userId}?`)) {
      this.adminService.isActive(this.userId).subscribe(
        (response) => {
          // Cập nhật trạng thái hiện tại
          this.isdelete = false;

          // Lấy danh sách users từ localStorage
          let users = JSON.parse(localStorage.getItem('users') || '[]');

          // Cập nhật trạng thái is_delete cho user tương ứng
          users = users.map((user: any) => {
            if (user.id === this.userId) {
              return { ...user, is_delete: false };
            }
            return user;
          });

          // Lưu lại vào localStorage
          localStorage.setItem('users', JSON.stringify(users));

          // Cập nhật danh sách đã xóa riêng (nếu cần)
          let deletedUsers = JSON.parse(localStorage.getItem('deletedUsers') || '{}');
          deletedUsers[this.userId] = false;
          localStorage.setItem('deletedUsers', JSON.stringify(deletedUsers));

          alert(`Đã khôi phục user ${this.userId} thành công!`);
        },
        (error) => {
          console.error('Lỗi khi khôi phục user:', error);
          alert('Có lỗi xảy ra khi khôi phục user!');
        }
      );
    }

  }

  saveChanges() {
    // Gọi API để lưu thông tin người dùng
    this.adminService.updateTKMK(this.userId, this.tk, this.mk).subscribe(
      (response: any) => {
        alert('Cập nhật thành công');
        console.log('Cập nhật thành công:', response);
      },
      (error: any) => {
        alert('Cập nhật thất bại');
        console.error('Lỗi khi cập nhật:', error);
      }
    );
    this.isEditing = false; // Tắt chế độ chỉnh sửa sau khi lưu
  }

  cancelEdit() {
    this.isEditing = false; // Hủy bỏ chỉnh sửa và quay lại trạng thái ban đầu
  }

  saveItemMn(newMn: number) {
    this.money = newMn;
    console.log('Sending data:', { idPlayer: this.idPlayer, balance: this.money });
    // Gọi API để lưu thông tin người dùng
    this.adminService.updateAtmUser(this.idPlayer, this.money).subscribe(
      (response: any) => {
        alert('Cập nhật thành công');
        console.log('Cập nhật thành công:', response);


      },
      (error: any) => {
        alert('Cập nhật thất bại');
        console.error('Lỗi khi cập nhật:', error);
      }
    );
    // Cập nhật lại giá trị money trong component
    this.money = newMn;
    // Đặt lại trạng thái chỉnh sửa

    this.isEditingMoney = false; // Sau khi lưu, tắt chế độ chỉnh sửa
  }
  cancelEditMn() {

    this.isEditingMoney = false; // Hủy bỏ chỉnh sửa và quay lại trạng thái ban đầu
  }

  sumAllWinUser() {
    const playerId = this.userId; // Lấy playerId từ biến userId
    console.log('playerId:', playerId); // Kiểm tra giá trị playerId
    this.adminService.sumAllwin(playerId).subscribe(
      (data: any) => {
        this.sumAllWin = data;
        console.log('API trả về:', data);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  sumAllLoseUser() {
    const playerId = this.userId; // Lấy playerId từ biến userId
    console.log('playerId:', playerId); // Kiểm tra giá trị playerId
    this.adminService.sumAllLose(playerId).subscribe(
      (data: any) => {
        this.sumAlllost = data;
        console.log('API trả về:', data);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  sumRengWinUser() {
    // Lấy playerId từ biến userId
    const playerId = this.userId; // Lấy playerId từ biến userId
    console.log('playerId:', playerId); // Kiểm tra giá trị playerId
    this.adminService.sumRengWin(playerId).subscribe(
      (data: any) => {
        this.sumRengWin = data;
        console.log('API trả về:', data);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  sumRengLoseUser() {
    // Lấy playerId từ biến userId
    const playerId = this.userId; // Lấy playerId từ biến userId
    console.log('playerId:', playerId); // Kiểm tra giá trị playerId
    this.adminService.sumRengLose(playerId).subscribe(
      (data: any) => {
        this.sumRengLose = data;
        console.log('API trả về:', data);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  sumClWinUser() {
    // Lấy playerId từ biến userId
    const playerId = this.userId; // Lấy playerId từ biến userId
    console.log('playerId:', playerId); // Kiểm tra giá trị playerId
    this.adminService.sumClWin(playerId).subscribe(
      (data: any) => {
        this.sumClWin = data;
        console.log('API trả về:', data);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  sumClLoseUser() {
    // Lấy playerId từ biến userId
    const playerId = this.userId; // Lấy playerId từ biến userId
    console.log('playerId:', playerId); // Kiểm tra giá trị playerId
    this.adminService.sumClLose(playerId).subscribe(
      (data: any) => {
        this.sumClLose = data;
        console.log('API trả về:', data);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }


}
