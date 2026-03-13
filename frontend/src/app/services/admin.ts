import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API = 'http://localhost:3000';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class Admin {
  constructor(private http: HttpClient) {}

  private authHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getUsers() {
    return this.http.get<User[]>(`${API}/admin/users`, { headers: this.authHeaders() });
  }

  updateRole(userId: number, role: string) {
    return this.http.put<User>(`${API}/admin/users/${userId}/role`, { role }, { headers: this.authHeaders() });
  }
}
