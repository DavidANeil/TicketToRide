import 'rxjs/add/operator/switchMap';

import {Component} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {GameListing} from '@common/model/gamelisting';
import {LobbyService} from './lobby.service';

@Component({
  selector: 'game-lobby',
  templateUrl: '/serve/lobby/lobby.component.html',
})
export class LobbyComponent {
  public listing: GameListing;
  constructor(
      private route: ActivatedRoute, private lobbyService: LobbyService) {}
  public ngOnInit() {
    this.route.paramMap
        .switchMap(
            (params: ParamMap) =>
                this.lobbyService.getListing(params.get('id')!))
        .subscribe((listing: GameListing) => {
          this.listing = listing;
        });
  }
}