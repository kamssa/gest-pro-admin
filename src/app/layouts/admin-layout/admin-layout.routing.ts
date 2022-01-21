import {Routes} from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ListEntrepriseComponent} from "../../entreprise/list-entreprise/list-entreprise.component";

export const AdminLayoutRoutes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'manager',   component:  ListEntrepriseComponent}
  ];
