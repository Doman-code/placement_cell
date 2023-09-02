import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.development';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { StdregisterService } from 'src/app/modules/structure/services/stdregister.service';
import { AuthService } from '../../services/auth.service';
import { mobileNumberValidator } from '../mobile-validator';
import { Route, Router } from '@angular/router';
import { StdregipreviewService } from '../../services/stdregipreview.service';
import { UserPreviewComponent } from '../user-preview/user-preview.component';
import {Dialog ,DialogRef,} from '@angular/cdk/dialog';
import { MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-std-complete-registration',
  templateUrl: './std-complete-registration.component.html',
  styleUrls: ['./std-complete-registration.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class StdCompleteRegistrationComponent implements OnInit {
  student: any;
registered:boolean=false;
  selected_adm_sess_ID: any;
  selected_sel_e_ID: any;
  selected_sel_h_ID: any;
  options: any;
  selected_gender_id: any;
  registration_type: any;
  selected_reg_type: any;
  selected_Curr_Country_ID: any;
  selected_Curr_State_ID: any;
  selected_Curr_District_ID: any;
  selected_Curr_Block_ID: any;
  selected_Per_Country_ID: any;
  selected_Per_State_ID: any;
  districts1: any;
  selected_Per_District_ID: any;
  blocks1: any;
  selected_Per_Block_ID: any;
 // dialog: any;

  constructor(private fb: FormBuilder, private _sr: StdregisterService, public datepipe: DatePipe, private _formBuilder: FormBuilder,private AS:AuthService,private http: HttpClient, private route:Router,private stdpreview:StdregipreviewService,public dialog:MatDialog ) { }
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  admissionsession: any;
  country: any;
  states: any;
  districts: any;
  blocks: any;
  salutations_english: any;
  salutations_hindi: any;
  toggleState: boolean = false;
  students:any;
academicdata:any;
studentdetail:any;
useCurrentAddressAsPermanent:boolean=false;
 // isregistered:boolean=true;

  //toggleButton:any;
  // toggleButton :any = document.getElementById('addressToggle');

  // if (this.toggleButton.checked) {
  //   this.getaddress();
  // }


  ngOnInit(): void {
    
    this.getAcademicmData();
    this.getStudentDetailData();
    const ipaddress = window.location.origin;
    //console.log(ipaddress);
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

    //admissionsession data 
    this._sr.getData('/admissionsession').subscribe((res: any = []) => {
      console.log(res);
      this.admissionsession = res;
    });

    console.log('data retrived');
    
    //get country 
    this._sr.getData('/country').subscribe((res: any = []) => {
      console.log(res);
      this.country = res;
    });

    //get state
    this._sr.getData('/state').subscribe((res: any = []) => {
      console.log(res);
      this.states = res;
    });

// get student detail by api

   
  }


  // academic detail api by igkv
  getAcademicmData() {
    var formData3: any = new FormData();
    const ueid= '20190656'
    formData3.append('UE_ID', ueid);
    formData3.append('Acad_Session',"");
    
    this.http.post<any>('http://192.168.1.32/igkv/a_edu/API_For_Angular_Project.asmx/getStudent_academicdetail', formData3)
      
      .subscribe((res: any ) => {
        console.log('this is students academic data',res.DetailListResponse.DetailList[0]);
        this.academicdata = res.DetailListResponse.DetailList[0];
      });


    }

//get student detail api by igkv
getStudentDetailData() {
  var formData3: any = new FormData();
  const ueid= '20190656'
  formData3.append('UE_ID', ueid);
  formData3.append('Acad_Session',"");
  
  this.http.post<any>('http://192.168.1.32/igkv/a_edu/API_For_Angular_Project.asmx/getStudent_detail', formData3)
    
    .subscribe((res: any ) => {
      console.log( ' students details are: ',res.DetailListResponse.DetailList[0]);
      this.studentdetail = res.DetailListResponse.DetailList[0];
    });


  }


  ue_id:string='';

  onRegistraionTypeChange(RegType:any){
   this.ue_id = (<HTMLInputElement>document.getElementById("ue_id")).value;
    // this.ue_id = 'a%2f1001';
    
    console.log(this.ue_id);
    console.log(RegType.value);
    if (RegType.value==='y'){

      
      this._sr.getData(`/getStudent/${this.ue_id}`).subscribe((res: any = []) => {
        console.log(res[0]);
        this.student = res[0];
      });

      setTimeout(()=>{
        this.PersonalDataFormGroup.patchValue({
          Student_First_Name_E:this.student.Student_First_Name_E,

          Salutation_E:this.student.Salutation_E,
          Salutation_H:this.student.Salutation_H,
          Student_Middle_Name_E: this.student.Student_Middle_Name_E,
          Student_Last_Name_E:this.student.Student_Last_Name_E,
           Student_First_Name_H:this.student.Student_First_Name_H,
          // Student_First_Name_H:this.apidata.College_Name_E,

          Student_Middle_Name_H:this.student.Student_Middle_Name_H,
          Student_Last_Name_H: this.student.Student_Last_Name_H,
          DOB: this.student.DOB,
          Gender_Id: this.student.Gender_Id,
          Mobile_No: this.student.Mobile_No,
          Email_Id:this.student.Email_Id,
          Father_Name_E: this.student.Father_Name_E,
          Mother_Name_E:this.student.Mother_Name_E,
          Father_Name_H:this.student.Father_Name_H,
          Mother_Name_H:this.student.Mother_Name_H,
          Guardian_Name_E: this.student.Guardian_Name_E,
          Spouse_Name_E: this.student.Spouse_Name_E,
      

        })

        this.AcademicFormGroup.patchValue({
          Admission_Session_id:this.academicdata.Admission_Session1,


        })
      },1000)
    }
   

   

   


  }

  //country by id
  countryid: any;
  onChangeCountry(Country_Id: any) {
    console.log(Country_Id.value);
    this.countryid = Country_Id.value;
    this._sr.getData('/state').subscribe((res: any = []) => {
      console.log(res);
      this.states = res;
    });

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

  //Block by id
  districtid: any;
  onChangeDistrict(District_Id: any) {
    console.log(District_Id.value);
    this.districtid = District_Id.value;
    this._sr.getData(`/block/${this.districtid}`).subscribe((res: any = []) => {
      console.log(res);
      this.blocks = res;
    });



   

  }

  // First Form Group
  PersonalDataFormGroup = this._formBuilder.group({
    TnP_Student_Master_Id: [null],
    UE_ID: [null,Validators.required],
    Registration_No:[this.AS.currentUser.id],
    Registration_Type: [null],
    Salutation_E: [null],
    Salutation_H: [null],
    Student_First_Name_E: ['',Validators.required],
    Student_Middle_Name_E: [''],
    Student_Last_Name_E: ['',Validators.required],
    Student_First_Name_H: ['',Validators.required],
    Student_Middle_Name_H: [''],
    Student_Last_Name_H: ['',Validators.required],
    DOB: [null,Validators.required],
    Gender_Id: [null,Validators.required],
    Mobile_No: ['',[Validators.required, mobileNumberValidator()]],
    Email_Id: ['',Validators.compose([
      Validators.email,Validators.required
    ])],
    Father_Name_E: ['',Validators.required],
    Mother_Name_E: ['',Validators.required],
    Father_Name_H: [''],
    Mother_Name_H: [''],
    Guardian_Name_E: [''],
    Spouse_Name_E: [''],

  });

  AcademicFormGroup = this._formBuilder.group({
   
    Admission_Session_id: [null,Validators.required],
    Degree_Completed_YN: ['',Validators.required],
    Degree_Completed_Session_id: [null,Validators.required],
  })

  // second form group
  AddressFormGroup = this._formBuilder.group({
    Permanent_Address1: ['',Validators.required],

    Permanent_Block_Id: [null,Validators.required],
    Permanent_District_Id: [null,Validators.required],
    Permanent_State_Id: [null,Validators.required],
    Permanent_Country_Id: [null,Validators.required],
    Permanent_Pin_Code: [null,Validators.required],
    Nationality: ['',Validators.required],
    Permanent_City: ['',Validators.required],
    Current_Address1: ['',Validators.required], 
    Current_Block_Id: [null,Validators.required],
    Current_District_Id: [null,Validators.required],
    Current_State_Id: [null,Validators.required],
    Current_Country_Id: [null,Validators.required],
    Current_Pin_Code: [null,Validators.required],
    Current_City: ['',Validators.required],
  });

  // Third form Group
  FileUploadFormGroup = this._formBuilder.group({
    Created_By: [''],
   // Created_Date: [''],
    // Modified_By: [''],
   // Modified_Date: [''],
     Delete_Flag: ['n'],
    // Public_IP_Address: [''],
    // Private_IP_Address: [''],
    Student_Photo: [''],
    Student_Signature: [''],
    Resume_Path: [''],

  });


  get mobileNumber() {
    return this.PersonalDataFormGroup.get('Mobile_No');
  }

  //file upload code
  fileName = '';
  currentFile?: File;
  signatureFile?: File;
  resumeFile?: File;
  selectedFiles?: FileList;
  message = '';
  photo_url: any;
  signature_url:any;
  doc_url:any;

  // photo file upload 
  selectPhoto(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];            //it is used to get the input file dom property
      this.currentFile = file

    }

  }

  // signature file upload 
  selectSignature(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];            //it is used to get the input file dom property
      this.signatureFile = file

    }

  }

  // resume file upload 
  selectResume(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];            //it is used to get the input file dom property
      this.resumeFile = file

    }

  }

  // photo upload
  uploadPhoto(){                            //multer will accept form data so we here creating a form data
    if(!this.currentFile){
      return this.nopath();
    
    }  
    const formData = new FormData();
    formData.append('photo', this.currentFile);
    console.log(this.currentFile)
    
    this._sr.PhotoUpload(formData).subscribe((result:any)=>{
       console.log(result.body.profile_url);
      this.photo_url=result.body.profile_url;
    
      Swal.fire("image uploaded successfully" ,"",'success')
     
    
    });
    
    }
