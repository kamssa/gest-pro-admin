import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AdminLayoutComponent} from './admin-layout.component';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ComponentsModule} from '../../components/components.module';
import {MaterialModule} from "../../material/material.module";
import {SuccessDialogComponent} from "../../service/shared/dialogs/success-dialog/success-dialog.component";
import {ListEntrepriseComponent} from "../../entreprise/list-entreprise/list-entreprise.component";
import {ConnexionComponent} from "../../connexion/connexion.component";
import {AddEntrepriseComponent} from "../../entreprise/add-entreprise/add-entreprise.component";
import {UpdateEntreComponent} from "../../entreprise/update-entre/update-entre.component";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    SuccessDialogComponent,
    ListEntrepriseComponent,
    ConnexionComponent,
    AddEntrepriseComponent,
    UpdateEntreComponent

  ],
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        ComponentsModule,
        MaterialModule,
    ]
})
export class AdminLayoutModule { }
