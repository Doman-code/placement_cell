import { Component,Input ,OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, retry, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/modules/structure/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { DataSharingServiceService } from 'src/app/modules/data-sharing-service.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-u-dashboard',
  templateUrl: './u-dashboard.component.html',
  styleUrls: ['./u-dashboard.component.scss']
})
export class UDashboardComponent implements OnInit {
  receivedData: any;
username:any;
email:any;
photo_url:any;
isregistered:boolean=false;
  @Input()
  src?: string;
  
  @Input()
  size = 128;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  notification_detail: any;
 
  constructor(private breakpointObserver: BreakpointObserver, private _us:UserService,private route: ActivatedRoute,private dataSharingService: DataSharingServiceService,private AS:AuthService ) {
    
  }
ngOnInit(): void {
  this.receivedData = this.dataSharingService.getRegistrationNo();
  console.log(this.receivedData);

let doman= this.AS.currentUser.id
console.log(doman);

this.username =this.AS.currentUser.username
this.email=this.AS.currentUser.email;
console.log(this.username);
console.log(this.email);



  this._us.getData(`photo/images/${this.AS.currentUser.id}`).subscribe((res: any = []) => {
    console.log(res[0].Student_Photo_Path);
   this.photo_url=res[0].Student_Photo_Path

  });
  
  this._us.getData(`/personaldetail/${this.AS.currentUser.id}`).subscribe((res: any = []) => {
    console.log(res);
    if(res){
      this.isregistered= true;
    }
    else{
      this.isregistered=false;
    }

  });


}


 

onlogout() {
  Swal.fire({
    title: 'Logout Confirmation',
    text: 'Are you sure you want to logout?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Logout',
  }).then((result) => {
    if (result.isConfirmed) {
      this.AS.logout();
    }
  });
}

logout(){ 

 this.onlogout();

}



}
