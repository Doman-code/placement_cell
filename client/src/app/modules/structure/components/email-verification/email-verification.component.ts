import { Component, OnInit } from '@angular/core';
import {FormControl, Validators ,FormGroup,FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  // emailverifyForm!: FormGroup;
constructor(private fb: FormBuilder){

}
ngOnInit(): void {

 
  
}
emailverificationForm = this.fb.group({
  email: ['', Validators.required],
  password: ['', Validators.required],
  
});


 

//send otp button
sendotp(){
  
}
verifyemail(){

}



}
