import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
//import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserModule } from '../user/user.module';
import { AddprofileComponent } from '../user/components/addprofile/addprofile.component';
import { AppliedjobComponent } from '../user/components/appliedjob/appliedjob.component';
import { JobnotificationComponent } from '../user/components/jobnotification/jobnotification.component';
import { ViewprofileComponent } from '../user/components/viewprofile/viewprofile.component';
import { UserRoutingModule } from '../user/user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UDashboardComponent } from '../user/components/u-dashboard/u-dashboard.component';
import { CDashboardComponent } from '../company/components/c-dashboard/c-dashboard.component';
import { CRegistraionComponent } from '../company/components/c-registraion/c-registraion.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
 // {path:'user',loadChildren:()=>import('../user/user.module').then((m)=>m.UserModule)},
 { path: 'home', component:HomeComponent },
 
 { path: 'login', component: LoginComponent},
 { path: 'signup', component: SignupComponent},
  // { path: 'company', component:CDashboardComponent },
  
  
  { path: 'register', component:RegisterComponent },

  { path: 'companyRegister', component:CRegistraionComponent },
  { path: 'fp', component:EmailVerificationComponent },
  
  
];

  // {path:'user',loadChildren:()=>import('../user/user.module').then((m)=>m.UserModule)},


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructureRoutingModule { }

