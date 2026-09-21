import { Component, inject, input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersServices } from '../../services/users.services';
import Swal from 'sweetalert2';

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
        const respuesta = await this.usersService.deleteById(_id);
        if (respuesta._id) {
          Swal.fire(
            '¡Borrado!',
            'El usuario ha sido borrado correctamente.',
            'success'
          );
          this.usersService.apiResponse.reload();
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


