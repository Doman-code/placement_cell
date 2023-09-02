import { Component ,OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CompanyService } from '../../company.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { StdregisterService } from 'src/app/modules/structure/services/stdregister.service';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { mobileNumberValidator } from '../../../user/components/mobile-validator';

@Component({
  selector: 'app-c-registraion',
  templateUrl: './c-registraion.component.html',
  styleUrls: ['./c-registraion.component.scss']
})
export class CRegistraionComponent implements OnInit {

  data:any;
  districts:any;
  states: any;
  blocks: any;
  isSubmitting: boolean = false;

// file upload variables
  fileName = '';
 
  broucherFile?: File;
  otherFile?: File;
  logoFile?:File;

  broucher_url:any;
  other_url:any;
  logo_url:any;
 
  //doc_url:any;

  selectedFiles?: FileList;
  message = '';
  CompanyId: any;
 


  constructor(private _formBuilder:FormBuilder, private _cr :CompanyService ,private datepipe:DatePipe, private _sr:StdregisterService,private AS:AuthService,private rout:Router){}

  // form builder
  CompanyDetailForm = this._formBuilder.group({
    Company_Registration_No:['',Validators.required],
    Tnp_Registration_No:[this.AS.currentUser.id],
    Name:['',Validators.required],
    Company_Type:[null,Validators.required],
    Company_Category:[null,Validators.required],
    Company_Profile:['',Validators.required],
    Website:[''],
   // Company_Id:[this.AS.currentUser.id],

    Created_By: [this.AS.currentUser.username],
   // Created_Date: [''],
    Modified_By: [''],
    Modified_Date: [''],
    Delete_Flag: ['n'],
    Public_IP_Address: [''],
    Private_IP_Address: [''],
   
  });

  // second form group
  CompanyContactForm=this._formBuilder.group({
    Company_Email:['',Validators.email],
    Company_Phone_Number:['',Validators.required],
    Hr_Name:['',Validators.required],
    Hr_Contact_No:['',[Validators.required,mobileNumberValidator()]],
    Hr_Email:['',Validators.required],
    State:[null,Validators.required],
    District:[null,Validators.required],
    Block:[null,Validators.required],
    Address:['',Validators.required],
    Contact_Person:['',Validators.required],
    Contact_Person_Email:['',Validators.required],
    Contact_Person_Phone:['',[Validators.required,mobileNumberValidator()]]

  })
// Third form Group
  CompanyOtherForm=this._formBuilder.group({

    Company_Short_Name:[''],
    Company_Logo:[''],
    //Company_Logo_Url:[''],
    Company_Broucher:[''],
    Company_Other_Doc_Url:['']
  })

//get mobile validator for hr contact no
get HrmobileNumber() {
  return this.CompanyContactForm.get('Hr_Contact_No');
}


get CpmobileNumber() {
  return this.CompanyContactForm.get('Contact_Person_Phone');
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

 
//  Blocks by id
 districtid: any;
 company_category:any;
 company_type:any
 onChangeDistrict(District_Id: any) {
   console.log(District_Id.value);
   this.districtid = District_Id.value;
   this._sr.getData(`/block/${this.districtid}`).subscribe((res: any = []) => {
     console.log(res);
     this.blocks = res;
   });

 }


 
  ngOnInit(): void {
       //get state

       console.log(this.AS.currentUser.id);
    this._sr.getData('/state').subscribe((res: any = []) => {
      console.log(res);
      this.states = res;
    });

    // get company category
    this._cr.getData2('/CompanyType').subscribe((res: any = []) => {
      console.log(res);
      this.company_type =res;
    });

    // get company category
    this._cr.getData2('/CompanyCategory').subscribe((res: any = []) => {
      console.log(res);
      this.company_category =res;
    });
  }

   // logo file upload 
   selectLogo(event: any) {
    if (event.target.files.length > 0) {
      const file1 = event.target.files[0];            //it is used to get the input file dom property
      this.logoFile = file1

    }

  }
   

   // broucher file upload 
   selectBroucher(event: any) {
    if (event.target.files.length > 0) {
      const file1 = event.target.files[0];            //it is used to get the input file dom property
      this.broucherFile = file1

    }

  }

  // broucher file upload 
  selectOther(event: any) {
    if (event.target.files.length > 0) {
      this.otherFile = event.target.files[0];            //it is used to get the input file dom property
  
    }

  }



  //upload logo
uploadLogo(){                            //multer will accept form data so we here creating a form data
  if(!this.logoFile){
    return this.nopath();
  
  }
  
  const LogoformData = new FormData();
  LogoformData.append('company_logo', this.logoFile);
  console.log(this.otherFile)
  
  this._cr.uploadLogo(LogoformData).subscribe((result:any=[])=>{
     console.log(result.body.logo_url);

    // console.log(result);
    this.logo_url = result.body.logo_url;
  
    Swal.fire("Logo uploaded successfully")
    //this.iseditmode=false;
   
  });
  
  }

 

//upload broucher
uploadBroucher(){                            //multer will accept form data so we here creating a form data
  if(!this.broucherFile){
    return this.nopath();
  
  }
  const BroucherformData = new FormData();
  BroucherformData.append('company_broucher', this.broucherFile);
  
  console.log(this.broucherFile)
  
  this._cr.uploadbroucher(BroucherformData).subscribe((result:any=[])=>{
     console.log(result.body.broucher_url);

    // console.log(result);
    this.broucher_url=result.body.broucher_url;
  
    Swal.fire("Broucher uploaded successfully")
    //this.iseditmode=false;
   
  });
  
  }



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
    this.other_url = result.body.other_url;
  
    Swal.fire("Document uploaded successfully")
    //this.iseditmode=false;
   
  });
  
  }



  nopath(){
  Swal.fire("please select a file","","warning")
  }

 
  //form submission
  onSubmit(){
// patch value
if (!this.CompanyDetailForm) { Swal.fire('Please Fill All Field Correctly','','warning'); }

this.CompanyOtherForm.patchValue({
 Company_Logo:this.logo_url,
  Company_Broucher:this.broucher_url,
  Company_Other_Doc_Url:this.other_url,
  

});

// this.CompanyId=this._cr.generateNextId()
// console.log(this.CompanyId);

this.CompanyDetailForm.patchValue({
 // Created_Date: this.datepipe.transform(this.CompanyContactForm.get("Created_Date")?.value, "yyyy-mm-dd"),
  Modified_Date: this.datepipe.transform(this.CompanyDetailForm.get("Modified_Date")?.value, "yyyy-mm-dd"),
 // Company_Id:this.CompanyId
})

// combining all form data
const CompanyRegistrationForm = {
  ...this.CompanyDetailForm.value,
  ...this.CompanyContactForm.value,
  ...this.CompanyOtherForm.value,
  
};
console.log('Company Registraion Form',CompanyRegistrationForm);

    this._cr.postRegisterData('/register', CompanyRegistrationForm).subscribe(res => {
      this.data = res;
      if (this.data) {
         Swal.fire('Form submitted SuccessFully',"",'success' );
        this.rout.navigate(['/applicants']);
        this.isSubmitting= true;
    }
      else{
        Swal.fire('Form submission Failed','','error');
        this.isSubmitting= true;
       

      }
  
    });




  }
}
