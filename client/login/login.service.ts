import {Injectable} from '@angular/core';
import * as config from '@common/config';
import {LoginRequest} from '@common/requests/loginrequest';

import {createCookie} from '../services/cookies/cookies';
import {HTTPMethod, XHR} from '../services/xhr/xhr';


@Injectable()
export class LoginService {
  constructor(private xhr: XHR) {}

  public loginUser(username: string, password: string): Promise<boolean> {
    return this.xhr
        .sendJSON(
            HTTPMethod.PUT, config.loginAPI,
            new LoginRequest(username, password).serialize())
        .then(LoginService.handleAuthResponse)
        .catch((err: any) => {
          return false;
        });
  }

  public registerUser(username: string, password: string): Promise<boolean> {
    return this.xhr
        .sendJSON(
            HTTPMethod.POST, config.registerAPI,
            new LoginRequest(username, password).serialize())
        .then(LoginService.handleAuthResponse)
        .catch((err: any) => {
          return false;
        });
  }

  static handleAuthResponse(response: any): boolean {
    if (response) {
      if (typeof response === 'object') {
        const authentication = response.key;
        if (typeof authentication === 'string') {
          createCookie(config.authenticationCookie, authentication);
          return true;
        }
      } else if (typeof response === 'string') {
        createCookie(config.authenticationCookie, response);
        return true;
      }
    }
    return false;
  }
}