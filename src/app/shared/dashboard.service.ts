import { HttpClient } from '@angular/common/http';
import { FirestoreServiceService } from './firestore-service.service';
import { MatchesService } from './matches.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  matchsService = inject(MatchesService)
  http = inject(HttpClient)

  createDataSource(predictions: any[]) {
    if (predictions.length < 2) {
      predictions = JSON.parse(localStorage.getItem('predictionData')!);
    }
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

  calculateTotalPoints(predictions: any[]): any[] {
    if (predictions.length < 2) {
      predictions = JSON.parse(localStorage.getItem('predictionData')!);
    }
    const matches = this.matchsService.matches;
    const users = this.matchsService.users;
    let userPointsMap: { [userId: string]: number } = {};

    for (let user of users) {
      userPointsMap[user.user_id] = 0;
    }

    for (let match of matches) {
      if (match.winning_team && match.team1_score && match.team2_score) {
        let matchPredictions = predictions.filter(prediction => prediction.match_no === match.match_no);

        for (let prediction of matchPredictions) {
          const teamPoints = this.userPredictionWithMatch(prediction.team_pred, match.winning_team);
          const scr1Points = this.userPredictionWithScore(prediction.team_1_pred_scr, match.team1_score);
          const scr2Points = this.userPredictionWithScore(prediction.team_2_pred_scr, match.team2_score);

          const totalMatchPoints = teamPoints + scr1Points + scr2Points;

          userPointsMap[prediction.user_id] += totalMatchPoints;
        }
      }
    }

    let result = [];

    for (let user of users) {
      result.push({
        user_id: user.user_id,
        displayName: user.displayName,
        total_points: userPointsMap[user.user_id]
      });
    }

    return result;
  }

  matchWiseBreakup(predictions: any[], matches: any[]): any[] {
    if (predictions.length < 2) {
      predictions = JSON.parse(localStorage.getItem('predictionData')!);
    }
    const dataSource: any[] = [];
    const users = this.matchsService.users;

    matches.forEach((match) => {
      const matchPredictions = predictions.filter(prediction => prediction.match_no === match.match_no);
      const rows: any[] = [];

      users.forEach((user) => {
        const userPrediction = matchPredictions.find(prediction => prediction.user_id === user.user_id) || {
          team_1_pred_scr: '',
          team_2_pred_scr: '',
          team_pred: '',
          updated_times: 0
        };
        const teamPoints = this.userPredictionWithMatch(userPrediction.team_pred, match.winning_team);
        const scr1Points = this.userPredictionWithScore(userPrediction.team_1_pred_scr, match.team1_score);
        const scr2Points = this.userPredictionWithScore(userPrediction.team_2_pred_scr, match.team2_score);

        rows.push({
          user_id: user.user_id,
          displayName: user.displayName,
          team_1_pred_scr: userPrediction.team_1_pred_scr,
          team_2_pred_scr: userPrediction.team_2_pred_scr,
          team_pred: userPrediction.team_pred,
          updated_times: userPrediction.updated_times,
          points: teamPoints + scr1Points + scr2Points,
        });
      });

      dataSource.push({
        match_no: match.match_no,
        match_api_name: match.match_api_name,
        fixture: match.fixture,
        dom: match.dom,
        venue: match.venue,
        time: match.time,
        status: match.status,
        rows: rows
      });
    });
    console.log(dataSource);
    return dataSource;
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

  calculateWeeklyStandings(predictions: any[]): { [week: string]: any[] } {
    if (predictions.length < 2) {
      predictions = JSON.parse(localStorage.getItem('predictionData')!);
    }

    const matches = this.matchsService.matches;
    const users = this.matchsService.users;

    let weeklyStandings: { [week: string]: any[] } = {};

    for (let match of matches) {
      if (match.winning_team && match.team1_score && match.team2_score && match.dom) {
        // Parse the date string into a Date object
        const matchDateStr = match.dom + ' ' + new Date().getFullYear(); // Adding the current year for parsing
        const matchDate = new Date(matchDateStr);

        // Calculate the week start and end dates
        const { weekStart, weekEnd } = this.getWeekStartAndEnd(matchDate);

        let matchPredictions = predictions.filter(prediction => prediction.match_no === match.match_no);

        for (let prediction of matchPredictions) {
          const teamPoints = this.userPredictionWithMatch(prediction.team_pred, match.winning_team);
          const scr1Points = this.userPredictionWithScore(prediction.team_1_pred_scr, match.team1_score);
          const scr2Points = this.userPredictionWithScore(prediction.team_2_pred_scr, match.team2_score);

          const totalMatchPoints = teamPoints + scr1Points + scr2Points;

          const userWeekPoints = {
            user_id: prediction.user_id,
            displayName: prediction.displayName,  // Assuming displayName is available in prediction
            total_points: totalMatchPoints
          };

          const weekKey = `${weekStart.toDateString()} - ${weekEnd.toDateString()}`;

          if (!weeklyStandings[weekKey]) {
            weeklyStandings[weekKey] = [];
          }

          weeklyStandings[weekKey].push(userWeekPoints);
        }
      }
    }

    // Sort users by total points for each week
    for (let week in weeklyStandings) {
      weeklyStandings[week].sort((a, b) => b.total_points - a.total_points);
    }
    console.log(weeklyStandings);
    return weeklyStandings;
  }

  // Helper function to get the week start and end dates
  getWeekStartAndEnd(date: Date): { weekStart: Date; weekEnd: Date } {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)); // Adjust for Sunday
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return { weekStart, weekEnd };
  }

  calculateWeeklySum(predictions: any[]): any[] {
    if (predictions.length < 2) {
        predictions = JSON.parse(localStorage.getItem('predictionData')!);
    }

    const matches = this.matchsService.matches;
    const users = this.matchsService.users;

    let weeklySum: any[] = [];
    let weekNo = 1;

    for (let match of matches) {
        if (match.winning_team && match.team1_score && match.team2_score && match.dom) {
            // Parse the date string into a Date object
            const matchDateStr = match.dom + ' ' + new Date().getFullYear(); // Adding the current year for parsing
            const matchDate = new Date(matchDateStr);

            // Calculate the week start and end dates
            const { weekStart, weekEnd } = this.getWeekStartAndEnd(matchDate);

            let matchPredictions = predictions.filter(prediction => prediction.match_no === match.match_no);

            for (let prediction of matchPredictions) {
                const teamPoints = this.userPredictionWithMatch(prediction.team_pred, match.winning_team);
                const scr1Points = this.userPredictionWithScore(prediction.team_1_pred_scr, match.team1_score);
                const scr2Points = this.userPredictionWithScore(prediction.team_2_pred_scr, match.team2_score);

                const totalMatchPoints = teamPoints + scr1Points + scr2Points;

                const weekKey = `${weekStart.toDateString()} - ${weekEnd.toDateString()}`;

                const existingWeekIndex = weeklySum.findIndex(item => item.week_id === weekKey);
                if (existingWeekIndex === -1) {
                    // If the week is not in the list, add it
                    weeklySum.push({
                        week_id: weekKey,
                        week_no: weekNo++,
                        players_data: [{
                            userId: prediction.user_id,
                            display_name: users.find(user => user.user_id === prediction.user_id)?.displayName,
                            points: totalMatchPoints
                        }]
                    });
                } else {
                    // If the week is already in the list, update the player data
                    const userIndex = weeklySum[existingWeekIndex].players_data.findIndex((player: any) => player.userId === prediction.user_id);
                    if (userIndex === -1) {
                        // If the player is not in the list, add it
                        weeklySum[existingWeekIndex].players_data.push({
                            userId: prediction.user_id,
                            display_name: users.find(user => user.user_id === prediction.user_id)?.displayName,
                            points: totalMatchPoints
                        });
                    } else {
                        // If the player is already in the list, update the points
                        weeklySum[existingWeekIndex].players_data[userIndex].points += totalMatchPoints;
                    }
                }
            }
        }
    }
    weeklySum.forEach(week => {
      week.players_data = week.players_data
      .filter((player: any) => player.display_name) // Filter out entries without display_name
      .sort((a: any, b: any) => b.points - a.points);
    });
    weeklySum.sort((a: any, b: any) => b.week_no - a.week_no);
    console.log(weeklySum)
    return weeklySum;
}
}
