
import {Component, Input, SimpleChanges} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {GameListing} from '@common/model/gamelisting';
import {Player} from '@common/model/player';

import {LobbyService} from '../lobby.service';

@Component({
  selector: 'game-listing-lobby-display',
  templateUrl: '/serve/lobby/lobby.component.html',
})
export class DisplayComponent {
  @Input() public gameListing: GameListing;
  public players: Player[];
  constructor(private lobbyService: LobbyService) {}


  public ngOnChanges(changes: SimpleChanges) {
    this.loadPlayers(this.gameListing.playerIds)
  }

  private loadPlayers(playerIds: string[]) {
    playerIds.forEach((playerId, idx) => {
      console.log('load', playerId);
      if (!this.players[idx] || this.players[idx].id !== playerId) {
        this.lobbyService.loadPlayer(playerId).then((player: Player) => {
          this.players[idx] = player;
        });
      }
    })
  }
}