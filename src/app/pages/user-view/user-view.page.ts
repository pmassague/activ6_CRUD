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
  usersServices = inject(UsersServices)
  _id = input.required<string>()
  user = signal<IUser | null>(null)

  ngOnInit() {
    this.cargarInfo()
  }

  async cargarInfo() {
    try {
      const response = await this.usersServices.getById(this._id())
      this.user.set(response)
    } catch (error) {
      console.log(error)
    }
  }

  async eliminarUsuario(_id: string | undefined) {
    try {
      const respuesta = await this.usersServices.deleteById(_id);
      if (respuesta._id) {
        alert('Usuario borrado correctamente')
        this.usersServices.apiResponse.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  }


