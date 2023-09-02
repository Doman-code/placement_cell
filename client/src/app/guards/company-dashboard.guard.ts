import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyService } from '../modules/company/company.service';
import { AuthService } from '../modules/user/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyDashboardGuard implements CanActivate {

  isregistered:boolean=false;
  data:any;
  
  constructor(private AS:AuthService, private router: Router,private _cs:CompanyService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.AS.currentUser;
      console.log('role',user);

      if (user && this.IsRegistered()) {
        return true;
      }
      else {
        this.router.navigate(['company/registercompany']);
        return false;
      }

  }
  IsRegistered(): boolean  {
    this._cs.getData2(`/isregistered/${this.AS.currentUser.id}`).subscribe( (res: any = []) => {
    //  console.log(res);
      if(res){
        this.data=res;
      }
      else{
        this.data=null
      }
    });
    if(this.data){
      return true;
    }
    else{
      return false;
    }
  }
  
  
  }
  
  

