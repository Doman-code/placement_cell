import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.development';
import { StdregipreviewService } from '../../services/stdregipreview.service';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.scss']
})
export class UserPreviewComponent implements OnInit{

  recieveddata:any;
  profilePic:any;
  profileSign:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data : any ,private _sr:StdregipreviewService,private location: Location){}


  ngOnInit(): void {
    this.recieveddata=this._sr.getRegistrationValue();
   console.log(this.recieveddata);
 
   console.log(this.recieveddata.Student_Photo);
   console.log(this.recieveddata.Student_Signature);
 
   this.profilePic = environment.userUrl + this.recieveddata.Student_Photo;
   this.profileSign = environment.userUrl + this.recieveddata.Student_Signature;
   
   
 
   
 
 
   
 }
}
