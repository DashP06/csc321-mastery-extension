import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isLoggedIn: boolean = false;
  name: string = '';
  role: string = '';

  constructor(
    private router: Router,
    private auth: Auth,
  ) {}

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.name = localStorage.getItem('name') || '';
    this.role = localStorage.getItem('role') || '';
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
