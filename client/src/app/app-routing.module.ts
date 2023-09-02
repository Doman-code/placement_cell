import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UDashboardComponent } from './modules/user/components/u-dashboard/u-dashboard.component';
import { AddprofileComponent } from './modules/user/components/addprofile/addprofile.component';
import { AppliedjobComponent } from './modules/user/components/appliedjob/appliedjob.component';
import { JobnotificationComponent } from './modules/user/components/jobnotification/jobnotification.component';
import { ViewprofileComponent } from './modules/user/components/viewprofile/viewprofile.component';
import { RegisterComponent } from './modules/structure/components/register/register.component';
import { CRegistraionComponent } from './modules/company/components/c-registraion/c-registraion.component';
import { DemoComponent } from './demo/demo.component';
import { StudentGuard } from './guards/student.guard';
import { CompanyGuard } from './guards/company.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './modules/structure/components/login/login.component';
const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/structure/structure.module').then((m) => m.StructureModule) },


// guard for routing
// 'canActivate':[StudentGuard]
// 'canActivate':[CompanyGuard]
// 'canActivate':[AdminGuard]


  { path: 'user', loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),'canActivate':[StudentGuard] },
  { path: 'company', loadChildren: () => import('./modules/company/company.module').then((m) => m.CompanyModule),'canActivate':[CompanyGuard] },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),'canActivate':[AdminGuard] },
  { path: 'register', component:RegisterComponent },
  { path: 'demo', component:DemoComponent },

  {path:'c-register',component:CRegistraionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
