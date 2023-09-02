import { Component,Input,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/modules/structure/services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/user/services/auth.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent  implements OnInit{
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

  constructor(private breakpointObserver: BreakpointObserver, private _us:UserService,private AS:AuthService) {
    
  }
ngOnInit(): void {

}

//src1="../assets/images/emp1.jpg"
src2="http://localhost:5000/images/photo1684777630346.JPG"
src3="http://localhost:5000/images/photo1684779867460.JPG"
src4="http://localhost:5000/images/photo1684778109614.JPG"

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
