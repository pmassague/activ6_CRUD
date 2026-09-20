import { Component, inject, input, signal } from '@angular/core';
import { UsersServices } from '../../services/users.services';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-user-view',
  styleUrl: './user-view.page.css',
  templateUrl: './user-view.page.html',
})
export class UserViewPage {
  userServices = inject(UsersServices)
  _id = input.required<string>()
  user = signal<IUser | null>(null)

  ngOnInit() {
    this.cargarInfo()
  }

  async cargarInfo() {
    try {
      const response = await this.userServices.getById(this._id())
      this.user.set(response)
    } catch (error) {
      console.log(error)
    }
  }

  eliminarUsuario(){

  }

}
