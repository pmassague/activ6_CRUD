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

}

