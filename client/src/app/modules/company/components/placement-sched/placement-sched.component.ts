import { Component, ElementRef, OnInit, ViewChild,Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../company.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-placement-sched',
  templateUrl: './placement-sched.component.html',
  styleUrls: ['./placement-sched.component.scss']
})
export class PlacementSchedComponent implements OnInit{
 
 
    displayedColumns=['Company_ID','Name','Job_Title','Placement_Date','Placement_Venue','Action'];
    dataSource!: MatTableDataSource<any>;
  
     @ViewChild(MatPaginator) paginator!: MatPaginator ;
     @ViewChild(MatSort) MatSort!: MatSort ;
  
     pScheduleForm = this.fb.group({
  
      Company_ID: [null, Validators.required],
    Vacancy_ID:[null, Validators.required],
    Placement_Date: [null, Validators.required],
    Placement_Venue:[null, Validators.required],
     
    });

    projectMapDetail: any;
    MapDetaiDataByid: any;
    data_id: any;
    iseditmode: boolean =false
    company: any;
    vacancy: any;
    data:any;
  allDetail: any;
  
    constructor(private fb:FormBuilder, private ads : CompanyService, private elementRef: ElementRef, private datepipe: DatePipe){}
  
    ngOnInit(): void {
      this.getCompany()
     this.getVacancy()
     this.getTable()
     
    }
  
   // this is scroll function
   scrollToBottom(): void {
    const element = this.elementRef.nativeElement.querySelector('#endOfPage');
    element.scrollIntoView({ behavior: 'smooth', block: 'end' });
  } 
  
  // mat Table filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  // get company
    getCompany(){
      this.ads.getData('placement_schedule/getCompany').subscribe((result)=>{
        console.log(result);  
        this.company=result;
      })
      }
  
  // get vacancy
      getVacancy(){
        this.ads.getData('placement_schedule/getVacancy').subscribe((result)=>{
          console.log(result);  
          this.vacancy=result;
        })
        }

  
  // post Department Detail
  onSubmit(){
    this.pScheduleForm.patchValue //this will help to set the date format (for storing in database)
    ({     
      Placement_Date : this.datepipe.transform(this.pScheduleForm.get("Placement_Date")?.value, "yyyy-MM-dd"), 
     });
    console.log(this.pScheduleForm.value);
    this.ads.postData('placement_schedule/PostSchedule',this.pScheduleForm.value).subscribe(res =>{
      this.data=res;
      if (this.data)
      alert("Data saved succesfully..")
    });
    // this.getTable();
    this.onClear()
    }

    onClear(){
      this.pScheduleForm.reset();
    }
  
    getTable(){
      this.ads.getData('placement_schedule/getTabledata').subscribe((result:any)=>{
        this.allDetail=result;
            this.dataSource = new MatTableDataSource(result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.MatSort;
        console.log(result);  
      })
    }
  
  
  // Delete Department detail
  ondelete(Placement_Schedule_ID: any){
    this.MapDetaiDataByid = this.allDetail.find((f : any) => f.Placement_Schedule_ID === parseInt(Placement_Schedule_ID)); //here we matching and extracting the selected id
    console.log(this.MapDetaiDataByid)
    this.data_id = Placement_Schedule_ID;
    this.ads.Delete_Data('placement_schedule/deletedataByid/'+this.data_id,).subscribe((result)=>{
    console.log(result);
    this.data= result
  
    if(this.data)
    {Swal.fire('Data Deleted...')};
    this.getTable();
   }) 
  }
  
  
  // Get single Data into form for update
  onedit(Placement_Schedule_ID: any){ 
    this.MapDetaiDataByid = this.allDetail.find((f : any) => f.Placement_Schedule_ID === parseInt(Placement_Schedule_ID)); 
    console.log(this.MapDetaiDataByid)
   this.iseditmode=true;
    this.data_id = Placement_Schedule_ID;
    this.pScheduleForm.patchValue
    ({
      Company_ID:this.MapDetaiDataByid.Company_ID,
     Vacancy_ID:this.MapDetaiDataByid.Vacancy_ID,
     Placement_Date:this.MapDetaiDataByid.Placement_Date,
     Placement_Venue:this.MapDetaiDataByid.Placement_Venue
    })
    this.iseditmode=true;
  }

  onupdate(){
    this.pScheduleForm.patchValue //this will help to set the date format (for storing in database)
    ({     
      Placement_Date : this.datepipe.transform(this.pScheduleForm.get("Placement_Date")?.value, "yyyy-MM-dd"), 
     });
     this.ads.putData('placement_schedule/updateResourceAssign/' + this.data_id,this.pScheduleForm.value).subscribe((result)=>{
      console.log(result);
      this.data= result
  
    if(this.data)
    {Swal.fire("data updated successfully")};
    this.getTable();
    this.onClear();
     })
    this.iseditmode = false;
   }
  
  
  
  }
  