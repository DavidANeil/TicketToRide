import {Component} from '@angular/core';
import {GameListing} from '@common/model/gamelisting';
import {WorldService} from '../world.service';

// It might make more sense for this component to receive the gamelist as input
@Component({
  selector: 'game-list',
  templateUrl: '/serve/world/gamelist/gamelist.component.html',
})
export class GameListComponent {
  public games: GameListing[];
  constructor(private worldService: WorldService) {}

  public ngOnInit() {
    this.worldService.startPolling();
  }

  public ngOnDestroy() {
    this.worldService.stopPolling();
  }
}