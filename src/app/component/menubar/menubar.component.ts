import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {

  authService = inject(AuthService)
  router = inject(Router)

  isOpen: boolean = false;

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['login']);
      }, error: (err) => {
        alert(err.code);
      }
    });;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

}
