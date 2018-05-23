import {parseJSON} from '../json';

export class LoginResponse {
  constructor(public key: string) {}

  public serialize() {
    return JSON.stringify({
      'key': this.key,
    });
  }

  static deserialize(parsed: any): LoginResponse|null {
    if (parsed && typeof parsed === 'object' &&
        typeof parsed.key === 'string') {
      return new LoginResponse(parsed.key as string);
    } else {
      return null;
    }
  }
}