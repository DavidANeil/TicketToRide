import {Component} from '@angular/core';

@Component({
  selector: 'game-login',
  templateUrl: '/serve/login/login.component.html',
})
export class LoginComponent {
  public isRegistering: boolean = false;

  constructor() {}

  public clickRegister() {
    if (this.isRegistering) {
      this.tryRegister();
    } else {
      this.isRegistering = true;
    }
  }

  private tryRegister() {}

  public tryLogin() {}
}