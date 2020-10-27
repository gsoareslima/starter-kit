import { Injectable } from '@angular/core';
import { ClientService as GithubClient } from '../@shared/github/client.service';
import { User } from '../@shared/github/structs/user';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Injectable()
export class UsersService {
  private _users: Array<User>;
  public requesting: boolean;

  constructor(private github: GithubClient, private translateService: TranslateService) {
    this._users = new Array<User>();
  }

  get users(): Array<User> {
    return this._users;
  }

  search(page: number = 1, perPage: number = 30, callback?: CallableFunction) {
    this.requesting = true;
    setTimeout(() => {
      // Simula um lentidão no carregamento
      this.github
        .users()
        .search({ page: page, perPage: perPage })
        .pipe(finalize(() => (this.requesting = false)))
        .subscribe((users: Array<User>) => {
          users.map((user: User) => {
            if (this._users.find((u: User) => u.getId() == user.getId())) return;
            this._users.push(user);
          });

          if (callback) callback(this._users);
        });
    }, 500);
  }

  sort() {
    this._users = this._users.sort((a, b) => (a.getId() > b.getId() ? 1 : a.getId() < b.getId() ? -1 : 0));
    return this._users;
  }

  findByLogin(login: string): User | undefined {
    return this._users.find((u) => u.getLogin() == login);
  }

  add(user: User): Observable<User> {
    return new Observable((observer: any) => {
      let index = this._users.indexOf(this._users.find((u) => u.getLogin() == user.getLogin()));
      if (index > -1)
        return observer.error(this.translateService.instant('user.login.already.inUse', { login: user.getLogin() }));
      user.setId(Math.max(...this._users.map((u) => u.getId())) + 1);
      user.setCreatedAt(moment().format('Y-MM-DD'));
      this._users.push(user);
      observer.next(user);
      observer.complete();
    });
  }

  edit(user: User): Observable<User> {
    return new Observable((observer: any) => {
      let index = this._users.indexOf(
        this._users.find((u) => u.getLogin() == user.getLogin() && u.getId() != user.getId())
      );
      if (index > -1)
        return observer.error(this.translateService.instant('user.login.already.inUse', { login: user.getLogin() }));
      index = this._users.indexOf(this._users.find((u) => u.getId() == user.getId()));
      if (index == -1)
        return observer.error(this.translateService.instant('user.notFound', { login: user.getLogin() }));
      user.setEditedAt(moment().format('Y-MM-DD'));
      this._users[index] = user;
      observer.next(user);
      observer.complete();
    });
  }

  remove(user: User): Observable<undefined> {
    return new Observable((observer: any) => {
      let index = this.users.indexOf(this.users.find((u) => u.getId() == user.getId()));
      if (index == -1) return observer.error(`User ${user.getLogin()} not found`);
      this.users.splice(index, 1);
      observer.next();
      observer.complete();
    });
  }
}
