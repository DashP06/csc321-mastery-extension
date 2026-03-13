import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Admin as AdminService, User } from '../../services/admin';

@Component({
  selector: 'app-admin',
  imports: [Navbar],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  users: User[] = [];

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.adminService.getUsers().subscribe(users => {
      this.users = users;
      this.cdr.markForCheck();
    });
  }

  changeRole(user: User, event: Event) {
    const role = (event.target as HTMLSelectElement).value;
    this.adminService.updateRole(user.id, role).subscribe(updated => {
      user.role = updated.role;
      this.cdr.markForCheck();
    });
  }
}
