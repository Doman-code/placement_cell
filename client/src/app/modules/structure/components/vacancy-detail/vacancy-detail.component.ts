import { Component,OnInit } from '@angular/core';
import { CompanyService } from 'src/app/modules/company/company.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { DataSharingServiceService } from 'src/app/modules/data-sharing-service.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.scss']
})
export class VacancyDetailComponent implements OnInit {

  vacancy_detail: any;
  notification_url:any;
  receivedData: any;
  document_path:any;

  

  constructor(private _company: CompanyService,private _diaglogRef:DialogRef<VacancyDetailComponent>,private _shared:DataSharingServiceService,private _user:UserService) {
    this.receivedData = this._shared.getVacancyId();
console.log( 'receivedData is:', this.receivedData);

  }
 
  close(){
    this._diaglogRef.close()
  }

  ngOnInit(): void {

    this._user.getData(`notificationdetail/${this.receivedData}`).subscribe((data: any) => {
      this.vacancy_detail = data[0];
      console.log(this.vacancy_detail);
      //this.document_path=this.vacancy_detail.Document_Path;
      // console.log('this is document path: ',this.document_path);

    })

    //for docuement url
    this._user.getData(`notification_docuement/${this.receivedData}`).subscribe((data: any) => {
      console.log("docuement url for download: " ,data);
      this.notification_url = data[0].Document_Path;
      this.document_path=this.notification_url;
      // console.log('this is document path: ',this.document_path);

    })
  }
}
