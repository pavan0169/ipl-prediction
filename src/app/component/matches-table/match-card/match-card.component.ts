import { DashboardService } from './../../../shared/dashboard.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../shared/auth.service';
import { FirestoreServiceService } from '../../../shared/firestore-service.service';
import { MatchesService } from '../../../shared/matches.service';

interface Team {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-match-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.css',
})
export class MatchCardComponent implements OnInit {
  @Input() match: any;

  public selectTeam: Team[] = [];
  public team1: string = '';
  public team2: string = '';

  teamControl: FormControl = new FormControl('', Validators.required);
  pattern = /^(0|[1-9]\d{0,2})$/;
  team1PredScoreControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.pattern),
  ]);
  team2PredScoreControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.pattern),
  ]);

  formGroup: FormGroup;
  fireStoreService = inject(FirestoreServiceService);
  authService = inject(AuthService);
  dashboardService = inject(DashboardService);
  subDisp: string = '';
  subUid: string = '';
  match_id: string | null = null;
  custom_id: string | null = null;
  closingDatetime: Date | null | undefined;

  predictionQuotaCompleted: boolean = false;
  predictedData: any = null;
  yetToOpen: boolean = false;
  matchClosed: boolean = false;
  matchService = inject(MatchesService);

  constructor() {
    this.formGroup = new FormGroup({
      teamControl: this.teamControl,
      team1PredScoreControl: this.team1PredScoreControl,
      team2PredScoreControl: this.team2PredScoreControl,
    });
  }

  public ngOnInit() {
    this.team1 = this.match.fixture.split(' ')[0];
    this.team2 = this.match.fixture.split(' ')[2];
    this.selectTeam.push({ value: this.team1, viewValue: this.team1 });
    this.selectTeam.push({ value: this.team2, viewValue: this.team2 });
    this.closingDatetime = this.getClosingDateTime(this.match.dom, this.match.time);
    this.matchClosed = this.getClosedStatus();
    if (this.matchClosed) {
      this.formGroup.disable();
    }
    this.authService.user$.subscribe(user => {
      this.subDisp = user?.displayName!;
      this.subUid = user?.uid!;
      this.match_id = this.subDisp + '_' + this.match.match_no + '_' + this.match.fixture.toLowerCase().replace(/\s+/g, '');
      this.custom_id = `${this.match_id}_${this.subUid}`;
      if (this.dashboardService.isDateBeforeNextSunday(this.match.dom)) {
        this.updateData(this.custom_id);
      } else {
        this.yetToOpen = true;
        this.formGroup.disable();
      }
    })
  }

  updateData(cid: string) {
        this.fireStoreService.getDocumentById(cid).subscribe((predicted_data) => {
      if (predicted_data) {
        this.predictedData = predicted_data;
        if (this.predictedData.updated_times >= 2) {
          this.formGroup.disable();
          this.predictionQuotaCompleted = true;
        }
      }
    });
  }

  onSubmit() {
    if (this.formGroup.valid && this.subUid && !this.predictionQuotaCompleted) {
      const newData = {
        match_no: this.match.match_no,
        name: this.subDisp,
        team_1_pred_scr: this.team1PredScoreControl.value,
        team_2_pred_scr: this.team2PredScoreControl.value,
        team_pred: this.teamControl.value,
        user_id: this.subUid,
        updated_times: this.predictedData ? 2 : 1,
      };
      this.fireStoreService
        .addCustomDocument(this.custom_id!, newData)
        .subscribe((data) => {
          this.updateData(data);
          alert('Your prediction is saved successfully! All the best.');
        });
      // Reset the form after submission if needed
      this.formGroup.reset();
    } else if (this.predictionQuotaCompleted) {
      this.formGroup.reset();
    } else {
      alert('Please login and start your prediction');
      this.formGroup.reset();
    }
  }

  getClosingDateTime(dom: string, time: string) {
    const currentYear = new Date().getFullYear();
    const istDateTimeString = `${dom} ${currentYear} ${time}`;
    const istDateTime = new Date(istDateTimeString.replace(/-/g, '/').replace('IST', '+0530'));
    istDateTime.setHours(istDateTime.getHours() - 1);
  //   const localTime = istDateTime.toLocaleString(undefined, {
  //     timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  // });
    return new Date(istDateTime);
  }

  getClosedStatus() {
    return new Date() >= this.closingDatetime!;
  }


}
