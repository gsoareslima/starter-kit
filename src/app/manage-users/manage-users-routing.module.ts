import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ManageUsersComponent } from './manage-users.component';
import { FormComponent as FormUserComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: ManageUsersComponent, data: { title: marker('ManageUsers') } },
  { path: 'add', component: FormUserComponent, data: { title: marker('Add user') } },
  { path: 'edit/:login', component: FormUserComponent, data: { title: marker('Edit user') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ManageUsersRoutingModule {}
