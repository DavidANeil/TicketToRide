import {parseJSON} from '../json';

export class GameListingIdResponse {
  constructor(public gameId: string) {}

  public serialize() {
    return JSON.stringify({
      'gameId': this.gameId,
    });
  }

  static deserialize(parsed: any): GameListingIdResponse|null {
    if (parsed && typeof parsed === 'object' &&
        typeof parsed.gameId === 'string') {
      return new GameListingIdResponse(parsed.gameId);
    } else {
      return null;
    }
  }
}