import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StdregisterService } from 'src/app/modules/structure/services/stdregister.service';
import { UserService } from 'src/app/modules/structure/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditAcademicDetailComponent } from '../edit-academic-detail/edit-academic-detail.component';
import { Router } from '@angular/router';
import { DataSharingServiceService } from 'src/app/modules/data-sharing-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { CompanyService } from 'src/app/modules/company/company.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss']
})
export class ViewprofileComponent {
  data: any;

  userData: any = [];
  applicants: any;
  application_id: any;
  displayedColumns: string[] = ['S.NO.','Classes', 'Program', 'Institute', 'Subject', 'Passing_Out', 'Marks',];

  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) MatSort!: MatSort;
  applicant: any;
  Updatedapplicant: any;
  receivedData: any;
  student_id: any;
  constructor(private _us:UserService, private _cs: CompanyService, private dataSharingService: DataSharingServiceService, private datepipe: DatePipe, private AS:AuthService) {
  }

  getTableData(student_id:any) {

    // this.AS.currentUser.id;
    this._us.getData('academicDetails/'+this.AS.currentUser.id).subscribe(res => {
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
    this.application_id = id;
    this.dataSharingService.setApplicationID(this.application_id);

    this._cs.getData(`/applicants/${id}`).subscribe((res: any = []) => {
      this.applicants = res[0];
      console.log(res[0]);

    });
    //console.log('student Id:',id);
  }

  SelectStudent(id: any) {
    this._cs.getData(`/applicants/${id}`).subscribe((res: any = []) => {
      this.applicant = res[0];
      console.log(res[0]);
      console.log(this.applicant.Application_ID);
      console.log(id);

    });

    setTimeout(() => {
      const applicant = {

        "Vacancy_ID": 1101,
        "Student_ID": 211017,
        "Application_Submission_Date": "2023-06-01",
        "Status": "selected",
        "Resume_Path": "",
        "Created_By": "",
        "Created_Date": "2023-06-08",
        "Modified_By": "",
        "Modified_Date": this.datepipe.transform((new Date), 'yyyy/mm/dd h:mm:ss'),
        "Delete_Flag": "",
        "Public_IP_Address": "",
        "Private_IP_Address": ""
      }

      // "Modified_Date": this.datepipe.transform((new Date), 'yyyy/mm/dd h:mm:ss'),


      this._cs.UpdateApplicants(`/applicants/${id}`, applicant).subscribe((res: any = []) => {
        this.Updatedapplicant = res[0];
        console.log(res[0]);

      });
    }, 2000);

  }

  RejectStudent(id: any) {
    this._cs.UpdateApplicants(`/applicants/${id}`).subscribe((res: any = []) => {
      this.applicants = res[0];
      console.log(res[0]);

    });
  }


  ngOnInit(): void {
    this.receivedData = this.dataSharingService.getData();
    this.student_id = this.receivedData;
    this.getTableData(this.student_id);

  }
  //   ngOnInit(): void {
  // this.receivedData=this.dataSharingService.getData();
  // console.log(this.receivedData);
  // this._user.getData(`academicdetail/${this.receivedData}`).subscribe((data:any)=>{
  //     this._user.getData('academicdetail/17').subscribe((data:any)=>{

  //     this.academic_detail=data[0];
  //     console.log(this.academic_detail);
  //     this.doc_url=this.academic_detail.Attach_Doc;
  //     this.student_id=this.academic_detail.Academic_Detail_Id;
  //     console.log('studentId',this.student_id);
  //           })
  // }


}
