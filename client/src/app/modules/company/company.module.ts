import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CDashboardComponent } from './components/c-dashboard/c-dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PostjobsComponent } from './components/postjobs/postjobs.component';
import { VacancydetailComponent } from './components/vacancydetail/vacancydetail.component';
import { ApplicantsComponent } from './components/applicants/applicants.component';
import { MaterialModule } from '../material/material.module';
import { CRegistraionComponent } from './components/c-registraion/c-registraion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { ViewApplicantsComponent } from './components/view-applicants/view-applicants.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { JoiningDetailComponent } from './components/joining-detail/joining-detail.component';
import { PlacementSchedComponent } from './components/placement-sched/placement-sched.component';


@NgModule({
  declarations: [
    CDashboardComponent,
    PostjobsComponent,
    VacancydetailComponent,
    ApplicantsComponent,
    CRegistraionComponent,
    ViewApplicantsComponent,
    JoiningDetailComponent,
    PlacementSchedComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
   MaterialModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule, 
    MatPaginatorModule,
    MatTooltipModule,
  
  ],
  exports:[
    CDashboardComponent,
    VacancydetailComponent,
    PostjobsComponent,
    ApplicantsComponent
  ]
})
export class CompanyModule { 
  
}
