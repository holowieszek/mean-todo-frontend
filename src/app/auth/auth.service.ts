import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private url = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  register(data: any) {
    const userData: AuthData = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    };

    this.http.post(this.url + '/register', userData)
      .subscribe((response) => {
        this.router.navigate(['/']);
        this.authStatusListener.next(false);
      }, err => {
        this.authStatusListener.next(false);
      });
  }

  login(data: any) {
    const userData = {
      email: data.email,
      password: data.password
    };

    this.http.post<{ id: string, token: string }>(this.url + '/login', userData)
      .subscribe(result => {
        const token = result.token;
        this.token = token;

        if (token) {
          this.isAuthenticated = true;
          this.userId = result.id;
          this.authStatusListener.next(true);
          this.saveAuthData(result.token, this.userId);
          this.router.navigate(['/tasks']);
        }
      }, err => {
        this.authStatusListener.next(false);
      });
  }

  logoutUser() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  public autoAuth() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }

    this.token = authInformation.token;
    this.userId = authInformation.userId;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token) {
      return;
    }

    return {
      token: token,
      userId: userId
    };
  }
}
