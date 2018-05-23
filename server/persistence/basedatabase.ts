// For ease of use this is just a copy of the sqlite3 interface.
// I doubt that I will use a large portion of it, so it can be trimmed down
// before trying to add another database implementation.
export interface Statement {
  bind(callback?: (err: Error|null) => void): this;
  bind(...params: any[]): this;

  reset(callback?: (err: null) => void): this;

  finalize(callback?: (err: Error) => void): BaseDatabase;

  run(callback?: (err: Error|null) => void): this;
  run(params: any, callback?: (this: RunResult, err: Error|null) => void): this;
  run(...params: any[]): this;

  get(callback?: (err: Error|null, row?: any) => void): this;
  get(params: any,
      callback?: (this: RunResult, err: Error|null, row?: any) => void): this;
  get(...params: any[]): this;

  all(callback?: (err: Error|null, rows: any[]) => void): this;
  all(params: any,
      callback?: (this: RunResult, err: Error|null, rows: any[]) => void): this;
  all(...params: any[]): this;

  each(
      callback?: (err: Error|null, row: any) => void,
      complete?: (err: Error|null, count: number) => void): this;
  each(
      params: any,
      callback?: (this: RunResult, err: Error|null, row: any) => void,
      complete?: (err: Error|null, count: number) => void): this;
  each(...params: any[]): this;
}

export interface RunResult extends Statement {
  lastID: number;
  changes: number;
}

export interface BaseDatabase {
  close(callback?: (err: Error|null) => void): void;

  run(sql: string, callback?: (this: RunResult, err: Error|null) => void): this;
  run(sql: string, params: any,
      callback?: (this: RunResult, err: Error|null) => void): this;
  run(sql: string, ...params: any[]): this;

  get(sql: string,
      callback?: (this: Statement, err: Error|null, row: any) => void): this;
  get(sql: string, params: any,
      callback?: (this: Statement, err: Error|null, row: any) => void): this;
  get(sql: string, ...params: any[]): this;

  all(sql: string,
      callback?: (this: Statement, err: Error|null, rows: any[]) => void): this;
  all(sql: string, params: any,
      callback?: (this: Statement, err: Error|null, rows: any[]) => void): this;
  all(sql: string, ...params: any[]): this;

  each(
      sql: string,
      callback?: (this: Statement, err: Error|null, row: any) => void,
      complete?: (err: Error|null, count: number) => void): this;
  each(
      sql: string, params: any,
      callback?: (this: Statement, err: Error|null, row: any) => void,
      complete?: (err: Error|null, count: number) => void): this;
  each(sql: string, ...params: any[]): this;

  exec(sql: string, callback?: (this: Statement, err: Error|null) => void):
      this;

  prepare(sql: string, callback?: (this: Statement, err: Error|null) => void):
      Statement;
  prepare(
      sql: string, params: any,
      callback?: (this: Statement, err: Error|null) => void): Statement;
  prepare(sql: string, ...params: any[]): Statement;

  serialize(callback?: () => void): void;
  parallelize(callback?: () => void): void;

  on(event: 'trace', listener: (sql: string) => void): this;
  on(event: 'profile', listener: (sql: string, time: number) => void): this;
  on(event: 'error', listener: (err: Error) => void): this;
  on(event: 'open'|'close', listener: () => void): this;
  on(event: string, listener: (...args: any[]) => void): this;
}