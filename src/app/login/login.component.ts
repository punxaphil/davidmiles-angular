import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username = '';
  private password = '';
  private unauthorized: boolean;

  constructor(private router: Router, private authorizationService: AuthorizationService) { }

  ngOnInit() {
  }

  submit() {
    const authorized = this.authorizationService.login(this.username, this.password)
      .then(() => this.router.navigateByUrl('/'), () => this.unauthorized = true);
  }

}
