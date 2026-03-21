import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  @Input() user!: User;
  @Output() delete = new EventEmitter<string>();

  constructor(private router: Router) {}

  viewDetail() {
    const userId = this.user._id || this.user.id;
    if (!userId) {
      return;
    }
    this.router.navigate(['/user', userId]);
  }

  deleteUser() {
    const userId = this.user._id || this.user.id;
    if (!userId) {
      return;
    }
    this.delete.emit(userId);
  }
}
