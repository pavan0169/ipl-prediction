import { Component, OnInit, inject } from '@angular/core';
import { MatchesService } from '../../shared/matches.service';
import { MatchCardComponent } from './match-card/match-card.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
import { MenubarComponent } from '../menubar/menubar.component';
import { FirestoreServiceService } from '../../shared/firestore-service.service';

@Component({
  selector: 'app-matches-table',
  standalone: true,
  imports: [CommonModule, MatchCardComponent, MenubarComponent],
  templateUrl: './matches-table.component.html',
  styleUrl: './matches-table.component.css'
})
export class MatchesTableComponent implements OnInit{
  authService = inject(AuthService);
  fireStoreService = inject(FirestoreServiceService);
  displayName: string = '';
  uid: string = '';

  constructor(public matches: MatchesService) {}

  ngOnInit(): void {
    this.displayName = localStorage.getItem('displayName')!
    this.uid = localStorage.getItem('uid')!
  }

}
