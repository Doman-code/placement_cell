import { Component,OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/modules/structure/services/user.service';
import { StdregisterService } from 'src/app/modules/structure/services/stdregister.service';
import { DataSharingServiceService } from 'src/app/modules/data-sharing-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-personaldetail',
  templateUrl: './edit-personaldetail.component.html',
  styleUrls: ['./edit-personaldetail.component.scss']
})
export class EditPersonaldetailComponent implements OnInit {
  receivedData: any;
  public isReadOnly: boolean = true;

constructor(private _formBuilder: FormBuilder, private _us :UserService , public datepipe: DatePipe, private _sr:StdregisterService,private dataSharingService: DataSharingServiceService){
  this.receivedData=this.dataSharingService.getEnrollmentNo();
  console.log(this.receivedData);
}


ngOnInit(): void {
    
}

}
