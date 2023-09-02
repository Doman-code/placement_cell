import { Component, ElementRef, OnInit, ViewChild,Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.scss']
})


export class ViewCompanyComponent implements OnInit {

  displayedColumns=['Tnp_Registration_No','Name','Company_Email','Hr_Name','Hr_Contact_No','Contact_Person','Contact_Person_Phone'];
  dataSource!: MatTableDataSource<any>;

  allDetail:any;
   @ViewChild(MatPaginator) paginator!: MatPaginator ;
   @ViewChild(MatSort) MatSort!: MatSort ;

  constructor(private _as:AdminService){

  }
  ngOnInit(): void {
     this.getTable(); 
  }

  getTable(){
    this._as.getData('/registerdcompany').subscribe((result:any)=>{
      this.allDetail=result;
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.MatSort;
      console.log(result);  
    })
   
  }

  // mat Table filter
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
