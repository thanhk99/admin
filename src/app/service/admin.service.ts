import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apidelete= environment.apiDeleteUser;

  constructor(
    private http:HttpClient,
    private cookieService : CookieService,
  ) { }
  login(tk:any,mk:any){
    const body={
      "tk":tk , 
      "mk":mk ,
    }
    return this.http.post('http://localhost:8082/user/login',body)
  }

  getAllUsers(){
    return this.http.get(environment.apiGetUsers)
  }

  //lấy ra thông tin user
  getInfoUser(id:any){
    const body={
      id:id
    }
    return this.http.post(environment.apiGetInfoUser,body)
  }
  getAtmUser(id:any){
    const body={
      idPlayer:id
    }
    return this.http.post(environment.apiGetAtmUser,body)
  }
  // lấy ra tất cả usẻ
  getFullUser(){
    const body={}
    return this.http.post(environment.apiGetFullUser , body)
  }

  //update user
  updateUser(id:any,fullname:any,email:any){
    const body={
      id:id,
      fullname:fullname,
      email:email,
    }
    return this.http.post(environment.apiUpdateUser,body)
  }
  //delete user
  deleteUser(id: number): Observable<any> {
  const url = `${this.apidelete}`;
  const body = { id: id };

  return this.http.request('delete', url, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    body: body
  });
}


  setCookieID(id:any){
    this.cookieService.set('id', id);
  }
  getCookieID(){
    return this.cookieService.get('id');
  }
  setCookiedName(name:any){
    this.cookieService.set('name', name);
  }
  getCookiedName(){
    return this.cookieService.get('name')
  }
}
