import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatchesService } from '../../shared/matches.service';
import { DashboardService } from '../../shared/dashboard.service';

@Component({
  selector: 'app-weekly-winners',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './weekly-winners.component.html',
  styleUrl: './weekly-winners.component.css'
})
export class WeeklyWinnersComponent {
  dataSource: any[] = [];
  matchService = inject(MatchesService);
  dashboardServices = inject(DashboardService)

  ngOnInit(): void {
    const predictionData = this.matchService.playerPredictionData$.getValue();
    const matches = this.matchService.matches;
    this.dataSource = this.dashboardServices.calculateWeeklySum(predictionData);
  }
}
