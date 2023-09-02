import { Component, ElementRef, OnInit, ViewChild,Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-joining-detail',
  templateUrl: './joining-detail.component.html',
  styleUrls: ['./joining-detail.component.scss']
})
export class JoiningDetailComponent implements OnInit{
 
 
  displayedColumns=['Placement_Joining_ID','Student_First_Name_E','Placement_Schedule_ID','Accept_Reject_Status','Joining_Date','Offer_Date','Accept_Reject_Date','Name','Job_Title','Reason_for_Rejection','Action'];
  dataSource!: MatTableDataSource<any>;

   @ViewChild(MatPaginator) paginator!: MatPaginator ;
   @ViewChild(MatSort) MatSort!: MatSort ;

   pScheduleForm = this.fb.group({

    Student_ID: [null, Validators.required],
    Placement_Schedule_ID:[null, Validators.required],
    Vacancy_ID: [null, Validators.required],
    Offer_Date:[null, Validators.required],
    Joining_Date:[null, Validators.required],
    Accept_Reject_Status:[null, Validators.required],
    Accept_Reject_Date:[null, Validators.required],
    Reason_for_Rejection:[null, Validators.required],
    Company_ID:[null, Validators.required],



   
  });

  projectMapDetail: any;
  MapDetaiDataByid: any;
  data_id: any;
  iseditmode: boolean =false
  company: any;
  vacancy: any;
  data:any;
allDetail: any;
  student: any;
  schedule: any;

  constructor(private fb:FormBuilder, private cs : CompanyService, private elementRef: ElementRef, private datepipe: DatePipe){}

  ngOnInit(): void {
    this.getCompany()
   this.getVacancy()
   this.getTable()
   this.getStudent()
   this.getSchedule_id()
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
    this.cs.getData('placement_joining_detail/getCompany').subscribe((result)=>{
      console.log(result);  
      this.company=result;
    })
    }

// get vacancy
    getVacancy(){
      this.cs.getData('placement_joining_detail/getVacancy').subscribe((result)=>{
        console.log(result);  
        this.vacancy=result;
      })
      }

      // get vacancy
    getStudent(){
      this.cs.getData('placement_joining_detail/getStudent').subscribe((result)=>{
        console.log(result);  
        this.student=result;
      })
      }

    getSchedule_id(){
        this.cs.getData('placement_joining_detail/getcShedule').subscribe((result)=>{
          console.log(result);  
          this.schedule=result;
      })
      }


// post Department Detail
onSubmit(){
  this.pScheduleForm.patchValue //this will help to set the date format (for storing in database)
  ({     
    Joining_Date : this.datepipe.transform(this.pScheduleForm.get("Joining_Date")?.value, "yyyy-MM-dd"), 
    Offer_Date : this.datepipe.transform(this.pScheduleForm.get("Offer_Date")?.value, "yyyy-MM-dd"), 
    Accept_Reject_Date : this.datepipe.transform(this.pScheduleForm.get("Accept_Reject_Date")?.value, "yyyy-MM-dd"), 
   });
  console.log(this.pScheduleForm.value);
  this.cs.postData('placement_joining_detail/PostData',this.pScheduleForm.value).subscribe(res =>{
    this.data=res;
    if (this.data)
    alert("Data saved succesfully..")
  });
  this.getTable();
  this.onClear()
  }

  onClear(){
    this.pScheduleForm.reset();
  }

  getTable(){
    this.cs.getData('placement_joining_detail/getTabledata').subscribe((result:any)=>{
      this.allDetail=result;
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.MatSort;
      console.log(result);  
    })
   
  }


// Delete Department detail
ondelete(Placement_Joining_ID: any){
  this.MapDetaiDataByid = this.allDetail.find((f : any) => f.Placement_Joining_ID === parseInt(Placement_Joining_ID)); //here we matching and extracting the selected id
  console.log(this.MapDetaiDataByid)
  this.data_id = Placement_Joining_ID;
  this.cs.Delete_Data('placement_joining_detail/deletedataByid/'+this.data_id,).subscribe((result)=>{
  console.log(result);
  this.data= result

  if(this.data)
  {Swal.fire('Data Deleted...')};
  this.getTable();
 }) 
}


// Get single Data into form for update
onedit(Placement_Joining_ID: any){ 
  this.MapDetaiDataByid = this.allDetail.find((f : any) => f.Placement_Joining_ID === parseInt(Placement_Joining_ID)); 
  console.log(this.MapDetaiDataByid)
 this.iseditmode=true;
  this.data_id = Placement_Joining_ID;
  this.pScheduleForm.patchValue
  ({
    Student_ID:this.MapDetaiDataByid.Student_ID,
    Placement_Schedule_ID:this.MapDetaiDataByid.Placement_Schedule_ID,
    Offer_Date:this.MapDetaiDataByid.Offer_Date,
    Joining_Date:this.MapDetaiDataByid.Joining_Date,
    Accept_Reject_Status:this.MapDetaiDataByid.Accept_Reject_Status,
    Accept_Reject_Date:this.MapDetaiDataByid.Accept_Reject_Date,
    Reason_for_Rejection:this.MapDetaiDataByid.Reason_for_Rejection,
    Company_ID:this.MapDetaiDataByid.Company_ID
  })
  this.iseditmode=true;
}


onupdate(){
  this.pScheduleForm.patchValue //this will help to set the date format (for storing in database)
  ({     
    Joining_Date : this.datepipe.transform(this.pScheduleForm.get("Joining_Date")?.value, "yyyy-MM-dd"), 
    Offer_Date : this.datepipe.transform(this.pScheduleForm.get("Offer_Date")?.value, "yyyy-MM-dd"), 
    Accept_Reject_Date : this.datepipe.transform(this.pScheduleForm.get("Accept_Reject_Date")?.value, "yyyy-MM-dd"),   });
   this.cs.putData('placement_joining_detail/updateDetail/' + this.data_id,this.pScheduleForm.value).subscribe((result)=>{
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
