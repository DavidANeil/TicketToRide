import {Session} from '@common/model/session';
import {LoginResponse} from '@common/responses/loginresponse';

import {Database} from '../persistence/database';
import {Sessions} from '../persistence/tables/sessions';
import {Users} from '../persistence/tables/users';


export class LoginService {
  public loginUser(username: string, password: string): Promise<string> {
    const usersAccess = new Users(Database.instance);
    return usersAccess.userExists(username, password)
        .then((exists: number) => {
          if (exists) {
            const sessionsAccess = new Sessions(Database.instance);
            const session = new Session(exists, Session.defaultExpiration);
            return sessionsAccess.createSession(
                session.key, session.userid, session.expires);
          } else {
            return Promise.reject<string>(undefined);
          }
        })
        .then((key: string) => {
          return new LoginResponse(key).serialize();
        });
  }

  public registerUser(username: string, password: string): Promise<string> {
    const usersAccess = new Users(Database.instance);
    return usersAccess.usernameExists(username)
        .then((exists: number) => {
          if (!exists) {
            return usersAccess.addUser(username, password);

          } else {
            return Promise.reject<number>(undefined);
          }
        })
        .then((newUserid: number) => {
          const sessionsAccess = new Sessions(Database.instance);
          const session = new Session(newUserid, Session.defaultExpiration);
          return sessionsAccess.createSession(
              session.key, session.userid, session.expires);
        })
        .then((key: string) => {
          return new LoginResponse(key).serialize();
        });
  }
}