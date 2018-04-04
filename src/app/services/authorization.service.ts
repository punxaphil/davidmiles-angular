import {EventEmitter, Injectable} from '@angular/core';
import * as Octokit from '@octokit/rest';

const PASSWORD = 'password';
const USERNAME = 'username';

@Injectable()
export class AuthorizationService {
  loggedInUpdated = new EventEmitter<boolean>();
  private octokit: Octokit;

  static getUsername(): string {
    return sessionStorage.getItem(USERNAME);
  }

  static getPassword() {
    return sessionStorage.getItem(PASSWORD);
  }

  constructor() {
    this.loggedInUpdated.emit();
    this.octokit = new Octokit();
  }

  static isLoggedIn() {
    return AuthorizationService.getUsername() != null && AuthorizationService.getPassword() != null;
  }

  logout() {
    sessionStorage.removeItem(USERNAME);
    sessionStorage.removeItem(PASSWORD);
    this.loggedInUpdated.emit(false);
  }

  login(username: string, password: string) {
    const auth: Octokit.Auth = {
      type: 'basic',
      username: username,
      password: password
    };
    this.octokit.authenticate(auth);
    return this.octokit.users.getEmails({}).then(() => {
      sessionStorage.setItem(USERNAME, username);
      sessionStorage.setItem(PASSWORD, password);
      this.loggedInUpdated.emit(true);
    });
  }
}
