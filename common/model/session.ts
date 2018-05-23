import {generateKey} from '../util/key';
export class Session {
  public key: string;
  constructor(public userid: number, public expires: Date) {
    this.key = generateKey();
  }

  public setKey(newKey: string): this {
    this.key = newKey;
    return this;
  }



  static get defaultExpiration(): Date {
    const date = new Date();
    date.setDate(new Date().getDate() + 1);
    return date;
  }
}