import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ViewCompanyComponent } from './components/view-company/view-company.component';
import { ApproveCompanyComponent } from './components/approve-company/approve-company.component';
import { ApproveVacancyComponent } from './components/approve-vacancy/approve-vacancy.component';
import { ViewStudentDetailsComponent } from './components/view-student-details/view-student-details.component';
import { ViewJobpostsComponent } from './components/view-jobposts/view-jobposts.component';
import { ApproveUserComponent } from './components/approve-user/approve-user.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';

const routes: Routes = [
{path:'',component:AdminDashboardComponent,
children: [
  { path: 'home', component:ViewCompanyComponent },
  { path: 'approveuser', component:ApproveUserComponent },
  { path: 'approvecompany', component:ApproveCompanyComponent },
  { path: 'approvevacancy', component:ApproveVacancyComponent },
  { path: 'viewcompany', component:ViewCompanyComponent },
  { path: 'viewstudent', component:ViewStudentDetailsComponent },
  { path: 'viewjobposts', component:ViewJobpostsComponent },
  { path: 'viewusers', component:ViewUsersComponent },

  //{ path: 'jobnotification', component: JobnotificationComponent },
  { path: 'logout', redirectTo:'/home' },
]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
