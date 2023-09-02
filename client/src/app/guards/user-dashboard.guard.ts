import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/user/services/auth.service';
import { UserService } from '../modules/structure/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardGuard implements CanActivate {
 
  isregistered:boolean=false;
  data:any;

  constructor(private AS:AuthService, private router: Router,private _us:UserService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      const user = this.AS.currentUser;
    //  console.log('role',user);
      
      if (user && this.IsRegistered()) {
        return true;
      }
      else {
        this.router.navigate(['user/completeregistration']);
        return false;
      }

  }
  IsRegistered(): boolean {
    this._us.getData(`/personaldetail/${this.AS.currentUser.id}`).subscribe((res: any = []) => {
    
      if(res){
        this.data=res;
      }
      else{
        this.data=null;
      }
 
    });
      
    if(this.data){
      return true ;
    }
    else{
      return false;
    }
  }
  

}
