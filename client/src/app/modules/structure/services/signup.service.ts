import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  configUrl =environment.signupUrl;
  constructor(private http: HttpClient) { }

  getData(functionName:any) {
    return this.http.get(this.configUrl + functionName)
  }

  //post addprofile registration data
  postRegisterData(functionName: any, data: any=[]) {
    return this.http.post(this.configUrl + functionName, data)
    
  }

}
