import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { CommonModule } from '@angular/common';
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
  money: number = 0;
  isEditingAccount: boolean = false; // Biến để theo dõi trạng thái chỉnh sửa
  user: any;
  isEditingMoney: boolean = false; // Biến để theo dõi trạng thái chỉnh sửa tiền
  isEditing: boolean = false; // Biến để theo dõi trạng thái chỉnh sửa
  idPlayer: number = 0; // Biến để lưu id người dùng
  constructor(
    private route: ActivatedRoute,
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

        console.log('API trả về:', data);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  toggleEditing() {
    this.isEditing = !this.isEditing;
    this.isEditingMoney = false; // Tắt chế độ chỉnh sửa tài khoản khi mở chế độ chỉnh sửa
    
  }
  toggleEditingMn() {
    this.isEditingMoney = !this.isEditingMoney;
    this.isEditing = false; // Tắt chế độ chỉnh sửa tài khoản khi mở chế độ chỉnh sửa tiền
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


}
