import { Component, inject, input, signal } from '@angular/core';
import { UsersServices } from '../../services/users.services';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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

  //Carga los detalles del usuario
  async cargarInfo() {
    try {
      const response = await this.usersServices.getById(this._id())
      this.user.set(response)
    } catch (error) {
      console.log(error)
    }
  }

  //Borra el usuario
  async eliminarUsuario(_id: string | undefined) {
      const resultado = await Swal.fire({
      title: '¿Estás seguro de borrar el usuario?',
      text: "¡Esta operación no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
      try {
        const respuesta = await this.usersServices.deleteById(_id);
        if (respuesta._id) {
          Swal.fire(
            '¡Borrado!',
            'El usuario ha sido borrado correctamente.',
            'success'
          );
          this.usersServices.apiResponse.reload();
        }
      } catch (error) {
        Swal.fire(
          'Error',
          'No se pudo borrar el usuario.',
          'error'
        );
      }
    }
}
}
