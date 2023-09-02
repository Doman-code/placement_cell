import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { HttpClient, HttpClientModule,HttpRequest,HttpEvent  } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StdregisterService {
  // configUrl = 'http://localhost:5000/register';
  loginUrl=environment.loginUrl
  configUrl=environment.registerUrl
  rootUrl=environment.rootUrl
  constructor(private http: HttpClient) { }
  getData(functionName:any) {
    return this.http.get(this.configUrl + functionName)
  }
  //for login
  getData1(functionName:any) {
    return this.http.get(this.rootUrl + functionName)
  }
 
  //post registration data
  postRegisterData(functionName: any, data: any=[]) {
    return this.http.post(this.configUrl + functionName, data)
    
  }

  //post data api
  postData(functionName: any, data: any=[]) {
    return this.http.post(this.configUrl + functionName, data)
    
  }

  //post data api
  LoginpostData(functionName:any, data: any=[]) {
    return this.http.post(this.loginUrl+ functionName , data)
    
  }

  //photo file upload 
  PhotoUpload( formData:any): Observable<HttpEvent<any>> {
    

    const req = new HttpRequest('POST', `${this.configUrl}/uploadPhoto`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

 //Signature upload code
 SignatureUpload( formData:any): Observable<HttpEvent<any>> {
    

  const req = new HttpRequest('POST', `${this.configUrl}/uploadSignature`, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}

//Document upload code
Docupload( formData:any): Observable<HttpEvent<any>> {
    

  const req = new HttpRequest('POST', `${this.configUrl}/uploadDoc`, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}

//Document upload code
MarksheetUpload( formData:any): Observable<HttpEvent<any>> {
    

  const req = new HttpRequest('POST', `${this.configUrl}/uploadmarksheet`, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}

//Document upload code
TwelveMarksheetUpload( formData:any): Observable<HttpEvent<any>> {
    

  const req = new HttpRequest('POST', `${this.configUrl}/uploadTwelvemarksheet`, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}

}
