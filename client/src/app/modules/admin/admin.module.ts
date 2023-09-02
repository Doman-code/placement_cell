import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MaterialModule } from '../material/material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ApproveCompanyComponent } from './components/approve-company/approve-company.component';
import { ApproveVacancyComponent } from './components/approve-vacancy/approve-vacancy.component';
import { ViewCompanyComponent } from './components/view-company/view-company.component';
import { ViewStudentDetailsComponent } from './components/view-student-details/view-student-details.component';
import { ApproveUserComponent } from './components/approve-user/approve-user.component';
import { ViewJobpostsComponent } from './components/view-jobposts/view-jobposts.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { AdForgetpasswordComponent } from './components/ad-forgetpassword/ad-forgetpassword.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ApproveCompanyComponent,
    ApproveVacancyComponent,
    ViewCompanyComponent,
    ViewStudentDetailsComponent,
    ApproveUserComponent,
   
    ViewJobpostsComponent,
        ViewUsersComponent,
        AdForgetpasswordComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
