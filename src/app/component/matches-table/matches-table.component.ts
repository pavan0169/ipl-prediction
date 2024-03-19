import { Component, OnInit, inject } from '@angular/core';
import { MatchesService } from '../../shared/matches.service';
import { MatchCardComponent } from './match-card/match-card.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
import { MenubarComponent } from '../menubar/menubar.component';
import { FirestoreServiceService } from '../../shared/firestore-service.service';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-matches-table',
  standalone: true,
  imports: [CommonModule, MatchCardComponent, MenubarComponent, ScrollToTopComponent],
  templateUrl: './matches-table.component.html',
  styleUrl: './matches-table.component.css'
})
export class MatchesTableComponent implements OnInit{

  constructor(public matches: MatchesService) {}

  ngOnInit(): void {
  }

}
