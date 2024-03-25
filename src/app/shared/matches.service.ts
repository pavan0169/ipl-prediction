import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Match {
  api_id: string;
  match_api_name: string;
  match_no: number;
  fixture: string;
  dom: string;
  venue: string;
  time: string;
  winning_team?: string;
  team1_score?: number;
  team2_score?: number;
}

export interface User {
  user_id: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  public playerPredictionData$: BehaviorSubject<any[]> = new BehaviorSubject([{}]);

  public users: User[] = [
    {
      user_id: 'fBhhvMrbOldzlHHcnzCYbPO4Wkv2',
      displayName: 'Krishna',
    },
    {
      user_id: 'SJAIYq6SajglbpxOHeNlVG0TZRX2',
      displayName: 'Karthik',
    },
    {
      user_id: 'AwUMAAeFgsNsCVIDKjKRyPOpsuC2',
      displayName: 'Kalyan',
    },
    {
      user_id: 'H1k0za2shERVnV0R72Ic4j8a85y2',
      displayName: 'Pavan',
    },
    {
      user_id: 'M3aVVTaNRtaI2gJIKWcCdHecI7z1',
      displayName: 'Sasi',
    },
    {
      user_id: 'NkybwmiLRddHC7BgBCd0OT8kBOz2',
      displayName: 'Siva',
    },
    {
      user_id: 'zM1Y2gNmaoftV6zh5JIrwLoLd3d2',
      displayName: 'Uday',
    },
    {
      user_id: 'cfmUhC5EBTMsOWT3v0C35W5I7eE2',
      displayName: 'Madhuri',
    },
    {
      user_id: 'jmJb6bjmnXUnl5YCZCV2W7iJ6Bv1',
      displayName: 'Revanth',
    },
    {
      user_id: 'XgFNswPIGwWFFhCiIMd1WxebEAB3',
      displayName: 'Dathu',
    },
    {
      user_id: 'PYoUxlm184OKyfFvojU7UcdTkKQ2',
      displayName: 'Ramana',
    },
  ];

