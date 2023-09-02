import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UDashboardComponent } from './components/u-dashboard/u-dashboard.component';
import { AppliedjobComponent } from './components/appliedjob/appliedjob.component';
import { AddprofileComponent } from './components/addprofile/addprofile.component';
import { ViewprofileComponent } from './components/viewprofile/viewprofile.component';
import { JobnotificationComponent } from './components/jobnotification/jobnotification.component';
import { PersonaldetailComponent } from './components/personaldetail/personaldetail.component';
import { OtherdetailComponent } from './components/otherdetail/otherdetail.component';
import { EditAcademicDetailComponent } from './components/edit-academic-detail/edit-academic-detail.component';
import { AddAcademicComponent } from './components/add-academic/add-academic.component';
import { AddSkillComponent } from './components/add-skill/add-skill.component';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { StdRegisterComponent } from './components/std-register/std-register.component';
import { StudentGuard } from 'src/app/guards/student.guard';

import{UserDashboardGuard}from 'src/app/guards/user-dashboard.guard';

import { StdCompleteRegistrationComponent } from './components/std-complete-registration/std-complete-registration.component';
const routes: Routes = [
 
//  { path: '', component: UDashboardComponent, children: [
//     { path: 'addprofile', component: AddprofileComponent },
//     { path: 'appliedjob', component: AppliedjobComponent },
//     { path: 'viewprofile', component: ViewprofileComponent },
//     { path: 'jobnotification', component: JobnotificationComponent },
//     { path: '',redirectTo:'user/jobnotification',pathMatch:'full' },
    
//   ]}
{
  path: '', component: UDashboardComponent,
  children: [
    { path: '', component: JobnotificationComponent },
   // { path: 'studentregistration', component: StdRegisterComponent },
    { path: 'completeregistration', component: StdCompleteRegistrationComponent },

    { path: 'viewprofile/personal', component: PersonaldetailComponent,'canActivate':[UserDashboardGuard]  },
    
    {path: 'viewprofile/academic', component: ViewprofileComponent,'canActivate':[UserDashboardGuard]},
    {path: 'viewprofile/other', component:  OtherdetailComponent ,'canActivate':[UserDashboardGuard]},
    { path: 'addprofile', component: AddprofileComponent,'canActivate':[UserDashboardGuard]},

    { path: 'addprofile/academics', component: AddAcademicComponent,'canActivate':[UserDashboardGuard]},
    { path: 'addprofile/skills', component: AddSkillComponent,'canActivate':[UserDashboardGuard]},
    { path: 'addprofile/experience', component: AddExperienceComponent,'canActivate':[UserDashboardGuard] },

    { path: 'appliedjob', component: AppliedjobComponent ,'canActivate':[UserDashboardGuard]},
    { path: 'jobnotification', component: JobnotificationComponent ,'canActivate':[UserDashboardGuard]},
    { path: 'logout', redirectTo:'/home' },
    { path: 'edit', component: EditAcademicDetailComponent,'canActivate':[UserDashboardGuard]},

  ]
},

{ path: '**', redirectTo: 'user' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
export const routingComponents=[
  AppliedjobComponent,
  AppliedjobComponent ,
  ViewprofileComponent,
  JobnotificationComponent
]
