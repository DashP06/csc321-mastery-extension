import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API = 'http://localhost:3000';

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author?: { name: string };
}

@Injectable({
  providedIn: 'root',
})
export class Posts {
  constructor(private http: HttpClient) {}

  private authHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAllPosts() {
    return this.http.get<Post[]>(`${API}/posts`);
  }

  getPost(id: number) {
    return this.http.get<Post>(`${API}/posts/${id}`);
  }

  createPost(title: string, content: string) {
    return this.http.post<Post>(
      `${API}/posts`,
      { title, content },
      { headers: this.authHeaders() },
    );
  }

  updatePost(id: number, title: string, content: string) {
    return this.http.put<Post>(
      `${API}/posts/${id}`,
      { title, content },
      { headers: this.authHeaders() },
    );
  }

  deletePost(id: number) {
    return this.http.delete<void>(`${API}/posts/${id}`, { headers: this.authHeaders() });
  }
}
