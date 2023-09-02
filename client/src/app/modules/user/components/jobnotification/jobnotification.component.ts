import { Component ,OnInit} from '@angular/core';
import { UserService } from 'src/app/modules/structure/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationComponent } from '../application/application.component';
import { DataSharingServiceService } from 'src/app/modules/data-sharing-service.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-jobnotification',
  templateUrl: './jobnotification.component.html',
  styleUrls: ['./jobnotification.component.scss']
})
export class JobnotificationComponent  implements OnInit {
  notification_detail: any;
  vacancy_id:any;
  isApplied:boolean=false;
  notification_url:any;

  table1Data: any = [];
  table2Data: any = [];
  table3Data:any=[];
  table4Data:any=[];
  applicableVacancyDetails:any=[];
  constructor(private _user: UserService ,private dialog:MatDialog, private dataSharingService:DataSharingServiceService,private AS:AuthService) {

    // this._user.getData('/applicationdetail').subscribe((data: any) => {
    //   console.log(data);
    //   this.table2Data = data;
    //   console.log(' table data 2', this.table2Data)
    // })
    
    this._user.getData(`/notificationdetailforuser/${this.AS.currentUser.id}`).subscribe((data: any) => {
      console.log(data);
      this.notification_detail = data;
      console.log(' Multiple notification', this.notification_detail)
    })
  }


  ngOnInit(): void {
    this.table1Data = this.fetchTable1DataFromDatabase();
    this.table2Data = this.fetchTable2DataFromDatabase();
    this.table3Data = this.fetchTable3DataFromDatabase();
    this.table4Data = this.fetchTable4DataFromDatabase();
    
  }

// table 1 Data
   private fetchTable1DataFromDatabase(){
    this._user.getData(`/notificationdetailforuser/${this.AS.currentUser.id}`).subscribe((data: any) => {
      console.log(data);
      this.table1Data = data;
      console.log('table data 1 ', this.table1Data)
    })
  }

  // table2 data
  private fetchTable2DataFromDatabase(){
    this._user.getData('/applicationdetail').subscribe((data: any) => {
      console.log(data);
      this.table2Data = data;
      console.log(' table data 2', this.table2Data)
    })
  }

// table3 data 
private fetchTable3DataFromDatabase(){
  this._user.getData('/vacancyacademic').subscribe((data: any) => {
    console.log(data);
    this.table3Data = data;
    console.log(' table data 3', this.table3Data)    
  })
}

// table4 data
private fetchTable4DataFromDatabase(){
  this._user.getData(`/useracademic/${this.AS.currentUser.id}`).subscribe((data: any) => {
    console.log(data);
    this.table4Data = data;
    console.log(' table data 4', this.table4Data)
  })
}



// compare the data from table 1 to table 2

  isDataInTable2ExistInTable1(vacancy_id:any): boolean {
    // Check if any item in table2Data exists in table1Data based on the 'id' property
    return this.table1Data.some((itemFromTable1:any) =>
      this.table2Data.some((itemFromTable2:any) => vacancy_id === itemFromTable2.Vacancy_ID  && this.AS.currentUser.id === itemFromTable2.Student_ID)
    );
  }
  
// compare the data from table 3 to table 4

isDataInTable4ExistInTable3(vacancy_id:any): boolean {
  // Check if any item in table2Data exists in table1Data based on the 'id' property
  return this.table3Data.some((itemFromTable3:any) =>
    this.table4Data.some((itemFromTable4:any) =>itemFromTable4.Degree_Programme_Type_Id && this.AS.currentUser.id === itemFromTable3.Student_ID )
  );
}



  sendData() {
    const notification_id = (this.vacancy_id);
    this.dataSharingService.setNotificationId(notification_id);
  }

 //for docuement url
//  pdfUrl(receivedData:any){
//   this._user.getData(`notification_docuement/${receivedData}`).subscribe((data: any) => {
//     console.log("docuement url for download: " ,data);
//     this.notification_url = data[0].Document_Path;
//   })
//   window.open(this.notification_url, '_blank');
//  }
 

  opendialog(id:any){
    this.vacancy_id=id;
    console.log(id);
    this.sendData();
    this.dialog.open(ApplicationComponent,{
      width:'70vw',   // Set width to 60 percent of view port width
      height:'80vh',  // Set height to 55 percent of view port height
    });
  }
}
