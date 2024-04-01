import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject, interval } from 'rxjs';

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
  status?: any;
}

export interface User {
  user_id: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  public playerPredictionData$: BehaviorSubject<any[]> = new BehaviorSubject([
    {},
  ]);

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
      winning_team: 'RCB',
      team1_score: 178,
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
      winning_team: 'CSK',
      team1_score: 206,
      team2_score: 143,
    },
    {
      api_id: '08a8976e-e289-499e-ab63-9a56acf8857b',
      match_api_name: 'Sunrisers Hyderabad vs Mumbai Indians',
      match_no: 8,
      fixture: 'SRH vs MI',
      dom: 'March 27',
      venue: 'Hyderabad',
      time: '7:30 PM IST',
      winning_team: 'SRH',
      team1_score: 277,
      team2_score: 246,
    },
    {
      api_id: '92c6e89f-b512-4eb3-969b-71505eae6e0e',
      match_api_name: 'Rajasthan Royals vs Delhi Capitals',
      match_no: 9,
      fixture: 'RR vs DC',
      dom: 'March 28',
      venue: 'Jaipur',
      time: '7:30 PM IST',
      winning_team: 'RR',
      team1_score: 185,
      team2_score: 173,
    },
    {
      api_id: '0541f48b-fd49-46cf-9cfe-8b5998761e04',
      match_api_name: 'Royal Challengers Bangalore vs Kolkata Knight Riders',
      match_no: 10,
      fixture: 'RCB vs KKR',
      dom: 'March 29',
      venue: 'Bengaluru',
      time: '7:30 PM IST',
      winning_team: 'KKR',
      team1_score: 182,
      team2_score: 186,
    },
    {
      api_id: '66a4be49-d980-42a5-a2a5-251907cbbaf3',
      match_api_name: 'Lucknow Super Giants vs Punjab Kings',
      match_no: 11,
      fixture: 'LSG vs PBKS',
      dom: 'March 30',
      venue: 'Lucknow',
      time: '7:30 PM IST',
      winning_team: 'LSG',
      team1_score: 199,
      team2_score: 178,
    },
    {
      api_id: '14bdf792-cb62-4bc4-b136-c070e15885ac',
      match_api_name: 'Gujarat Titans vs Sunrisers Hyderabad',
      match_no: 12,
      fixture: 'GT vs SRH',
      dom: 'March 31',
      venue: 'Ahmedabad',
      time: '3:30 PM IST',
      winning_team: 'GT',
      team1_score: 168,
      team2_score: 162,
    },
    {
      api_id: 'a7611f25-482a-498c-a424-a4523cd92ffe',
      match_api_name: 'Delhi Capitals vs Chennai Super Kings',
      match_no: 13,
      fixture: 'DC vs CSK',
      dom: 'March 31',
      venue: 'Visakhapatnam',
      time: '7:30 PM IST',
      winning_team: 'DC',
      team1_score: 191,
      team2_score: 171,
    },
    {
      api_id: 'd179876c-6b2d-4d39-9931-c8fcbefb4456',
      match_api_name: 'Mumbai Indians vs Rajasthan Royals',
      match_no: 14,
      fixture: 'MI vs RR',
      dom: 'April 1',
      venue: 'Mumbai',
      time: '7:30 PM IST',
      winning_team: 'RR',
      team1_score: 125,
      team2_score: 127,
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
    {
      api_id: '',
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
      api_id: '',
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
    {
      api_id: '',
      match_api_name: 'Chennai Super Kings vs Kolkata Knight Riders',
      match_no: 22,
      fixture: 'CSK vs KKR',
      dom: 'April 8',
      venue: 'Chennai',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Punjab Kings vs Sunrisers Hyderabad',
      match_no: 23,
      fixture: 'PBKS vs SRH',
      dom: 'April 9',
      venue: 'Mohali',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Rajasthan Royals vs Gujarat Titans',
      match_no: 24,
      fixture: 'RR vs GT',
      dom: 'April 10',
      venue: 'Jaipur',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Mumbai Indians vs Royal Challengers Bangalore',
      match_no: 25,
      fixture: 'MI vs RCB',
      dom: 'April 11',
      venue: 'Mumbai',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Lucknow Super Giants vs Delhi Capitals',
      match_no: 26,
      fixture: 'LSG vs DC',
      dom: 'April 12',
      venue: 'Lucknow',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Punjab Kings vs Rajasthan Royals',
      match_no: 27,
      fixture: 'PBKS vs RR',
      dom: 'April 13',
      venue: 'Mohali',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Kolkata Knight Riders vs Lucknow Super Giants',
      match_no: 28,
      fixture: 'KKR vs LSG',
      dom: 'April 14',
      venue: 'Kolkata',
      time: '3:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Mumbai Indians vs Chennai Super Kings',
      match_no: 29,
      fixture: 'MI vs CSK',
      dom: 'April 14',
      venue: 'Mumbai',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Royal Challengers Bangalore vs Sunrisers Hyderabad',
      match_no: 30,
      fixture: 'RCB vs SRH',
      dom: 'April 15',
      venue: 'Bengaluru',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Gujarat Titans vs Delhi Capitals',
      match_no: 31,
      fixture: 'GT vs DC',
      dom: 'April 16',
      venue: 'Ahmedabad',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Kolkata Knight Riders vs Rajasthan Royals',
      match_no: 32,
      fixture: 'KKR vs RR',
      dom: 'April 17',
      venue: 'Kolkata',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Punjab Kings vs Mumbai Indians',
      match_no: 33,
      fixture: 'PBKS vs MI',
      dom: 'April 18',
      venue: 'Mohali',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Lucknow Super Giants vs Chennai Super Kings',
      match_no: 34,
      fixture: 'LSG vs CSK',
      dom: 'April 19',
      venue: 'Lucknow',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Delhi Capitals vs Sunrisers Hyderabad',
      match_no: 35,
      fixture: 'DC vs SRH',
      dom: 'April 20',
      venue: 'Delhi',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Kolkata Knight Riders vs Royal Challengers Bangalore',
      match_no: 36,
      fixture: 'KKR vs RCB',
      dom: 'April 21',
      venue: 'Kolkata',
      time: '3:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Punjab Kings vs Gujarat Titans',
      match_no: 37,
      fixture: 'PBKS vs GT',
      dom: 'April 21',
      venue: 'Mohali',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Rajasthan Royals vs Mumbai Indians',
      match_no: 38,
      fixture: 'RR vs MI',
      dom: 'April 22',
      venue: 'Jaipur',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Chennai Super Kings vs Lucknow Super Giants',
      match_no: 39,
      fixture: 'CSK vs LSG',
      dom: 'April 23',
      venue: 'Chennai',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Delhi Capitals vs Gujarat Titans',
      match_no: 40,
      fixture: 'DC vs GT',
      dom: 'April 24',
      venue: 'Delhi',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Sunrisers Hyderabad vs Royal Challengers Bangalore',
      match_no: 41,
      fixture: 'SRH vs RCB',
      dom: 'April 25',
      venue: 'Hyderabad',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Kolkata Knight Riders vs Punjab Kings',
      match_no: 42,
      fixture: 'KKR vs PBKS',
      dom: 'April 26',
      venue: 'Kolkata',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Delhi Capitals vs Mumbai Indians',
      match_no: 43,
      fixture: 'DC vs MI',
      dom: 'April 27',
      venue: 'Delhi',
      time: '3:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Lucknow Super Giants vs Rajasthan Royals',
      match_no: 44,
      fixture: 'LSG vs RR',
      dom: 'April 27',
      venue: 'Lucknow',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Gujarat Titans vs Royal Challengers Bangalore',
      match_no: 45,
      fixture: 'GT vs RCB',
      dom: 'April 28',
      venue: 'Ahmedabad',
      time: '3:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Chennai Super Kings vs Sunrisers Hyderabad',
      match_no: 46,
      fixture: 'CSK vs SRH',
      dom: 'April 28',
      venue: 'Chennai',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Kolkata Knight Riders vs Delhi Capitals',
      match_no: 47,
      fixture: 'KKR vs DC',
      dom: 'April 29',
      venue: 'Kolkata',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Lucknow Super Giants vs Mumbai Indians',
      match_no: 48,
      fixture: 'LSG vs MI',
      dom: 'April 30',
      venue: 'Lucknow',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Chennai Super Kings vs Punjab Kings',
      match_no: 49,
      fixture: 'CSK vs PBKS',
      dom: 'May 1',
      venue: 'Chennai',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Sunrisers Hyderabad vs Rajasthan Royals',
      match_no: 50,
      fixture: 'SRH vs RR',
      dom: 'May 2',
      venue: 'Hyderabad',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Mumbai Indians vs Kolkata Knight Riders',
      match_no: 51,
      fixture: 'MI vs KKR',
      dom: 'May 3',
      venue: 'Mumbai',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Royal Challengers Bangalore vs Gujarat Titans',
      match_no: 52,
      fixture: 'RCB vs GT',
      dom: 'May 4',
      venue: 'Bengaluru',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Punjab Kings vs Chennai Super Kings',
      match_no: 53,
      fixture: 'PBKS vs CSK',
      dom: 'May 5',
      venue: 'Dharamsala',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Lucknow Super Giants vs Kolkata Knight Riders',
      match_no: 54,
      fixture: 'LSG vs KKR',
      dom: 'May 5',
      venue: 'Lucknow',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Mumbai Indians vs Sunrisers Hyderabad',
      match_no: 55,
      fixture: 'MI vs SRH',
      dom: 'May 6',
      venue: 'Mumbai',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Delhi Capitals vs Rajasthan Royals',
      match_no: 56,
      fixture: 'DC vs RR',
      dom: 'May 7',
      venue: 'Delhi',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Sunrisers Hyderabad vs Lucknow Super Giants',
      match_no: 57,
      fixture: 'SRH vs LSG',
      dom: 'May 8',
      venue: 'Hyderabad',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Punjab Kings vs Royal Challengers Bangalore',
      match_no: 58,
      fixture: 'PBKS vs RCB',
      dom: 'May 9',
      venue: 'Dharamsala',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Gujarat Titans vs Chennai Super Kings',
      match_no: 59,
      fixture: 'GT vs CSK',
      dom: 'May 10',
      venue: 'Ahmedabad',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Kolkata Knight Riders vs Mumbai Indians',
      match_no: 60,
      fixture: 'KKR vs MI',
      dom: 'May 11',
      venue: 'Kolkata',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Chennai Super Kings vs Rajasthan Royals',
      match_no: 61,
      fixture: 'CSK vs RR',
      dom: 'May 12',
      venue: 'Chennai',
      time: '3:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Royal Challengers Bangalore vs Delhi Capitals',
      match_no: 62,
      fixture: 'RCB vs DC',
      dom: 'May 12',
      venue: 'Bengaluru',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Gujarat Titans vs Kolkata Knight Riders',
      match_no: 63,
      fixture: 'GT vs KKR',
      dom: 'May 13',
      venue: 'Ahmedabad',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Delhi Capitals vs Lucknow Super Giants',
      match_no: 64,
      fixture: 'DC vs LSG',
      dom: 'May 14',
      venue: 'Delhi',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Rajasthan Royals vs Punjab Kings',
      match_no: 65,
      fixture: 'RR vs PBKS',
      dom: 'May 15',
      venue: 'Guwahati',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Sunrisers Hyderabad vs Gujarat Titans',
      match_no: 66,
      fixture: 'SRH vs GT',
      dom: 'May 16',
      venue: 'Hyderabad',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Mumbai Indians vs Lucknow Super Giants',
      match_no: 67,
      fixture: 'MI vs LSG',
      dom: 'May 17',
      venue: 'Mumbai',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Royal Challengers Bangalore vs Chennai Super Kings',
      match_no: 68,
      fixture: 'RCB vs CSK',
      dom: 'May 18',
      venue: 'Bengaluru',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Sunrisers Hyderabad vs Punjab Kings',
      match_no: 69,
      fixture: 'SRH vs PBKS',
      dom: 'May 19',
      venue: 'Hyderabad',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
    {
      api_id: '',
      match_api_name: 'Rajasthan Royals vs Kolkata Knight Riders',
      match_no: 70,
      fixture: 'RR vs KKR',
      dom: 'May 19',
      venue: 'Guwahati',
      time: '7:30 PM IST',
      winning_team: '',
      team1_score: 0,
      team2_score: 0,
    },
  ];

  private apiUrl =
    'https://api.cricapi.com/v1/cricScore?apikey=6b92c4a6-47fb-4764-b42a-9278f3278d63';
  private lastFetchedDataKey = 'lastFetchedData';
  private lastFetchedTimestampKey = 'lastFetchedTimestamp';

  constructor(private http: HttpClient) {
    // Fetch initial data when the service is instantiated
    this.updateMatchScoresAndWinners();
    interval(7 * 60 * 1000) // 7 minutes in milliseconds
      .subscribe(() => {
        const currentTime = new Date();
        const currentHour = currentTime.getUTCHours() + 5.5; // IST is UTC+5.5
        const currentMinute = currentTime.getUTCMinutes();
        if (
          (currentHour === 15 && currentMinute >= 30) ||
          (currentHour > 15 && currentHour < 24) ||
          (currentHour === 1 && currentMinute <= 0)
        ) {
          this.updateMatchScoresAndWinners();
        } else {
          console.log('--- Not fetching the data ---');
        }
      });
  }

  private updateMatchScoresAndWinners(): void {
    const lastFetchedTimestamp = localStorage.getItem(
      this.lastFetchedTimestampKey
    );
    const currentTime = new Date().getTime();

    // Check if 15 minutes have passed since the last fetch
    if (
      !lastFetchedTimestamp ||
      currentTime - parseInt(lastFetchedTimestamp, 10) >= 7 * 60 * 1000
    ) {
      this.http.get<any>(this.apiUrl).subscribe(
        (data) => {
          localStorage.setItem(
            this.lastFetchedDataKey,
            JSON.stringify(data.data)
          );
          localStorage.setItem(
            this.lastFetchedTimestampKey,
            currentTime.toString()
          );
          console.log('fresh fetch: ', lastFetchedTimestamp);
          this.updateMatchesWithApiData(data.data);
        },
        (error) => {
          alert('FAILED TO FETCH THE MATCH RESULT DATA'), console.log(error);
        }
      );
    } else {
      // Use the data from local storage if 15 minutes haven't passed
      const data = JSON.parse(localStorage.getItem(this.lastFetchedDataKey)!);
      console.log('already fetched at: ', lastFetchedTimestamp);
      this.updateMatchesWithApiData(data);
    }
  }

  private updateMatchesWithApiData(data: any): void {
    this.matches.forEach((match) => {
      const apiMatch = data.find(
        (apiMatch: any) => apiMatch.id === match.api_id
      );
      if (apiMatch) {
        this.generalizeApiData(apiMatch, match);
        match.team1_score = this.extractScore(apiMatch.t1s);
        match.team2_score = this.extractScore(apiMatch.t2s);
        match.winning_team = !apiMatch.status.includes('won') ? '' : this.determineWinner(match.fixture, match.team1_score, match.team2_score);
        match.status = {
          t1: apiMatch.t1,
          t1s : apiMatch.t1s,
          t2: apiMatch.t2,
          t2s : apiMatch.t2s,
          status: apiMatch.status,
        }
      }
    });
  }

  private extractScore(scoreString: string): number {
    const score = scoreString.split('/')[0];
    return parseInt(score, 10);
  }

  private determineWinner(
    fixture: string,
    team1Score: number,
    team2Score: number
  ): string {
    return team1Score > team2Score
      ? fixture.split(' ')[0]
      : fixture.split(' ')[2];
  }

  private generalizeApiData(apiMatch: any, localMatch: any) {
    const localTeam2 = localMatch.fixture.split(' ')[2];

    // Check if t1 from API matches localTeam1 or localTeam2
    if (apiMatch.t1.includes(localTeam2)) {
      // If t1 matches localTeam1 or localTeam2, swap t1 and t2
      [apiMatch.t1, apiMatch.t2] = [apiMatch.t2, apiMatch.t1];
      [apiMatch.t1s, apiMatch.t2s] = [apiMatch.t2s, apiMatch.t1s];
    }
  }
}
