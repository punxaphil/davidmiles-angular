import {EventEmitter, Injectable} from '@angular/core';
import * as GitHub from 'github-api';

const PASSWORD = 'password';
const USERNAME = 'username';

@Injectable()
export class AuthorizationService {
  loggedInUpdated = new EventEmitter<boolean>();

  constructor() {
    this.loggedInUpdated.emit();
  }

  isLoggedIn() {
    return sessionStorage.getItem(USERNAME) != null && sessionStorage.getItem(PASSWORD) != null;
  }

  getGithubWithCredentials() {
    return new GitHub({username: sessionStorage.getItem(USERNAME), password: sessionStorage.getItem(PASSWORD)});
  }

  logout() {
    sessionStorage.removeItem(USERNAME);
    sessionStorage.removeItem(PASSWORD);
    this.loggedInUpdated.emit(false);
  }

  login(username: string, password: string) {
    const gh = new GitHub({username: username, password: password});
    return gh.getUser().getEmails()
      .then(() => {
        sessionStorage.setItem(USERNAME, username);
        sessionStorage.setItem(PASSWORD, password);
        this.loggedInUpdated.emit(true);
      });
  }
}
