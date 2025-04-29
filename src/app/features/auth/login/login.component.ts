import { Component, inject, OnInit } from '@angular/core';
import { LoginRequestInfo } from 'src/app/model/LoginRequestInfo';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  user: LoginRequestInfo = {
    email: '',
    password: ''
  };

  showPassword: boolean = false;
  confirmPassword: string = '';

  private authService = inject(AuthService);
  constructor(private route: Router, private cookieService: CookieService) { }

  ngOnInit() {}

  onSubmit() {
    // Handle form submission logic here
    this.authService.login(this.user).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        //npm install ngx-cookie-service@17.0.0 --save
        // Set the token in local storage or cookies
        this.cookieService.set('Authorization', `Bearer: ${response.token}`, undefined, '/', undefined, true, 'Strict');
        
        // Set loginStatus
        this.authService.setUser({
          email: this.user.email,
          roles: response.roles
        });

        // Redirect to the home page or another page
        this.route.navigateByUrl('');
      },
      error: (error) => {
        console.error('Login failed', error);
        // Handle login error (e.g., show an error message)
      }
    });
  }

}
