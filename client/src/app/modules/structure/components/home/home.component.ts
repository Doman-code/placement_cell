import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { Dialog ,DialogRef} from '@angular/cdk/dialog';
import { VacancyDetailComponent } from '../vacancy-detail/vacancy-detail.component';
import { DataSharingServiceService } from 'src/app/modules/data-sharing-service.service';
Dialog
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  placement="Placement";
  notification_detail:any;
  vacancy_id:any;

  job:boolean=true;
  round:boolean=false;

  jobactive(){
this.job=true;
this.round=false;
  }

roundactive(){
  this.round=true;
  this.job=false;

}  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches),
  //     shareReplay()
  //   );
    //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private breakpointObserver: BreakpointObserver,private _user:UserService, private dialog:Dialog,private dataSharingService: DataSharingServiceService) {
    this._user.getData('/notificationdetail').subscribe((data: any) => {
      console.log(data);
      this.notification_detail = data;
      console.log(' Multiple notification', this.notification_detail)
    })
  }
 
  //  setdata 
 sendData() {
  const vacancyId = (this.vacancy_id);
  this.dataSharingService.setVacancyId(vacancyId);
}
 
  opendialog(event:any){
    this.vacancy_id=event;
    console.log(event);
    this.sendData();
    this.dialog.open(VacancyDetailComponent,{
      // width:'100vw',   // Set width to 60 percent of view port width
      // height:'100vh',  // Set height to 55 percent of view port height
      panelClass: 'custom-dialog'
    });
  }

  //login logic
//card content

  
}
