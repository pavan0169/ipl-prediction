import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(public router: Router,) {  }

  showMatchBreakup() {
    this.router.navigate(['/match-cards']);
  }

  showPredictions() {
    this.router.navigate(['/dashboard']);
  }

  showPointsTable() {
    this.router.navigate(['/points-table']);
  }

  showWeeklyWinners() {
    this.router.navigate(['/weekly-winners']);
  }
}
