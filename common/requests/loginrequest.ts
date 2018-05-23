import {parseJSON} from '../json';

export class LoginRequest {
  constructor(public username: string, public password: string) {}

  public serialize() {
    return JSON.stringify({
      'username': this.username,
      'password': this.password,
    });
  }

  static deserialize(raw: string): LoginRequest|null {
    const parsed = parseJSON(raw);
    if (parsed && typeof parsed === 'object' &&
        typeof parsed.username === 'string' &&
        typeof parsed.password === 'string') {
      return new LoginRequest(
          parsed.username as string, parsed.password as string);
    } else {
      return null;
    }
  }
}