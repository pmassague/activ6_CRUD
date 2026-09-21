import { Component, inject, input, signal } from '@angular/core';
import { UsersServices } from '../../services/users.services';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { form, FormField, minLength, pattern, required} from '@angular/forms/signals';


@Component({
  imports: [FormField],
  selector: 'app-user-form',
  styleUrl: './user-form.page.css',
  templateUrl: './user-form.page.html',
})
export class UserFormPage {
    _id = input<string>()
    //Titulo del formulario
    title: string = "NUEVO USUARIO"
    //nombre del boton
    btnName: string = "Guardar"
    usersService = inject(UsersServices)
    router = inject(Router);

    userModel = signal<IUser>({
      first_name: "",
      last_name: "",
      email: "",
      image: "",
    })

    readonly userForm = form(this.userModel, (form) => {
      // validadores de nombre
      required(form.first_name, { message: "El nombre es obligatorio" });
      minLength(form.first_name, 3, { message: "El nombre debe tener al menos 3 caracteres." })

      // validadores de apellido
      required(form.last_name, { message: "El apellido es obligatorio" });
      minLength(form.last_name, 3, { message: "El apellido debe tener al menos 3 caracteres." })

      // validadores de email
      required(form.email, { message: "El campo email es obligatorio" })
      pattern(form.email, /^\w+\@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, { message: "Introduce un email con formato válido" })

      // validadores de url de imagen
      required(form.image, { message: "El campo image es obligatorio" })
      pattern(form.image, /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .?=@-]*)*\/?$/, { message: "Introduce una url con formato válido" })
    })

    async ngOnInit() {
      const id = this._id()
      if (id) {
        this.title = "ACTUALIZAR USUARIO"
        this.btnName = "Actualizar"

        // datos del usuario que queremos actualizar
        const userUpdate = await this.usersService.getById(id)
        // volcar todos los datos del getById en el modelo, vienen con los datos?
        this.userModel.set(userUpdate)
      }
    }

    async getDataForm(event: Event) {
      event.preventDefault()
      //console.log(this.userForm().value())
      //conectar con el servicio y enviar el nuevo usuario
      const id = this._id()
      if (id) {
        //Actualizar
      const response = await this.usersService.updateUser(id, this.userForm().value())
      if (response.username) {
        alert(`El usuario ${response.first_name} ha sido modificado correctamente`)
      } else {
        alert('Ha ocurrido un problema no se ha podido actualizar el usuario')
      }

      } else {
        //Crear usuario
        const response = await this.usersService.createUser(this.userForm().value())
        console.log(response)
        if (response.id) {
          alert(`El usuario ${response.first_name} ha sido creado correctamente`)
        } else {
            alert('Ha ocurrido un problema. No se ha podido registrar el usuario')
        }
      }
      //router navigate para cambiar de pagina
      this.router.navigate(['/home'])
      this.userForm().reset({
          first_name: "",
          last_name: "",
          email: "",
          image: ""
      })


    }


}
