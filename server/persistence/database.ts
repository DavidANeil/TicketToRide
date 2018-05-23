import {Database as SqliteDatabase} from 'sqlite3';
import {dbPath} from '../config';
import {BaseDatabase} from './basedatabase';


export class Database extends SqliteDatabase implements BaseDatabase {
  // DELETE: It looks like sqlite3 doesn't need singleton i/o
  static _instance: BaseDatabase = new SqliteDatabase(dbPath);
  static get instance(): BaseDatabase {
    return Database._instance;
  }
}

// These persistence classes generally follow the pattern of 1 class per
// database table, they should be injected with a BaseDatabase
