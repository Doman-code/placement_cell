import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSharingServiceService } from 'src/app/modules/data-sharing-service.service';
import { UserService } from 'src/app/modules/structure/services/user.service';
import { AuthService } from '../../services/auth.service';
import { StdregisterService } from 'src/app/modules/structure/services/stdregister.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  receivedData: any;
  vacancy_detail: any;
  student_detail: any
  data:any;
  isapplied:boolean=false;
  public isReadOnly: boolean = true;
  Application_Form_Group!: FormGroup;
  constructor(private _fb: FormBuilder, private _shared: DataSharingServiceService, private _user: UserService, private AS: AuthService, private  _sr:StdregisterService) {
    this.receivedData = this._shared.getNotificationId();
    console.log('receivedData(notification id) is:', this.receivedData);

  }
  ngOnInit(): void {
    this.createForm();

    this._user.getData(`/personaldetail/${this.AS.currentUser.id}`).subscribe((data:any)=>{
      this.student_detail=data[0];
      console.log(this.student_detail);
    })

    this._user.getData(`notificationdetail/${this.receivedData}`).subscribe((data: any) => {
      this.vacancy_detail = data[0];
      console.log(this.vacancy_detail);

      this.Application_Form_Group.patchValue({
        Post_Name: this.vacancy_detail.Job_Title,
        Vacancy_ID: this.vacancy_detail.Vacancy_ID,
       Full_Name:this.student_detail.Student_First_Name_E + ' '+ this.student_detail.Student_Middle_Name_E +' '+ this.student_detail.Student_Last_Name_E,
      Fathers_Name:this.student_detail.Father_Name_E,
       Email:this.student_detail.Email_Id,
      Mobile:this.student_detail.Mobile_No,
      Company_ID:this.vacancy_detail.Company_Id,
      })

    })
  }

  createForm() {

    this.Application_Form_Group = this._fb.group({
      Post_Name: ['',Validators.required],
      Vacancy_ID: ['',Validators.required],
      Company_ID: ['',Validators.required],
      Student_ID: [this.AS.currentUser.id,Validators.required],
      Full_Name:['',Validators.required],
      Fathers_Name:['',Validators.required],
      Email:['',Validators.required],
      Mobile:['',Validators.required],

    });

  }

  SubmitApplication(){


    console.log(this.Application_Form_Group.value);
    this._sr.postRegisterData('/Application', this.Application_Form_Group.value).subscribe(res => {
      this.data = res;
      if (this.data) { 
        Swal.fire('Form submitted SuccessFully',"",'success'); 
        this.isapplied=true;
    }

    });

  }



}


