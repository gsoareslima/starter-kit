import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../@shared/github/structs/user';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'manage-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() users: Array<User>;
  @Input('state.loading') loading: boolean | undefined;
  @Output() requestDelete: EventEmitter<User> = new EventEmitter();

  private filteredUsers: Array<User>;
  filterPattern: string;
  formFilter: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formFilter = this.formBuilder.group({
      pattern: '',
    });
  }

  getUsers(): Array<User> {
    return this.filterPattern ? this.filteredUsers : this.users;
  }

  trackByUserIdentifier(index: number, item: User): number {
    return item.getId();
  }

  getTypeIcon(user: User): string {
    return user.isUserType() ? 'fas fa-user' : 'fas fa-users';
  }

  getTypeLabel(user: User): string {
    return user.isUserType() ? 'User' : 'Organization';
  }

  filter($event: any) {
    $event.preventDefault();
    let pattern = this.formFilter.get('pattern').value;
    if (pattern) pattern = pattern.trim();
    this.filterPattern = pattern ? pattern.toLowerCase() : null;
    this.filteredUsers = this.users.filter((user: User) => user.getLogin().toLowerCase().includes(this.filterPattern));
  }

  onRequestDelete(user: User) {
    this.requestDelete.emit(user);
  }

  openGithubPage(user: User) {
    window.open(user.getUrl(), '_blank');
  }
}
