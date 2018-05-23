import {Component} from '@angular/core';

console.log('included at least');
@Component({
  selector: 'game-root-gui',
  templateUrl: '/serve/app.component.html',
})
export class AppComponent {
  constructor() {
    console.log('constructed');
  }
}