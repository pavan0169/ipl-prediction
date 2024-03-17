import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatchesTableComponent } from './component/matches-table/matches-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatchesTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IPL Predictions';
}