//upload signature
  uploadSignature(){                            //multer will accept form data so we here creating a form data
    if(!this.signatureFile){
      return this.nopath();
    
    }  
    const formData1 = new FormData();
    formData1.append('signature', this.signatureFile);
    console.log(this.signatureFile);
    
    this._sr.SignatureUpload(formData1).subscribe((result:any)=>{
      this.signature_url=result.body.Signature_url;
    console.log(this.signature_url);
      Swal.fire("Signature uploaded successfully","",'success')
    
    });
    
    }

  //upload resume
  uploadResume(){                            //multer will accept form data so we here creating a form data
    if(!this.resumeFile){
      return this.nopath();
    
    }  
    const formData2 = new FormData();
    formData2.append('resume', this.resumeFile);
    console.log(this.resumeFile);
    
    this._sr.Docupload(formData2).subscribe((result:any)=>{
      this.doc_url=result.body.doc_url;  
      console.log(this.doc_url);
      Swal.fire("Resume uploaded successfully" ,"",'success')  
    });
    
    }

    nopath(){
    Swal.fire("please select a file")
    }

// autofetch in permanent address code 
togglePermanentAddress():void{
  this.useCurrentAddressAsPermanent= !this.useCurrentAddressAsPermanent;
  if(this.useCurrentAddressAsPermanent)
  {
    const Permanent_Country_IdValue = this.AddressFormGroup.value.Current_Country_Id;
    const Permanent_State_IdValue = this.AddressFormGroup.value.Current_State_Id;
   // this.onChangeState1(Permanent_State_IdValue);
    const Permanent_District_IdValue = this.AddressFormGroup.value.Current_District_Id;
   // this.onChangeDistrict1(Permanent_District_IdValue);
    const permanent_Block_IdValue = this.AddressFormGroup.value.Current_Block_Id;
    const Permanent_PinCodeValue = this.AddressFormGroup.value.Current_Pin_Code;
    const Permanent_CityValue = this.AddressFormGroup.value.Current_City;
    const Permanent_Address1Value =this.AddressFormGroup.value.Current_Address1;
  
    
    this.AddressFormGroup.patchValue({
      Permanent_Address1: Permanent_Address1Value,
      Permanent_Block_Id:permanent_Block_IdValue,
      Permanent_District_Id: Permanent_District_IdValue,
      Permanent_State_Id: Permanent_State_IdValue,
      Permanent_Country_Id: Permanent_Country_IdValue,
      Permanent_Pin_Code: Permanent_PinCodeValue,
      Permanent_City: Permanent_CityValue,

    })

   }
else{
  this.AddressFormGroup.patchValue({
    Permanent_Address1: '',
    Permanent_Block_Id:null,
    Permanent_District_Id: null,
    Permanent_State_Id: null,
    Permanent_Country_Id: null,
    Permanent_Pin_Code: null,
    Permanent_City: '',

    })
}
}


