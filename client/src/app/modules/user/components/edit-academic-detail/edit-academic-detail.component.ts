import { DatePipe } from '@angular/common';
import { Component, OnInit ,Input} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StdregisterService } from 'src/app/modules/structure/services/stdregister.service';
import { UserService } from 'src/app/modules/structure/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-academic-detail',
  templateUrl: './edit-academic-detail.component.html',
  styleUrls: ['./edit-academic-detail.component.scss']
})
export class EditAcademicDetailComponent implements OnInit {
  admissionsession: any;
  degree_type: any;
  degree_programs:any;
  subjects:any;
  skills: any;
  colleges: any;
  academic_data: any;
  student_id: any;
  student: any;
  receivedData: any;
  public isReadOnly: boolean = true;

  constructor(private _formBuilder: FormBuilder, private _us :UserService , public datepipe: DatePipe, private _sr:StdregisterService){

   

//admissionsession data 
this._sr.getData('/admissionsession').subscribe((res: any = []) => {
  console.log(res);
  this.admissionsession = res;
});

// programme type data
this._us.getData('degreetype').subscribe((res: any = []) => {
  console.log(res);
  this.degree_type = res;
});


//Colleges
this._us.getData('colleges').subscribe((res: any = []) => {
  console.log(res);
  this.colleges = res;
});

//Colleges
this._us.getData('degreeprogram').subscribe((res: any = []) => {
  console.log(res);
  this.degree_programs = res;
});

// subjects

this._us.getData('subjects').subscribe((res: any = []) => {
  console.log(res);
  this.subjects = res;
});


  }


  ngOnInit(): void {
    
     this._us.getData(`academicdetail/${this.receivedData}`).subscribe((res: any = []) => {
      console.log(res[0]);
      this.student = res[0];
    
      this.student_id=this.student.Student_id;
    });

// patch value in form 
setTimeout(()=>{
this.EditAcademicFormGroup.patchValue({
  Registration_No:this.student.Registration_No,
  College_Id:this.student.College_Id,
  Admission_Year_Id:this.student.Admission_Year_Id,
  PassingOut_Year_Id:this.student.PassingOut_Year_Id,
  Degree_Programme_Type_Id:this.student.Degree_Programme_Type_Id,
  Degree_Programme_Id:this.student.Degree_Programme_Id,
  Subject_Id:this.student.Subject_Id,
  Attach_Doc:this.student.Attach_Doc,
  OGPA:this.student.OGPA,
  Student_Id:this.student.Student_Id
})
},1000)

    
  }

   //degree program  by id
 programtypeid: any;
 programs:any;
 onChangeDegree(program_type_id: any) {
   console.log(program_type_id.value);
   this.programtypeid = program_type_id.value;
   this._us.getData(`/degreeprogram/${this.programtypeid}`).subscribe((res: any = []) => {
     console.log(res);
     this.programs = res;
   });

 }

  EditAcademicFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
   // Academic_Detail_Id:[null],
    Registration_No:[''],
    College_Id:[null],
    Admission_Year_Id:[null],
    PassingOut_Year_Id:[null],
    Degree_Programme_Type_Id:[null],
    Degree_Programme_Id:[null],
    Subject_Id:[null],
    Attach_Doc:[''],
    OGPA:[null],
    Student_Id:[null]

  });

    //file upload code
    fileName = '';
    currentFile?: File;
    selectedFiles?: FileList;
    message = '';
    photoUrl: any;
    DocUrl:any;
  
    //file upload 
    selectFile(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];            //it is used to get the input file dom property
        this.currentFile = file
  
      }
  
    }
    
    upload(){                            //multer will accept form data so we here creating a form data
      if(!this.currentFile){
        return this.nopath();
      
      }
      
      const formData = new FormData();
      formData.append('Attach_Doc', this.currentFile);               //the name of key is to be same as provide in backend(node js)
      console.log(this.currentFile)
      
      this._sr.Docupload(formData).subscribe((result:any)=>{
         console.log(result.body.profile_url);
  
        // console.log(result);
        this.DocUrl=result.body.profile_url;
      
        Swal.fire("Document uploaded successfully")
        //this.iseditmode=false;
       
      
      });
      
      }
      nopath(){
      Swal.fire("please select a file")
      }
  
onUpdate(){
  
  this._us.UpdateData(`/academic/${this.receivedData}`,this.EditAcademicFormGroup.value).subscribe(res => {
    this.academic_data = res;
    if (this.academic_data) { Swal.fire('Updated SuccessFully'); }

  });
  
}

}
