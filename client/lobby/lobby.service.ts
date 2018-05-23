import {Injectable} from '@angular/core';
import * as config from '@common/config';
import {JSONType} from '@common/json';
import {GameListing} from '@common/model/gamelisting';
import {Player} from '@common/model/player';
import {GameListingIdResponse} from '@common/responses/gamelistingidresponse';

import {HTTPMethod, XHR} from '../services/xhr/xhr';

@Injectable()
export class LobbyService {
  constructor(private xhr: XHR) {}

  public getListing(gameId: string): Promise<GameListing> {
    return this.xhr.getJSON(HTTPMethod.GET, config.getGameListingAPI(gameId))
        .then((response: JSONType) => {
          return GameListing.deserialize(response) ||
              Promise.reject<GameListing>('Bad response');
        });
  }

  public loadPlayer(playerId: string): Promise<Player> {
    return this.xhr.getJSON(HTTPMethod.GET, config.getPlayerAPI(playerId))
        .then((response: JSONType) => {
          return Player.deserialize(response) ||
              Promise.reject<Player>('Bad response');
        });
  }
}