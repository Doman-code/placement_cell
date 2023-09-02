import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';
import { SignupService } from '../../services/signup.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.development';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements  OnInit {

  signupForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    User_Name: new FormControl('', [Validators.required]),
    // Password: new FormControl('', [Validators.required]),
    Password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
    ])),
    passwordConfirm: new FormControl('', Validators.required),
    Role: new FormControl(null, [Validators.required])
  },
    // add custom Validators to the form, to make sure that password and passwordConfirm are equal
    { validators: CustomValidators.passwordsMatching }
  )
  data: any;


  constructor( private _signup: SignupService) { 
    
  }
  

  public passwordKey: any = environment.PASSWORD_SECRET_KEY;

  ngOnInit(): void {

  }

  onClear(){
    this.signupForm.reset();
    this.signupForm.clearValidators(),
    this.signupForm.updateValueAndValidity()  
  }

  register() {

    if (this.signupForm.value.Password !== null && this.signupForm.value.Password !== undefined && this.signupForm.value.passwordConfirm !== null && this.signupForm.value.passwordConfirm !== undefined) {
      // Call the function with the valid password value
      const password = CryptoJS.AES.encrypt(this.signupForm.value.Password, this.passwordKey);
     
      this.signupForm.patchValue({ Password: `${password}` });

      const cpassword = CryptoJS.AES.encrypt(this.signupForm.value.passwordConfirm, this.passwordKey);
      this.signupForm.patchValue({ passwordConfirm: `${cpassword}` });

      console.log("this  is encrypted password ",password);
    } 

    const signupdata=this.signupForm.value;
    delete signupdata.passwordConfirm;
   
    console.log(signupdata);
 
    this._signup.postRegisterData('signup',signupdata).subscribe(res => {
      this.data = res;
      if (this.data) {
         Swal.fire('Signed up SuccessFully');
         this.onClear();
     }
      else{
        Swal.fire('Form submission Failed','','error');
      }
  
    });



  }
}
