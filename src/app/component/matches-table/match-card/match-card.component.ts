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
  @Input() displayName: any;
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

  alreadyPredicted: boolean = false;
  predictedData: any = null;
  yetToOpen: boolean = false;
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
    this.match_id = this.displayName + '_' + this.match.match_no + '_' + this.match.fixture.toLowerCase().replace(/\s+/g, '');
    this.custom_id = `${this.match_id}_${this.uid}`;
    if (this.isDateBeforeNextSunday(this.match.dom)) {
      this.updateData(this.custom_id);
    } else {
      this.yetToOpen = true;
      this.formGroup.disable();
    }
  }

  updateData(cid: string) {
    this.fireStoreService.getDocumentById(cid).subscribe((predicted_data) => {
      if (predicted_data) {
        this.alreadyPredicted = true;
        this.predictedData = predicted_data;
        this.formGroup.disable();
      }
    });
  }

  onSubmit() {
    if (this.formGroup.valid && this.uid && !this.alreadyPredicted) {
      const newData = {
        match_no: this.match.match_no,
        name: this.displayName,
        team_1_pred_scr: this.team1PredScoreControl.value,
        team_2_pred_scr: this.team2PredScoreControl.value,
        team_pred: this.teamControl.value,
        user_id: this.uid,
      };
      this.fireStoreService
        .addCustomDocument(this.custom_id!, newData)
        .subscribe((data) => {
          this.updateData(data);
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
