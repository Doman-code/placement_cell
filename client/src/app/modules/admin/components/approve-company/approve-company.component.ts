import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {  ElementRef, OnDestroy, OnInit, } from '@angular/core';
import { DatePipe } from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CompanyService } from 'src/app/modules/company/company.service';
@Component({
  selector: 'app-approve-company',
  templateUrl: './approve-company.component.html',
  styleUrls: ['./approve-company.component.scss'],
  providers: [DatePipe]

})
export class ApproveCompanyComponent implements OnInit {
  data: any;

  userData:any=[];
  displayedColumns: string[] = ['Company_Registration_No', 'Name', 'Company_Email', 'Hr_Contact_No','Status','Actions'];

  dataSource!: MatTableDataSource <any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _cs:CompanyService) {
 
  }

  getTableData(){
    
    this._cs.getData('/applicants').subscribe(res =>{
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

 
  ngOnInit(): void {
      this.getTableData();
  }

}
