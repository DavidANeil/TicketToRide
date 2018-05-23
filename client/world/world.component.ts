import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {WorldService} from './world.service';

@Component({
  selector: 'game-world',
  templateUrl: '/serve/world/world.component.html',
})
export class WorldComponent {
  constructor(private worldService: WorldService, private router: Router) {}

  public createGame() {
    this.worldService.createGame().then((gameId: string) => {
      this.router.navigate(['/lobby', gameId]);
    })
  }
}