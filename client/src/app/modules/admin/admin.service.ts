import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  configUrl = 'http://localhost:5000/admin';

  constructor(private http: HttpClient) { }

  getData(functionName:any) {
    return this.http.get(this.configUrl + functionName)
  }

  //post addprofile registration data
  postData(functionName: any, data: any=[]) {
    return this.http.post(this.configUrl + functionName, data)
    
  }

//approve Vacancy
ApproveVacancy(functionName:any,data:any=[]){
  return this.http.put(this.configUrl + functionName, data)
}

updatepassword(functionName:any,data:any=[]){
  return this.http.put(this.configUrl+functionName,data);
}


}
