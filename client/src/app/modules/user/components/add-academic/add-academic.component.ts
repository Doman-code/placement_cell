import { Component ,OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StdregisterService } from 'src/app/modules/structure/services/stdregister.service';
import { UserService } from 'src/app/modules/structure/services/user.service';

import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { DataSharingServiceService } from 'src/app/modules/data-sharing-service.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-add-academic',
  templateUrl: './add-academic.component.html',
  styleUrls: ['./add-academic.component.scss']
})
export class AddAcademicComponent implements OnInit {


  admissionsession: any;
  degree_type: any;
  colleges: any;
  selected_college:any;
  selected_program:any;
  academicdata: any;
  student_id:any;
  registraion_no:any
  subjects:any;
  marksheeturl: string[] = [];
  constructor(private _formBuilder: FormBuilder, private _us: UserService, public datepipe: DatePipe, private _sr: StdregisterService,private _dss:DataSharingServiceService, private AS:AuthService){

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

  
    //Colleges
    this._us.getData('colleges').subscribe((res: any = []) => {
      console.log(res);
      this.colleges = res;
    });

    //subjects
    this._us.getData('subjects').subscribe((res: any = []) => {
      console.log(res);
      this.subjects = res;
    });

    

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


  ngOnInit():void {
    this.addAcademics();
    // this.registraion_no = this._dss.getRegistrationNo();
    // console.log('registraionno is :',this.registraion_no);
   console.log(this.subjects);
}

form = this._formBuilder.group({
  academics: this._formBuilder.array([]),
 
});

get academics() {
  return this.form.controls['academics'] as FormArray;
}


 //add academics
 addAcademics() {
  const AcademicForm = this._formBuilder.group({
    //Academic_Detail_Id: [null],
    Registration_No:[this.AS.currentUser.id],
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
    //Delete_Flag: [''],
    // Public_IP_Address: [''],
    // Private_IP_Address: [''],

  });

  this.academics.push(AcademicForm);
}


deleteAcademic(AcademicIndex: number) {
  this.academics.removeAt(AcademicIndex);
}

 //file upload code
 fileName = '';
 currentFile?: File;
 marksheet?: File;

  // selectedFiles?: FileList;   
   //file upload 
   selectmarksheet(event: any) {
     if (event.target.files.length > 0) {
       const file = event.target.files[0];            //it is used to get the input file dom property
       this.marksheet = file
       console.log(this.currentFile);
     }
 
   }


    //  marksheet upload
  uploadMarksheet(){                            //multer will accept form data so we here creating a form data
    if(!this.marksheet){
      return this.nopath();  
    }  
    const formData = new FormData();
    formData.append('Marksheet', this.marksheet);
    console.log(this.marksheet)
    
    this._sr.MarksheetUpload(formData).subscribe((result:any)=>{
       console.log(result.body.marksheet_url);
       this.marksheeturl.push(result.body.marksheet_url);

      //this.marksheet=result.body.marksheet_url;   
      Swal.fire("Marksheet uploaded successfully");  
    });
    
    }
//no path error
    nopath() {
      Swal.fire("please select a file")
    }
 



  onClear(){
    this.academics.reset();
    this.academics.clearValidators(),
    this.academics.updateValueAndValidity()  
  }
  
  onSubmitacademic() {
       
  
        // printing form values
        console.log(this.form.value);
    
        const mainFormValue = this.form.value;
        const academicFormArrayValue = mainFormValue.academics;
        
  
        console.log('AcademicFormArray Value:', academicFormArrayValue);

      const url=this.marksheeturl

      if(url && url.length>0){
        academicFormArrayValue?.forEach((item:any,index:number)=>{
          if(index<url.length){
            item.Marksheet_Url=url[index]
          }
        })
      }

        
    if(academicFormArrayValue){


     
     for (const item of academicFormArrayValue) {

     this._us.postRegisterData('academicdata',  item).subscribe(res => {
      this.academicdata = res;
       if (this.academicdata) { Swal.fire('Form submitted SuccessFully'); }
  this.onClear();
    });
  }
    }
      

}
}
