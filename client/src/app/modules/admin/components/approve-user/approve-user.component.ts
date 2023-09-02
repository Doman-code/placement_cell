import { Component,OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CompanyService } from 'src/app/modules/company/company.service';
import { StdregisterService } from 'src/app/modules/structure/services/stdregister.service';
@Component({
  selector: 'app-approve-user',
  templateUrl: './approve-user.component.html',
  styleUrls: ['./approve-user.component.scss']
})
export class ApproveUserComponent implements OnInit {

 
  data: any;

  StudentsData:any=[];
  displayedColumns: string[] = ['UE_ID', 'Name', 'Mobile_No', 'Status','Actions'];

  dataSource!: MatTableDataSource <any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _stdreg:StdregisterService) {
 
  }

  getTableData(){
    
    this._stdreg.getData('/').subscribe(res =>{
      console.log(res);
      this.StudentsData=res;
      this.dataSource = new MatTableDataSource(this.StudentsData);
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
