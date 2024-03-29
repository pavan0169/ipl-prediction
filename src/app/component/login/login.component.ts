import { Component, inject } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { DashboardService } from '../../shared/dashboard.service';
import { FirestoreServiceService } from '../../shared/firestore-service.service';
import { MatchesService } from '../../shared/matches.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  dashboardService = inject(DashboardService)
  firestoreService = inject(FirestoreServiceService)
  matchService = inject(MatchesService)

  dataSource: any[] = []
  displayedColumns: string[] = [
    'match_no',
    'match',
    'winning_team',
    'team1_score',
    'team2_score'
  ];

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private auth: AuthService,
    ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: () => {
          this.router.navigate(['/match-prediction']);
        }, error: (err) => {
          alert(err.code);
        }
      });
    }
  }

  resetForm() {
    this.loginForm.reset();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToDashboard() {
    this.firestoreService.getAllDocuments().subscribe((data) => {
      this.matchService.playerPredictionData$.next(data);
      localStorage.setItem('predictionData', JSON.stringify(data));
    });
    this.router.navigate(['/home']);
  }

}
