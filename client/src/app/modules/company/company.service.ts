import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient, HttpClientModule,HttpRequest,HttpEvent  } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  //configUrl = 'http://localhost:5000/company';
  configUrl = environment.companyUrl;
  configUrl2 = environment.companyUrl2;
  

  constructor(private http: HttpClient) { }
  getData2(functionName:any) {
    return this.http.get(this.configUrl + functionName)
  }
  getData(functionName:any) {
    return this.http.get(this.configUrl2 + functionName)
  }

  //post addprofile registration data
  postData(functionName: any, data: any=[]) {
    return this.http.post(this.configUrl2 + functionName, data)
  }

  putData(ID: any, data: any) {
    return this.http.put(`${this.configUrl2}${ID}`, data);
    }

    Delete_Data(ID: any) {
      return this.http.delete(`${this.configUrl2}${ID}` )
    }
 //post registration data
 postRegisterData(functionName: any, data: any=[]) {
  return this.http.post(this.configUrl + functionName, data)
  
}

// update applicants status

UpdateApplicants(functionName:any,data:any=[]){
  return this.http.put(this.configUrl + functionName, data)
}

// update applicants status select Applicants

SelectApplicants(functionName:any,data:any=[]){
  return this.http.put(this.configUrl + functionName, data)
}


// update applicants status reject applicants

RejectApplicants(functionName:any,data:any=[]){
  return this.http.put(this.configUrl + functionName, data)
}


 //post registration data
 postJobsData(functionName: any, data: any=[]) {
  return this.http.post(this.configUrl + functionName, data)
  
}
 //file upload code
 uploadLogo( formData:any): Observable<HttpEvent<any>> {
    

  const req = new HttpRequest('POST', `${this.configUrl}/uploadLogo`, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}

 //file upload code Broucher
 uploadbroucher( formData1:any): Observable<HttpEvent<any>> {
    

  const req = new HttpRequest('POST', `${this.configUrl}/uploadBroucher`, formData1, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}

//file upload code Other Data
uploadotherdoc( formData2:any): Observable<HttpEvent<any>> {
  const req = new HttpRequest('POST', `${this.configUrl}/uploadOther`, formData2, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}

}
