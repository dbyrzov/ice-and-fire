import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { BACKEND_URL } from '../../../common/api.constants';
import { UserProfile } from '../../../store/profile/profile.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  loadToken(): Observable<UserProfile | null> {
    const token = this.getToken();
    if (this.checkTokenValidity(token)) {
      return this.getProfile();
    }
    return of(null);
  }

  login(
    username: string,
    password: string
  ): Observable<{ token: string; user: UserProfile }> {
    return this.http.post<{ token: string; user: UserProfile }>(
      `${BACKEND_URL}/login`,
      { username, password }
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${BACKEND_URL}/profile`);
  }

  isTokenValid(): boolean {
    return this.checkTokenValidity(this.getToken());
  }

  getToken() {
    return localStorage.getItem('token');
  }

  checkTokenValidity(token: string | null): boolean {
    if (!token) return false;

    const decoded: any = jwt_decode.jwtDecode(token);
    const expiration = decoded.exp * 1000;

    return Date.now() < expiration;
  }
}
