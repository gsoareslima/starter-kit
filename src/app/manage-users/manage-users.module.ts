import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../@shared/shared.module';
import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { UsersService } from './users.service';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { ManageUsersComponent } from './manage-users.component';
import { ListComponent as ListUsersComponent } from './list/list.component';
import { FormComponent as FormUserComponent } from './form/form.component';
import { environment } from '@env/environment';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ManageUsersRoutingModule,
    SharedModule,
    ScrollingModule,
    ReactiveFormsModule,
  ],
  declarations: [ManageUsersComponent, ListUsersComponent, FormUserComponent],
  providers: [UsersService],
})
export class ManageUsersModule {
  constructor(private usersService: UsersService) {
    this.loadUsers();
  }

  private loadUsers() {
    if (!this.usersService.users.length) {
      for (let page = 1; page <= environment.github.searchUsers.pages; page++) {
        this.usersService.search(page, environment.github.searchUsers.perPage);
      }
    }

    this.usersService.sort();
  }
}
