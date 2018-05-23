import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from './login.service';

@Component({
  selector: 'game-login',
  templateUrl: '/serve/login/login.component.html',
})
export class LoginComponent {
  public isRegistering: boolean = false;

  public usernameField: string;
  public passwordField: string;
  public confirmField: string;
  public errorField: string;

  constructor(private loginService: LoginService, private router: Router) {}

  public clickRegister() {
    this.errorField = '';
    if (this.isRegistering) {
      this.tryRegister();
    } else {
      this.isRegistering = true;
    }
  }

  private tryRegister() {
    if (this.usernameField && this.passwordField && this.confirmField) {
      if (this.passwordField == this.confirmField) {
        this.loginService.registerUser(this.usernameField, this.passwordField)
            .then((success) => {
              if (success) {
                this.router.navigate(['/world']);
              } else {
                this.errorField = 'ERROR: username already taken';
              }
            });
      } else {
        this.errorField = 'ERROR: passwords do not match.'
      }
    } else {
      this.errorField = 'ERROR: Fields empty.'
    }
  }

  public tryLogin() {
    this.errorField = '';
    if (this.usernameField && this.passwordField) {
      this.loginService.loginUser(this.usernameField, this.passwordField)
          .then((success) => {
            if (success) {
              this.router.navigate(['/world']);
            } else {
              this.errorField =
                  'ERROR: username and password do not match a known account';
            }
          });
    } else {
      this.errorField = 'ERROR: Fields empty.'
    }
  }
}