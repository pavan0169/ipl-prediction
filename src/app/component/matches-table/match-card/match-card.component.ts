import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

interface Team {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-match-card',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, MatDividerModule, MatButtonModule],
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.css'
})
export class MatchCardComponent implements OnInit {
  @Input() match: any;

  public selectTeam: Team[] = [];
  public team1: string = '';
  public team2: string = '';

  teamControl: FormControl = new FormControl('', Validators.required);
  pattern =  /^(0|[1-9]\d{0,2})$/;
  team1PredScoreControl: FormControl = new FormControl('', [Validators.required, Validators.pattern(this.pattern)]);
  team2PredScoreControl: FormControl = new FormControl('', [Validators.required, Validators.pattern(this.pattern)]);

  formGroup: FormGroup;

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
    this.selectTeam.push({value: this.team1, viewValue: this.team1});
    this.selectTeam.push({value: this.team2, viewValue: this.team2});
  }

  onSubmit() {
    if (this.formGroup.valid) {
      // Form is valid, handle submission here
      const selectedTeam = this.teamControl.value;
      const team1PredScore = this.team1PredScoreControl.value;
      const team2PredScore = this.team2PredScoreControl.value;

      console.log('Selected Team:', selectedTeam);
      console.log(this.team1, 'Predicted Score:', team1PredScore);
      console.log(this.team2, 'Predicted Score:', team2PredScore);

      // Reset the form after submission if needed
      this.formGroup.reset();
    } else {
      // Form is invalid, mark all controls as touched to display error messages
      this.formGroup.markAllAsTouched();
    }
  }
}
