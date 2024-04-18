import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthenticateResponse , UserModel } from '../models/dtos';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'https://w320028.ferozo.com';

  constructor(private http: HttpClient) { }

  login(user: UserModel): Observable<any> {
    return this.http.post<AuthenticateResponse>(`${this.baseUrl}/api/Auth/login`, user).pipe(map(x =>
      localStorage.setItem('currentUser', JSON.stringify(x.personal_token))));
      

  }

  logout() {
    localStorage.removeItem('currentUser');
  }
  get isUserLoggedIn(): boolean {
    const tokenData = localStorage.getItem('currentUser');
    if (!tokenData) {
      return false;
    } else {
      return true
    }
  }
}


