import { Component, OnInit, inject } from '@angular/core';
import { MatchesService } from '../../shared/matches.service';
import { DashboardService } from '../../shared/dashboard.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-points-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './points-table.component.html',
  styleUrl: './points-table.component.css'
})
export class PointsTableComponent implements OnInit {
  matchService = inject(MatchesService)
  dashboardService = inject(DashboardService)
  dataSource: any[] = []
  displayedColumns: string[] = ['Rank', 'Name', 'Points'];

  ngOnInit(): void {
    this.matchService.playerPredictionData$.subscribe((predictionData) => {
      this.dataSource = this.dashboardService.calculateTotalPoints(predictionData);
      this.dataSource.sort((a, b) => b.total_points - a.total_points);
      // Assign positions after sorting
      this.dataSource.forEach((user, index) => {
        user.position = index + 1;
      });
    });
  }



}
