import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apidelete= environment.apiDeleteUser;
  private apihistorycl = environment.apiGetHistoryGame;


  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  login(tk: any, mk: any) {
    const body = {
      "tk": tk,
      "mk": mk,
    }
    return this.http.post('http://localhost:8082/user/login', body)
  }
  testAdmin() {
    const body = { tk: "admin" }
    return this.http.post('http://localhost:8082/admin/hello', body)
  }
  getAllUsers() {
    const body = {};
    return this.http.post(environment.apiGetUsers , body)
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
  getInfoUser(id: any) {
    const body = {
      id: id
    }
    return this.http.post(environment.apiGetInfoUser, body)
  }
  getAtmUser(id: any) {
    const body = {
      idPlayer: id
    }
    return this.http.post(environment.apiGetAtmUser, body)
  }
  // lấy ra tất cả user
  getFullUser(){
    const body={}
    return this.http.post(environment.apiGetFullUser , body)
  }

  //update user
  updateUser(id: any, fullname: any, email: any) {
    const body = {
      id: id,
      fullname: fullname,
      email: email,
    }
    return this.http.post(environment.apiUpdateUser, body)
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
  updateAtmUser(id: any, balance: any) {
    const body = {
      idPlayer: id,
      balance: balance,
    }
    return this.http.post(environment.apiUpdateAtmUser, body)
  }
  //update tk mk
  updateTKMK(id: any, tk: any, mk: any) {
    const body = {
      id: id,
      tk: tk,
      mk: mk,
    }
    return this.http.post(environment.apiUpdateTKMK, body)
  }

  sumAllwin(playerId: any) {
    const body = {
      playerId: playerId,
    }
    return this.http.post(environment.apiSumWin, body)
  }

  sumAllLose(playerId: any) {
    const body = {
      playerId: playerId,
    }
    return this.http.post(environment.apiSumLose, body)
  }

  sumRengWin(playerId: any) {
    const body = {
      playerId: playerId,
    }
    return this.http.post(environment.apiRengWin, body)
  }

  sumRengLose(playerId: any) {
    const body = {
      playerId: playerId,
    }
    return this.http.post(environment.apiRengLose, body)
  }

  sumClWin(playerId: any) {
    const body = {
      playerId: playerId,
    }
    return this.http.post(environment.apiClWin, body)
  }

  sumClLose(playerId: any) {
    const body = {
      playerId: playerId,
    }
    return this.http.post(environment.apiClLose, body)
  }
  sumBetRengWin() {
    
    return this.http.get(environment.apiBetRengWin)
  }
  sumBetRengLose() {
    return this.http.get(environment.apiBetRengLose)
  }
  sumBetTXWin() {
    return this.http.get(environment.apiBetTXWin)
  }
  sumBetTXLose() {
    return this.http.get(environment.apiBetTXLose)
  }
 
  //add user
  addUser(tk: any, mk: any, fullname: any, email: any , role: any) {
    const body = {
      tk: tk,
      mk: mk,
      fullname: fullname,
      email: email,
      role: role
    }
    return this.http.post(environment.apiAddUser, body)
  }
  //add atm user
  addAtmUser(id: any, stk: any, balance: any) {
    const body = {
      idPlayer: id,
      stk: stk,
      balance: balance
    }
    return this.http.post(environment.apiAddAtmUser, body)
  }

  setCookieID(id: any) {
    this.cookieService.set('id', id);
  }
  getCookieID() {
    return this.cookieService.get('id');
  }
  setCookiedName(name: any) {
    this.cookieService.set('name', name);
  }
  getCookiedName() {
    return this.cookieService.get('name')
  }

  getTaiXiuHistory(): Observable<any[]> {
    return this.http.post<any[]>(environment.apiGetHistoryGame, {
      namegame: 'Tài xỉu'
    });
  }
  isDelete(id: any) {
    const body = {
      id: id
    }
    return this.http.put(environment.apiIsDelete, body)
  }
  isActive(id: any) {
    const body = {
      id: id
    }
    return this.http.put(environment.apiIsActive, body)
  }
}