//dialog code for user preview
openDialog() {

  this.FileUploadFormGroup.controls['Student_Photo'].setValue(this.photo_url);

  this.FileUploadFormGroup.patchValue({
    Student_Photo: this.photo_url,
    Student_Signature:this.signature_url
  });
  

  const RegistrationForm = {
    ...this.PersonalDataFormGroup.value,
    ...this.AddressFormGroup.value,
    ...this.FileUploadFormGroup.value
  };

  this.stdpreview.setData(RegistrationForm);

  
  //Getting Drop Down Value Names By Their ID 


  let s_adm_ses= this.admissionsession.find( (val: { Admission_Session_id: any; }) => val.Admission_Session_id === this.selected_adm_sess_ID)?.Admission_Session_Name;
  let s_sel_e= this.salutations_english.find( (val: { Salutation_Id: any; }) => val.Salutation_Id === this.selected_sel_e_ID)?.Value;
  let s_sel_h= this.salutations_hindi.find( (val: { Salutation_Id: any; }) => val.Salutation_Id === this.selected_sel_h_ID)?.Value;
  //let s_gender_id= this.options.find( (val: { data: any; }) => val.data === this.selected_gender_id)?.name;

  //let s_reg_type= this.registration_type.find( (val: { data: any; }) => val.data === this.selected_reg_type)?.name;

  let Curr_Country= this.country.find( (val: { Current_Country_Id: any; }) => val.Current_Country_Id === this.selected_Curr_Country_ID)?.Name;

  let Curr_State= this.states.find( (val: { State_Code: any; }) => val.State_Code === this.selected_Curr_State_ID)?.State_Name;

  let Curr_District= this.districts.find( (val: { District_Code: any; }) => val.District_Code === this.selected_Curr_District_ID)?.District_Name;

  let Curr_Block= this.blocks.find( (val: { Block_Code: any; }) => val.Block_Code === this.selected_Curr_Block_ID)?.Block_Name;

  let Per_Country= this.country.find( (val: { Current_Country_Id: any; }) => val.Current_Country_Id === this.selected_Per_Country_ID)?.Name;

  let Per_State= this.states.find( (val: { State_Code: any; }) => val.State_Code === this.selected_Per_State_ID)?.State_Name;

  let Per_District= this.districts1.find( (val: { District_Code: any; }) => val.District_Code === this.selected_Per_District_ID)?.District_Name;

  let Per_Block= this.blocks1.find( (val: { Block_Code: any; }) => val.Block_Code === this.selected_Per_Block_ID)?.Block_Name;
 
  
  

  
  const dialog= this.dialog.open(UserPreviewComponent,
    {
      data:{
        s_adm_ses,
        s_sel_e,
        s_sel_h,
       // s_reg_type,
      //  s_gender_id,
        Curr_Country,
        Curr_State,
        Curr_District,
        Curr_Block,
        Per_Country,
        Per_State,
        Per_District,
        Per_Block
      }
    });

  dialog.afterClosed().subscribe((result:any) => {
    console.log(`Dialog result: ${result}`);
    });
  }






  onSubmit() {
    // this.toggleAddress();
    this.PersonalDataFormGroup.patchValue({
      DOB: this.datepipe.transform(this.PersonalDataFormGroup.get("DOB")?.value, "yyyy-MM-dd"),

    });

    this.FileUploadFormGroup.controls['Student_Photo'].setValue(this.photo_url);

    this.FileUploadFormGroup.patchValue({
     // Created_Date: this.datepipe.transform(this.FileUploadFormGroup.get("Created_Date")?.value, "yyyy-mm-dd"),
     // Modified_Date: this.datepipe.transform(this.FileUploadFormGroup.get("Modified_Date")?.value, "yyyy-mm-dd"),
      Student_Photo: this.photo_url,
      Student_Signature:this.signature_url,
      Resume_Path:this.doc_url
    });

    const newval={
      
    }
    const RegistrationForm = {
      ...this.PersonalDataFormGroup.value,
      ...this.AcademicFormGroup.value,
      ...this.AddressFormGroup.value,
      ...this.FileUploadFormGroup.value
    };
    //final formgroup

    //console.log(this.RegistrationForm.value);
    console.log(RegistrationForm);
    this._sr.postRegisterData('/rf', RegistrationForm).subscribe(res => {
      this.data = res;
      if (this.data) { Swal.fire('Form submitted SuccessFully',"",'success'); 
     // this.isregistered=true;
    // this.registered=true;
     this.route.navigate(['/appliedjob']);

    }

    });
    // console.log("hello",this.AcademicFormGroup.value)
    // this._sr.postRegisterData('/rf', this.AcademicFormGroup.value).subscribe(res => {
    //         this.data = res;

    //         if (this.data)
    //           Swal.fire('Form submitted SuccessFully');
    //       });
  }

  data: any;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
}
