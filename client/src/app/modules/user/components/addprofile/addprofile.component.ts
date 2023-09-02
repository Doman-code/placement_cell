import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { StdregisterService } from 'src/app/modules/structure/services/stdregister.service';
import { UserService } from 'src/app/modules/structure/services/user.service';

import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-addprofile',
  templateUrl: './addprofile.component.html',
  styleUrls: ['./addprofile.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AddprofileComponent implements OnInit {
  admissionsession: any;
  degree_type: any;
  skills: any;
  colleges: any;
  isDropdownModeCollege: boolean = true;
  isDropdownModeProgramme: boolean = true;
  selected_college:any;
  selected_program:any;
  ExperienceForm!: FormGroup;

  toggleModeCollege() {
    this.isDropdownModeCollege = !this.isDropdownModeCollege;
    console.log('isdropdownmod ', this.isDropdownModeCollege);

  }



  toggleModeProgramme() {
    this.isDropdownModeProgramme = !this.isDropdownModeProgramme;
  }
  constructor(private _formBuilder: FormBuilder, private _us: UserService, public datepipe: DatePipe, private _sr: StdregisterService) {

    //admissionsession data 
    this._sr.getData('/admissionsession').subscribe((res: any = []) => {
      console.log(res);
      this.admissionsession = res;
    });

    // programme type data
    this._us.getData('/degreetype').subscribe((res: any = []) => {
      console.log(res);
      this.degree_type = res;
    });

    //skills
    this._us.getData('skills').subscribe((res: any = []) => {
      console.log(res);
      this.skills = res;
    });

    //Colleges
    this._us.getData('colleges').subscribe((res: any = []) => {
      console.log(res);
      this.colleges = res;
    });



  }
  ngOnInit(): void {
    this.addExperience();
    this.addAcademics();
    this.addSkills();
  }

  //degree program  by id
  programtypeid: any;
  programs: any;
  onChangeDegree(program_type_id: any) {
    console.log(program_type_id.value);
    this.programtypeid = program_type_id.value;
    this._us.getData(`/degreeprogram/${this.programtypeid}`).subscribe((res: any = []) => {
      console.log(res);
      this.programs = res;
    });

  }


  
  SkillFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
    Student_ID: [null],
    Skill_ID: [null],
  });


  form = this._formBuilder.group({
    academics: this._formBuilder.array([]),
    skillsarray:this._formBuilder.array([]),
    experience: this._formBuilder.array([]),
    
  });

  get experience() {
    return this.form.controls['experience'] as FormArray;
  }

  get academics() {
    return this.form.controls['academics'] as FormArray;
  }

  get skillsarray(){
return this.form.controls['skillsarray'] as FormArray
  }

  addExperience() {
    this.ExperienceForm = this._formBuilder.group({
      Registration_No: [''],
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
      Delete_Flag: [''],
      // Public_IP_Address: [''],
      // Private_IP_Address: [''],

    });

    this.experience.push(this.ExperienceForm);
  }

  //add academics
  addAcademics() {
    const AcademicForm = this._formBuilder.group({
      //Academic_Detail_Id: [null],
      Registration_No:[''],
      Degree_Programme_Type_Id: [null],
      Degree_Programme_Id: [null],
      Student_Enroll_Id:[''],
      College_Name: [''],
      Subject_Id: [null],
      OGPA: [null],
      Admission_Year_Id: [null],
      PassingOut_Year_Id: [null],
      Marksheet_Url: [''],
      Student_Id: [null],

      // Created_By: [''],
      //Created_Date: [''],
      // Modified_By: [''],
      //Modified_Date: [''],
     // Delete_Flag: [''],
      // Public_IP_Address: [''],
      // Private_IP_Address: [''],

    });

    this.academics.push(AcademicForm);
  }


  //add skills
  addSkills() {
    const SkillForm = this._formBuilder.group({
      Student_Skill_ID:[null],
      Student_ID: [null],
      Skill_ID: [null],
      Skill_Cetificate_Url:['']

      // Created_By: [''],
      //Created_Date: [''],
      // Modified_By: [''],
      //Modified_Date: [''],
     // Delete_Flag: [''],
      // Public_IP_Address: [''],
      // Private_IP_Address: [''],

    });

    this.skillsarray.push(SkillForm);
  }



  deleteExperience(ExperienceIndex: number) {
    this.experience.removeAt(ExperienceIndex);
  }

  deleteAcademic(AcademicIndex: number) {
    this.academics.removeAt(AcademicIndex);
  }

  deleteSkills(SkillIndex: number) {
    this.skillsarray.removeAt(SkillIndex);
  }

  //file upload code
