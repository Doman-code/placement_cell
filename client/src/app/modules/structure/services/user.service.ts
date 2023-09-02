import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { environment } from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  logout() {
    throw new Error('Method not implemented.');
  }
 // configUrl = 'http://localhost:5000/user/';
  configUrl =environment.userUrl;
  


  constructor(private http: HttpClient) { }

  getData(functionName:any) {
    return this.http.get(this.configUrl + functionName)
  }

  //post addprofile registration data
  postRegisterData(functionName: any, data: any=[]) {
    return this.http.post(this.configUrl + functionName, data)
    
  }

  // update Data
  UpdateData(functionName:any,data:any=[]) {
    return this.http.put(this.configUrl + functionName,data)
  }

  // get currentUser() 
  // {
  //   let token = localStorage.getItem('token');
  //   if (token) 
  //   {
  //     let isExpired = this.helper.isTokenExpired(token);
  //     if (!isExpired) 
  //     {
  //       return this.helper.decodeToken(token);
  //     } 
  //     else 
  //     {
  //       this.logout();
  //     }
  //   }
  // }

  
}
