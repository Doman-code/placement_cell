import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {
   sharedData: any;
  vacany_id: any ;
 application_id:any;
 enrollment_no:any;
 registration_no:any;
 notification_id:any;

private student_id:any;

  setData(data: any) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }
  // for vacancy ID
  setVacancyId(data:any){
this.vacany_id=data;
  }
  getVacancyId(){
return this.vacany_id;
  }

// set student application id
 
 setNotificationId(data:any){
  this.notification_id=data;
    }
    getNotificationId(){
  return this.notification_id;
    }

  //for application detail
setApplicationID(data:any){
this.application_id=data;
}

  getApplicationId(){
return this.application_id;
  }

  // for personal detail
SetEnrollmentNo(data:any){
  this.enrollment_no=data;
}

getEnrollmentNo(){
  return this.enrollment_no;
}

// for student id
setStudentId(data: any) {
  this.student_id = data;
}

getStudentId() {
  return this.student_id;
}

// for student registration no
setRegistrationNo(data: any) {
  this.registration_no = data;
}

getRegistrationNo() {
  return this.registration_no;
}

  constructor() { }
  
}
