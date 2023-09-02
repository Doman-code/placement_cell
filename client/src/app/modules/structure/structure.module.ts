import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructureRoutingModule } from './structure-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
//import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { UserModule } from '../user/user.module';
import { HomeComponent } from './components/home/home.component';
//import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from '../material/material.module';
import { CompanyModule } from '../company/company.module';
import { FormsModule } from '@angular/forms';
import { Header2Component } from './components/header2/header2.component';
import { HttpClientModule } from '@angular/common/http';
import {MatStepperModule} from '@angular/material/stepper';
import { CardComponent } from './components/card/card.component';
import { CardSliderComponent } from './components/card-slider/card-slider.component';
import { VacancyDetailComponent } from './components/vacancy-detail/vacancy-detail.component';
import { SignupComponent } from './components/signup/signup.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RecruitersSliderComponent } from './recruiters-slider/recruiters-slider.component';
import { RecruitedStudentComponent } from './components/recruited-student/recruited-student.component';
import { HomeMainSliderComponent } from './components/home-main-slider/home-main-slider.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    Header2Component,
    CardComponent,
    CardSliderComponent,
    VacancyDetailComponent,
    SignupComponent,
    CarouselComponent,
    EmailVerificationComponent,
    ForgotPasswordComponent,
    RecruitersSliderComponent,
    RecruitedStudentComponent,
    HomeMainSliderComponent,
    
  ],
  imports: [
    CommonModule,
    StructureRoutingModule,
    NgbModule,
    NgbCarouselModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
   // UserModule,
    //CompanyModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    NativeDateModule,
    MatDatepickerModule,
    MatStepperModule,
    MatDialogModule,
    CarouselModule

  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    CarouselComponent
  ]
})
export class StructureModule { }
