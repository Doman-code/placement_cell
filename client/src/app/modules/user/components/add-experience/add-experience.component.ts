import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StdregisterService } from 'src/app/modules/structure/services/stdregister.service';
import { UserService } from 'src/app/modules/structure/services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss']
})
export class AddExperienceComponent implements OnInit {
  experienceData: any;
  districts:any;
  states: any;
  blocks: any;

  constructor(private _formBuilder: FormBuilder, private _us: UserService, private _sr: StdregisterService, private AS: AuthService, private datePipe: DatePipe,) {

  }


//state by id
stateid: any;
onChangeState(State_Id: any) {
  console.log(State_Id.value);
  this.stateid = State_Id.value;
  this._sr.getData(`/district/${this.stateid}`).subscribe((res: any = []) => {
    console.log(res);
    this.districts = res;
  });

}


  ngOnInit(): void {
    this.addExperience();
     //get state
     this._sr.getData('/state').subscribe((res: any = []) => {
      console.log(res);
      this.states = res;
    });
  }

  form = this._formBuilder.group({

    experience: this._formBuilder.array([]),

  });

  get experience() {
    return this.form.controls['experience'] as FormArray;
  }

  deleteExperience(ExperienceIndex: number) {
    this.experience.removeAt(ExperienceIndex);
  }

  addExperience() {
    const ExperienceForm = this._formBuilder.group({
      Registration_No: [this.AS.currentUser.id],
      Organization_Name: [''],
      Post_Name: [''],
      WorkPlace_Address: [''],
      WorkPlace_District_Id: [null],
      WorkPlace_State_Id: [null],
      WorkPlace_Country_Id: [null],
      City_Name: [''],
      Description: [''],
      Period_From: [null],
      Period_To: [null],
      Is_Currently_working_YN: [''],
      Salary: [null],

      // Created_By: [''],
      //Created_Date: [''],
      // Modified_By: [''],
      //Modified_Date: [''],
      // Delete_Flag: [''],
      // Public_IP_Address: [''],
      // Private_IP_Address: [''],

    });

    this.experience.push(ExperienceForm);
  }

  onClear() {
    this.experience.reset();
    this.experience.clearValidators(),
      this.experience.updateValueAndValidity()
  }

  /* method for patch date in formarray*/
patchDateFormats() {
  const ExperienceArray = this.form.get('experience') as FormArray;

  ExperienceArray.controls.forEach((control: any) => {
      
      const dateControl1 = control.get('Period_From');
      const dateControl2 = control.get('Period_To');

    if (dateControl1 && dateControl1.value) {
      const formattedDate = this.datePipe.transform(dateControl1.value,'yyyy-MM-dd');
      dateControl1.patchValue(formattedDate);
    }

    if (dateControl2 && dateControl2.value) {
      const formattedDate = this.datePipe.transform(dateControl2.value,'yyyy-MM-dd');
      dateControl2.patchValue(formattedDate);
    }

  });
}

 

  onSubmitExperience() {
    // printing form values
    console.log(this.form.value);

    this.patchDateFormats()
    const mainFormValue = this.form.value;
    const experienceFormArrayValue = mainFormValue.experience;

    console.log('ExperienceFormArray Value:', experienceFormArrayValue);

    if (experienceFormArrayValue) {

      for (const item of experienceFormArrayValue) {

        this._us.postRegisterData('experiencedata', item).subscribe(res => {
          this.experienceData = res;
          if (this.experienceData) { Swal.fire('Form submitted SuccessFully'); }
          this.onClear();
        });
      }
    }


  }
}



// chat gpt code 
// Assuming you want to update the 'name' control of the element at index 'indexToUpdate'
// updateElementName(indexToUpdate: number, newName: string) {
//   const formArray = this.myForm.get('myFormArray') as FormArray;

//   if (formArray.length > indexToUpdate) {
//     const formGroupToUpdate = formArray.at(indexToUpdate) as FormGroup;
//     formGroupToUpdate.patchValue({
//       name: newName
//     });
//   }
// }

// DOB: this.datepipe.transform(this.PersonalDataFormGroup.get("DOB")?.value, "yyyy-MM-dd"),

/* method for patch date in formarray*/
// patchDateFormats() {
//   const content_type_Array = this.content_form.get('content_type_details') as FormArray;

//   content_type_Array.controls.forEach((control: any) => {
//     const dateControl = control.get('Date');

//     if (dateControl && dateControl.value) {
//       const formattedDate = this.datePipe.transform(dateControl.value,'yyyy-MM-dd');
//       dateControl.patchValue(formattedDate);
//     }
//   });
// }
