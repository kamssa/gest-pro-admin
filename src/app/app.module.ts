import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {AdminLayoutModule} from "./layouts/admin-layout/admin-layout.module";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./helper/jwt.interceptor";
import {ErrorInterceptor} from "./helper/error.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatConfirmDialogComponent} from "./service/shared/dialogs/mat-confirm-dialog-component/mat-confirm-dialog.component";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [
    AppComponent,
    MatConfirmDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AdminLayoutModule,
    MaterialModule,


  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
