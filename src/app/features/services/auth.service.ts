import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { LoginRequestInfo } from 'src/app/model/LoginRequestInfo';
import { LoginResponse } from 'src/app/model/LoginResponse';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private route: Router, private cookieService: CookieService
  ) { }

  login(LoginRequest: LoginRequestInfo): Observable<LoginResponse> {
    // Simulate a login process
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}Auth/Login`, LoginRequest);
  }

  Register(LoginRequest: LoginRequestInfo): Observable<any> {
    // Simulate a login process
    return this.http.post(`${environment.apiBaseUrl}Register`, LoginRequest);
  }

  setUser(user: User): void{
    // emit the user object to the BehaviorSubject
    this.user$.next(user);

    // localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    // Return the BehaviorSubject as an observable
    return this.user$.asObservable();
  }

  getUser(): User | undefined {
    // Check if user is already in local storage
    const userEmail = localStorage.getItem('user-email');
    const userRoles = localStorage.getItem('user-roles');
    if (userEmail && userRoles) {
      const user: User = {
        email: userEmail,
        roles: userRoles.split(',')
      };
      return user; // Return the user object
    }
    return undefined; // Return undefined if no user is found in local storage
  }

  logout(): void {
    // Clear user data from local storage
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.user$.next(undefined); // Emit undefined to clear the user object in the BehaviorSubject
  }

}
