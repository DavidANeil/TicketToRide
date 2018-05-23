export class GameListing {
  public name?: string;
  public started: boolean = false;
  public playerIds: string[];

  constructor(public gameId: string) {}

  public setStarted() {
    this.started = true;
  }

  public serialize() {
    return JSON.stringify({
      'gameId': this.gameId,
      'name': this.name,
      'started': this.started,
      'playerIds': this.playerIds,
    });
  }

  static deserialize(parsed: any): GameListing|null {
    if (parsed && typeof parsed === 'object' &&
        typeof parsed.gameId === 'string') {
      const listing = new GameListing(parsed.gameId);
      listing.name == parsed.name || undefined;
      listing.started = parsed.started || false;
      listing.playerIds = parsed.playerIds || [];
      return listing;
    } else {
      return null;
    }
  }
}