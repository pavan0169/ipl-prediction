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
      const is_open = this.isDateBeforeNextSunday(match.dom)
      let matchData: any = {
        match_no: match.match_no,
        match: match.fixture,
        winning_team: match.winning_team ? match.winning_team : '--',
        team1_score: match.team1_score ? match.team1_score : '--',
        team2_score: match.team2_score ? match.team2_score : '--',
      };

      // Add user predictions
      users.forEach(user => {
        const userPrediction = predictions.find(prediction => prediction.match_no === match.match_no && prediction.user_id === user.user_id);
        const userName = user.displayName;

        if (is_open) {
          if (userPrediction) {
            const teamPoints = this.userPredictionWithMatch(userPrediction.team_pred, match.winning_team)
            const scr1Points = this.userPredictionWithScore(userPrediction.team_1_pred_scr, match.team1_score)
            const scr2Points = this.userPredictionWithScore(userPrediction.team_2_pred_scr, match.team2_score)
            matchData[`${userName}_team_pred`] = userPrediction.team_pred + (teamPoints || teamPoints === 0 ? '<' + teamPoints + '>' : '');
            matchData[`${userName}_team_1_pred_scr`] = userPrediction.team_1_pred_scr + (scr1Points || scr1Points === 0 ? '<' + scr1Points + '>' : '');
            matchData[`${userName}_team_2_pred_scr`] = userPrediction.team_2_pred_scr + (scr2Points || scr2Points === 0 ? '<' + scr2Points + '>' : '');
            matchData[`${userName}_match_points`] = match.winning_team ? teamPoints + scr1Points + scr2Points : '--';
          } else {
            matchData[`${userName}_team_pred`] = "--";
            matchData[`${userName}_team_1_pred_scr`] = "--";
            matchData[`${userName}_team_2_pred_scr`] = "--";
            matchData[`${userName}_match_points`] = "--";
          }
        }
      });

      dashboardData.push(matchData);
    });

    return dashboardData;
  }

  userPredictionWithScore(pred_scr: number, act_scr: number | undefined): any {
    if (act_scr !== 0 && act_scr !== undefined) {
      return Math.max(40 - Math.abs(pred_scr - act_scr!), 0);
    }
    return false;
  }

  userPredictionWithMatch(team_pred: string, team_won: string | undefined): any {
    if (team_won !== '' && team_won !== undefined) {
      return team_pred === team_won ? 20 : 0;
    }
    return false;
  }

  isDateBeforeNextSunday(dateString: string): boolean {
    const [month, day] = dateString.split(' ');
    const year = new Date().getFullYear();
    const date = new Date(`${month} ${day}, ${year}`);
    const today = new Date();
    const daysUntilNextFriday = (7 - today.getDay() + 7) % 7; // Days until next Friday
    const friday = new Date(today.getTime() + (7 + daysUntilNextFriday) * 24 * 60 * 60 * 1000); // Next Frida
    return date <= friday;
  }
}
