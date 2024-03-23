import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { MatchesTableComponent } from './component/matches-table/matches-table.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { PointsTableComponent } from './component/points-table/points-table.component';
import { WeeklyWinnersComponent } from './component/weekly-winners/weekly-winners.component';
import { MatchCardsComponent } from './component/match-cards/match-cards.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'match-prediction', component: MatchesTableComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'points-table', component: PointsTableComponent},
  {path: 'weekly-winners', component: WeeklyWinnersComponent},
  {path: 'match-cards', component: MatchCardsComponent},
];
