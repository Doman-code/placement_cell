import { Component, Input ,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import Swal from 'sweetalert2';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-c-dashboard',
  templateUrl: './c-dashboard.component.html',
  styleUrls: ['./c-dashboard.component.scss']
})

export class CDashboardComponent implements OnInit {
  @Input()
  src?: string;
  username:any;
  company_logo_url:any;
  src1:any;
  @Input()
  size = 128;
  company_name="Flora Agriculture";
  isregistered:boolean=false;

  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private AS:AuthService,private _cs:CompanyService) {}


  ngOnInit(): void {
  let doman= this.AS.currentUser.id
  this.username=this.AS.currentUser.username;
  console.log(doman);

  

  this._cs.getData2(`/photo/images/${this.AS.currentUser.id}`).subscribe((res: any = []) => {
    console.log(res[0].company_logo_Path);
   this.company_logo_url=res[0].company_logo_Path;
   this.src1=this.company_logo_url;
  });
  
  this._cs.getData2(`/isregistered/${this.AS.currentUser.id}`).subscribe((res: any = []) => {
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
