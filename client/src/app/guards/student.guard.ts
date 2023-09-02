import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {  Router } from '@angular/router';
import { AuthService } from '../modules/user/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(
    private router: Router,
    private AS: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const user = this.AS.currentUser;
      console.log('role',user);
      
      if (user && ( user.role === "2")) {
        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
