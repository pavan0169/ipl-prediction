import { AuthService } from './shared/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatchesTableComponent } from './component/matches-table/matches-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatchesTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  authService = inject(AuthService)
  title = 'IPL Predictions';

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email,
          displayName: user.displayName,
          userId: user.uid,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      localStorage.setItem('uid', this.authService.currentUserSig().userId);
      localStorage.setItem('email', this.authService.currentUserSig().email);
      localStorage.setItem('displayName', this.authService.currentUserSig().displayName);
      console.log(this.authService.currentUserSig());
    });
  }
}
