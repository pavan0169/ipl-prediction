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
  @Input() currentUser: any;
  @Input() uid: any;

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
  match_id: string | null = null;
  custom_id: string | null = null;
  allPredictionData: any[] = [];
  alreadyPredicted: boolean = false;
  predictedData: any = null;
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

    this.fireStoreService.getAllDocuments().subscribe((docs) => {
      this.allPredictionData = docs;
    });
  }

  onSubmit() {
    this.match_id =
      this.currentUser +
      '_' +
      this.match.match_no +
      '_' +
      this.match.fixture.toLowerCase().replace(/\s+/g, '');
    this.custom_id = `${this.match_id}_${this.uid}`;
    console.log('Match id', this.custom_id);
    this.allPredictionData.forEach((doc) => {
      if (doc.id === this.custom_id) {
        this.alreadyPredicted = true;
        this.predictedData = doc;
        return;
      }
    });
    if (this.formGroup.valid && this.uid && !this.alreadyPredicted) {
      const newData = {
        match_no: this.match.match_no,
        name: this.currentUser,
        team_1_pred_scr: this.team1PredScoreControl.value,
        team_2_pred_scr: this.team2PredScoreControl.value,
        team_pred: this.teamControl.value,
        user_id: this.uid,
      };
      this.fireStoreService
        .addCustomDocument(this.custom_id!, newData)
        .subscribe((data) => {
          alert('Your prediction is saved successfully! All the best.');
        });
      // Reset the form after submission if needed
      this.formGroup.reset();
    } else if (this.alreadyPredicted) {
      this.formGroup.reset();
    } else {
      alert('Please login and start your prediction');
      this.formGroup.reset();
    }
  }
}
