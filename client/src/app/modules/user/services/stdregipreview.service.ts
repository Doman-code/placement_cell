import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StdregipreviewService {

  previewdata:any;
  constructor() { }

  getRegistrationValue(){
return this.previewdata
  }

  setData(value:any){
this.previewdata=value;

  }
}