fileName = '';
currentFile?: File;
tenth_marksheet?: File;
twelve_marksheet?: File;
graduation?: File;
postgraduation?: File;
phd?: File;

 // selectedFiles?: FileList;
  
  photoUrl: any;
  ten_marksheet:any;
  twelve_marksheet_url:any;
  
  //file upload 
  // tenth marksheet  file upload 
  selecttenmarksheet(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];            //it is used to get the input file dom property
      this.tenth_marksheet = file
      console.log(this.currentFile);
    }

  }

// twelve marksheet file upload

  selecttwelvemarksheet(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];            //it is used to get the input file dom property
      this.twelve_marksheet = file
      console.log(this.currentFile);
    }

  }


  // photo tenth marksheet
  uploadTenMarksheet(){                            //multer will accept form data so we here creating a form data
    if(!this.tenth_marksheet){
      return this.nopath();  
    }  
    const formData = new FormData();
    formData.append('TenMarksheet', this.tenth_marksheet);
    console.log(this.tenth_marksheet)
    
    this._sr.MarksheetUpload(formData).subscribe((result:any)=>{
       console.log(result.body.marksheet_url);
      this.ten_marksheet=result.body.marksheet_url;   
      Swal.fire("Marksheet uploaded successfully");  
    });
    
    }

   // photo twelve marksheet
  //  uploadTwelveMarksheet(){                            //multer will accept form data so we here creating a form data
  //   if(!this.twelve_marksheet){
  //     return this.nopath();  
  //   }  
  //   const formData = new FormData();
  //   formData.append('TwelveMarksheet', this.twelve_marksheet);
  //   console.log(this.twelve_marksheet)
    
  //   this._sr.TwelveMarksheetUpload(formData).subscribe((result:any)=>{
  //      console.log(result.body.Marksheet_Url);
  //     this.twelve_marksheet_url=result.body.marksheet_url;   
  //     Swal.fire("Marksheet uploaded successfully");  
  //   });
    
  //   }

  nopath() {
    Swal.fire("please select a file")
  }



  patch_academic(index: number, marksheet_url: any) { 
      const control1 = this.academics.at(index).get('Marksheet_Url');
    if (control1) {
      control1.patchValue(marksheet_url);
    }
  }

  
  patch_experience(index: number, Period_From: any, Period_To:any) { 
    const control1 = this.experience.at(index).get('Period_From');
    const control2 = this.experience.at(index).get('Period_To');
    
  if (control1) {
    control1.patchValue(Period_From);
  }

  if (control2) {
    control2.patchValue(Period_To);
  }
}



  onSubmit() {
console.log(this.isDropdownModeCollege);
  
    // if(this.isDropdownModeCollege){
    //   var dropdown = (<HTMLSelectElement>document.getElementById("dropdown"));
    //   var selectedText = dropdown.options[dropdown.selectedIndex].text;
    //   this.selected_college = selectedText;
    // }
    // else{
    //   this.selected_college=(<HTMLInputElement>document.getElementById("inputbox")).value;
    // }
    console.log(this.selected_college);
    // printing form values
    console.log(this.form.value);

    const mainFormValue = this.form.value;
    const academicFormArrayValue = mainFormValue.academics;
    const skillsFormArrayValue = mainFormValue.skillsarray;
    const experienceformArrayValue = mainFormValue.experience;

    console.log('FormGroup Value:', mainFormValue);
    console.log('AcademicFormArray Value:', academicFormArrayValue);
    console.log('SkillsFormArray Value:', skillsFormArrayValue);

    console.log('ExperienceFormArray Value:', experienceformArrayValue);



    // this.ExperienceFormGroup.patchValue({
    //   Period_From: this.datepipe.transform(this.ExperienceFormGroup.get("Period_From")?.value, "yyyy-MM-dd"),
    //   Period_To: this.datepipe.transform(this.ExperienceFormGroup.get("Period_To")?.value, "yyyy-MM-dd"),

    // });
    
if(academicFormArrayValue){
  for (const item of academicFormArrayValue) {
    
    this._us.postRegisterData('academicdata', item).subscribe(res => {
     this.academicdata = res;
      if (this.academicdata) { Swal.fire('Form submitted SuccessFully'); }

   });
 }
}
   



   

    // skill data
    this._us.postRegisterData('/skilldata', this.SkillFormGroup.value).subscribe(res => {
      this.skilldata = res;
      //if (this.skilldata) { Swal.fire('Form submitted SuccessFully'); }

    });

    // experience Data
    // this._us.postRegisterData('experiencedata', this.ExperienceFormGroup.value).subscribe(res => {
    //   this.experiencedata = res;
    //   if (this.skilldata) { Swal.fire('Form submitted SuccessFully'); }

    // });


  }
  academicdata: any;
  skilldata: any;
  experiencedata: any;
}
