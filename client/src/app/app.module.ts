import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { AdminModule } from './modules/admin/admin.module';
import { CompanyModule } from './modules/company/company.module';
import { StructureModule } from './modules/structure/structure.module';
import { UserModule } from './modules/user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
// import { DemoComponent } from './demo/demo.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ViewprofileComponent } from './modules/user/components/viewprofile/viewprofile.component';
import { UserRoutingModule } from './modules/user/user-routing.module';
import { FooterComponent } from './modules/structure/components/footer/footer.component';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoComponent } from './demo/demo.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import{DataSharingServiceService} from './modules/data-sharing-service.service'
import { JwtModule } from '@auth0/angular-jwt';
import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
  declarations: [
    AppComponent,
   DemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AdminModule,
    CompanyModule,
    StructureModule,
    UserModule,
    CarouselModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        },
        // whitelistedDomains: ['localhost:3000'],
        // blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    }),
    NgbModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    FlexLayoutModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  providers: [DatePipe, DataSharingServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
