import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ElementRef, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from '../../company.service';
import { DataSharingServiceService } from 'src/app/modules/data-sharing-service.service';
import { AuthService } from 'src/app/modules/user/services/auth.service';
@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss'],
  providers: [DatePipe]
})
export class ApplicantsComponent implements OnInit {
  data: any;

  userData: any = [];
  applicants: any;
  application_id: any;
  displayedColumns: string[] = ['Student_Application_Id', 'Vacancy_Id', 'Student_Id', 'Application_Submission_Date', 'Status', 'Actions'];

  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) MatSort!: MatSort;
  
  applicant: any;
  Updatedapplicant: any;

  constructor(private _cs: CompanyService, private _datasharing: DataSharingServiceService,private datepipe:DatePipe,private AS:AuthService) {
  }

  getTableData() {

    this._cs.getData2(`/applicants/${this.AS.currentUser.id}`).subscribe(res => {
      console.log(res);
      this.userData = res;
      this.dataSource = new MatTableDataSource(this.userData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.MatSort;
    });
  }

  // filter code

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // on delete code 


  //view students code 

  ViewStudent(id: any) {

    console.log("USER ID is: ",id);
    this.application_id = id;
    this._datasharing.setApplicationID(this.application_id);

    this._cs.getData2(`/applicantsresume/${id}`).subscribe((res: any = []) => {
    this.applicants = res[0].resume_path;
    console.log(res[0].resume_path);
    window.open(this.applicants, '_blank');

    });
    //console.log('student Id:',id);
  }

  SelectApplicatnts(id: any) {
    console.log(id);
    this._cs.SelectApplicants(`/selectapplicants/${id}`).subscribe((res: any = []) => {
  console.log(res);
  if(res.affectedRows){

    Swal.fire("student selected successfully","",'success');
    this.getTableData();
   }

      });

    

  }

  RejectApplicants(id: any) {
    console.log(id);
    this._cs.RejectApplicants(`/rejectapplicants/${id}`).subscribe((res: any = []) => {
     console.log(res);
     if(res.affectedRows){

      Swal.fire("student rejected successfully","",'error');
      this.getTableData();
     }

    });
  }


  ngOnInit(): void {
    this.getTableData();
  }

}


