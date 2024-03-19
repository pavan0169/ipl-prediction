import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { MatchesTableComponent } from './component/matches-table/matches-table.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'match-prediction', component: MatchesTableComponent},
  {path: 'dashboard', component: DashboardComponent},
];
