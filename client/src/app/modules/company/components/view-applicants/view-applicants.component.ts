import { Component } from '@angular/core';
import { DataSharingServiceService } from 'src/app/modules/data-sharing-service.service';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.scss']
})
export class ViewApplicantsComponent {

  constructor(private _dataSharign:DataSharingServiceService){}
  
  
}
