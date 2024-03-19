import { FirestoreServiceService } from './firestore-service.service';
import { MatchesService } from './matches.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  matchsService = inject(MatchesService)

  createDataSource(predictions: any[]) {
    const matches = this.matchsService.matches;
    const users = this.matchsService.users;
    let dashboardData: any[] = [];

    matches.forEach(match => {
      let matchData: any = {
        match_no: match.match_no,
        match: match.fixture,
        winning_team: match.winning_team,
        team1_score: match.team1_score,
        team2_score: match.team2_score
      };

      // Add user predictions
      users.forEach(user => {
        const userPrediction = predictions.find(prediction => prediction.match_no === match.match_no && prediction.user_id === user.user_id);
        const userName = user.displayName;

        if (userPrediction) {
          matchData[`${userName}_team_pred`] = userPrediction.team_pred;
          matchData[`${userName}_team_1_pred_scr`] = userPrediction.team_1_pred_scr;
          matchData[`${userName}_team_2_pred_scr`] = userPrediction.team_2_pred_scr;
        } else {
          // If user prediction not found, set default values
          matchData[`${userName}_team_pred`] = "";
          matchData[`${userName}_team_1_pred_scr`] = null;
          matchData[`${userName}_team_2_pred_scr`] = null;
        }
      });

      dashboardData.push(matchData);
    });

    return dashboardData;
  }
}
