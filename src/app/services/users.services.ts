import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IResponse, IUser } from '../interfaces/iuser.interface';
import { firstValueFrom } from 'rxjs';

@Service()
export class UsersServices {
    private baseUrl = "https://peticiones.online/api/users"
    private httpClient = inject(HttpClient)

    apiResponse = httpResource<IResponse>(() => this.baseUrl)

    getById(_id: string) {
      return firstValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`))
    }

    // borrar usuario
    deleteById(_id: string | undefined) {
      return firstValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${_id}`))
    }


    //crear usuario
    createUser(user: IUser) {
      const resultado = firstValueFrom(this.httpClient.post<IUser>(this.baseUrl, user))
      //console.log(resultado)
      return resultado
    }

    //actualizar usuario
    updateUser(idUser: string, user: IUser) {
      const { _id, id, username, password, ...resto } = user
      return firstValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${idUser}`, resto))
    }    

}


