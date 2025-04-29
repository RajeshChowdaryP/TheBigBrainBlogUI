import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/services/auth.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user?: User;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (res) => {
        this.user = res;

      },
      error: (error) => {
        console.error('Error fetching user data', error);
      }
    });

    this.user = this.authService.getUser(); // Get user data from local storage
  }

  onLogout() {
    this.authService.logout();
    this.route.navigateByUrl('/');
    this.user = undefined; // Clear user data from the navbar
  }

}
