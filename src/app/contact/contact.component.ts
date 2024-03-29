import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private router: Router, private authorizationService: AuthorizationService) {
  }

  logout() {
    this.authorizationService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    this.isLoggedIn = AuthorizationService.isLoggedIn();
    this.authorizationService.loggedInUpdated.subscribe((loggedIn: boolean) => this.isLoggedIn = loggedIn);
  }

}
