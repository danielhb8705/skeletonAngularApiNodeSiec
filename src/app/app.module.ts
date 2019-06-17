import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatProgressBarModule, MatSelectModule,
  MatSidenavModule, MatSlideToggleModule, MatStepperModule, MatToolbarModule,MatTableModule
} from "@angular/material";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService, NavigationService, UserService, DatoscoiService} from "./_services";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import { LayoutModule } from '@angular/cdk/layout';
import {NgxSpinnerModule} from "ngx-spinner";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {RegisterComponent} from "./_components/register/register.component";
import { ProfileComponent } from './_components/profile/profile.component';
import { BalanzasComponent } from './_components/balanzas/balanzas.component';
import { BalanzaxdptoComponent } from './_components/balanzaxdpto/balanzaxdpto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    BalanzasComponent,
    BalanzaxdptoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatMenuModule,
    MatStepperModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    NgxSpinnerModule,
    MatDatepickerModule,
	MatTableModule,
  ],
  providers: [AuthenticationService,NavigationService,UserService,DatoscoiService,
              { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
