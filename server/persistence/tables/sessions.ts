import {BaseDatabase} from '../basedatabase';


export class Sessions {
  constructor(private db: BaseDatabase) {}

  private static createSessionQuery =
      'INSERT INTO sessions(key, userid, expires) VALUES($key, $userid, $expires)';
  public createSession(
      key: string, userid: string|number,
      expires: string|Date): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.run(
          Sessions.createSessionQuery, {
            $key: key,
            $userid: userid,
            $expires: expires.toString(),
          },
          function(err?: Error|null, row?: {[k: string]: string}) {
            if (err !== null) {
              reject(err);
            } else {
              resolve(key);
            }
          });

    });
  }

  // TODO: use vars like this everywhere.
  private static userIdKey = 'userid';
  private static getUserQuery = 'SELECT userid FROM sessions WHERE key=$key';
  public getUser(key: string, checkExpiration: boolean = false):
      Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.get(
          Sessions.getUserQuery, {
            $key: key,
          },
          function(err?: Error|null, row?: {[key: string]: string}) {
            if (err !== null) {
              reject(err);
            } else if (row && row[Sessions.userIdKey]) {
              resolve(row[Sessions.userIdKey]);
            } else {
              reject('Invalid return');
            }
          });
    })
  }
}