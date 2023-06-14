import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '@auth0/auth0-angular';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticatedUser: Subject<boolean> = new Subject();
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  registerUser(data = {}) {
    return this.http.post<any>(`${baseUrl}/api/auth/register`, data).pipe();
  }

  loginUser(data = {}) {
    return this.http.post<any>(`${baseUrl}/api/auth/login`, data);
  }

  checkUserName(userName: any) {
    return this.http.get<any>(`${baseUrl}/api/auth/checkUserName/${userName}`);
  }

  createUserName(id: any, username: any) {
    return this.http.put<any>(`${baseUrl}/api/auth/createUserName/${id}`, {
      username,
    });
  }
  loginUserForSSo(data = {}) {
    return this.http.post<any>(`${baseUrl}/api/auth/loginWithSSO`, data);
  }

  setToken(token: any) {
    localStorage.setItem('token', JSON.stringify(token));
    this.isAuthenticatedUser.next(true);
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token')||'{}');
  }
  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    const detail = this.getProfile();
    if (detail.ssoEnabled) {
      this.auth.logout();
      localStorage.removeItem('token');
      this.isAuthenticatedUser.next(false);
    } else {
      localStorage.removeItem('token');
      this.isAuthenticatedUser.next(false);
      this.router.navigate(['/login']);
    }
  }

  getProfile() {
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(localStorage.getItem('token')||'{}');
    return decoded;
  }

  getProfileDetail(data: any) {
    return this.http.post<any>(`${baseUrl}/api/auth/getProfile`,data);
  }

  getProfileByUsername(data: any) {
    return this.http.get<any>(`${baseUrl}/api/auth/getProfileByUserName/${data}`);
  }

  sendLink(data = {}) {
    return this.http.post<any>(`${baseUrl}/api/auth/forgot-password`, data);
  }

  resetPassword(data = {}) {
    return this.http.post<any>(`${baseUrl}/api/auth/reset-password`, data);
  }
}
