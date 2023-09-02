import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-view-jobposts',
  templateUrl: './view-jobposts.component.html',
  styleUrls: ['./view-jobposts.component.scss']
})
export class ViewJobpostsComponent {
  displayedColumns: string[] = ['Company_Registration_No', 'Name', 'Company_Email', 'Hr_Contact_No','Status'];
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
    this._as.getData('/vacancydetail').subscribe((result:any)=>{
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
