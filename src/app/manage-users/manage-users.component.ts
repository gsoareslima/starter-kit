import { ChangeDetectorRef, Component } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../@shared/github/structs/user';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'manager-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  constructor(
    private userService: UsersService,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private ref: ChangeDetectorRef
  ) {}

  isRequesting(): boolean {
    return this.userService.requesting;
  }

  getUsers() {
    return [...this.userService.users];
  }

  requestDelete(user: User) {
    Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger m-1',
        cancelButton: 'btn btn-success m-1',
      },
      buttonsStyling: false,
    })
      .fire({
        title: user.getLogin(),
        html: this.translateService.instant('users.remove.confirm', { login: user.getLogin() }),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translateService.instant('Yes/Remove'),
        cancelButtonText: this.translateService.instant('Cancel'),
      })
      .then((result) => {
        if (result.value) {
          this.userService.remove(user).subscribe(
            () =>
              this.toastr.success(this.translateService.instant('users.removed.success', { login: user.getLogin() })),
            () => this.toastr.error(this.translateService.instant('users.removed.error', { login: user.getLogin() }))
          );
        }
      });
  }
}
