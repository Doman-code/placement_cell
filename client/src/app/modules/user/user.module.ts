import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { StructureModule } from '../structure/structure.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddprofileComponent } from './components/addprofile/addprofile.component';
import { ViewprofileComponent } from './components/viewprofile/viewprofile.component';
import { AppliedjobComponent } from './components/appliedjob/appliedjob.component';
import { JobnotificationComponent } from './components/jobnotification/jobnotification.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './components/home/home.component';
import { StructureRoutingModule } from '../structure/structure-routing.module';
import { UDashboardComponent } from './components/u-dashboard/u-dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { PersonaldetailComponent } from './components/personaldetail/personaldetail.component';
import { OtherdetailComponent } from './components/otherdetail/otherdetail.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditAcademicDetailComponent } from './components/edit-academic-detail/edit-academic-detail.component';
import { ApplicationComponent } from './components/application/application.component';
import { EditPersonaldetailComponent } from './components/edit-personaldetail/edit-personaldetail.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddAcademicComponent } from './components/add-academic/add-academic.component';
import { AddSkillComponent } from './components/add-skill/add-skill.component';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { StdRegisterComponent } from './components/std-register/std-register.component';
import { StdCompleteRegistrationComponent } from './components/std-complete-registration/std-complete-registration.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';


@NgModule({
    declarations: [
        AddprofileComponent,
        ViewprofileComponent,
        AppliedjobComponent,
        JobnotificationComponent,
        HomeComponent,
        UDashboardComponent,
        PersonaldetailComponent,
        OtherdetailComponent,
        EditAcademicDetailComponent,
        ApplicationComponent,
        EditPersonaldetailComponent,
        AddAcademicComponent,
        AddSkillComponent,
        AddExperienceComponent,
        StdRegisterComponent,
        StdCompleteRegistrationComponent,
        UserPreviewComponent,
        
        
        
    ],
    exports: [
        AddprofileComponent,
        ViewprofileComponent,
        AppliedjobComponent,
        JobnotificationComponent,
        UDashboardComponent,
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        //StructureModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MaterialModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatTooltipModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatDialogModule,
        StructureRoutingModule
        
    ]
})
export class UserModule { }
