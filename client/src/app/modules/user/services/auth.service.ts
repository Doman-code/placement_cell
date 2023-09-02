import { Injectable } from '@angular/core';
import { EventEmitter,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private helper: JwtHelperService, private router: Router) { }


  // getFunction(functionName: any) {
  //   return this.http.get(environment.rootURL + functionName).pipe(tap(res => res), catchError(e => {
  //     throw new Error(e);
  //   }));
  // }


  // userlogin(credentials: any): Observable<any> {
  //   return this.http.post(environment.rootURL + 'login', credentials).pipe(map((res: any) => {
  //     if (res && res.token) {
  //       localStorage.setItem('token', res.token)
  //     }
  //     return res;
  //   }))
  // }

  //here we can emitt our msg to any services or any component
  messageEmitter = new EventEmitter<Object>();
    
  get currentUser() 
  {
    let token = localStorage.getItem('token');
    if (token) 
    {
      let isExpired = this.helper.isTokenExpired(token);
      if (!isExpired) 
      {
        return this.helper.decodeToken(token);
      } 
      else 
      {
        this.logout();
      }
    }
  }

  logout() 
  {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/']);
  }




}
