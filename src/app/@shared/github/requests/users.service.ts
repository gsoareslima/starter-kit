import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from '../structs/user';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

const routes = {
  users: (p: IUsersPagination) => `github/users?since=${(p.page - 1) * p.perPage}&per_page=${p.perPage}`,
};

export interface IUsersPagination {
  page: number;
  perPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient, private translateService: TranslateService) {}

  search(pagination: IUsersPagination): Observable<Array<User>> {
    return this.httpClient.get(routes.users(pagination)).pipe(
      map((body: any) => {
        body.forEach((user: any, index: number) => {
          // Gera uma data aleatória apenas para fins de teste
          // uma vez que consultar a data real de criação dos usuários no github consumirá o limite de requisições
          user.createdAt = ((start, end): moment.Moment => {
            return moment((start.unix() + Math.random() * (end.unix() - start.unix())) * 1000);
          })(moment('2000-01-01'), moment()).format('Y-MM-DD');

          body[index] = new User(user);
        });
        return body;
      }),
      catchError(() => of(this.translateService.instant('unexpectedError')))
    );
  }
}
