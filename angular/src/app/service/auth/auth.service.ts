import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MinimalUser } from 'src/app/model/minimal-user';
import { environment } from 'src/environments/environment';

interface ILoginData {
  accessToken: string;
  refreshToken: string;
  user: MinimalUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = environment.apiUrl;

  private _minimalUser = new BehaviorSubject<MinimalUser | null>(null);

  constructor(private http: HttpClient) {}

  login(personLog: any): Observable<ILoginData> {
    return this.http.post<ILoginData>(`${this.BASE_URL}login`, personLog).pipe(
      tap((loginData) => {
        if (loginData.accessToken && loginData.refreshToken) {
          localStorage.setItem('accessToken', loginData.accessToken);
          localStorage.setItem('refreshToken', loginData.refreshToken);

          this._minimalUser.next(loginData.user);
        }
      })
    );
  }

  refresh(): Observable<{ accessToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http
      .post<{ accessToken: string }>(`${this.BASE_URL}refresh`, {
        refreshToken,
      })
      .pipe(
        tap((tokenData) => {
          if (tokenData && tokenData.accessToken) {
            localStorage.setItem('accessToken', tokenData.accessToken);
          }
        })
      );
  }

  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');

    this._minimalUser.next(null);

    this.http
      .post<void>(`${this.BASE_URL}logout`, { refreshToken })
      .subscribe();
  }

  getUser(): BehaviorSubject<MinimalUser | null> {
    return this._minimalUser;
  }

  me(): Observable<{ user: MinimalUser }> {
    return this.http.get<{ user: MinimalUser }>(`${this.BASE_URL}me`).pipe(
      tap((user) => {
        this._minimalUser.next(user.user);
      })
    );
  }
}
