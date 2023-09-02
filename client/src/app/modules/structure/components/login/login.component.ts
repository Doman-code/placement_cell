import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgModule, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.development';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { validateBasis } from '@angular/flex-layout';
import { StdregisterService } from '../../services/stdregister.service';
import { DataSharingServiceService } from 'src/app/modules/data-sharing-service.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { EmailVerificationComponent } from '../email-verification/email-verification.component';
import { FooterComponent } from '../footer/footer.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RegisterComponent } from '../register/register.component';
import { SignupComponent } from '../signup/signup.component';

const routes: Routes = [];
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  registration_no: any;

  constructor(private fb: FormBuilder, private rout: Router, private _sr: StdregisterService, public dataSharingService: DataSharingServiceService, public dialog: Dialog) { }
  loginForm!: FormGroup;
  @ViewChild('captchaContainer', { static: false }) dataContainer!: ElementRef;
  public captchaKey: any = environment.CAPTCHA_SECRET_KEY;
  public passwordKey: any = environment.PASSWORD_SECRET_KEY;
  public txtCaptcha: any = '';
  public generatedCaptcha: any = "";

  ngOnInit(): void {
    this.createForm();
    this.getCaptcha();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }
  getCaptcha() {
    this._sr.getData1('captcha').subscribe((res: any) => {
      //if (res.error === false) {
      this.dataContainer.nativeElement.innerHTML = res.data;
      this.generatedCaptcha = res.text;
      //}
    });
  }


  login() {
   
    if (!this.loginForm.invalid) {

      let txtCaptcha = this.generatedCaptcha;
      console.log("txtCaptcha.....", this.generatedCaptcha);
      console.log("Hello", this.loginForm.value.captcha);

      if (this.loginForm.value.captcha === txtCaptcha) {

        const password = CryptoJS.AES.encrypt(this.loginForm.value.password, this.passwordKey);
        this.loginForm.patchValue({ password: `${password}` });
        console.log("this.loginForm.value", this.loginForm.value);

        this._sr.LoginpostData('/', this.loginForm.value).subscribe((res: any) => {
          console.log("pop", res);
          this.registration_no = res['id'];
          this.dataSharingService.setRegistrationNo(this.registration_no);
          console.log('id (registraion_no) you have send ', this.registration_no);

          if( res.success && res.token) {
            
            

            localStorage.setItem('token', res.token);

            Swal.fire('Login Success', "", "success");
            switch (res['role']) {
              case "1":
                {
                  this.rout.navigate(['/admin']);
                  break;
                }
              case "2": {
                let parameter = res.id;
                this.rout.navigate(['/user']);
                break;
              }
              case "3": {
                this.rout.navigate(['/company']);
                break;
              }
              default:
                {
                  Swal.fire({
                    icon: 'error',
                    text: 'कृपया लॉगिन विवरण जांचें',
                    timer: 5000
                  });
                  break;
                }
            }

          } else{
           Swal.fire('Invalid User Name or Password', "", "error");
          }      
          if(res.error){
            Swal.fire('User Not Found');
          }
        })


      }
      else {
        Swal.fire({
          title: 'Incorrect Captcha',
          text: 'Please enter the correct captcha',
          icon: 'error',
          width: '310px',
        });
      }
    } else {
      console.log(777777777);
    }
  }

 

  openedialog(): void {
    this.dialog.open(EmailVerificationComponent, {
      width: '400px', // Set the desired width of the dialog
      // Add any other configuration options for the dialog
    });
  }


  hide = true;
}




