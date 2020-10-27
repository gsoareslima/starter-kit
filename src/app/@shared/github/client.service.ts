import { Injectable } from '@angular/core';
import { UsersService as UsersRequest } from './requests/users.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private usersRequest: UsersRequest) {}

  users(): UsersRequest {
    return this.usersRequest;
  }
}
