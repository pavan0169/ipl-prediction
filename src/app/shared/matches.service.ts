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
      winning_team: 'LSG',
      team1_score: 153,
      team2_score: 181,
    },
    {
      api_id: '061bbd29-796d-4f46-a11a-c4f07d516a51',
      match_api_name: 'Delhi Capitals vs Kolkata Knight Riders',
      match_no: 16,
      fixture: 'DC vs KKR',
      dom: 'April 3',
      venue: 'Visakhapatnam',
      time: '7:30 PM IST',
      winning_team: 'KKR',
      team1_score: 166,
      team2_score: 272,
    },
    {
      api_id: '9d473b5d-7c92-4bf1-b49d-2f16433841d1',
      match_api_name: 'Gujarat Titans vs Punjab Kings',
      match_no: 17,
      fixture: 'GT vs PBKS',
      dom: 'April 4',
      venue: 'Ahmedabad',
      time: '7:30 PM IST',
      winning_team: 'PBKS',
      team1_score: 199,
      team2_score: 200,
    },
    {
      api_id: '8f87aa4a-5de2-41ab-8f2c-72ce339adcdd',
      match_api_name: 'Sunrisers Hyderabad vs Chennai Super Kings',
      match_no: 18,
      fixture: 'SRH vs CSK',
      dom: 'April 5',
      venue: 'Hyderabad',
      time: '7:30 PM IST',
      winning_team: 'SRH',
      team1_score: 166,
      team2_score: 165,
    },
    {
      api_id: 'c70f7161-236c-4cb9-bad9-cdcbc1061a95',
      match_api_name: 'Rajasthan Royals vs Royal Challengers Bangalore',
      match_no: 19,
      fixture: 'RR vs RCB',
      dom: 'April 6',
      venue: 'Jaipur',
      time: '7:30 PM IST',
      winning_team: 'RR',
      team1_score: 189,
      team2_score: 183,
    },
    {
      api_id: 'd50a0726-24b5-4023-be51-5fc4d89c75ff',
      match_api_name: 'Mumbai Indians vs Delhi Capitals',
      match_no: 20,
      fixture: 'MI vs DC',
      dom: 'April 7',
      venue: 'Mumbai',
      time: '3:30 PM IST',
      winning_team: 'MI',
      team1_score: 234,
      team2_score: 205,
    },
    {
      api_id: '8aac46d6-fdd5-453b-afbf-01b12fda1fc9',
      match_api_name: 'Lucknow Super Giants vs Gujarat Titans',
      match_no: 21,
      fixture: 'LSG vs GT',
      dom: 'April 7',
      venue: 'Lucknow',
      time: '7:30 PM IST',
      winning_team: 'LSG',
      team1_score: 163,
      team2_score: 130,
    },
    {
      api_id: 'a050895c-7d5b-405e-a369-a645d55def08',
      match_api_name: 'Chennai Super Kings vs Kolkata Knight Riders',
      match_no: 22,
      fixture: 'CSK vs KKR',
      dom: 'April 8',
      venue: 'Chennai',
      time: '7:30 PM IST',
      winning_team: 'CSK',
      team1_score: 141,
      team2_score: 137,
    },
    {
      api_id: '53571720-fa11-4c77-b002-38bd4b873ee9',
      match_api_name: 'Punjab Kings vs Sunrisers Hyderabad',
      match_no: 23,
      fixture: 'PBKS vs SRH',
      dom: 'April 9',
      venue: 'Mohali',
      time: '7:30 PM IST',
      winning_team: 'SRH',
      team1_score: 180,
      team2_score: 182,
    },
    {
      api_id: 'f6e5960e-9836-4ca3-bdde-ef2fa1c8c8d0',
      match_api_name: 'Rajasthan Royals vs Gujarat Titans',
      match_no: 24,
      fixture: 'RR vs GT',
      dom: 'April 10',
      venue: 'Jaipur',
      time: '7:30 PM IST',
      winning_team: 'GT',
      team1_score: 196,
      team2_score: 199,
    },
    {
      api_id: 'ccceb1a6-d1f1-4a4e-ab25-df8204fcad3b',
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
      api_id: '047ce8c5-9727-46a9-9e18-f9efa6b61e0d',
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
      api_id: '5b968eee-d478-4181-9a20-6c8b51611568',
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
      api_id: '2bd0d867-d19c-49d2-af02-d6bece47264c',
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
      api_id: '18998bfa-aabc-48e3-b73e-d15f56493fa6',
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
      api_id: '9fa80370-0f62-4e87-ba77-1d1e925b7281',
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
      api_id: '0a606b80-7aa1-4ce8-b4c1-e0de800b3a93',
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
      api_id: '5cecee1b-6cb4-454d-bb15-bc92477e77f3',
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
      api_id: '444e1d3a-e6b3-455a-a9bc-02814d32f65d',
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
      api_id: '7403ce3f-97bb-49ec-a81b-4c9de7a05304',
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
      api_id: 'bd9c910e-0166-41ee-a507-9503bc9ad103',
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
      api_id: '6428c90a-d7f5-4b12-a4d0-3456e0c76eb1',
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
      api_id: '1acfc8ae-c13e-4cf4-9be9-3eec914c3913',
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
      api_id: '75b6c439-a160-4ffb-a21f-e0f9bd08b674',
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
      api_id: '56a64184-8386-4d66-9e40-d62e49bef2fb',
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
      api_id: '04ac4f8c-0e67-4486-88c9-5d3550dbd3b0',
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
      api_id: '7f238703-ca73-42e5-9759-f8295e0ba014',
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
      api_id: 'e908e068-d198-4c25-8907-5383018ae984',
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
      api_id: 'e2d7b99c-ef4b-4d3f-8ca2-84a4069dab9f',
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
      api_id: '7c72cb86-4a16-49a5-b754-6f6e5c162a41',
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
      api_id: '14974e63-3022-406d-9287-23c6084ae9ea',
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
      api_id: 'a4727d80-0b3b-4bc8-94ed-3836d0027809',
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
      api_id: '2bee7b6f-66f0-438d-9513-553e882f9cdf',
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
      api_id: '64fc2e09-d415-42d4-a0f8-7e3f237f4f5c',
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
      api_id: '419929c7-585f-4489-8a0e-20a1dbab36e7',
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
      api_id: 'a3410d30-5eb3-4737-abdb-fcf5b798c8cd',
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
      api_id: 'afc6bbd4-630b-4954-9005-dba9b80405d3',
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
      api_id: '1c9d100d-87b0-4147-b3b8-2cf7c59af0e3',
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
      api_id: 'caefe54a-b74d-4c76-a084-8ba36d2d8561',
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
      api_id: '770b4218-4ab1-4224-808b-8df40e54e484',
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
      api_id: '2f1b529a-efdc-43e2-8c0f-c8b0c86ff99c',
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
      api_id: '89149d34-79c9-4601-8a5b-90fd0587897a',
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
      api_id: '792ed165-d3b1-456f-b281-19bcfcf2608f',
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
      api_id: 'f4ffb08a-4d09-4c38-9e16-f9aa32fff698',
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
      api_id: '2f4d4975-4780-49b6-ae64-86ef4ec6d737',
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
      api_id: 'ccfdda50-c391-4012-a741-93717a7705d6',
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
      api_id: 'e17d7e17-f69a-40e1-8e54-fcfe4c1709a0',
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
      api_id: '5027af00-3757-4513-8289-c5bab2d9d8ab',
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
      api_id: '8c6e8c82-60fd-478d-8582-58c4cf8009c4',
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
      api_id: 'b45b8032-fbb8-4793-b783-dbe640ce954f',
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
      api_id: '7fec4432-07ef-46c3-b120-1d42fdcdc9a0',
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
      api_id: 'de20502c-67d9-41f2-9171-fdfe0b5ccb3f',
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
      api_id: 'd949acff-ab82-476c-bb77-a42d232aa750',
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
      api_id: '043bb613-d8ee-4287-9ccb-a298a0f9c389',
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
      api_id: '3451270e-c250-4497-8be3-3479f18d758e',
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
      api_id: '92121777-d96d-4db8-865f-dda98e85ea85',
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
        match.winning_team = !apiMatch.status.includes('won')
          ? ''
          : this.determineWinner(
              match.fixture,
              match.team1_score,
              match.team2_score
            );
        match.status = {
          t1: apiMatch.t1,
          t1s: apiMatch.t1s,
          t2: apiMatch.t2,
          t2s: apiMatch.t2s,
          status: apiMatch.status,
        };
      }
    });
  }

  private extractScore(scoreString: string): number {
    const score = scoreString.split('/')[0];
    return score ? parseInt(score, 10) : 0;
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
