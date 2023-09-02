import { Component ,OnInit} from '@angular/core';
import { UserService } from 'src/app/modules/structure/services/user.service';
import { EditPersonaldetailComponent } from '../edit-personaldetail/edit-personaldetail.component';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingServiceService } from 'src/app/modules/data-sharing-service.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-personaldetail',
  templateUrl: './personaldetail.component.html',
  styleUrls: ['./personaldetail.component.scss']
})
export class PersonaldetailComponent implements OnInit{
  personal_detail:any;
  student_photo_url:any;
  student_signature_url:any;
  id:any=1;
  resume_url:any;
  academic_detail: any;
  doc_url: any;
  photo_path:any;
  signature_path:any;
  resume_path:any;
  resume:any;
  constructor(private _user:UserService, private dialog : MatDialog,private dataSharingService: DataSharingServiceService ,private AS:AuthService){
    this._user.getData('personaldetail/'+this.AS.currentUser.id).subscribe((data:any)=>{
this.personal_detail=data[0];

this.student_photo_url=this.personal_detail.Student_Photo;
this.student_signature_url=this.personal_detail.Student_Signature;
console.log(this.personal_detail);
console.log(this.student_photo_url);
this.resume_url=this.personal_detail.Resume_Path;
console.log(this.resume_url);
      })

  }

  ngOnInit(): void {
    this._user.getData(`photo/images/${this.AS.currentUser.id}`).subscribe((res: any = []) => {
console.log(res[0]);
      console.log(res[0].Student_Photo_Path);
     this.photo_path=res[0].Student_Photo_Path;
     this.signature_path=res[0].Student_Signature_Path ;
     this.resume=res[0].Student_Resume_Path; 

  
    });
  }
  openDialog(){
    const data = this.personal_detail.UE_ID;
    this.dataSharingService.SetEnrollmentNo(data);
     this.dialog.open(EditPersonaldetailComponent,{
        width:'70vw',   // Set width to 60 percent of view port width
        height:'80vh',  // Set height to 55 percent of view port height
      });
   //this.router.navigate(['user/editacademic']); // Replace 'about' with the desired route path
 
 
   }

}


