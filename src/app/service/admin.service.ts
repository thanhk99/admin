import { Inject, Injectable ,PLATFORM_ID} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apidelete= environment.apiDeleteUser;

  constructor(
    private http:HttpClient,
    private cookieService : CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  login(tk:any,mk:any){
    const body={
      "tk":tk , 
      "mk":mk ,
    }
    return this.http.post('http://localhost:8082/user/login',body)
  }
  testAdmin(){
    const body={tk:"admin"}
    return this.http.post('http://localhost:8082/admin/hello',body)
  }
  getAllUsers(){
    return this.http.get(environment.apiGetUsers)
  }
  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
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

  //update atm user
  updateAtmUser(id:any,balance:any){
    const body={
      idPlayer:id,
      balance:balance,
    }
    return this.http.post(environment.apiUpdateAtmUser,body)
  }
  //update tk mk
  updateTKMK(id:any,tk:any,mk:any){
    const body={
      id:id,
      tk:tk,
      mk:mk,
    }
    return this.http.post(environment.apiUpdateTKMK,body)
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
