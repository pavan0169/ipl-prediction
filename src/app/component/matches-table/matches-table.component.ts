import { Component } from '@angular/core';
import { MatchesService } from '../../shared/matches.service';
import { MatchCardComponent } from './match-card/match-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matches-table',
  standalone: true,
  imports: [CommonModule, MatchCardComponent],
  templateUrl: './matches-table.component.html',
  styleUrl: './matches-table.component.css'
})
export class MatchesTableComponent {

  constructor(public matches: MatchesService) {}

}
