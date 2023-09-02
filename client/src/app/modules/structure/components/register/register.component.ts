import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { StdregisterService } from '../../services/stdregister.service';
import { environment } from 'src/environments/environment.development';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  
})
export class RegisterComponent implements OnInit {
  student: any;
  isSubmitting: boolean = false;

  constructor(private _sr: StdregisterService, public datepipe: DatePipe, private _formBuilder: FormBuilder) { }
  
  salutations_english: any;
  salutations_hindi: any;
  toggleState: boolean = false;


  ngOnInit(): void {
    const ipaddress = window.location.origin;
    console.log(ipaddress);
    this._sr.getData('/').subscribe((res: any = []) => {
      console.log(res);
      console.log(res[0].Email_Id);

    });

    //get salutaion in english
    this._sr.getData('/salutationenglish').subscribe((res: any = []) => {
      console.log(res);
      this.salutations_english = res;
    });

    //get salutaion in Hindi
    this._sr.getData('/salutationhindi').subscribe((res: any = []) => {
      console.log(res);
      this.salutations_hindi = res;
    });


  }

  ue_id: any;

  onRegistraionTypeChange(RegType: any) {
    this.ue_id = (<HTMLInputElement>document.getElementById("ue_id")).value;
    console.log(RegType.value);
    if (RegType.value === 'y') {
      this._sr.getData(`/getStudent/${this.ue_id}`).subscribe((res: any = []) => {
        console.log(res[0]);
        this.student = res[0];
      });

      setTimeout(() => {
        this.PersonalDataFormGroup.patchValue({
          Student_First_Name_E: this.student.Student_First_Name_E,

          Salutation_E: this.student.Salutation_E,
          Salutation_H: this.student.Salutation_H,
          Student_Middle_Name_E: this.student.Student_Middle_Name_E,
          Student_Last_Name_E: this.student.Student_Last_Name_E,
          Student_First_Name_H: this.student.Student_First_Name_H,
          Student_Middle_Name_H: this.student.Student_Middle_Name_H,
          Student_Last_Name_H: this.student.Student_Last_Name_H,
          DOB: this.student.DOB,
          Gender_Id: this.student.Gender_Id,
          Mobile_No: this.student.Mobile_No,
          Email_Id: this.student.Email_Id,
          Father_Name_E: this.student.Father_Name_E,
          Mother_Name_E: this.student.Mother_Name_E,
          Father_Name_H: this.student.Father_Name_H,
          Mother_Name_H: this.student.Mother_Name_H,
          Guardian_Name_E: this.student.Guardian_Name_E,
          Spouse_Name_E: this.student.Spouse_Name_E,


        })
      }, 1000)
    }





  }

 
  // First Form Group
  PersonalDataFormGroup = this._formBuilder.group({
   // TnP_Student_Master_Id: [null, Validators.required],
    UE_ID: [null, Validators.required],
    Registration_Type: [null, Validators.required],
    Salutation_E: [null, Validators.required],
    Salutation_H: [null],
    Student_First_Name_E: ['', Validators.required],
    Student_Middle_Name_E: [''],
    Student_Last_Name_E: ['', Validators.required],
    Student_First_Name_H: [''],
    Student_Middle_Name_H: ['', Validators.required],
    Student_Last_Name_H: ['', Validators.required],
    DOB: [null, Validators.required],
    Gender_Id: [null, Validators.required],
    Mobile_No: ['', Validators.required],
    Email_Id: ['', Validators.compose([
      Validators.required,
      Validators.email])
    ],
    Father_Name_E: ['', Validators.required],
    Mother_Name_E: ['', Validators.required],
    Father_Name_H: ['', Validators.required],
    Mother_Name_H: ['', Validators.required],
    Guardian_Name_E: ['', Validators.required],
    Spouse_Name_E: ['', Validators.required],
    // Created_By: [''],
    Created_Date: [''],
    // Modified_By: [''],
    Modified_Date: [''],
    // Delete_Flag: [''],
    // Public_IP_Address: [''],
    // Private_IP_Address: [''],
  });

   onSubmit() {
    this.isSubmitting = true;
    this.PersonalDataFormGroup.patchValue({
      DOB: this.datepipe.transform(this.PersonalDataFormGroup.get("DOB")?.value, "yyyy-MM-dd"),
      Created_Date: this.datepipe.transform(this.PersonalDataFormGroup.get("Created_Date")?.value, "yyyy-mm-dd"),
      Modified_Date: this.datepipe.transform(this.PersonalDataFormGroup.get("Modified_Date")?.value, "yyyy-mm-dd"),
    });

    console.log(this.PersonalDataFormGroup.value);
    this._sr.postRegisterData('/rf', this.PersonalDataFormGroup.value).subscribe(res => {
      this.data = res;
      this.isSubmitting = false;
      if (this.data) { Swal.fire('Form submitted SuccessFully'); }

    });
  
  }


  data: any;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
}
