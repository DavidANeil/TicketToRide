import {Serializable} from '@common/interface/serializable';
import {Player} from '@common/model/player';
import {Session} from '@common/model/session';
import {LoginResponse} from '@common/responses/loginresponse';

import {Database} from '../persistence/database';
import {Users} from '../persistence/tables/users';


export class LobbyService {
  // TODO: this could be in a user service
  public getPlayer(playerId: string): Promise<Player> {
    const usersAccess = new Users(Database.instance);
    return usersAccess.getUser(playerId).then((username) => {
      return new Player(playerId, username);
    });
  }
}