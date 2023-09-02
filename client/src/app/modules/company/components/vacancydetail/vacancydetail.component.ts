import { Component, OnInit ,ViewChild} from '@angular/core';
import { CompanyService } from '../../company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataSharingServiceService } from 'src/app/modules/data-sharing-service.service';
import { AuthService } from 'src/app/modules/user/services/auth.service';

@Component({
  selector: 'app-vacancydetail',
  templateUrl: './vacancydetail.component.html',
  styleUrls: ['./vacancydetail.component.scss']
})
export class VacancydetailComponent implements OnInit {
  data: any;

  userData: any = [];
  applicants: any;
  application_id: any;
  displayedColumns: string[] = [ 'Vacancy_Id', 'Job_Title','Last_Date_for_apply', 'Status'];

  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  applicant: any;
  Updatedapplicant: any;

  constructor(private _cs: CompanyService, private _datasharing: DataSharingServiceService,private datepipe:DatePipe,private AS:AuthService) {
  }

  getTableData() {

    this._cs.getData2(`/vacancydetail/${this.AS.currentUser.id}`).subscribe(res => {
      console.log(res);
      this.userData = res;
      this.dataSource = new MatTableDataSource(this.userData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
    this.application_id = id;
    this._datasharing.setApplicationID(this.application_id);

    this._cs.getData(`/applicants/${id}`).subscribe((res: any = []) => {
    this.applicants = res[0];
    console.log(res[0]);

    });
    //console.log('student Id:',id);
  }

  SelectApplicatnts(id: any) {
    console.log(id);
    this._cs.SelectApplicants(`/selectapplicants/${id}`).subscribe((res: any = []) => {
  console.log(res);
  if(res.affectedRows){

    Swal.fire("student selected successfully","plese refresh the page",'success')
   }

      });

    

  }

  RejectApplicants(id: any) {
    console.log(id);
    this._cs.RejectApplicants(`/rejectapplicants/${id}`).subscribe((res: any = []) => {
     console.log(res);
     if(res.affectedRows){

      Swal.fire("student rejected successfully","",'success')
     }

    });
  }


  ngOnInit(): void {
    this.getTableData();
  }


}
