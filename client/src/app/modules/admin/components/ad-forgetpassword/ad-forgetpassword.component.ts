import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import { AdminService } from '../../admin.service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-ad-forgetpassword',
  templateUrl: './ad-forgetpassword.component.html',
  styleUrls: ['./ad-forgetpassword.component.scss']
})
export class AdForgetpasswordComponent {

  userData: any; //store token data
  data: any;
  constructor(@Inject(MAT_DIALOG_DATA) public rcdata: any,
  private fB: UntypedFormBuilder,
   private helper: JwtHelperService,
    // private cm:AuthServiceService,
    private _as: AdminService) {
      console.log(rcdata);
      

    // this.userData = localStorage.getItem('token');
    // console.log(this.userData);
    
    // if (!this.helper.isTokenExpired(this.userData)) {
    //   this.userData = this.helper.decodeToken(this.userData)
    // }
    // console.log(this.userData.Registration_No);
    // console.log(this.rcdata.registrationNo);
    
   }

  ngOnInit(): void {
 
  }

  //Change Password
  checkPassword: boolean = false;
  redIcon: boolean = false;
  greenIcon: boolean = false;

  changepass: UntypedFormGroup = this.fB.group({
    password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
    confirmPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
  });

  changePassword() {
    if (this.changepass.valid) {
      var password = CryptoJS.AES.encrypt(this.changepass.get('password')?.value, environment.PASSWORD_SECRET_KEY).toString();
      this.changepass.patchValue({ password: `${password}` });
      console.log(password);
  
      // Remove confirmPassword from the form value before sending to the API
      const formValue = { ...this.changepass.value };
      delete formValue.confirmPassword;
  
      this._as.updatepassword('/updatepassword/' + this.rcdata.data, formValue).subscribe((result:any) => {
        console.log(result);
        this.data = result;
        
        if (this.data) { Swal.fire("Password Changed Successfully","","success");
      
      }
      });
    }
  }
  

  matchPass(n: string, m: string) {
    if (n != m) this.redIcon = true;
    else this.redIcon = false;
    if (n == m) {
      this.greenIcon = true;
      this.checkPassword = true
    } else {
      this.greenIcon = false;
      this.checkPassword = false
 }
}

}
