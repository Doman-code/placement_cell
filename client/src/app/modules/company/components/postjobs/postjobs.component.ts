import { Component,OnInit } from '@angular/core';
import { FormBuilder ,FormControl,FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { CompanyService } from '../../company.service';
import { DatePipe } from '@angular/common';
import { StdregisterService } from 'src/app/modules/structure/services/stdregister.service';
import { UserService } from 'src/app/modules/structure/services/user.service';
import { AuthService } from 'src/app/modules/user/services/auth.service';

@Component({
  selector: 'app-postjobs',
  templateUrl: './postjobs.component.html',
  styleUrls: ['./postjobs.component.scss']
})
export class PostjobsComponent implements OnInit {
  passyear: any;
  degree_type: any;
  data: any;
  selectedGender: any;
  subjects:any;

  VacancyId: any;
  otherFile?:File;
  document_url:any;

  constructor(private _formBuilder:FormBuilder,private _sr:StdregisterService,private _us:UserService ,private datepipe:DatePipe, private _cr:CompanyService,private AS:AuthService){

    this.languageForm = new FormGroup({});
    this.languages.forEach((language) => {
      this.languageForm.addControl(language, new FormControl(false));
    });

    this.genderForm=new FormGroup({});
    this.genders.forEach((gender) => {
      this.genderForm.addControl(gender, new FormControl(false));
    });


    this._sr.getData('/admissionsession').subscribe((res: any = []) => {
      console.log(res);
      this.passyear = res;
    });
//degree program type ug pg phd
    this._us.getData('degreetype').subscribe((res: any = []) => {
      console.log(res);
      this.degree_type = res;
    });
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

 languageForm: FormGroup;
 languages: string[] = ['English','Hindi','Chhattisgarhi'];
 genderForm:FormGroup;
genders:string[]=['Male','Female','Transe']
  PostJobsForm=this._formBuilder.group({
    
    Company_Registration_No:[null],
    Company_Id:[this.AS.currentUser.id],
    Job_Title:[''],
    Job_Description:[''],
    Job_Selection:[''],
   // Job_Qualification:[''],
    Job_Location:[''],
    No_Of_Post:[null],
    Salary:[''],
    Last_Date_for_apply:[''],
    Min_Experience_in_Year:[null],
    Maximum_Age:[null],
    Prefered_Language:[''],
    Preferred_Gender:[''],

    Created_By: [''],
    Created_Date: [''],
    Modified_By: [''],
    Modified_Date: [''],
    Delete_Flag: [''],
    Public_IP_Address: [''],
    Private_IP_Address: [''],
   

  })

  AcademicDetailForm=this._formBuilder.group({
    Vacancy_Academic_Detail_ID:[null],
    Vacancy_ID:[null],
    Company_Id:[this.AS.currentUser.id],
    Degree_Programme_Id:[null],
    Subject_Id:[null],
    PassingOut_Year_Id:[null],
    Minimum_OGPA:[null],
    Degree_Programme_Type_Id:[null],
    Degree_Complete_Type:[''],
    Document_Url:[''],
    Created_By: [''],
    Created_Date: [null],
    Modified_By: [''],
    Modified_Date: [null],
    Delete_Flag: [''],
    Public_IP_Address: [''],
    Private_IP_Address: [''],

  })
  // gender = this._formBuilder.group({
  //   male: false,
  //   female: false,
  //   other:false,
  // });

  ngOnInit(): void {
       //subjects
    this._us.getData('subjects').subscribe((res: any = []) => {
      console.log(res);
      this.subjects = res;
    });
   
  }

  // select file code 
  selectOther(event: any) {
    if (event.target.files.length > 0) {
      this.otherFile = event.target.files[0];            //it is used to get the input file dom property
  
    }

  }

  //file upload code 
  //upload broucher
uploadOther(){                            //multer will accept form data so we here creating a form data
  if(!this.otherFile){
    return this.nopath();
  
  }
  
  const OtherformData = new FormData();
  OtherformData.append('company_other', this.otherFile);
  console.log(this.otherFile)
  
  this._cr.uploadotherdoc(OtherformData).subscribe((result:any=[])=>{
     console.log(result.body.other_url);

    // console.log(result);
    this.document_url = result.body.other_url;
  
    Swal.fire("Document uploaded successfully")
    //this.iseditmode=false;
   
  });
  
  }



  nopath(){
  Swal.fire("please select a file","","warning")
  }




  //onsubmit code
  onSubmit(){
// generating vacancyid
    // this.VacancyId=this._cr.generateVacancyId()
    // console.log(this.VacancyId);

    this.AcademicDetailForm.patchValue({
    

    })
    if (!this.PostJobsForm) { Swal.fire('Please Fill All Field Correctly','','warning'); }

  // language form data
    const selectedlanguages = Object.keys(this.languageForm.value)
    .filter((language) => this.languageForm.value[language])
    .map((language) => language);
  console.log(selectedlanguages);

  // gender form data
  const selectedgenders = Object.keys(this.genderForm.value)
  .filter((gender) => this.genderForm.value[gender])
  .map((gender) => gender);
console.log(selectedgenders);

    this.PostJobsForm.patchValue({
      Last_Date_for_apply: this.datepipe.transform(this.PostJobsForm.get("Last_Date_for_apply")?.value, "yyyy-MM-dd"),
  
      Created_Date: this.datepipe.transform(this.PostJobsForm.get("Created_Date")?.value, "yyyy-mm-dd"),
      Modified_Date: this.datepipe.transform(this.PostJobsForm.get("Modified_Date")?.value, "yyyy-mm-dd"),
    Prefered_Language:JSON.stringify(selectedlanguages),
    Preferred_Gender:JSON.stringify(selectedgenders)
    })
    
    this.AcademicDetailForm.patchValue({
      Document_Url:this.document_url
    })
    // combining all form data
    const PostJobForm = {
      ...this.PostJobsForm.value,  
    };

    const AcademicDetailForm = {
      ...this.AcademicDetailForm.value,
    };

    const notification={
        Notification_Title:this.PostJobsForm.value.Job_Title,
        Vacancy_ID:this.PostJobsForm.value.Job_Description,
    }

    console.log('notification detail:' ,notification);
    
        this._cr.postRegisterData('/jobPost', PostJobForm).subscribe(res => {
          this.data = res;
          if (this.data) { Swal.fire('Form submitted SuccessFully'); }
          else{
            Swal.fire('Form submission Failed','','error');
          }
      
        });
    
      //  setTimeout(() => {
          console.log(this.AcademicDetailForm.value);
          this._cr.postRegisterData('/academicDetail', AcademicDetailForm).subscribe(res => {
            this.data = res;
            if (this.data) { Swal.fire('Form submitted SuccessFully'); }
            else{
             Swal.fire('Form submission Failed','','error');
            }
        
          });

    //  }, 1000);
    
    
      }


    
  }


