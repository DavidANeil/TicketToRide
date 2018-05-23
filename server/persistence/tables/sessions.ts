import {Session} from '../../../common/model/session';
import {BaseDatabase} from '../basedatabase';


export class Sessions {
  constructor(private db: BaseDatabase) {}

  private static createSessionQuery =
      'INSERT INTO sessions(key, user, expires) VALUES($key, $user, $expires)';
  public createSession(key: string, user: string|number, expires: string|Date) {
    this.db.run(
        Sessions.createSessionQuery, {
          $key: key,
          $user: user,
          $expires: expires.toString(),
        },
        function(err?: Error|null, row?: {[key: string]: string}) {
          console.log(err, row);
        });
  }
}