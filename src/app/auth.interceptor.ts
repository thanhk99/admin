import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from './service/admin.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private adminService: AdminService
  ){}  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.adminService.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('Cloned request headers:', cloned.headers.get('Authorization'));
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

