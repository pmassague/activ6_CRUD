import { Component, inject, signal } from '@angular/core';
import { UsersServices } from '../../services/users.services';
import { IUser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  imports: [UserCardComponent],
  selector: 'app-home',
  styleUrl: './home.page.css',
  templateUrl: './home.page.html',
})
export class HomePage {
  usersService = inject(UsersServices)
  response = this.usersService.apiResponse

  ngOnInit() {
    this.response.reload();
  }
}
