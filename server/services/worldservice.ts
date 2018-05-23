import {authenticationCookie} from '@common/config';
import {Serializable} from '@common/interface/serializable';
import {Session} from '@common/model/session';
import {LoginResponse} from '@common/responses/loginresponse';

import {Database} from '../persistence/database';
import {Listings} from '../persistence/tables/listings';
import {Sessions} from '../persistence/tables/sessions';


export class WorldService {
  public getListings(): Promise<Serializable> {
    const listingsAccess = new Listings(Database.instance);
    return listingsAccess.getListings()
        .then((exists: string) => {
          return exists;
        })
        .then((key: string) => {
          return new LoginResponse(key);
        });
  }

  // TODO: this could be in a user service
  private getUser(authKey: string): Promise<string> {
    const sessionsAccess = new Sessions(Database.instance);
    return sessionsAccess.getUser(authKey);
  }

  public createGame(cookies: {[key: string]: string}): Promise<string> {
    const listingsAccess = new Listings(Database.instance);
    return this.getUser('a8f3cbeec9f72866afd011db0b51780d')
        .then((userId: string) => {
          console.log('1');
          return listingsAccess.createListing().then((gameId: string) => {
            console.log('2');

            return listingsAccess.addUser(gameId, userId).then(() => {
              console.log('3');

              return gameId;
            });
          });
        });
  }
}