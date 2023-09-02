import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CDashboardComponent } from './components/c-dashboard/c-dashboard.component';
import { PostjobsComponent } from './components/postjobs/postjobs.component';
import { VacancydetailComponent } from './components/vacancydetail/vacancydetail.component';
import { ApplicantsComponent } from './components/applicants/applicants.component';
import { CRegistraionComponent } from './components/c-registraion/c-registraion.component';
import { JoiningDetailComponent } from './components/joining-detail/joining-detail.component';
import { PlacementSchedComponent } from './components/placement-sched/placement-sched.component';

import{CompanyDashboardGuard} from 'src/app/guards/company-dashboard.guard';
const routes: Routes = [
  {
    path: '', component: CDashboardComponent,
    children: [
      { path: '', component: ApplicantsComponent},
      {path:'registercompany', component: CRegistraionComponent },
      { path: 'postjobs', component: PostjobsComponent,'canActivate':[CompanyDashboardGuard]  },
      { path: 'vacancydetail', component: VacancydetailComponent ,'canActivate':[CompanyDashboardGuard]},
      { path: 'applicants', component: ApplicantsComponent,'canActivate':[CompanyDashboardGuard]},
      { path: 'joining-detail', component: JoiningDetailComponent ,'canActivate':[CompanyDashboardGuard]},
      { path: 'placement-schedule', component: PlacementSchedComponent ,'canActivate':[CompanyDashboardGuard]},
      

      { path: 'logout', redirectTo:'/home' },
    ]
  },
 // { path: '**', redirectTo: 'company' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
