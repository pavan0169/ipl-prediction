import { Component, inject } from '@angular/core';
import { DashboardService } from '../../shared/dashboard.service';
import { MatchesService } from '../../shared/matches.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-match-cards',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './match-cards.component.html',
  styleUrl: './match-cards.component.css',
})
export class MatchCardsComponent {
  dataSource: any[] = [];
  matchService = inject(MatchesService);

  displayedColumns: string[] = [
    'rank',
    'displayName',
    'team_1_pred_scr',
    'team_2_pred_scr',
    'team_pred',
    'updated_times',
    'points',
  ];

  team1: string = ''
  team2: string = ''

  constructor(private dasboardService: DashboardService) {}
  matchsService = inject(MatchesService)
  lastUpdated: number = 0;

  ngOnInit(): void {
    const predictionData = this.matchService.playerPredictionData$.getValue();
    const matches = this.matchsService.matches;
    const currentMatches = matches.filter(match => this.isReleventMatch(match.dom));
    this.dataSource = this.dasboardService.matchWiseBreakup(predictionData, currentMatches);

    // Sort dataSource based on points in descending order and add rank
    this.dataSource.forEach(match => {
      match.rows.sort((a: any, b: any) => b.points - a.points); // Descending order
      match.rows.forEach((row: any, index: number) => {
        row.rank = index + 1; // Numbering starts from 1
      });
      this.team1 = match.fixture.split(' ')[0];
      this.team2 = match.fixture.split(' ')[2];
    });
  }

  updatedDate(): string {
    const epochTimestamp = parseInt(localStorage.getItem('lastFetchedTimestamp')!);
    const date = new Date(epochTimestamp); // Convert from seconds to milliseconds
    return date.toLocaleString() // Convert to a human-readable date string
  }

  isReleventMatch(dateString: string): boolean {
    const [month, day] = dateString.split(' ');
    const year = new Date().getFullYear();
    const date = new Date(`${month} ${day}, ${year}`);
    const currentDate = new Date();

    const threeDaysAgo = new Date(currentDate);
    threeDaysAgo.setDate(currentDate.getDate() - 3);

    const fiveDaysLater = new Date(currentDate);
    fiveDaysLater.setDate(currentDate.getDate() + 7);
    return date >= threeDaysAgo && date <= fiveDaysLater;
  }
}
