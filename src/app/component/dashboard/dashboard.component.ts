import { Component, OnInit, inject } from '@angular/core';
import { DashboardService } from '../../shared/dashboard.service';
import { FirestoreServiceService } from '../../shared/firestore-service.service';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dashboardService = inject(DashboardService)
  firestoreService = inject(FirestoreServiceService)

  dataSource: any[] = []
  displayedColumns: string[] = [
    'match_no',
    'match',
    'winning_team',
    'team1_score',
    'team2_score'
  ];
  dynamicColumns: string[] = []; // To store dynamically generated columns

  ngOnInit(): void {
    this.firestoreService.getAllDocuments().subscribe((data) => {
      this.dataSource = this.dashboardService.createDataSource(data);
      if (this.dataSource.length > 0) {
        this.dynamicColumns = Object.keys(this.dataSource[0]).filter(key =>
          !this.displayedColumns.includes(key)
        );
        this.displayedColumns = this.displayedColumns.concat(this.dynamicColumns);
      }
    });
  }

  getColumnName(input: string): string {
    // Define regular expression patterns to match
    const teamPredPattern = /(.*)_team_pred/;
    const teamPredScrPattern = /(.*)_team_(\d+)_pred_scr/;
    const matchPointsPattern = /(.*)_match_points/;

    // Match input against patterns
    const teamPredMatch = input.match(teamPredPattern);
    const teamPredScrMatch = input.match(teamPredScrPattern);
    const matchPointsMatch = input.match(matchPointsPattern);

    if (teamPredScrMatch) {
        const [, username, number] = teamPredScrMatch;
        // Convert number to 'T1', 'T2', etc.
        const teamNumber = `T${number}`;
        return `${username} ${teamNumber} Scr`;
    } else if (teamPredMatch) {
        const [, username] = teamPredMatch;
        return `${username} Team`;
    } else if (matchPointsMatch) {
        const [, username] = matchPointsMatch;
        return `${username} Match Points`;
    } else {
        // If no pattern matches, return the input string as is
        return input;
    }
  }


}
