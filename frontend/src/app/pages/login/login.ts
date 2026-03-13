import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-login',
  imports: [Navbar, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  tab: 'login' | 'register' = 'login';
  email = '';
  password = '';
  name = '';
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  onLogin() {
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => (this.error = 'Invalid email or password'),
    });
  }

  onRegister() {
    this.error = '';
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => (this.error = 'Registration failed'),
    });
  }
}
