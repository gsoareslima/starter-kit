import { environment } from '@env/environment';
import { getEffectiveConstraintOfTypeParameter } from 'typescript';
import { Type } from '@angular/core';

export enum UserType {
  USER = 'User',
  ORGANIZATION = 'Organization',
}

export class User {
  private id: number;
  private login: string;
  private type: UserType;
  private createdAt: string;
  private editedAt: string;

  constructor(data?: { id?: number; login: string; type: UserType; createdAt?: string; editedAt?: string }) {
    if (!data) return;
    this.id = data.id;
    this.login = data.login;
    this.type = data.type;
    this.createdAt = data.createdAt;
    this.editedAt = data.editedAt;
  }

  getId(): number {
    return this.id;
  }

  getLogin(): string {
    return this.login;
  }

  getType(): UserType {
    return this.type;
  }

  getCreatedAt(): string {
    return this.createdAt;
  }

  getEditedAt(): string {
    return this.editedAt;
  }

  setId(value: number): User {
    this.id = value;
    return this;
  }

  setLogin(value: string): User {
    this.login = value;
    return this;
  }

  setType(value: UserType): User {
    this.type = value;
    return this;
  }

  setCreatedAt(value: string): User {
    this.createdAt = value;
    return this;
  }

  setEditedAt(value: string): User {
    this.editedAt = value;
    return this;
  }

  getAvatarUrl(): string {
    return `${environment.github.url.avatar}/u/${this.id}`;
  }

  getUrl(): string {
    return `${environment.github.url.common}/${this.login}`;
  }

  isUserType(): boolean {
    return this.type == UserType.USER;
  }

  isOrganizationType(): boolean {
    return this.type == UserType.ORGANIZATION;
  }

  static clone(user: User): User {
    return new User({
      id: user.getId(),
      login: user.getLogin(),
      type: user.getType(),
      createdAt: user.getCreatedAt(),
      editedAt: user.getEditedAt(),
    });
  }
}
