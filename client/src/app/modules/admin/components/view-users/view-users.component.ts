import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../admin.service';
import { MatDialogConfig,MatDialog } from '@angular/material/dialog';
import { AdForgetpasswordComponent } from '../ad-forgetpassword/ad-forgetpassword.component';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent {
  displayedColumns=['User_Name','Email','Registration_No','Action'];
  dataSource!: MatTableDataSource<any>;

  allDetail:any;
   @ViewChild(MatPaginator) paginator!: MatPaginator ;
   @ViewChild(MatSort) MatSort!: MatSort ;

  constructor(private _as:AdminService,public dialog:MatDialog){

  }
  ngOnInit(): void {
     this.getTable(); 
  }

  getTable(){
    this._as.getData('/registerdusers').subscribe((result:any)=>{
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
openForgetPassword(Registration_No:any):void{
  console.log(Registration_No);
const dialogConfig = new MatDialogConfig();
dialogConfig.data = { data: Registration_No };
 
const dialogRef= this.dialog.open(AdForgetpasswordComponent,dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
});
}

}
