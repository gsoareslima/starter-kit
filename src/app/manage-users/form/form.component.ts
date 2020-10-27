import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserType } from '../../@shared/github/structs/user';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

enum FormMode {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  message?: string;
  user?: User;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {
    this.form = this.formBuilder.group({
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern('^[a-z][a-z0-9]+$'),
        ],
      ],
      type: [UserType.USER, [Validators.required, Validators.pattern(`^${UserType.USER}|${UserType.ORGANIZATION}$`)]],
    });
  }

  ngOnInit() {
    let login = this.activatedRoute.snapshot.params.login;
    if (login) {
      this.mode = FormMode.EDIT;
      this.user = this.usersService.findByLogin(login);
      this.form.get('login').setValue(this.user?.getLogin());
      this.form.get('type').setValue(this.user?.getType());
    } else this.mode = FormMode.ADD;
  }

  isValidAdd() {
    return this.mode == FormMode.ADD;
  }

  isValidEdit() {
    return this.mode == FormMode.EDIT && this.user;
  }

  onSubmit() {
    if (this.form.invalid) return;

    let user;
    switch (this.mode) {
      case FormMode.ADD:
        user = new User().setLogin(String(this.form.get('login').value)).setType(this.form.get('type').value);
        this.usersService.add(user).subscribe(
          (user: User) => {
            this.toastr.success(this.translateService.instant('user.add.success', { login: user.getLogin() }));
            this.router.navigateByUrl('/manage-users');
          },
          (error) => this.toastr.error(error)
        );

        break;
      case FormMode.EDIT:
        user = User.clone(this.user)
          .setLogin(String(this.form.get('login').value))
          .setType(this.form.get('type').value);
        this.usersService.edit(user).subscribe(
          (user: User) => {
            this.user = user;
            this.toastr.success(this.translateService.instant('user.edit.success', { login: user.getLogin() }));
          },
          (error) => this.toastr.error(error)
        );
        break;
    }
  }
}
