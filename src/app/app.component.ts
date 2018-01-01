import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private isLoggedIn: boolean;

  constructor(private authorizationService: AuthorizationService) {

  }

  ngOnInit() {
    this.isLoggedIn = this.authorizationService.isLoggedIn();
    this.authorizationService.loggedInUpdated.subscribe((loggedIn: boolean) => this.isLoggedIn = loggedIn
    );
  }
}