  public matches: Match[] = [
    {
      api_id: '489be47a-7e10-4bf1-9aad-201b67f45bf8',
      match_api_name: 'Chennai Super Kings vs Royal Challengers Bengaluru',
      match_no: 1,
      fixture: 'CSK vs RCB',
      dom: 'March 22',
      venue: 'Chennai',
      time: '7:30 PM IST',
      winning_team: 'CSK',
      team1_score: 176,
      team2_score: 173,
    },
    {
      api_id: '1b68a0ac-be7d-49db-9b6d-f7b973bd6cb6',
      match_api_name: 'Punjab Kings vs Delhi Capitals',
      match_no: 2,
      fixture: 'PBKS vs DC',
      dom: 'March 23',
      venue: 'Mohali',
      time: '3:30 PM IST',
      winning_team: 'PBKS',
      team1_score: 177,
      team2_score: 174,
    },
    {
      api_id: '93e895af-b8c9-46f8-a482-9000e2b674be',
      match_api_name: 'Kolkata Knight Riders vs Sunrisers Hyderabad',
      match_no: 3,
      fixture: 'KKR vs SRH',
      dom: 'March 23',
      venue: 'Kolkata',
      time: '7:30 PM IST',
      winning_team: 'KKR',
      team1_score: 208,
      team2_score: 204,
    },
    {
      api_id: '84c71323-e2c9-4bf1-9b35-c4fc101b9a6a',
      match_api_name: 'Rajasthan Royals vs Lucknow Super Giants',
      match_no: 4,
      fixture: 'RR vs LSG',
      dom: 'March 24',
      venue: 'Jaipur',
      time: '3:30 PM IST',
      winning_team: 'RR',
      team1_score: 193,
      team2_score: 173,
    },
    {
      api_id: '6bc6bf3b-0e04-49a8-9d2f-5039c8f97850',
      match_api_name: 'Gujarat Titans vs Mumbai Indians',
      match_no: 5,
      fixture: 'GT vs MI',
      dom: 'March 24',
      venue: 'Ahmedabad',
      time: '7:30 PM IST',
      winning_team: 'GT',
      team1_score: 168,
      team2_score: 162,
    },
    {
      api_id: 'dd18b62a-a63f-4574-a007-52948c21d707',
      match_api_name: 'Royal Challengers Bangalore vs Punjab Kings',
      match_no: 6,
      fixture: 'RCB vs PBKS',
      dom: 'March 25',
      venue: 'Bengaluru',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 176,
    },
    {
      api_id: '9912c3c1-7531-439a-a455-e3172e4a2a1b',
      match_api_name: 'Chennai Super Kings vs Gujarat Titans',
      match_no: 7,
      fixture: 'CSK vs GT',
      dom: 'March 26',
      venue: 'Chennai',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '08a8976e-e289-499e-ab63-9a56acf8857b',
      match_api_name: 'Sunrisers Hyderabad vs Mumbai Indians',
      match_no: 8,
      fixture: 'SRH vs MI',
      dom: 'March 27',
      venue: 'Hyderabad',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '92c6e89f-b512-4eb3-969b-71505eae6e0e',
      match_api_name: 'Rajasthan Royals vs Delhi Capitals',
      match_no: 9,
      fixture: 'RR vs DC',
      dom: 'March 28',
      venue: 'Jaipur',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '0541f48b-fd49-46cf-9cfe-8b5998761e04',
      match_api_name: 'Royal Challengers Bangalore vs Kolkata Knight Riders',
      match_no: 10,
      fixture: 'RCB vs KKR',
      dom: 'March 29',
      venue: 'Bengaluru',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '66a4be49-d980-42a5-a2a5-251907cbbaf3',
      match_api_name: 'Lucknow Super Giants vs Punjab Kings',
      match_no: 11,
      fixture: 'LSG vs PBKS',
      dom: 'March 30',
      venue: 'Lucknow',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '14bdf792-cb62-4bc4-b136-c070e15885ac',
      match_api_name: 'Gujarat Titans vs Sunrisers Hyderabad',
      match_no: 12,
      fixture: 'GT vs SRH',
      dom: 'March 31',
      venue: 'Ahmedabad',
      time: '3:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: 'a7611f25-482a-498c-a424-a4523cd92ffe',
      match_api_name: 'Delhi Capitals vs Chennai Super Kings',
      match_no: 13,
      fixture: 'DC vs CSK',
      dom: 'March 31',
      venue: 'Visakhapatnam',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: 'd179876c-6b2d-4d39-9931-c8fcbefb4456',
      match_api_name: 'Mumbai Indians vs Rajasthan Royals',
      match_no: 14,
      fixture: 'MI vs RR',
      dom: 'April 1',
      venue: 'Mumbai',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '90e60cb7-57f1-4ce3-9104-ff8ed0119f4b',
      match_api_name: 'Royal Challengers Bangalore vs Lucknow Super Giants',
      match_no: 15,
      fixture: 'RCB vs LSG',
      dom: 'April 2',
      venue: 'Bengaluru',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '061bbd29-796d-4f46-a11a-c4f07d516a51',
      match_api_name: 'Delhi Capitals vs Kolkata Knight Riders',
      match_no: 16,
      fixture: 'DC vs KKR',
      dom: 'April 3',
      venue: 'Visakhapatnam',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '9d473b5d-7c92-4bf1-b49d-2f16433841d1',
      match_api_name: 'Gujarat Titans vs Punjab Kings',
      match_no: 17,
      fixture: 'GT vs PBKS',
      dom: 'April 4',
      venue: 'Ahmedabad',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '8f87aa4a-5de2-41ab-8f2c-72ce339adcdd',
      match_api_name: 'Sunrisers Hyderabad vs Chennai Super Kings',
      match_no: 18,
      fixture: 'SRH vs CSK',
      dom: 'April 5',
      venue: 'Hyderabad',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: 'c70f7161-236c-4cb9-bad9-cdcbc1061a95',
      match_api_name: 'Rajasthan Royals vs Royal Challengers Bangalore',
      match_no: 19,
      fixture: 'RR vs RCB',
      dom: 'April 6',
      venue: 'Jaipur',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: 'd50a0726-24b5-4023-be51-5fc4d89c75ff',
      match_api_name: 'Mumbai Indians vs Delhi Capitals',
      match_no: 20,
      fixture: 'MI vs DC',
      dom: 'April 7',
      venue: 'Mumbai',
      time: '3:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '8aac46d6-fdd5-453b-afbf-01b12fda1fc9',
      match_api_name: 'Lucknow Super Giants vs Gujarat Titans',
      match_no: 21,
      fixture: 'LSG vs GT',
      dom: 'April 7',
      venue: 'Lucknow',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
  ];

  constructor() {}
}
