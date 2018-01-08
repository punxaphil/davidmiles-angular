import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  unauthorized: boolean;

  constructor(private router: Router, private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
  }

  submit() {
    this.authorizationService.login(this.username, this.password)
      .then(() => this.router.navigateByUrl('/'), () => this.unauthorized = true);
  }

}
