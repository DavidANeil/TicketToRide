import {Injectable} from '@angular/core';
import * as config from '@common/config';
import {JSONType} from '@common/json';
import {GameListingIdResponse} from '@common/responses/gamelistingidresponse';

import {HTTPMethod, XHR} from '../services/xhr/xhr';

@Injectable()
export class WorldService {
  private pollerInterval: number = 0;
  constructor(private xhr: XHR) {}

  public createGame(): Promise<string> {
    return this.xhr.sendJSON(HTTPMethod.POST, config.createGameAPI)
        .then((response) => {
          if (response) {
            if (typeof response === 'object') {
              const resp = GameListingIdResponse.deserialize(response);
              if (resp) {
                return resp.gameId;
              }
            }
          }
          return Promise.reject<string>('Bad response');
        });
  }

  public startPolling() {
    if (!this.pollerInterval) {
      this.pollerInterval = window.setInterval(
          WorldService.doPoll, config.worldPollIntervalMS, this.xhr);
    }
  }

  public stopPolling() {
    if (this.pollerInterval) {
      window.clearInterval(this.pollerInterval);
      this.pollerInterval = 0;
    }
  }

  static doPoll(xhr: XHR) {
    xhr.getJSON(HTTPMethod.GET, config.gameListAPI)
        .then(WorldService.onPoll)
        .catch((err: any) => {
          return false;
        });
  }

  static onPoll() {}
}