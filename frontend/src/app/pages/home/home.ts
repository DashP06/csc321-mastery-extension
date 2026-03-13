import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { Posts, Post } from '../../services/posts';

@Component({
  selector: 'app-home',
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  posts: Post[] = [];
  role = '';
  name = '';

  constructor(private postsService: Posts, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.role = localStorage.getItem('role') || '';
    this.name = localStorage.getItem('name') || '';
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;
      this.cdr.markForCheck();
    });
  }

  isAuthor(post: Post): boolean {
    return post.author?.name === this.name;
  }

  canEdit(post: Post): boolean {
    return this.role === 'ADMIN' || (this.role === 'EDITOR' && this.isAuthor(post));
  }

  canDelete(post: Post): boolean {
    return this.role === 'ADMIN' || (this.role === 'EDITOR' && this.isAuthor(post));
  }

  editPost(post: Post) {
    this.router.navigate(['/editor', post.id]);
  }

  deletePost(post: Post) {
    this.postsService.deletePost(post.id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== post.id);
      this.cdr.markForCheck();
    });
  }
}
