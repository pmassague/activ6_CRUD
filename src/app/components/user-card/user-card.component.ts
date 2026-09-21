import { Component, inject, input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersServices } from '../../services/users.services';

@Component({
  imports: [RouterLink],
  selector: 'app-user-card',
  styleUrl: './user-card.component.css',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  myUser = input<IUser>()
  usersService = inject(UsersServices)

  async onDelete(_id: string | undefined) {
    try {
      const respuesta = await this.usersService.deleteById(_id);
      if (respuesta._id) {
        alert('Usuario borrado correctamente')
        this.usersService.apiResponse.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

}
