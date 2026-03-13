import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string; name: string; role: string }>(
      `${API}/auth/login`,
      { email, password }
    ).pipe(tap(res => this.store(res)));
  }

  register(name: string, email: string, password: string) {
    return this.http.post<{ token: string; name: string; role: string }>(
      `${API}/auth/register`,
      { name, email, password }
    ).pipe(tap(res => this.store(res)));
  }

  private store(res: { token: string; name: string; role: string }) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('name', res.name);
    localStorage.setItem('role', res.role);
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  getName(): string {
    return localStorage.getItem('name') || '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }
}
