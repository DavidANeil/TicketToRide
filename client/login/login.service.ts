import {Injectable} from '@angular/core';
import * as config from '@common/config';
import {LoginRequest} from '@common/requests/loginrequest';

import {HTTPMethod, XHR} from '../services//xhr/xhr';
import {createCookie} from '../services/cookies/cookies';


@Injectable()
export class LoginService {
  constructor(private xhr: XHR) {}

  public loginUser(username: string, password: string): Promise<boolean> {
    return this.xhr
        .sendJSON(
            HTTPMethod.PUT, config.loginAPI,
            new LoginRequest(username, password).serialize())
        .then((response) => {
          if (response) {
            if (typeof response === 'object') {
              const authentication = response.authentication;
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
        });
  }
}