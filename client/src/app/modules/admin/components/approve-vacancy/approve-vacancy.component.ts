import { Component,OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CompanyService } from 'src/app/modules/company/company.service';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-approve-vacancy',
  templateUrl: './approve-vacancy.component.html',
  styleUrls: ['./approve-vacancy.component.scss'],
  providers: [DatePipe]

})
export class ApproveVacancyComponent implements OnInit {
  data: any;

  userData:any=[];
  displayedColumns: string[] = ['Company_Registration_No', 'Name', 'Company_Email', 'Status','Actions'];

  dataSource!: MatTableDataSource <any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _cs:CompanyService,private _admin:AdminService) {
 
  }

  getTableData(){
    
    // this._cs.getData('/applicants').subscribe(res =>{
    this._admin.getData('/vacancydetail').subscribe(res =>{

    console.log(res);
      this.userData=res;
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


  ApproveVacancy(id: any) {
    console.log(id);
    this._admin.ApproveVacancy(`/approvevacancy/${id}`).subscribe((res: any = []) => {
  console.log(res);
  this.getTableData();
  if(res){
    Swal.fire("Vacancy approved successfully","plese refresh the page",'success')
    this.getTableData();
   }

      });

    

  }

  RejectVacancy(id: any) {
    console.log(id);
    this._admin.ApproveVacancy(`/rejectvacancy/${id}`).subscribe((res: any = []) => {
  console.log(res);
  this.getTableData();
  if(res.affectedRows){
    Swal.fire("Vacancy Rejected successfully","plese refresh the page",'success')
    this.getTableData();
   }

      });

    

  }
 
 
  ngOnInit(): void {
      this.getTableData();
  }

}
