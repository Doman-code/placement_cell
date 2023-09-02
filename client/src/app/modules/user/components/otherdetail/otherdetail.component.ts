import { Component ,ViewChild} from '@angular/core';
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
  selector: 'app-otherdetail',
  templateUrl: './otherdetail.component.html',
  styleUrls: ['./otherdetail.component.scss']
})
export class OtherdetailComponent {
  data: any;

  userData: any = [];
  skillData:any=[];
  applicants: any;
  application_id: any;
  displayedColumns: string[] = ['Workplace_Detail_Id', 'Organization_Name', 'Post_Name', 'Period_From', 'Period_To', 'Is_Currently_working_YN',];
  displayedColumns2:string[]=['Student_Skill_ID','Registration_No','Skill_Id','Skill_Cetificate_Url'];
  dataSource!: MatTableDataSource<any>;
  skilldataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) skillpaginator!: MatPaginator;
  @ViewChild(MatSort) skillsort!: MatSort;
  

  applicant: any;
  Updatedapplicant: any;
  receivedData: any;
  student_id: any;
  constructor(private _us:UserService, private _cs: CompanyService, private dataSharingService: DataSharingServiceService, private datepipe: DatePipe, private AS:AuthService) {
  }

  getTableData(student_id:any) {

    // this.AS.currentUser.id;
    this._us.getData('experiencedata/'+this.AS.currentUser.id).subscribe(res => {
      console.log(res);
      this.userData = res;
      this.dataSource = new MatTableDataSource(this.userData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

// get skillData
getSkillData() {

  // this.AS.currentUser.id;
  this._us.getData('skilldata/'+this.AS.currentUser.id).subscribe(res => {
    console.log(res);
    this.skillData = res;
    this.skilldataSource = new MatTableDataSource(this.skillData);
    this.skilldataSource.paginator = this.paginator;
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

// filter for skill
  skillFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.skilldataSource.filter = filterValue.trim().toLowerCase();

    if (this.skilldataSource.paginator) {
      this.skilldataSource.paginator.firstPage();
    }
  }


  applySkillFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.skilldataSource.filter = filterValue.trim().toLowerCase();

    if (this.skilldataSource.paginator) {
      this.skilldataSource.paginator.firstPage();
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

    // setTimeout(() => {
    //   const applicant = {

    //     "Vacancy_ID": 1101,
    //     "Student_ID": 211017,
    //     "Application_Submission_Date": "2023-06-01",
    //     "Status": "selected",
    //     "Resume_Path": "",
    //     "Created_By": "",
    //     "Created_Date": "2023-06-08",
    //     "Modified_By": "",
    //     "Modified_Date": this.datepipe.transform((new Date), 'yyyy/mm/dd h:mm:ss'),
    //     "Delete_Flag": "",
    //     "Public_IP_Address": "",
    //     "Private_IP_Address": ""
    //   }

    //   // "Modified_Date": this.datepipe.transform((new Date), 'yyyy/mm/dd h:mm:ss'),


    //   this._cs.UpdateApplicants(`/applicants/${id}`, applicant).subscribe((res: any = []) => {
    //     this.Updatedapplicant = res[0];
    //     console.log(res[0]);

    //   });
    // }, 2000);

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
    this.getSkillData();
    

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
