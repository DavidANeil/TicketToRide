import {BaseDatabase} from '../basedatabase';


export class Users {
  constructor(private db: BaseDatabase) {}
  private static primaryKey = 'rowid';
  private static userExistsQuery =
      `SELECT ${Users.primaryKey} FROM users where username=$u AND password=$p`;
  public userExists(username: string, password: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.get(
          Users.userExistsQuery, {
            $u: username,
            $p: password,
          },
          function(err?: Error|null, row?: {[key: string]: any}) {
            if (err !== null) {
              reject(err);
            } else if (row && row[Users.primaryKey]) {
              resolve(row[Users.primaryKey]);
            } else {
              resolve(0);
            }
          });
    });
  }

  private static usernameExistsQuery =
      `SELECT ${Users.primaryKey} FROM users where username=$u`;
  public usernameExists(username: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.get(
          Users.usernameExistsQuery, {
            $u: username,
          },
          function(err?: Error|null, row?: {[key: string]: any}) {
            if (err !== null) {
              reject(err);
            } else if (row && row[Users.primaryKey]) {
              resolve(row[Users.primaryKey]);
            } else {
              resolve(0);
            }
          });
    });
  }

  private static getUserQuery = 'SELECT username FROM users where rowid=$rowid';
  public getUser(userid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.get(
          Users.getUserQuery, {
            $rowid: userid,
          },
          (err: Error | null, row: {[key: string]: any} | null) => {
            if (err !== null) {
              reject(err);
            } else if (row) {
              resolve(row['username']);
            } else {
              reject();
            }
          });
    });
  }

  private static addUserQuery =
      'INSERT INTO users(username, password) VALUES($u, $p)';
  public addUser(username: string, password: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.run(
          Users.addUserQuery, {
            $u: username,
            $p: password,
          },
          function(err?: Error|null, row?: {[key: string]: any}) {
            console.log(err, row, this);
            if (err !== null) {
              reject(err);
            } else {
              resolve(this.lastID);
            }
          });

    });
  }
}