import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Posts } from '../../services/posts';

@Component({
  selector: 'app-editor',
  imports: [FormsModule],
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor implements OnInit {
  postId: number | null = null;
  title = '';
  content = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private posts: Posts,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.postId = id ? Number(id) : null;

    if (this.postId !== null) {
      this.posts.getPost(this.postId).subscribe((post) => {
        this.title = post.title;
        this.content = post.content;
        this.cdr.markForCheck();
      });
    }
  }

  get isNewPost(): boolean {
    return this.postId === null;
  }

  save() {
    const request = this.isNewPost
      ? this.posts.createPost(this.title, this.content)
      : this.posts.updatePost(this.postId!, this.title, this.content);

    request.subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
