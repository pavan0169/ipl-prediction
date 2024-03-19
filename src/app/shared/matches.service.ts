import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Match {
  match_no: number;
  fixture: string;
  dom: string;
  venue: string;
  time: string;
  winning_team?: string;
  team1_score?: string;
  team2_score?: string;
}

export interface User {
  user_id: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  public playerPredictionData = new Subject<any[]>;

  public users: User[] = [
    {
      user_id: 'SJAIYq6SajglbpxOHeNlVG0TZRX2',
      displayName: 'Karthiktvk'
    },
    {
      user_id: 'fBhhvMrbOldzlHHcnzCYbPO4Wkv2',
      displayName: 'Krish'
    },
    {
      user_id: 'AwUMAAeFgsNsCVIDKjKRyPOpsuC2',
      displayName: 'Kalyan'
    },
    {
      user_id: 'H1k0za2shERVnV0R72Ic4j8a85y2',
      displayName: 'Pavan'
    },
    {
      user_id: 'XgFNswPIGwWFFhCiIMd1WxebEAB3',
      displayName: 'Sai'
    },
    {
      user_id: 'M3aVVTaNRtaI2gJIKWcCdHecI7z1',
      displayName: 'sasiRoyals'
    },
  ]

  public matches: Match[] = [
    {
      "match_no": 1,
      "fixture": "CSK vs RCB",
      "dom": "March 22",
      "venue": "Chennai",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 2,
      "fixture": "PBKS vs DC",
      "dom": "March 23",
      "venue": "Mohali",
      "time": "3:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 3,
      "fixture": "KKR vs SRH",
      "dom": "March 23",
      "venue": "Kolkata",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 4,
      "fixture": "RR vs LSG",
      "dom": "March 24",
      "venue": "Jaipur",
      "time": "3:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 5,
      "fixture": "GT vs MI",
      "dom": "March 24",
      "venue": "Ahmedabad",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 6,
      "fixture": "RCB vs PBKS",
      "dom": "March 25",
      "venue": "Bengaluru",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 7,
      "fixture": "CSK vs GT",
      "dom": "March 26",
      "venue": "Chennai",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 8,
      "fixture": "SRH vs MI",
      "dom": "March 27",
      "venue": "Hyderabad",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 9,
      "fixture": "RR vs DC",
      "dom": "March 28",
      "venue": "Jaipur",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 10,
      "fixture": "RCB vs KKR",
      "dom": "March 29",
      "venue": "Bengaluru",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 11,
      "fixture": "LSG vs PBKS",
      "dom": "March 30",
      "venue": "Lucknow",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 12,
      "fixture": "GT vs SRH",
      "dom": "March 31",
      "venue": "Ahmedabad",
      "time": "3:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 13,
      "fixture": "DC vs CSK",
      "dom": "March 31",
      "venue": "Visakhapatnam",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 14,
      "fixture": "MI vs RR",
      "dom": "April 1",
      "venue": "Mumbai",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 15,
      "fixture": "RCB vs LSG",
      "dom": "April 2",
      "venue": "Bengaluru",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 16,
      "fixture": "DC vs KKR",
      "dom": "April 3",
      "venue": "Visakhapatnam",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 17,
      "fixture": "GT vs PBKS",
      "dom": "April 4",
      "venue": "Ahmedabad",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 18,
      "fixture": "SRH vs CSK",
      "dom": "April 5",
      "venue": "Hyderabad",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 19,
      "fixture": "RR vs RCB",
      "dom": "April 6",
      "venue": "Jaipur",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 20,
      "fixture": "MI vs DC",
      "dom": "April 7",
      "venue": "Mumbai",
      "time": "3:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    },
    {
      "match_no": 21,
      "fixture": "LSG vs GT",
      "dom": "April 7",
      "venue": "Lucknow",
      "time": "7:30 PM IST",
      "winning_team": "",
      "team1_score": "",
      "team2_score": ""
    }
  ]


  constructor() { }

}
